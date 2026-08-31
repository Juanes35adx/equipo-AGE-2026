import { supabase } from "./supabase";

/**
 * Obtiene los eventos activos junto con el cupo disponible y si el usuario
 * autenticado ya está inscrito en cada uno.
 * @returns {Promise<Array>} Eventos ordenados por fecha, con `inscrito` y `lleno`.
 */
export async function getEventos() {
  const { data: eventos, error } = await supabase
    .from("eventos_con_cupo")
    .select("*")
    .order("fecha_inicio");
  if (error) throw new Error(error.message);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let inscritos = [];
  if (user) {
    const { data } = await supabase
      .from("inscripciones_evento")
      .select("evento_id")
      .eq("profile_id", user.id);
    inscritos = (data ?? []).map((i) => i.evento_id);
  }

  return eventos.map((e) => ({
    ...e,
    inscrito: inscritos.includes(e.evento_id),
    lleno: e.cupos_disponibles !== null && e.cupos_disponibles === 0,
  }));
}

/**
 * Inscribe al usuario autenticado en un evento.
 * @param {string} eventoId Identificador del evento.
 * @throws {Error} Si no hay sesión, si el cupo está lleno o si ya estaba inscrito.
 */
export async function inscribirse(eventoId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión para inscribirte");

  const { error } = await supabase
    .from("inscripciones_evento")
    .insert({ evento_id: eventoId, profile_id: user.id });

  if (error) {
    // 23505 = violación de unique: el usuario ya estaba inscrito
    if (error.code === "23505") throw new Error("Ya estás inscrito en este evento");
    throw new Error(error.message);
  }
}

/**
 * Cancela la inscripción del usuario autenticado en un evento.
 * @param {string} eventoId Identificador del evento.
 */
export async function cancelarInscripcion(eventoId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión");

  const { error } = await supabase
    .from("inscripciones_evento")
    .delete()
    .eq("evento_id", eventoId)
    .eq("profile_id", user.id);

  if (error) throw new Error(error.message);
}

/**
 * Formatea la fecha de un evento en español, para mostrarla en la tarjeta.
 * @param {string} fechaIso Fecha en formato ISO.
 * @returns {string} Ejemplo: "sábado, 5 de septiembre · 8:00 a. m."
 */
export function formatearFecha(fechaIso) {
  const fecha = new Date(fechaIso);
  const dia = fecha.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const hora = fecha.toLocaleTimeString("es-CO", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dia} · ${hora}`;
}
