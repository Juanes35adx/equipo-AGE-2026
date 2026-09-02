import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import { createUserMarker } from "../components/atoms/Marker";

/**
 * ensureLocationPermission
 * On native Android the permission must be requested at runtime; declaring it in
 * AndroidManifest.xml is not enough since Android 6. On the web the browser shows
 * its own prompt, so nothing has to be requested up front.
 *
 * @returns {Promise<boolean>} true when the app may read the position.
 */
async function ensureLocationPermission() {
  if (!Capacitor.isNativePlatform()) return true;

  const current = await Geolocation.checkPermissions();
  if (current.location === "granted" || current.coarseLocation === "granted") return true;

  const requested = await Geolocation.requestPermissions({ permissions: ["location"] });
  return requested.location === "granted" || requested.coarseLocation === "granted";
}

/**
 * getUserLocation
 * Reads the user position through the Capacitor Geolocation plugin (which falls
 * back to the browser API on the web) and drops an AdvancedMarkerElement on the
 * map at that position.
 *
 * @param {Function} AdvancedMarkerElement - google.maps.marker.AdvancedMarkerElement class
 * @param {google.maps.Map} map            - the active Map instance
 * @param {Function} [onSuccess]           - callback({ lat, lng, accuracy }) after placement
 * @param {Function} [onError]             - callback(message) when the position cannot be read
 */
export async function getUserLocation(AdvancedMarkerElement, map, onSuccess, onError) {
  try {
    const allowed = await ensureLocationPermission();
    if (!allowed) {
      const message = "Permiso de ubicacion denegado por el usuario.";
      console.warn("FacilityMap:", message);
      onError?.(message);
      return;
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10_000,
    });

    const userPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      // Margen de error en metros. Sirve para decidir si una lectura es fiable
      // antes de validar que el usuario llego a un punto del campus.
      accuracy: position.coords.accuracy,
    };

    new AdvancedMarkerElement({
      map,
      position: { lat: userPos.lat, lng: userPos.lng },
      title:    "Your Location",
      content:  createUserMarker(),
    });

    onSuccess?.(userPos);
  } catch (err) {
    console.warn("FacilityMap: geolocation error -", err?.message ?? err);
    onError?.(err?.message ?? String(err));
  }
}
