export interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UpdateUserInput {
  id: number;
  name: string;
  email: string;
}