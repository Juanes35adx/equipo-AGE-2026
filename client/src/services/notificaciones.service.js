import { supabase } from "./supabase";
import { formatearFecha } from "./eventos.service";

// Ventana de las respuestas que se consideran recientes.
const DIAS_RESPUESTAS_RECIENTES = 14;

/**
 * Notificaciones del perfil (HU-27), armadas con datos que ya existen, sin tabla propia:
 * - las próximas actividades a las que el usuario está inscrito;
 * - las respuestas recientes que otros dejaron en sus publicaciones del foro.
 *
 * @returns {Promise<Array<{id: string, tipo: "actividad"|"respuesta", titulo: string, detalle: string, ruta: string, fecha: string}>>}
 *   Ordenadas de la más próxima / reciente a la más lejana.
 */
export async function getNotificaciones() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const [actividades, respuestas] = await Promise.all([
    proximasActividades(user.id),
    respuestasRecientes(user.id),
  ]);
  return [...actividades, ...respuestas];
}

async function proximasActividades(profileId) {
  const { data: inscripciones, error } = await supabase
    .from("inscripciones_evento")
    .select("evento_id")
    .eq("profile_id", profileId);
  if (error) throw new Error(error.message);
  if (!inscripciones?.length) return [];

  const { data: eventos, error: errorEventos } = await supabase
    .from("eventos_con_cupo")
    .select("evento_id, titulo, lugar, fecha_inicio")
    .in("evento_id", inscripciones.map((i) => i.evento_id))
    .gte("fecha_inicio", new Date().toISOString())
    .order("fecha_inicio");
  if (errorEventos) throw new Error(errorEventos.message);

  return (eventos ?? []).map((e) => ({
    id: `actividad-${e.evento_id}`,
    tipo: "actividad",
    titulo: `Estás inscrito a ${e.titulo}`,
    detalle: `${formatearFecha(e.fecha_inicio)} · ${e.lugar}`,
    ruta: "/actividades",
    fecha: e.fecha_inicio,
  }));
}

async function respuestasRecientes(profileId) {
  const desde = new Date(Date.now() - DIAS_RESPUESTAS_RECIENTES * 864e5).toISOString();
  const { data, error } = await supabase
    .from("respuesta_post")
    .select("respuesta_id, contenido, fecha, post!inner(titulo, id_usuario), profiles(full_name)")
    .eq("post.id_usuario", profileId)
    .neq("id_usuario", profileId)
    .gte("fecha", desde)
    .order("fecha", { ascending: false })
    .limit(5);
  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => ({
    id: `respuesta-${r.respuesta_id}`,
    tipo: "respuesta",
    titulo: `${r.profiles?.full_name ?? "Alguien"} respondió "${r.post?.titulo ?? "tu publicación"}"`,
    detalle: r.contenido.length > 90 ? `${r.contenido.slice(0, 90)}…` : r.contenido,
    ruta: "/foro",
    fecha: r.fecha,
  }));
}
