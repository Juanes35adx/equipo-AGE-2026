import { supabase } from "./supabase";

export async function getUbicaciones() {
  const { data, error } = await supabase
    .from("ubicaciones")
    .select("*");
  if (error) throw new Error(error.message);
  return data;
}