/* Gộp các định nghĩa kiểu từ app/types/partner.ts vào đây để tránh thừa file types riêng */

import { PartnerType, PartnerStatus, Partner as PartnerFromTypes, PartnerResponse, PartnersResponse, parseStringArray } from "./types";

// Database types
export interface PartnerDB {
  id: number;
  name: string;
  logo: string;
  type: PartnerType;
  description: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  achievements: string; // Stored as comma-separated string in DB
  collaboration: string; // Stored as comma-separated string in DB
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
}

// Re-export types from types.ts
export type { PartnerType, PartnerStatus };
export type Partner = PartnerFromTypes;

export interface PartnerFilter {
  type: PartnerType | "all";
  searchQuery: string;
}

export interface PartnerModalProps {
  partner: Partner | null;
  onClose: () => void;
}

export interface PartnerCardProps {
  partner: Partner;
  onSelect: (partner: Partner) => void;
}

export interface PartnerFiltersProps {
  selectedType: PartnerFilter["type"];
  searchQuery: string;
  onTypeChange: (type: PartnerFilter["type"]) => void;
  onSearchChange: (query: string) => void;
}

export interface PartnerHeroProps {
  title: string;
  description: string;
}

export interface PartnerCTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

/* Kết thúc phần gộp types */

// Helper function to convert DB partner to frontend partner
const convertDBPartnerToPartner = (dbPartner: PartnerDB): Partner => ({
  ...dbPartner,
  achievements: parseStringArray(dbPartner.achievements),
  collaboration: parseStringArray(dbPartner.collaboration)
});

const API_URL = "/api/partners";

export class PartnersService {
  // Lấy tất cả partners
  static async getAllPartners(): Promise<Partner[]> {
    try {
      const response = await fetch('/api/partners');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to fetch partners');
      }
      const result: PartnersResponse = await response.json();
      // The API already returns Partner objects, no need to convert
      return result.data || [];
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  }

  // Lấy partner theo ID
  static async getPartnerById(id: number): Promise<Partner | null> {
    try {
      const response = await fetch(`/api/partners/${id}`);
      if (!response.ok) throw new Error('Failed to fetch partner');
      const result: PartnerResponse = await response.json();
      // The API already returns a Partner object, no need to convert
      return result.data || null;
    } catch (error) {
      console.error('Error fetching partner:', error);
      throw error;
    }
  }

  // Lọc partners theo type và search query
  static async filterPartners(type: PartnerType | "all", search: string): Promise<Partner[]> {
    console.log('filterPartners called with:', { type, search });
    
    try {
      const queryParams = new URLSearchParams();
      if (type !== "all") {
        console.log('Adding type filter:', type);
        queryParams.append("type", type);
      }
      if (search) {
        console.log('Adding search filter:', search);
        queryParams.append("search", search);
      }

      const url = `${API_URL}?${queryParams.toString()}`;
      console.log('Fetching from URL:', url);

      const response = await fetch(url);
      console.log('API Response status:', response.status);
      
      const result = await response.json();
      console.log('API Response data:', result);

      if (!response.ok) {
        console.error('API Error:', result);
        throw new Error(result.details || result.error || "Failed to fetch partners");
      }

      if (!result.data) {
        console.log('No data returned from API');
        return [];
      }

      // The API already returns Partner objects, no need to convert
      return result.data;
    } catch (error) {
      console.error("Error in filterPartners:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }

  // Thêm partner mới
  static async addPartner(partner: Omit<Partner, "id" | "created_at" | "updated_at">): Promise<Partner> {
    try {
      const dbPartner = {
        ...partner,
        achievements: partner.achievements.join(','),
        collaboration: partner.collaboration.join(',')
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbPartner),
      });

      const result: PartnerResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add partner");
      }

      if (!result.data) {
        throw new Error("No data returned from server");
      }

      // The API already returns a Partner object, no need to convert
      return result.data;
    } catch (error) {
      console.error("Error in addPartner:", error);
      throw error;
    }
  }

  // Cập nhật partner
  static async updatePartner(id: number, partner: Partial<Partner>): Promise<Partner> {
    try {
      const dbPartner = partner.achievements || partner.collaboration ? {
        ...partner,
        achievements: partner.achievements?.join(','),
        collaboration: partner.collaboration?.join(',')
      } : partner;

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbPartner),
      });

      const result: PartnerResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update partner");
      }

      if (!result.data) {
        throw new Error("No data returned from server");
      }

      // The API already returns a Partner object, no need to convert
      return result.data;
    } catch (error) {
      console.error("Error in updatePartner:", error);
      throw error;
    }
  }

  // Xóa partner
  static async deletePartner(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete partner");
      }
    } catch (error) {
      console.error("Error in deletePartner:", error);
      throw error;
    }
  }
} 