import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"
import MapInfo from "../components/organisms/MapInfo";
import { getUbicaciones } from "../services/ubicaciones.service";
import { PIN_LEYENDA, bloquesCercanos } from "../services/mapa.service";

export default function Mapa() {
  const [puntos, setPuntos] = useState([]);
  // Solo lo que el usuario elige a mano; el punto "efectivo" que ve la UI
  // combina esto con lo que trae la navegación (ver puntoDesdeActividad).
  const [selectedPoiElegido, setSelectedPoiElegido] = useState(null);
  const [focusPoiElegido, setFocusPoiElegido] = useState(null);
  const [consulta, setConsulta] = useState("");
  const [errorCarga, setErrorCarga] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  // Las ubicaciones vienen de Supabase; antes estaban quemadas en markersList.js
  useEffect(() => {
    getUbicaciones()
      .then(setPuntos)
      .catch((e) => setErrorCarga(e.message));
  }, []);

  /**
   * Punto que trajo la navegación desde una actividad (state.ubicacionId).
   * Se deriva de datos existentes en vez de sincronizarse con un efecto: así
   * aparece solo apenas `puntos` termina de cargar, sin doble renderizado.
   */
  const puntoDesdeActividad = useMemo(() => {
    if (!state?.ubicacionId) return null;
    return puntos.find((p) => p.id === state.ubicacionId) ?? null;
  }, [state, puntos]);

  // El clic del usuario manda sobre el punto de llegada; si no ha elegido
  // nada todavía, se usa el que trajo la actividad (si lo hay).
  const selectedPoi = selectedPoiElegido ?? puntoDesdeActividad;
  const focusPoi = focusPoiElegido ?? puntoDesdeActividad;

  /** Lugares que coinciden con lo escrito en la búsqueda. */
  const resultados = useMemo(() => {
    const q = consulta.trim().toLowerCase();
    if (!q) return [];
    return puntos.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
    ).slice(0, 8);
  }, [consulta, puntos]);

  /** Los tres bloques más cercanos al punto seleccionado. */
  const cercanos = useMemo(
    () => (selectedPoi ? bloquesCercanos(selectedPoi, puntos, 3) : []),
    [selectedPoi, puntos]
  );

  const irAlLugar = (poi) => {
    setFocusPoiElegido(poi);
    setSelectedPoiElegido(poi);
    setConsulta("");
  };

  return (
    <div>
        <Header />
        <main style={styles.container} className='relative min-w-9/10'>
          <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
          <h1 style={styles.title} className="text-negro-txt">Mapa del Campus UPB</h1>

          {/* ── Buscar un lugar dentro del mapa ──────────────────────────── */}
          <div className="relative mb-4 max-w-md">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar un lugar del campus..."
                aria-label="Buscar un lugar dentro del mapa"
                className="flex-1 border border-[#ddd] rounded-lg py-2 px-3 text-sm text-negro-txt focus:outline-none focus:ring-2 focus:ring-[#e3001b]/40"
              />
              {consulta && (
                <button
                  onClick={() => setConsulta("")}
                  aria-label="Limpiar búsqueda"
                  className="w-8 h-8 rounded-full bg-gris-bg2 text-negro-txt font-bold cursor-pointer border-none"
                >
                  X
                </button>
              )}
            </div>

            {consulta && (
              <ul className="absolute z-20 left-0 right-0 mt-1 bg-blanco-bg border border-[#ddd] rounded-lg shadow-lg max-h-64 overflow-y-auto list-none p-0 m-0">
                {resultados.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-negro-txt/60">
                    No encontramos ese lugar en el campus
                  </li>
                ) : (
                  resultados.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => irAlLugar(p)}
                        className="w-full text-left px-3 py-2 text-sm text-negro-txt bg-transparent border-none cursor-pointer hover:bg-gris-bg2"
                      >
                        <span className="mr-2">{p.icon ?? "📍"}</span>
                        {p.name}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          {errorCarga && (
            <p className="text-sm text-[#e3001b] mb-4">No se pudieron cargar las ubicaciones: {errorCarga}</p>
          )}

          <div className="flex flex-col md:flex-row w-full">

            {/* ── Map panel ─────────────────────────────────────────────────── */}
            <div className="w-full md:flex-1">
              <div className="h-120 md:h-209">
                <MapInfo onMarkerSelect={setSelectedPoiElegido} focusPoi={focusPoi} puntos={puntos} />
              </div>

              {/* ── Leyenda de colores de los pines ───────────────────────── */}
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-negro-txt">
                {PIN_LEYENDA.map((l) => (
                  <span key={l.tipo} className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: l.color }}
                      aria-hidden="true"
                    />
                    {l.etiqueta}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Info panel ────────────────────────────────────────────────── */}
            <aside className="w-full md:w-72 h-auto md:h-209 p-6 border-t md:border-t-0 md:border-l border-gray-200 ml-20 overflow-y-auto">
              {selectedPoi ? (
                <>
                  <h2 className="text-lg text-negro-txt mb-2 font-bold">{selectedPoi.name}</h2>
                  {selectedPoi.image && (
                    <img
                      src={selectedPoi.image}
                      alt={selectedPoi.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-sm text-negro-txt mb-3">{selectedPoi.description}</p>
                  <small className="text-xs text-gray-400">
                    {selectedPoi.position.lat.toFixed(6)},{" "}
                    {selectedPoi.position.lng.toFixed(6)}
                  </small>

                  {/* ── Bloques cercanos ──────────────────────────────────── */}
                  {cercanos.length > 0 && (
                    <section className="mt-6">
                      <h3 className="text-sm font-bold text-negro-txt mb-3">Bloques Cercanos</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {cercanos.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => irAlLugar(b)}
                            title={b.name + " · a " + b.metros + " m"}
                            className="bg-transparent border-none p-0 cursor-pointer text-left"
                          >
                            {b.image ? (
                              <img
                                src={b.image}
                                alt={b.name}
                                className="w-full h-14 object-cover rounded-md mb-1"
                              />
                            ) : (
                              <div className="w-full h-14 rounded-md mb-1 bg-gris-bg2" />
                            )}
                            <span className="block text-[0.65rem] leading-tight text-negro-txt/70">
                              {b.name}
                            </span>
                            <span className="block text-[0.6rem] text-negro-txt/50">
                              {b.metros} m
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <p className="text-sm text-negro-txt">Selecciona un marcador para conocer los detalles</p>
              )}
            </aside>

          </div>
        </main>
        <Footer />
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, marginBottom: "1.5rem" },
  mapWrapper: { borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" },
};
