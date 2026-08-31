import { supabase } from "./supabase";

/**
 * Obtiene los mentores activos ordenados por materia y nombre.
 * @returns {Promise<Array>} Listado de mentores disponibles.
 */
export async function getMentores() {
  const { data, error } = await supabase
    .from("mentores")
    .select("mentor_id, nombre, email_institucional, materia, tipo_tutor, descripcion")
    .eq("activo", true)
    .order("materia")
    .order("nombre");
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Extrae las materias únicas de un listado de mentores, para alimentar el filtro.
 * @param {Array} mentores Listado de mentores.
 * @returns {Array<string>} Materias sin repetir, en orden alfabético.
 */
export function getMaterias(mentores) {
  return [...new Set(mentores.map((m) => m.materia))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

/**
 * Construye el deep link para abrir un chat privado en Microsoft Teams.
 * @param {string} email Correo institucional del mentor.
 * @returns {string} URL del chat de Teams.
 */
export function construirEnlaceTeams(email) {
  return `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
}

/**
 * Registra el evento "contacto iniciado" para poder medir el uso de la mentoría.
 * No interrumpe el flujo del usuario si falla: el contacto debe abrirse igual.
 * @param {string} mentorId Identificador del mentor contactado.
 * @param {"teams"|"correo"} canal Canal por el que se inició el contacto.
 */
export async function registrarContacto(mentorId, canal = "teams") {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("contactos_mentor").insert({
      mentor_id: mentorId,
      profile_id: user?.id ?? null,
      canal,
    });
  } catch (error) {
    // La métrica es secundaria: si falla, se registra en consola y se continúa.
    console.error("No se pudo registrar el contacto con el mentor:", error);
  }
}
