export interface Workspace {
  _id: string;
  userId: {
    _id: string;
    githubId: string;
    githubDisplayName: string;
    githubUsername: string;
    githubPicture: string;
    email: string | null;
    displayName: string;
    firstName: string;
    lastName: string;
    picture: string;
    isProfileComplete: boolean;
    level: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    plan: string;
    role: string;
  };
  name: string;
  description: string;
  language: {
    _id: string;
    name: string;
    icon: string;
    description: string;
    categories: string[];
    link: string;
    materials: Array<{
      title: string;
      content: string;
      codeExample: string;
      terminalCommands: string[];
      createdAt: string;
      _id: string;
    }>;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
