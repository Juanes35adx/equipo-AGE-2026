import { supabase } from "./supabase";

export async function getProfesores() {
  const { data, error } = await supabase
    .from("profesores")
    .select("*")
    .order("nombre");
  if (error) throw new Error(error.message);
  return data;
}