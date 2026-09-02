/**
 * Significado de cada color de pin en el mapa.
 * Debe coincidir con PIN_COLORS de components/atoms/Marker.jsx.
 */
export const PIN_LEYENDA = [
  { tipo: "bloque",   color: "#6f42c1", etiqueta: "Bloques y facultades" },
  { tipo: "comida",   color: "#fd7e14", etiqueta: "Comida y cafeterías" },
  { tipo: "porteria", color: "#0d6efd", etiqueta: "Porterías y entradas" },
];

/**
 * Distancia en metros entre dos coordenadas (fórmula de Haversine).
 * @param {{lat:number, lng:number}} a
 * @param {{lat:number, lng:number}} b
 * @returns {number} Distancia en metros.
 */
export function distanciaEnMetros(a, b) {
  const R = 6371000;
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

/**
 * Devuelve los bloques más cercanos a un punto, ordenados de menor a mayor distancia.
 * Excluye el propio punto y los lugares que no son bloques.
 *
 * @param {object} origen Punto de referencia, con `position` y `id`.
 * @param {Array} puntos Listado completo de marcadores.
 * @param {number} [cuantos=3] Cantidad máxima de bloques a devolver.
 * @returns {Array} Bloques con la propiedad extra `metros` (redondeada).
 */
export function bloquesCercanos(origen, puntos, cuantos = 3) {
  if (!origen?.position) return [];

  return puntos
    .filter((p) => p.id !== origen.id && String(p.type).toLowerCase() === "bloque")
    .map((p) => ({ ...p, metros: Math.round(distanciaEnMetros(origen.position, p.position)) }))
    .sort((a, b) => a.metros - b.metros)
    .slice(0, cuantos);
}
