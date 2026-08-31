import { supabase } from "./supabase";
import { getSession } from "./auth.service";

export async function getProfile() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) throw new Error(authError?.message ?? "No authenticated user");

  const { error, data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, programa')
    .eq('profile_id', user.id)
    .single();

  if (error) throw new Error(error.message);

  return profile; // ✅ return the correctly named variable
}