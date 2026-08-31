import { createUserMarker } from "../components/atoms/Marker";

/**
 * getUserLocation
 * Reads the user's position via the HTML5 Geolocation API and drops an
 * AdvancedMarkerElement on the map at that position.
 *
 * @param {Function}  AdvancedMarkerElement  - google.maps.marker.AdvancedMarkerElement class
 * @param {google.maps.Map} map              - the active Map instance
 * @param {Function}  onSuccess             - optional callback(latLng) after placement
 */
export function getUserLocation(AdvancedMarkerElement, map, onSuccess) {
  if (!navigator.geolocation) {
    console.warn("FacilityMap: geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      new AdvancedMarkerElement({
        map,
        position: userPos,
        title:    "Your Location",
        content:  createUserMarker(),
      });

      onSuccess?.(userPos);
    },
    (err) => {
      console.warn("FacilityMap: geolocation error —", err.message);
    },
    { enableHighAccuracy: true, timeout: 10_000 }
  );
}
