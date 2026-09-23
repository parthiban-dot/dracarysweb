export type HackathonEventType = 'GLOBAL' | 'COLLEGIATE' | 'INTERNAL' | 'SPONSORED';
export type HackathonResult = 'WINNER' | 'FINALIST' | 'PARTICIPANT' | 'SPECIAL_RECOGNITION';

export interface Hackathon {
  id: string;
  slug: string;
  name: string;
  organizer: string;
  date: string; // ISO or readable e.g., "March 2026"
  year: string;
  location: string;
  eventType: HackathonEventType;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  teamMembers: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  result: HackathonResult;
  award: string;
  media: string[];
  lessonsLearned: string[];
}
