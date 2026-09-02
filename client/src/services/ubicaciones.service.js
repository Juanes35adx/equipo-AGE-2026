import { supabase } from "./supabase";

/**
 * Obtiene las ubicaciones activas del campus y las devuelve con la forma que
 * espera el mapa. Reemplaza al antiguo archivo estático data/markersList.js,
 * que era una segunda fuente de verdad en paralelo a esta tabla.
 *
 * @returns {Promise<Array>} Puntos con id, name, position, type, icon, description e image.
 */
export async function getUbicaciones() {
  const { data, error } = await supabase
    .from("ubicaciones")
    .select("ubicacion_id, codigo, nombre, descripcion, tipo, edificio, piso, lat, lng, imagen_url, icono")
    .eq("activo", true)
    .order("nombre");
  if (error) throw new Error(error.message);

  return (data ?? []).map(aPunto);
}

/**
 * Convierte una fila de la tabla en el objeto que consumen el mapa y sus marcadores.
 * @param {object} u Fila de ubicaciones.
 */
export function aPunto(u) {
  return {
    id:          u.ubicacion_id,
    codigo:      u.codigo,
    name:        u.nombre,
    position:    { lat: Number(u.lat), lng: Number(u.lng) },
    type:        u.tipo,
    icon:        u.icono,
    description: u.descripcion,
    image:       u.imagen_url,
    edificio:    u.edificio,
    piso:        u.piso,
  };
}
