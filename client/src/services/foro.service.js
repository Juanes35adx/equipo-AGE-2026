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

/**
 * Crea una respuesta en una publicación.
 * @param {string} postId Publicación a la que pertenece.
 * @param {string} contenido Texto de la respuesta.
 * @param {string|null} [respuestaPadreId] Respuesta a la que contesta; null si va al post.
 */
export async function createRespuesta(postId, contenido, respuestaPadreId = null) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("respuesta_post")
    .insert({
      post_id: postId,
      contenido,
      id_usuario: user.id,
      respuesta_padre_id: respuestaPadreId,
    });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Organiza una lista plana de respuestas en árbol, colgando cada una de su padre.
 * @param {Array} respuestas Respuestas tal como vienen de la base de datos.
 * @returns {Array} Respuestas de primer nivel, cada una con `hijas`.
 */
export function anidarRespuestas(respuestas) {
  const porId = new Map();
  respuestas.forEach((r) => porId.set(r.respuesta_id, { ...r, hijas: [] }));

  const raiz = [];
  for (const r of porId.values()) {
    const padre = r.respuesta_padre_id ? porId.get(r.respuesta_padre_id) : null;
    if (padre) padre.hijas.push(r);
    else raiz.push(r);
  }
  return raiz;
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

/**
 * Obtiene los "me gusta" del foro: cuántos tiene cada publicación y cuáles
 * marcó el usuario autenticado.
 * @returns {Promise<{conteo: Object, mios: Object}>}
 */
export async function getLikes() {
  const { data, error } = await supabase
    .from("likes_post")
    .select("post_id, profile_id");
  if (error) throw new Error(error.message);

  const { data: { user } } = await supabase.auth.getUser();

  const conteo = {}, mios = {};
  for (const l of data ?? []) {
    conteo[l.post_id] = (conteo[l.post_id] ?? 0) + 1;
    if (user && l.profile_id === user.id) mios[l.post_id] = true;
  }
  return { conteo, mios };
}

/**
 * Alterna el "me gusta" del usuario sobre una publicación.
 * @param {string} postId Publicación afectada.
 * @param {boolean} yaLeGusta Estado actual, para saber si hay que quitar o poner.
 */
export async function toggleLike(postId, yaLeGusta) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión para reaccionar");

  if (yaLeGusta) {
    const { error } = await supabase
      .from("likes_post")
      .delete()
      .eq("post_id", postId)
      .eq("profile_id", user.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("likes_post")
      .insert({ post_id: postId, profile_id: user.id });
    if (error) throw new Error(error.message);
  }
}