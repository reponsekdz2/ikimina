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
  IKIMINA = 'IKIMINA',
  WALLET = 'WALLET',
  TRAINING = 'TRAINING',
  ENTREPRENEURSHIP = 'ENTREPRENEURSHIP',
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
  salary: number;
  description: string;
  postedDate: string;
  skillMatch: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  provider: string;
  duration: string;
  description: string;
  isCompleted: boolean;
  progress: number;
}

export interface IkiminaGroup {
  id: string;
  name: string;
  category: 'Business' | 'Youth' | 'Personal' | 'Agriculture';
  targetAmount: number;
  currentAmount: number;
  members: { name: string; avatarUrl: string }[];
}

export interface Loan {
  id: string;
  originalAmount: number;
  totalRepaid: number;
  status: 'Fully Repaid' | 'Settled';
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}