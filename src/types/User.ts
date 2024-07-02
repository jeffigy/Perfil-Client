export type User = {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active?: boolean;
  createdAt: string;
};
