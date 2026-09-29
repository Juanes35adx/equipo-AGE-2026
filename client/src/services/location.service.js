import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

/**
 * ensureLocationPermission
 * En Android nativo el permiso se pide en runtime; en web el navegador
 * muestra su propio prompt, así que no hay que pedir nada por adelantado.
 *
 * @returns {Promise<boolean>} true cuando se puede leer la posición.
 */
async function ensureLocationPermission() {
  if (!Capacitor.isNativePlatform()) return true;

  const current = await Geolocation.checkPermissions();
  if (current.location === "granted" || current.coarseLocation === "granted") return true;

  const requested = await Geolocation.requestPermissions({ permissions: ["location"] });
  return requested.location === "granted" || requested.coarseLocation === "granted";
}

/**
 * Traduce errores técnicos (geolocalización) a un mensaje claro en español
 * para el banner. El detalle técnico queda en consola.
 */
export function traducirErrorUbicacion(err) {
  const crudo = err?.message ?? String(err ?? "");
  const t = crudo.toLowerCase();
  if (t.includes("denied") || t.includes("denegado") || t.includes("permission") || t.includes("permiso")) {
    return "Permiso de ubicación denegado. Puedes seguir usando el mapa sin tu posición.";
  }
  if (t.includes("timeout") || t.includes("timed out") || t.includes("tiempo")) {
    return "Tardó demasiado en obtener tu ubicación. Inténtalo de nuevo cerca de una ventana o con el GPS activado.";
  }
  if (t.includes("unavailable") || t.includes("no disponible") || t.includes("position unavailable")) {
    return "Tu ubicación no está disponible ahora mismo. Puedes seguir usando el mapa sin tu posición.";
  }
  return "No pudimos obtener tu ubicación. Puedes seguir usando el mapa sin tu posición.";
}

/** Distancia en metros (Haversine) para filtrar fixes insignificantes. */
function distanciaMetros(a, b) {
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
 * getUserLocation (HU-08, primer fix) — agnóstico al mapa.
 * Lee la posición vía Capacitor Geolocation (en web delega en el navegador)
 * y la devuelve. El componente del mapa decide cómo pintarla (Leaflet).
 *
 * @param {Function} [onSuccess] - callback({ lat, lng, accuracy })
 * @param {Function} [onError]   - callback(mensajeAmable)
 * @returns {Promise<{lat,lng,accuracy}|null>}
 */
export async function getUserLocation(onSuccess, onError) {
  // Compatibilidad: antes recibía (AdvancedMarkerElement, map, onSuccess, onError).
  // Si el primer argumento es función y hay 3+ args, se reasigna.
  if (typeof onSuccess !== "function" && typeof onError === "undefined" && arguments.length >= 3) {
    const args = [...arguments];
    onSuccess = args[2];
    onError = args[3];
  }
  try {
    const allowed = await ensureLocationPermission();
    if (!allowed) {
      const message = "Permiso de ubicación denegado. Puedes seguir usando el mapa sin tu posición.";
      console.warn("FacilityMap:", message);
      onError?.(message);
      return null;
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10_000,
    });

    const userPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };

    onSuccess?.(userPos);
    return userPos;
  } catch (err) {
    console.warn("FacilityMap: geolocation error -", err?.message ?? err);
    onError?.(traducirErrorUbicacion(err));
    return null;
  }
}

/**
 * watchUserLocation (HU-08, tiempo real) — agnóstico al mapa.
 * Emite cada fix vía onUpdate; filtra lecturas imprecisas (accuracy > 100m)
 * y saltos menores a 5m para no hacer temblar el pin.
 *
 * @param {object} [opts]
 * @param {Function} [opts.onUpdate] - callback({lat,lng,accuracy})
 * @param {Function} [opts.onError]  - callback(mensajeAmable)
 * @returns {Promise<Function>} cleanup para detener el watch
 */
export async function watchUserLocation(opts = {}) {
  // Compatibilidad con la firma anterior
  // watchUserLocation(AdvancedMarkerElement, map, {onUpdate, onError, ...})
  if (opts == null || typeof opts === "function" || arguments.length > 1) {
    const args = [...arguments];
    const last = args[args.length - 1];
    if (last && typeof last === "object") opts = last;
    else opts = {};
  }
  const { onUpdate, onError } = opts;

  const allowed = await ensureLocationPermission();
  if (!allowed) {
    const message = "Permiso de ubicación denegado. Puedes seguir usando el mapa sin tu posición.";
    onError?.(message);
    return async () => {};
  }

  let last = null;
  let watchId = null;

  const emitir = (lat, lng, accuracy) => {
    if (accuracy != null && accuracy > 100) return;
    const next = { lat, lng, accuracy };
    if (last && distanciaMetros(last, next) < 5) return;
    last = next;
    onUpdate?.(next);
  };

  try {
    watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5000 },
      (position, err) => {
        if (err) {
          console.warn("FacilityMap: watch error -", err?.message ?? err);
          onError?.(traducirErrorUbicacion(err));
          return;
        }
        if (!position?.coords) return;
        emitir(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
      }
    );
  } catch (err) {
    console.warn("FacilityMap: no se pudo iniciar el seguimiento -", err?.message ?? err);
    onError?.(traducirErrorUbicacion(err));
    return async () => {};
  }

  return async () => {
    try {
      if (watchId != null) await Geolocation.clearWatch({ id: watchId });
    } catch {
      // ignorar: el mapa se está desmontando de todos modos
    }
  };
}
