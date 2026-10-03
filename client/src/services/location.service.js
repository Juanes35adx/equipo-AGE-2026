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

/** Sistema operativo del computador, para dar la ruta correcta de configuración. */
function sistemaDelEquipo() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (/Windows/i.test(ua)) return "windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "mac";
  return "otro";
}

/** Estado del permiso de ubicación en el navegador: "granted", "denied", "prompt" o null. */
async function estadoPermisoNavegador() {
  try {
    const p = await navigator.permissions?.query({ name: "geolocation" });
    return p?.state ?? null;
  } catch {
    return null;
  }
}

/**
 * Explica por qué no se pudo obtener la ubicación y qué tiene que hacer el usuario.
 * El navegador devuelve un código (1 permiso, 2 no disponible, 3 tiempo agotado); con
 * ese código, el estado del permiso y el tipo de dirección se distingue la causa real.
 *
 * @param {object|string} err Error del navegador o de Capacitor.
 * @returns {Promise<{titulo: string, pasos: string[], detalle: string}>}
 */
export async function diagnosticarErrorUbicacion(err) {
  const mensaje = String(err?.message ?? err ?? "");
  const t = mensaje.toLowerCase();
  const codigo = err?.code;
  const detalle = `${codigo != null ? `código ${codigo}: ` : ""}${mensaje || "sin mensaje"}`;
  const esPermiso = codigo === 1 || t.includes("denied") || t.includes("permission");

  // ── App de Android (Capacitor) ──────────────────────────────────────
  if (Capacitor.isNativePlatform()) {
    if (t.includes("location services") || t.includes("not enabled") || t.includes("disabled")) {
      return {
        titulo: "La ubicación del celular está apagada",
        pasos: ["Activa la ubicación (GPS) desde el panel rápido del celular.", "Vuelve a AGE y pulsa Reintentar."],
        detalle,
      };
    }
    if (esPermiso) {
      return {
        titulo: "AGE no tiene permiso para usar tu ubicación",
        pasos: [
          "Abre Ajustes → Aplicaciones → AGE → Permisos → Ubicación.",
          "Elige \"Permitir solo con la app en uso\".",
          "Vuelve a AGE y pulsa Reintentar.",
        ],
        detalle,
      };
    }
  }

  // ── Navegador ───────────────────────────────────────────────────────
  if (typeof window !== "undefined" && !window.isSecureContext) {
    return {
      titulo: "La ubicación no funciona en esta dirección",
      pasos: [
        `Abriste la app desde ${window.location.origin}, que no es una dirección segura, y el navegador bloquea la ubicación ahí.`,
        "En este computador, ábrela desde http://localhost con el mismo puerto; en otro equipo o celular, usa una dirección https.",
      ],
      detalle,
    };
  }

  if (typeof navigator !== "undefined" && !navigator.geolocation) {
    return {
      titulo: "Este navegador no permite usar la ubicación",
      pasos: ["Abre AGE en Chrome, Edge o Firefox actualizados."],
      detalle,
    };
  }

  if (esPermiso) {
    const estado = await estadoPermisoNavegador();
    if (estado === "denied") {
      return {
        titulo: "El navegador tiene bloqueada la ubicación para este sitio",
        pasos: [
          "Haz clic en el ícono que está a la izquierda de la dirección de la página (candado o controles del sitio).",
          "En \"Ubicación\", elige \"Permitir\".",
          "Recarga la página y pulsa Reintentar.",
        ],
        detalle,
      };
    }
    if (estado === "granted") {
      const so = sistemaDelEquipo();
      return {
        titulo: "El navegador tiene permiso, pero el sistema no le entrega la ubicación",
        pasos:
          so === "windows"
            ? [
                "Abre Configuración → Privacidad y seguridad → Ubicación.",
                "Activa \"Servicios de ubicación\" y \"Permitir que las aplicaciones de escritorio accedan a la ubicación\".",
                "Pulsa Reintentar.",
              ]
            : so === "mac"
              ? ["Abre Ajustes del Sistema → Privacidad y seguridad → Localización.", "Activa la localización para tu navegador.", "Pulsa Reintentar."]
              : ["Revisa que la ubicación del sistema esté activada y que tu navegador tenga permiso.", "Pulsa Reintentar."],
        detalle,
      };
    }
    return {
      titulo: "No se aceptó el permiso de ubicación",
      pasos: [
        "Pulsa Reintentar y, en la ventana que abre el navegador, elige \"Permitir\".",
        "Si la ventana no aparece, haz clic en el ícono a la izquierda de la dirección y permite la ubicación.",
      ],
      detalle,
    };
  }

  if (codigo === 2 || t.includes("unavailable")) {
    const so = sistemaDelEquipo();
    return {
      titulo: "No se pudo calcular tu ubicación",
      pasos: [
        "Revisa que el WiFi esté encendido: un computador calcula su ubicación con las redes WiFi cercanas, aunque no esté conectado a ellas.",
        so === "windows"
          ? "Revisa que esté activada en Configuración → Privacidad y seguridad → Ubicación."
          : "Revisa que la ubicación del sistema esté activada.",
        "Pulsa Reintentar.",
      ],
      detalle,
    };
  }

  if (codigo === 3 || t.includes("timeout") || t.includes("timed out")) {
    return {
      titulo: "Tardó demasiado en encontrar tu ubicación",
      pasos: ["Pulsa Reintentar.", "En celular, sal a un lugar abierto o activa la ubicación de alta precisión."],
      detalle,
    };
  }

  return {
    titulo: "No pudimos obtener tu ubicación",
    pasos: ["Pulsa Reintentar.", "Si sigue fallando, prueba con otro navegador."],
    detalle,
  };
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

/** true si el error es un permiso denegado (ahí no tiene sentido reintentar). */
function esPermisoDenegado(err) {
  const t = String(err?.message ?? err ?? "").toLowerCase();
  return err?.code === 1 || t.includes("denied") || t.includes("permission");
}

/**
 * Pide la posición actual. Primero con alta precisión (GPS en celular); si no
 * responde a tiempo — lo normal en un computador, que se ubica por WiFi —,
 * reintenta en modo normal y acepta una lectura de hasta un minuto de antigüedad.
 */
async function leerPosicion() {
  try {
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10_000 });
  } catch (err) {
    if (esPermisoDenegado(err)) throw err;
    return Geolocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20_000,
      maximumAge: 60_000,
    });
  }
}

/**
 * getUserLocation (HU-08, primer fix) — agnóstico al mapa.
 * Lee la posición vía Capacitor Geolocation (en web delega en el navegador)
 * y la devuelve. El componente del mapa decide cómo pintarla (Leaflet).
 *
 * @param {Function} [onSuccess] - callback({ lat, lng, accuracy })
 * @param {Function} [onError]   - callback({ titulo, pasos, detalle }) con la causa y qué hacer
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
      console.warn("FacilityMap: permiso de ubicación negado en el dispositivo");
      onError?.(await diagnosticarErrorUbicacion({ code: 1, message: "permission denied (dispositivo)" }));
      return null;
    }

    const position = await leerPosicion();

    const userPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };

    onSuccess?.(userPos);
    return userPos;
  } catch (err) {
    console.warn("FacilityMap: geolocation error -", err?.message ?? err);
    onError?.(await diagnosticarErrorUbicacion(err));
    return null;
  }
}

/**
 * watchUserLocation (HU-08, tiempo real) — agnóstico al mapa.
 * Emite cada fix vía onUpdate. Solo descarta lecturas que no aportan nada:
 * movimientos de menos de 5 m sin mejora de precisión, para no hacer temblar el pin.
 * No descarta lecturas imprecisas: en un computador la ubicación sale del WiFi y
 * suele tener más de 100 m de margen; el mapa la muestra como "aproximada".
 *
 * @param {object} [opts]
 * @param {Function} [opts.onUpdate] - callback({lat,lng,accuracy})
 * @param {Function} [opts.onError]  - callback({ titulo, pasos, detalle }) con la causa y qué hacer
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
    onError?.(await diagnosticarErrorUbicacion({ code: 1, message: "permission denied (dispositivo)" }));
    return async () => {};
  }

  let last = null;
  let watchId = null;

  const emitir = (lat, lng, accuracy) => {
    const next = { lat, lng, accuracy };
    if (last) {
      const casiQuieto = distanciaMetros(last, next) < 5;
      const mejoroPrecision = accuracy != null && last.accuracy != null && accuracy < last.accuracy - 10;
      if (casiQuieto && !mejoroPrecision) return;
    }
    last = next;
    onUpdate?.(next);
  };

  try {
    watchId = await Geolocation.watchPosition(
      // Tope amplio por lectura (60 s): en un computador las actualizaciones llegan
      // muy espaciadas y un timeout corto solo produciría errores falsos.
      { enableHighAccuracy: true, timeout: 60_000, maximumAge: 5000 },
      (position, err) => {
        if (err) {
          // Un timeout en medio del seguimiento no es grave: la siguiente lectura llegará.
          const t = String(err?.message ?? err).toLowerCase();
          if (err?.code === 3 || t.includes("timeout") || t.includes("timed out")) return;
          console.warn("FacilityMap: watch error -", err?.message ?? err);
          diagnosticarErrorUbicacion(err).then((d) => onError?.(d));
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
    onError?.(await diagnosticarErrorUbicacion(err));
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
