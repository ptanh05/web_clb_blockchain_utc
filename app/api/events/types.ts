// Define TypeScript types for Event data

export interface Event {
  id: number;
  title: string;
  slug: string; // Unique identifier for URL
  date: string; // e.g., 'YYYY-MM-DD'
  time?: string; // Optional time, e.g., 'HH:mm'
  location: string;
  description: string; // Full description
  excerpt: string; // Short description for list view
  image: string; // URL to event image
  category: string; // e.g., 'Workshop', 'Hackathon', 'Seminar'
  tags: string[]; // e.g., ['Blockchain', 'Web3', 'Education']
  organizer?: string; // Optional organizer
  speakers?: string[]; // Optional list of speakers
  registrationLink?: string; // Optional link to registration
  views: number; // Number of views
  createdAt: string; // Timestamp
  updatedAt: string; // Timestamp
}

export interface EventListResponse {
  data: Event[];
  pagination?: { // Optional pagination info
    total: number;
    page: number;
    limit: number;
  };
  error?: string; // Optional error message
  details?: string; // Optional error details
}

export interface EventResponse {
  data: Event | null; // Null if event not found
  error?: string; // Optional error message
  details?: string; // Optional error details
} 