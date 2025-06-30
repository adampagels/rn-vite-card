import { Card } from "@/types/card";

export const convertToVCard = (card: Card): string => {
  const {
    firstName,
    lastName,
    company,
    phone,
    email,
    role,
    website,
    socialLinks,
  } = card;

  let vcard = "BEGIN:VCARD\n";
  vcard += "VERSION:3.0\n";

  if (card.imageUrl) {
    const fullImageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/card-images/${card.imageUrl}`;
    vcard += `PHOTO;TYPE=JPEG:${fullImageUrl}\n`;
  }

  vcard += `FN:${firstName} ${lastName}\n`;

  vcard += `N:${lastName};${firstName};;;\n`;

  if (company) {
    vcard += `ORG:${company}\n`;
  }

  if (role) {
    vcard += `TITLE:${role}\n`;
  }

  if (phone) {
    vcard += `TEL;TYPE=CELL:${phone}\n`;
  }

  if (email) {
    vcard += `EMAIL;TYPE=INTERNET:${email}\n`;
  }

  if (website) {
    vcard += `URL:${website}\n`;
  }

  if (socialLinks && socialLinks.length > 0) {
    socialLinks.forEach((link) => {
      vcard += `URL;TYPE=${link.platform.toUpperCase()}:${link.url}\n`;
    });
  }

  vcard += "END:VCARD";

  return vcard;
};
