export interface Pages {
 name: string;
 url: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  second_lastname: string;
  email: string;
  role_name: string;
  created_at: string;
  is_verified: boolean;
}
