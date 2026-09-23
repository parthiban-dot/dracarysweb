export type ProjectStatus = 'DELIVERED' | 'INTERNAL' | 'OPEN SOURCE' | 'IN PROGRESS';
export type ClientVisibility = 'PUBLIC' | 'ANONYMIZED' | 'PRIVATE';

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  type: string; // e.g., "Web App", "Mobile App", "Infrastructure"
  status: ProjectStatus;
  year: string;
  problem: string;
  solution: string;
  features: string[];
  technologyStack: string[];
  coverImage: string;
  screenshots: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  teamMembers: string[]; // member IDs or names
  outcome: string;
  clientVisibility: ClientVisibility;
  publishedAt: string;
}
