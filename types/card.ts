export type Card = {
  firstName: string;
  lastName: string;
  id?: string;
  userId?: string;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  role?: string;
  website?: string;
  imageUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  qrContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
