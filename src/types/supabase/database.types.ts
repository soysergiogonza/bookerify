export type Database = {
  public: {
    Tables: {
      telegram_messages: {
        Row: {
          id: number;
          chat_id: string;
          text: string;
          from_user: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          chat_id: string;
          text: string;
          from_user: string;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          chat_id?: string;
          text?: string;
          from_user?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
    };
  };
};
