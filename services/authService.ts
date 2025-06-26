import { SupabaseClient } from "@supabase/supabase-js";

export const AuthService = (supabase: SupabaseClient) => ({
  async signInAnonymously() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return session;

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.session;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
});
