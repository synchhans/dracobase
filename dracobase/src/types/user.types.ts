export interface User {
  googleId?: string;
  githubId?: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName?: string;
  picture?: string;
  googleEmail?: string;
  githubUsername?: string;
  role: string;
  plan: string;
  isProfileComplete: boolean;
  level: string;
}
