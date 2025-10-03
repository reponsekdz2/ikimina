export enum UserRole {
  SEEKER = 'Job Seeker',
  EMPLOYER = 'Employer',
  FINANCIAL_PARTNER = 'Financial Partner',
  TRAINER = 'Trainer',
}

export interface User {
  role: UserRole;
  name: string;
}

export enum Page {
  LANDING,
  AUTH,
  DASHBOARD,
  JOBS,
  SAVINGS,
  TRAINING,
  COMMUNITY,
  PROFILE,
  CV_BUILDER,
  PITCH_ZONE,
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface CommunityEvent {
    id: number;
    title: string;
    date: string;
    type: 'Webinar' | 'Networking' | 'Training';
}
