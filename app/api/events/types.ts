// Define TypeScript types for Event data

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface EventSpeaker {
  name: string;
  role?: string;
  image?: string;
  bio?: string;
}

// Consolidated and corrected Event interface
export interface Event {
  id: number;
  slug: string; // Unique identifier for URL
  title: string;
  date: string; // e.g., 'YYYY-MM-DD'
  time?: string; // Optional time, e.g., 'HH:mm'
  location?: string; // Made optional based on usage
  description?: string; // Made optional based on usage
  excerpt?: string; // Optional short description
  image?: string; // Optional image URL
  category: string; // e.g., 'Workshop', 'Hackathon', 'Seminar'
  tags?: string[]; // Optional array of tags
  content?: string; // Optional full content
  views?: number; // Optional number of views
  likes?: number; // Optional number of likes
  comments?: number; // Optional number of comments
  status?: string; // Optional status
  schedule?: EventScheduleItem[]; // Optional array of schedule items
  speakers?: EventSpeaker[]; // Optional array of speakers
  registrationLink?: string; // Optional link to registration
  organizer?: string; // Optional organizer name
  createdAt?: string; // Optional timestamp
  updatedAt?: string; // Optional timestamp
}

export interface EventListResponse {
  data?: Event[]; // Data is optional
  pagination?: { // Optional pagination info
    total: number;
    page: number;
    limit: number;
  };
  error?: string; // Optional error message
  details?: string; // Optional error details
}

export interface EventResponse {
  data?: Event | null; // Data is optional and can be null
  error?: string; // Optional error message
  details?: string; // Optional error details
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

// Helper functions for string/array conversion (kept if used elsewhere, otherwise remove)
// export function parseStringArray(str: string | null | undefined): string[] {
//   if (!str) return [];
//   return str.split(',').map(item => item.trim()).filter(Boolean);
// }

// export function stringifyArray(arr: string[] | null | undefined): string {
//   if (!Array.isArray(arr)) return '';
//   return arr.filter(Boolean).join(',');
// } 