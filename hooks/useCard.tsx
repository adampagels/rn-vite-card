import { CardService } from "@/services/cardService";
import { supabase } from "@/services/supabase";
import type { Card } from "@/types/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const cardService = CardService(supabase);

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (card: Card) => cardService.createCard(card),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({
      localImagePath,
      userId,
    }: {
      localImagePath: string;
      userId: string;
    }) => cardService.uploadImage(localImagePath, userId),
  });
};
