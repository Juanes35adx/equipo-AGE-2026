import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getUserLocation, watchUserLocation } from "../../services/location.service";
import { htmlDePin, htmlDeUsuario } from "../atoms/Marker";

// Campus UPB Laureles (Leaflet usa [lat, lng])
const MAP_BOUNDS = [
  [6.239271, -75.59229322992182], // suroeste
  [6.245199, -75.585998],         // noreste
];
const MAP_CENTER = [
  (MAP_BOUNDS[0][0] + MAP_BOUNDS[1][0]) / 2,
  (MAP_BOUNDS[0][1] + MAP_BOUNDS[1][1]) / 2,
];

// Margen (en grados, ~150 m) para no declarar "fuera del campus" a alguien parado en la portería.
const MARGEN_CAMPUS = 0.0014;

// Por encima de esta precisión la posición se muestra como aproximada (lo normal en un computador).
const PRECISION_APROXIMADA_M = 100;

function estaEnElCampus({ lat, lng }) {
  return (
    lat >= MAP_BOUNDS[0][0] - MARGEN_CAMPUS && lat <= MAP_BOUNDS[1][0] + MARGEN_CAMPUS &&
    lng >= MAP_BOUNDS[0][1] - MARGEN_CAMPUS && lng <= MAP_BOUNDS[1][1] + MARGEN_CAMPUS
  );
}

/** Distancia aproximada en km desde una posición hasta el centro del campus. */
function kmAlCampus({ lat, lng }) {
  return L.latLng(lat, lng).distanceTo(L.latLng(MAP_CENTER[0], MAP_CENTER[1])) / 1000;
}

function asegurarKeyframesPulso() {
  if (document.getElementById("age-pulse-keyframes")) return;
  const style = document.createElement("style");
  style.id = "age-pulse-keyframes";
  style.textContent = `
    @keyframes age-pulse {
      0%   { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .age-pin-div { background: transparent; border: none; }
    .age-user-div { background: transparent; border: none; }
  `;
  document.head.appendChild(style);
}

export default function MAPMap({ onMarkerSelect, focusPoi, puntos = [] }) {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const poisLayer   = useRef(null);
  const userMarkerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const watchCleanupRef = useRef(null);
  const onMarkerSelectRef = useRef(onMarkerSelect);
  onMarkerSelectRef.current = onMarkerSelect;

  const [mapaListo, setMapaListo] = useState(false);
  // HU-08: solicitud explícita + alternativa si se deniega
  const [permiso, setPermiso] = useState("idle"); // idle | solicitando | ok | denegado | error
  const [mensajePermiso, setMensajePermiso] = useState(null);
  const [userPos, setUserPos] = useState(null);
  // La primera lectura dentro del campus centra el mapa. Después, el mapa sigue al
  // usuario mientras camina, hasta que él mueva el mapa o elija un lugar.
  const yaCentradoRef = useRef(false);
  const siguiendoRef = useRef(false);
  const [siguiendo, setSiguiendo] = useState(false);
  const fijarSeguimiento = (valor) => {
    siguiendoRef.current = valor;
    setSiguiendo(valor);
  };

  /* ── 1. Crear mapa Leaflet + OSM una sola vez (sin API key) ────────── */
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    asegurarKeyframesPulso();

    const map = L.map(mapRef.current, {
      center: MAP_CENTER,
      zoom: 18,
      minZoom: 16,
      maxZoom: 20,
      maxBounds: MAP_BOUNDS,
      maxBoundsViscosity: 0.8,
      // Abajo a la derecha, para no tapar el botón "Mostrar mi ubicación".
      zoomControl: false,
      attributionControl: true,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      // OpenStreetMap solo publica imágenes hasta el nivel 19: en el 20 responde error y
      // el mapa quedaba en blanco al hacer zoom total y moverlo. Con maxNativeZoom, Leaflet
      // reutiliza las imágenes del nivel 19 y las amplía.
      maxNativeZoom: 19,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    poisLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;
    setMapaListo(true);

    // Si el usuario arrastra el mapa para mirar otra zona, se deja de seguirlo.
    map.on("dragstart", () => {
      siguiendoRef.current = false;
      setSiguiendo(false);
    });

    // Si el contenedor cambia de tamaño (ventana, rotación del celular), Leaflet
    // necesita recalcular; si no, quedan franjas grises sin mapa.
    const observador = new ResizeObserver(() => map.invalidateSize());
    observador.observe(mapRef.current);

    return () => {
      observador.disconnect();
      watchCleanupRef.current?.().catch?.(() => {});
      watchCleanupRef.current = null;
      try { map.remove(); } catch { /* ignorar */ }
      mapInstance.current = null;
      poisLayer.current = null;
      userMarkerRef.current = null;
      accuracyCircleRef.current = null;
    };
  }, []);

  /* ── 2. Pines de Supabase (repinta cuando llegan) ───────────────────── */
  useEffect(() => {
    if (!mapaListo || !mapInstance.current || !poisLayer.current) return;
    poisLayer.current.clearLayers();

    (puntos ?? []).forEach((poi) => {
      if (poi?.position?.lat == null || poi?.position?.lng == null) return;
      const marker = L.marker([poi.position.lat, poi.position.lng], {
        title: poi.name,
        icon: L.divIcon({
          html: htmlDePin(poi),
          className: "age-pin-div",
          iconSize: [60, 64],
          iconAnchor: [30, 44],
        }),
      });
      marker.on("click", () => onMarkerSelectRef.current?.(poi));
      marker.addTo(poisLayer.current);
    });
  }, [mapaListo, puntos]);

  /* Centra el mapa cuando se elige un lugar (búsqueda / cercanos / actividad) */
  useEffect(() => {
    if (!focusPoi?.position || !mapInstance.current) return;
    // Al elegir un lugar se deja de seguir al usuario, para no arrancarle el mapa de ahí.
    siguiendoRef.current = false;
    setSiguiendo(false);
    mapInstance.current.flyTo([focusPoi.position.lat, focusPoi.position.lng], 19, { duration: 0.6 });
  }, [focusPoi]);

  const pintarPosicion = (pos) => {
    const map = mapInstance.current;
    if (!map) return;
    const latlng = [pos.lat, pos.lng];
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(latlng);
    } else {
      userMarkerRef.current = L.marker(latlng, {
        title: "Tu ubicación",
        icon: L.divIcon({
          html: htmlDeUsuario(),
          className: "age-user-div",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
        zIndexOffset: 1000,
      }).addTo(map);
    }
    if (pos.accuracy != null) {
      if (accuracyCircleRef.current) {
        accuracyCircleRef.current.setLatLng(latlng).setRadius(pos.accuracy);
      } else {
        accuracyCircleRef.current = L.circle(latlng, {
          radius: pos.accuracy,
          color: "#4285f4",
          weight: 1,
          opacity: 0.5,
          fillColor: "#4285f4",
          fillOpacity: 0.12,
        }).addTo(map);
      }
    }
  };

  /**
   * La primera vez que el usuario aparece dentro del campus, el mapa se centra en él
   * y empieza a seguirlo; en las lecturas siguientes lo acompaña mientras camina.
   */
  const centrarSiCorresponde = (p) => {
    if (!estaEnElCampus(p) || !mapInstance.current) return;
    try {
      if (!yaCentradoRef.current) {
        yaCentradoRef.current = true;
        fijarSeguimiento(true);
        mapInstance.current.flyTo([p.lat, p.lng], 19, { duration: 0.6 });
      } else if (siguiendoRef.current) {
        mapInstance.current.panTo([p.lat, p.lng], { animate: true });
      }
    } catch { /* ignorar */ }
  };

  const centrarEnMi = () => {
    if (!userPos || !mapInstance.current) return;
    fijarSeguimiento(true);
    mapInstance.current.flyTo([userPos.lat, userPos.lng], 19, { duration: 0.6 });
  };

  /* ── HU-08: solicitud explícita + tiempo real ───────────────────────── */
  const solicitarUbicacion = async () => {
    if (!mapInstance.current) return;
    if (permiso === "solicitando") return;
    setPermiso("solicitando");
    setMensajePermiso(null);

    const pos = await getUserLocation(
      (p) => {
        setUserPos(p);
        setPermiso("ok");
        pintarPosicion(p);
        centrarSiCorresponde(p);
      },
      (msg) => {
        setPermiso("denegado");
        setMensajePermiso(msg);
      }
    );

    if (pos) {
      try {
        watchCleanupRef.current?.().catch?.(() => {});
        watchCleanupRef.current = await watchUserLocation({
          onUpdate: (p) => {
            setUserPos(p);
            setPermiso("ok");
            pintarPosicion(p);
            centrarSiCorresponde(p);
          },
          onError: (msg) => {
            setPermiso((anterior) => (anterior === "ok" ? anterior : "error"));
            setMensajePermiso((m) => m ?? msg);
          },
        });
      } catch (e) {
        setMensajePermiso((m) => m ?? e?.message ?? String(e));
      }
    }
  };

  const mostrarBotonUbicacion = permiso === "idle" || permiso === "denegado" || permiso === "error";
  const dentro = userPos ? estaEnElCampus(userPos) : false;
  const aproximada = userPos?.accuracy != null && userPos.accuracy > PRECISION_APROXIMADA_M;

  return (
    // isolate: las capas de Leaflet usan z-index de 200 a 1000; sin un contexto propio,
    // al hacer scroll el mapa se montaba encima del encabezado fijo (z-50).
    <div className="relative isolate w-full h-full">
      <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "320px", borderRadius: "12px", overflow: "hidden" }} />

      {/* HU-08: solicitud explícita de permisos */}
      {mostrarBotonUbicacion && mapaListo && (
        <button
          onClick={solicitarUbicacion}
          disabled={permiso === "solicitando"}
          aria-label="Mostrar mi ubicación en el mapa"
          className="absolute top-3 left-3 z-[500] px-4 py-2 bg-blanco-bg border border-[#ddd] rounded-full shadow-lg text-sm text-negro-txt cursor-pointer hover:bg-gris-bg2 disabled:opacity-60"
        >
          {permiso === "solicitando" ? "Localizando…" : "📍 Mostrar mi ubicación"}
        </button>
      )}

      {/* Ubicación activa dentro del campus: estado + botón para volver a centrarse */}
      {permiso === "ok" && userPos && dentro && (
        <div className="absolute bottom-3 left-3 z-[500] flex items-center gap-2">
          <p
            role="status"
            className="m-0 px-3 py-1 bg-blanco-bg/90 rounded-full text-xs text-negro-txt shadow"
          >
            {aproximada ? "Ubicación aproximada" : "Ubicación activa"}
            {userPos.accuracy != null ? ` · ±${Math.round(userPos.accuracy)} m` : ""}
          </p>
          {!siguiendo && (
            <button
              onClick={centrarEnMi}
              aria-label="Centrar el mapa en mi ubicación"
              className="px-3 py-1 bg-blanco-bg border border-[#ddd] rounded-full text-xs text-negro-txt shadow cursor-pointer hover:bg-gris-bg2"
            >
              Centrar en mí
            </button>
          )}
        </div>
      )}

      {/* Fuera del campus: el mapa solo cubre la UPB, así que el punto no se vería */}
      {permiso === "ok" && userPos && !dentro && (
        <div
          role="status"
          className="absolute top-3 left-3 right-3 md:right-auto md:max-w-sm z-[500] bg-blanco-bg border border-[#ddd] rounded-lg shadow-lg px-4 py-3 text-sm text-negro-txt"
        >
          <p className="m-0 font-medium">Estás fuera del campus</p>
          <p className="m-0 mt-1 text-negro-txt/70">
            Te ubicamos a unos {kmAlCampus(userPos).toFixed(1)} km de la UPB. Tu punto aparecerá en
            el mapa cuando estés dentro; el seguimiento sigue activo.
          </p>
        </div>
      )}

      {/* HU-08: mensaje claro + alternativa si se deniega */}
      {(permiso === "denegado" || permiso === "error") && mensajePermiso && (
        <div
          role="alert"
          className="absolute top-3 left-3 right-3 z-[500] bg-blanco-bg border border-[#f5c6c2] rounded-lg shadow-lg px-4 py-3 text-sm text-negro-txt"
        >
          <p className="mb-1">{mensajePermiso}</p>
          <p className="text-negro-txt/70 mb-2">
            Puedes seguir usando el mapa, la búsqueda y los bloques cercanos sin tu posición.
          </p>
          <button
            onClick={solicitarUbicacion}
            className="px-4 py-1 bg-[#e3001b] text-white text-xs font-medium rounded-full hover:bg-[#bf0015] transition cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
