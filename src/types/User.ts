export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active?: boolean;
  avatar: string;
  cloudinary_url: string;
  createdAt: string;
};
