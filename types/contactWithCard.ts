import { Card } from "./card";

export type ContactWithCard = {
  id: string;
  userId: string;
  scannedAt: string;
  cards: Card;
};
