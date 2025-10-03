export enum UserRole {
  SEEKER = 'Job Seeker',
  EMPLOYER = 'Employer',
  TRAINER = 'Trainer',
  FINANCIAL_PARTNER = 'Financial Partner',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export enum Page {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  JOBS = 'JOBS',
  TRAINING = 'TRAINING',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE',
}

export interface CommunityPost {
    id: number;
    author: string;
    avatarUrl: string;
    content: string;
    likes: number;
    comments: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  description: string;
  postedDate: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  provider: string;
  duration: string;
  description: string;
  isCompleted: boolean;
}
