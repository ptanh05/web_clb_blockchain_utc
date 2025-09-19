import { Event } from './types';
import pool from '../db'; // Import the database pool

// Remove mock data
// const mockEvents: Event[] = [ ... ];

export const EventService = {
  // Get a list of events with optional filtering and searching
  async getAllEvents(category?: string, search?: string): Promise<Event[]> {
    console.log(`Fetching events - Category: ${category || 'all'}, Search: ${search || ''}`);
    
    let query = 'SELECT * FROM events WHERE 1=1';
    const values: (string)[] = [];
    let paramIndex = 1;

    if (category && category !== 'all') {
      query += ` AND category = $${paramIndex}`;
      values.push(category);
      paramIndex++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR excerpt ILIKE $${paramIndex} OR EXISTS (SELECT 1 FROM unnest(tags) AS t WHERE t ILIKE $${paramIndex}))`;
      const searchTerm = `%${search}%`;
      values.push(searchTerm);
      // Apply search term to all parts of the OR clause
      if (category && category !== 'all') { // Need to add search term for tags as well if filtering by category
         values.push(searchTerm);
         values.push(searchTerm);
         values.push(searchTerm);
      } else { // If no category filter, need search term 4 times
         values.push(searchTerm);
         values.push(searchTerm);
         values.push(searchTerm);
      }
       // Re-evaluating the parameter indices for search - this approach might be complex with dynamic OR conditions. A simpler approach might be better or ensure correct index mapping.
       // Let's simplify the search query building to avoid complex indexing issues for now.
       query = 'SELECT * FROM events WHERE 1=1'; // Resetting query building for clarity
       const newValues: string[] = [];
       paramIndex = 1; // Reset param index

       if (category && category !== 'all') {
          query += ` AND category = $${paramIndex}`; 
          newValues.push(category);
          paramIndex++;
       }

       if (search) {
          const searchTerm = `%${search}%`;
          const searchConditions = [
             `title ILIKE $${paramIndex}`, 
             `description ILIKE $${paramIndex}`, 
             `excerpt ILIKE $${paramIndex}`, 
             `EXISTS (SELECT 1 FROM unnest(tags) AS t WHERE t ILIKE $${paramIndex})` // Assuming tags is TEXT[]
          ];
          query += ` AND (${searchConditions.join(' OR ')})`;
          // Add the same search term for each condition in the OR clause
          newValues.push(searchTerm);
          newValues.push(searchTerm);
          newValues.push(searchTerm);
          newValues.push(searchTerm);
          paramIndex++; // Increment after adding all search terms
       }
       values.length = 0; // Clear old values
       values.push(...newValues); // Use new values

    }
     // Revisit search query building - The unnest part might need adjustment based on actual DB column type and search requirements.
     // Let's use a simpler search for now that just checks string fields and assumes tags are strings for simpler LIKE.
     // If tags are TEXT[], the EXISTS unnest approach is correct but parameter indexing needs to be very precise.
     // Let's stick to the EXISTS unnest approach but ensure parameter indices are correct.

      query = 'SELECT * FROM events WHERE 1=1'; // Reset again
       const finalValues: string[] = [];
       let finalParamIndex = 1;

       if (category && category !== 'all') {
          query += ` AND category = $${finalParamIndex}`; 
          finalValues.push(category);
          finalParamIndex++;
       }

       if (search) {
          const searchTerm = `%${search}%`;
          query += ` AND (title ILIKE $${finalParamIndex} OR description ILIKE $${finalParamIndex} OR excerpt ILIKE $${finalParamIndex} OR EXISTS (SELECT 1 FROM unnest(tags) AS t WHERE t ILIKE $${finalParamIndex + 1}))`;
          finalValues.push(searchTerm); // for title, description, excerpt
          finalValues.push(searchTerm); // for unnest(tags)
          // Note: The parameter indexing here ($finalParamIndex and $finalParamIndex + 1) is specific to this OR structure.
          // If the structure changes, the indices must be updated.
       }
      
       query += ' ORDER BY date DESC, time DESC'; // Order by date and time

    try {
      const result = await pool.query(query, finalValues);
      // Map database rows to Event type, handle tags which are TEXT[] in DB
      return result.rows.map(row => ({
        ...row,
        tags: row.tags || [], // Ensure tags is an array
      }));
    } catch (error) {
      console.error('Error in getAllEvents:', error);
      throw error; // Re-throw the error after logging
    }
  },

  // Get a single event by slug
  async getEventBySlug(slug: string): Promise<Event | undefined> {
     console.log(`Fetching event by slug: ${slug}`);
     const query = 'SELECT * FROM events WHERE slug = $1';
     const values = [slug];

     try {
       const result = await pool.query(query, values);
       if (result.rows.length === 0) {
         return undefined; // Event not found
       }
       // Map database row to Event type
       const row = result.rows[0];
        return {
           ...row,
           tags: row.tags || [], // Ensure tags is an array
        };
     } catch (error) {
       console.error(`Error in getEventBySlug for slug ${slug}:`, error);
       throw error; // Re-throw the error after logging
     }
  },

  // Create a new event
  async createEvent(eventData: Partial<Event>): Promise<Event> {
    console.log('Creating new event:', eventData);
    
    // Construct the INSERT query. Ensure column names match your database schema.
    // Assume tags is TEXT[] in the database.
    const query = `
      INSERT INTO events (
        title, slug, date, time, location, description, excerpt, image, category, tags,
        organizer, speakers, registration_link, views, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *; // RETURNING * will return the inserted row
    `;

    // Prepare values array, mapping undefined/null to null for DB
    const values = [
      eventData.title || '',
      eventData.slug || `event-${Date.now()}`,
      eventData.date || null, // Use null if date is missing
      eventData.time || null,
      eventData.location || '',
      eventData.description || '',
      eventData.excerpt || '',
      eventData.image || '/placeholder.svg',
      eventData.category || 'Other',
      eventData.tags || [], // Ensure tags is an array
      eventData.organizer || null,
      eventData.speakers || null, // Assuming speakers is TEXT[] or similar
      eventData.registrationLink || null,
      eventData.views || 0,
      eventData.createdAt || new Date().toISOString(),
      eventData.updatedAt || new Date().toISOString(),
    ];
     // Ensure date is correctly formatted if needed by your DB (e.g., to a Date object if pg client requires it, but string often works)
     // If date is required as a Date object by pg:
     // values[2] = eventData.date ? new Date(eventData.date) : null;
     // Similarly for timestamps if needed as Date objects.

    try {
      const result = await pool.query(query, values);
      // The RETURNING * clause gives us the inserted row
      const newEvent = result.rows[0];
       // Map database row to Event type, handle tags
       return {
           ...newEvent,
           tags: newEvent.tags || [], // Ensure tags is an array
        };
    } catch (error) {
      console.error('Error in createEvent:', error);
      throw error; // Re-throw the error after logging
    }
  },

  // Get a single event by id
  async getEventById(id: number): Promise<Event | undefined> {
    console.log(`Fetching event by id: ${id}`);
    const query = 'SELECT * FROM events WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return undefined; // Event not found
      }
      // Map database row to Event type
      const row = result.rows[0];
      return {
        ...row,
        tags: row.tags || [], // Ensure tags is an array
      };
    } catch (error) {
      console.error(`Error in getEventById for id ${id}:`, error);
      throw error; // Re-throw the error after logging
    }
  },

  // Add other methods for updating, deleting events as needed
  // async updateEvent(id: number, eventData: Partial<Event>): Promise<Event | undefined> { ... }
  // async deleteEvent(id: number): Promise<boolean> { ... }

  // Increment view count for an event and return the new views value
  async incrementViews(id: number): Promise<number> {
    const query = 'UPDATE events SET views = COALESCE(views, 0) + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING views';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        throw new Error('Event not found');
      }
      return Number(result.rows[0].views) || 0;
    } catch (error) {
      console.error(`Error incrementing views for event ${id}:`, error);
      throw error;
    }
  },

}; 