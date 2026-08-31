const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const LIBRARIES = ["marker"];

let loadPromise = null;

/**
 * loadGoogleMaps
 * Injects the Google Maps JS SDK exactly once and returns a promise that
 * resolves when the global `google.maps` object is ready.
 */
export function loadGoogleMaps() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // Already loaded (e.g. HMR / double render)
    if (window.google?.maps) {
      resolve();
      return;
    }

    const callbackName = "__gmaps_init_cb__";
    window[callbackName] = () => {
      delete window[callbackName];
      resolve();
    };

    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js` +
      `?key=${GOOGLE_MAPS_API_KEY}` +
      `&libraries=${LIBRARIES.join(",")}` +
      `&v=beta` +
      `&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Google Maps SDK failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
