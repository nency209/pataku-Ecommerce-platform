export interface User {

    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    avatar?: string;
  
 
}


export interface UserState {
  user: User | null;
  loading: boolean;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface ContactFormValues
{
  name: string;
  email: string;
  subject: string;
  message: string;
}