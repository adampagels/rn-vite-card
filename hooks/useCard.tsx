import { CardService } from "@/services/cardService";
import { supabase } from "@/services/supabase";
import type { Card } from "@/types/card";
import { useMutation, useQuery } from "@tanstack/react-query";

const cardService = CardService(supabase);

export const useUploadCardWithImage = () => {
  return useMutation({
    mutationFn: ({
      card,
      localImagePath,
      userId,
    }: {
      card: Card;
      localImagePath: string;
      userId: string;
    }) => cardService.createCardWithImage(card, localImagePath, userId),
  });
};

export const useFetchCards = (userId: string) =>
  useQuery({
    queryKey: ["cards", userId],
    queryFn: () => cardService.fetchCardsByUser(userId),
    enabled: Boolean(userId),
  });
