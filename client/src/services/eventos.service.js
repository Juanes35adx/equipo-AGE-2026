import { supabase } from "./supabase";
// Foto general de estudiantes (la misma que usan las noticias sin imagen).
import imagenActividadPorDefecto from "../assets/students-upb.png";

/**
 * Imagen de la tarjeta: la propia de la actividad; si no tiene, la foto del lugar del
 * campus donde se hace; y si tampoco hay, una foto general de estudiantes UPB.
 * @param {object} evento Fila de eventos_con_cupo.
 * @returns {string} URL de la imagen.
 */
export function imagenDeEvento(evento) {
  return evento?.imagen_url || evento?.imagen_lugar || imagenActividadPorDefecto;
}

/** Imagen general, para cuando la imagen de la actividad no carga. */
export const IMAGEN_ACTIVIDAD_POR_DEFECTO = imagenActividadPorDefecto;

/** La base rechaza inscripciones inválidas con un código; aquí se pasa a español. */
const MENSAJES_DE_LA_BASE = {
  CUPO_LLENO: "Este evento ya alcanzó su cupo máximo",
  EVENTO_PASADO: "Esta actividad ya pasó; no es posible inscribirse",
  EVENTO_NO_DISPONIBLE: "Esta actividad ya no está disponible",
};

/**
 * Obtiene los eventos activos que todavía no han empezado, junto con el cupo
 * disponible y si el usuario autenticado ya está inscrito en cada uno.
 * @returns {Promise<Array>} Eventos ordenados por fecha, con `inscrito` y `lleno`.
 */
export async function getEventos() {
  const { data: eventos, error } = await supabase
    .from("eventos_con_cupo")
    .select("*")
    // Las actividades que ya pasaron no se muestran como disponibles (HU-24).
    .gte("fecha_inicio", new Date().toISOString())
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
    // P0001 = la validación de la base (cupo lleno, evento pasado o inactivo)
    const conocido = Object.keys(MENSAJES_DE_LA_BASE).find((codigo) => error.message?.includes(codigo));
    if (conocido) throw new Error(MENSAJES_DE_LA_BASE[conocido]);
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
