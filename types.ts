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
