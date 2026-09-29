/**
 * Legado del loader de Google Maps JS SDK.
 * El mapa migró a Leaflet + OpenStreetMap (sin API key), así que este módulo
 * ya no se usa. Se conserva el export para no romper imports externos.
 *
 * @returns {Promise<void>} Resuelve de inmediato.
 */
export function loadGoogleMaps() {
  return Promise.resolve();
}
