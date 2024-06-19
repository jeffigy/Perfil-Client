export type User = {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  active?: boolean;
};
