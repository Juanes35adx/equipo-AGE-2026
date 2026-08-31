import { supabase } from "./supabase";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function register({ email, password, fullName, role, programa, semestre }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);

  const { error: profileError } = await supabase.from("profiles").insert({
  profile_id: data.user.id,
  full_name: fullName,
  email,
  role,
  programa,
  semestre,
});

  if (profileError) throw new Error(profileError.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function isAuthenticated() {
  return !!supabase.auth.getUser();
}