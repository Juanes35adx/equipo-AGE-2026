import { useEffect, useRef, useState } from "react";
import { getUserLocation } from "../../services/location.service";
import { loadGoogleMaps } from "../../services/map.service";
import { createCustomMarker } from "../atoms/Marker";

const MAP_BOUNDS = {
  north: 6.245199,
  south: 6.239271,
  east:  -75.585998,
  west:  -75.59229322992182,
};

const MAP_CENTER = {
  lat: (MAP_BOUNDS.north + MAP_BOUNDS.south) / 2,
  lng: (MAP_BOUNDS.east  + MAP_BOUNDS.west)  / 2,
};

export default function MAPMap({ onMarkerSelect, focusPoi, puntos = [] }) {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const markersRef  = useRef([]);

  const [mapsReady, setMapsReady] = useState(false);

  /* Centra el mapa cuando el usuario elige un lugar desde la búsqueda
     o desde el panel de bloques cercanos. */
  useEffect(() => {
    if (!focusPoi?.position || !mapInstance.current) return;
    mapInstance.current.panTo(focusPoi.position);
    mapInstance.current.setZoom(19);
  }, [focusPoi]);
  const [userPos,   setUserPos]   = useState(null);

  /* ── 1. Load Google Maps SDK once ───────────────────────────────────── */
  useEffect(() => {
    loadGoogleMaps().then(() => setMapsReady(true));
  }, []);

  /* ── 2. Initialise map once SDK is ready ─────────────────────────────── */
  useEffect(() => {
    if (!mapsReady || !mapRef.current || mapInstance.current) return;

    const { Map, Rectangle } = window.google.maps;

    const map = new Map(mapRef.current, {
      center:           MAP_CENTER,
      zoom:             18,
      mapId:            "a2cb5bf175049d1789e5c5b4",        
      mapTypeControl:   false,
      streetViewControl:false,
      fullscreenControl:false,
      // Restrict panning/zooming to the map area (slightly padded)
      restriction: {
        latLngBounds: MAP_BOUNDS,
        strictBounds: false,
      },
      // Nota: con mapId presente, Google IGNORA la propiedad "styles" del codigo
      // y aplica el estilo asociado a ese Map ID en Cloud Console. Ocultar los POI
      // por defecto se configura alli. El mapId no se puede quitar porque los
      // marcadores usan AdvancedMarkerElement, que lo exige.
    });

    mapInstance.current = map;

    // Place custom markers
    placeMarkers(map);

    // User location marker
    getUserLocation(
      window.google.maps.marker.AdvancedMarkerElement,
      map,
      (pos) => setUserPos(pos)
    );

  }, [mapsReady]); 

  /* ── 3. Place map markers ────────────────────────────────────────── */
  function placeMarkers(map) {
    const { AdvancedMarkerElement } = window.google.maps.marker;

    markersRef.current = puntos.map((poi) => {
      const markerEl = createCustomMarker(poi);

      const marker = new AdvancedMarkerElement({
        map,
        position: poi.position,
        title:    poi.name,
        content:  markerEl,
      });

      marker.addListener("click", () => {
        onMarkerSelect?.(poi);
      });

      return marker;
    });
  }

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
  );
}
