export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface TeamMember {
  id: number;
  team_id: number;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  achievements?: string[];
  social?: SocialLinks;
  created_at: Date;
  updated_at: Date;
}

export interface Advisor {
  id: number;
  name: string;
  role: string;
  organization?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Team {
  id: number;
  title: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TeamWithMembers extends Team {
  members: TeamMember[];
}

export interface ErrorResponse {
  error: string;
}

export type TeamsResponse = {
  teams: TeamWithMembers[];
} | ErrorResponse;

export type TeamResponse = {
  team: TeamWithMembers;
} | ErrorResponse;

export type TeamMemberResponse = {
  member: TeamMember;
} | ErrorResponse;

export type TeamMembersResponse = {
  members: TeamMember[];
} | ErrorResponse;

export type AdvisorsResponse = {
  advisors: Advisor[];
} | ErrorResponse; 