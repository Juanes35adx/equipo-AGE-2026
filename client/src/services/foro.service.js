import { supabase } from "./supabase";

export async function getPosts() {
  const { data, error } = await supabase
    .from("post")
    .select(`*, profiles(full_name)`)
    .order("fecha", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createPost(titulo, contenido) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("post")
    .insert({ titulo, contenido, id_usuario: user.id });
  if (error) throw new Error(error.message);
  return data;
}

export async function getRespuestas(postId) {
  const { data, error } = await supabase
    .from("respuesta_post")
    .select(`*, profiles(full_name)`)
    .eq("post_id", postId)
    .order("fecha", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function createRespuesta(postId, contenido) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("respuesta_post")
    .insert({ post_id: postId, contenido, id_usuario: user.id });
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePost(postId) {
  const { error } = await supabase
    .from("post")
    .delete()
    .eq("post_id", postId);
  if (error) throw new Error(error.message);
}

export async function deleteRespuesta(respuestaId) {
  const { error } = await supabase
    .from("respuesta_post")
    .delete()
    .eq("respuesta_id", respuestaId);
  if (error) throw new Error(error.message);
}