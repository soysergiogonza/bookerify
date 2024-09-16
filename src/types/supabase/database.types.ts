export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
        };
        Update: {
          id?: string;
          name?: string;
          // email?: string;
        };
      };
    };
  };
};
