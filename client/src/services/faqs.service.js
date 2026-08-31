import { supabase } from "./supabase";

export async function getFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("orden");
  if (error) throw new Error(error.message);
  return data;
}