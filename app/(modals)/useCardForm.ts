import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const cardSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  image_url: z.string().url("Must be a valid image URL").optional(),
});

export type CardFormData = z.infer<typeof cardSchema>;

export default function useCardForm() {
  return useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    mode: "onChange",
  });
}
