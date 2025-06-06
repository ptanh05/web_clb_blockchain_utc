export type PartnerType = "academic" | "business" | "community" | "government" | "technology";
export type PartnerStatus = "active" | "inactive" | "pending";

export interface Partner {
  id: number;
  name: string;
  logo: string;
  type: PartnerType;
  description: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  achievements: string[];
  collaboration: string[];
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
}

// Types cho API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: string;
}

export interface PartnerResponse {
  data?: Partner;
  error?: string;
  details?: string;
}

export interface PartnersResponse {
  data?: Partner[];
  error?: string;
  details?: string;
}

// Helper functions để chuyển đổi giữa string và array
export function parseStringArray(str: string): string[] {
  if (!str) return [];
  return str.split(',').map(item => item.trim()).filter(Boolean);
}

export function stringifyArray(arr: string[]): string {
  if (!Array.isArray(arr)) return '';
  return arr.filter(Boolean).join(',');
} 