export type Card = {
  firstName: string;
  lastName: string;
  id: string;
  user_id: string;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  qrContent?: string;
  created_at?: Date;
  updated_at?: Date;
};
