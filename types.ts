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
  AUTH,
  DASHBOARD,
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