export interface User {
  id: string;
  email: string;
  name: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  aud: string;
} 