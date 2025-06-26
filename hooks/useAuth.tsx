import { AuthService } from "@/services/authService";
import { supabase } from "@/services/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const authService = AuthService(supabase);

export const useAnonymousAuth = () => {
  useQuery({
    queryKey: ["auth", "session"],
    queryFn: authService.signInAnonymously,
    staleTime: Infinity,
    retry: false,
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });
};
