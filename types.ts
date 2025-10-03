export enum UserRole {
  SEEKER = 'Job Seeker',
  EMPLOYER = 'Employer',
}

export interface User {
  role: UserRole;
  name: string;
}

export enum Page {
  LANDING,
  DASHBOARD,
  JOBS,
  TRAINING,
  COMMUNITY,
  PROFILE,
}

export enum IkiminaCategory {
    BUSINESS = 'Business',
    YOUTH = 'Youth',
    PERSONAL = 'Personal',
    AGRICULTURE = 'Agriculture'
}

export interface Member {
    id: number;
    name: string;
    avatarUrl: string;
}

export interface Ikimina {
    id: number;
    name: string;
    category: IkiminaCategory;
    target: number;
    progress: number;
    members: Member[];
    frequency: 'weekly' | 'monthly';
}

export interface Job {
    id: number;
    title: string;
    company: string;
    salary: string;
    deadline: string;
    bookmarked: boolean;
}

export interface Course {
    id: number;
    title: string;
    instructor: string;
    duration: string;
    imageUrl: string;
}

export interface CommunityPost {
    id: number;
    author: string;
    avatarUrl: string;
    content: string;
    likes: number;
    comments: number;
}

export interface Badge {
    id: number;
    name: string;
    description: string;
    unlocked: boolean;
    icon: React.ReactElement;
}

// CV Builder Types
export interface WorkExperience {
    id: string;
    jobTitle: string;
    company: string;
    years: string;
    description: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    year: string;
}

export interface Skill {
    id: string;
    name: string;
}

export type CVSection = {
    id: 'workExperience' | 'education' | 'skills' | 'portfolio';
    title: string;
}
