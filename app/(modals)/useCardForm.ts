import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const cardSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  imageUrl: z.string().url("Must be a valid image URL").optional(),
});

export type CardFormData = z.infer<typeof cardSchema>;

export default function useCardForm() {
  return useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    mode: "onChange",
  });
}
