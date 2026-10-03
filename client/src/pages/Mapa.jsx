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

  /** Normaliza para búsqueda: minúsculas y sin tildes (igual que faqs.service). */
  const normalizar = (s) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  /** Lugares que coinciden con lo escrito en la búsqueda (HU-36). */
  const resultados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return [];
    return puntos.filter((p) =>
      normalizar(p.name).includes(q) ||
      normalizar(p.description).includes(q) ||
      normalizar(p.codigo).includes(q) ||
      normalizar(p.edificio).includes(q)
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
      {/* En computador, encabezado + contenido ocupan exactamente la ventana: el mapa,
          la leyenda y el panel de información se ven completos sin hacer scroll.
          El pie de página queda debajo y solo aparece si el usuario baja. */}
      <div className="flex flex-col md:h-dvh">
        <Header />
        <main className="flex-1 min-h-0 flex flex-col gap-3 w-full max-w-7xl mx-auto px-4 md:px-8 py-4">

          {/* ── Título + buscador, encima de la columna del mapa ─────────── */}
          <div className="flex flex-col md:flex-row gap-4 shrink-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 md:flex-1 min-w-0">
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-transparent border-none cursor-pointer text-sm text-negro-txt/60 hover:text-negro-txt"
                >
                  ← Volver
                </button>
                <h1 className="m-0 text-xl md:text-2xl font-medium text-negro-txt">Mapa del Campus UPB</h1>
              </div>

              {/* ── Buscar un lugar dentro del mapa ──────────────────────── */}
              <div className="relative w-full lg:flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && resultados.length > 0) irAlLugar(resultados[0]);
                    }}
                    placeholder="Buscar un lugar del campus..."
                    aria-label="Buscar un lugar dentro del mapa"
                    role="searchbox"
                    className="flex-1 min-w-0 w-full border border-[#ddd] rounded-lg py-2 px-3 text-sm text-negro-txt focus:outline-none focus:ring-2 focus:ring-[#e3001b]/40"
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
                  <ul className="absolute z-40 left-0 right-0 mt-1 bg-blanco-bg border border-[#ddd] rounded-lg shadow-lg max-h-64 overflow-y-auto list-none p-0 m-0">
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
            </div>
            {/* Hueco del ancho del panel lateral: así el buscador termina donde termina el mapa */}
            <div className="hidden md:block md:w-80 shrink-0" aria-hidden="true" />
          </div>

          {errorCarga && (
            <p className="text-sm text-[#e3001b] m-0 shrink-0">No se pudieron cargar las ubicaciones: {errorCarga}</p>
          )}

          {/* ── Mapa + panel de información ──────────────────────────── */}
          <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4">

            {/* Mapa: llena el espacio libre; la leyenda va encima, en la esquina */}
            <section className="relative isolate h-[60vh] md:h-auto md:flex-1 min-h-80 rounded-xl overflow-hidden border border-gray-200">
              <MapInfo onMarkerSelect={setSelectedPoiElegido} focusPoi={focusPoi} puntos={puntos} />

              {/* ── Leyenda de colores de los pines (HU-35) ─────────────── */}
              <div
                aria-label="Leyenda del mapa"
                className="absolute top-3 right-3 z-[500] flex flex-col gap-1 px-3 py-2 rounded-lg shadow-md bg-blanco-bg/95 text-xs text-negro-txt"
              >
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
            </section>

            {/* ── Panel de información (se desplaza por dentro si el texto es largo) ── */}
            <aside className="w-full md:w-80 shrink-0 md:overflow-y-auto p-5 rounded-xl border border-gray-200">
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
                <p className="text-sm text-negro-txt m-0">Selecciona un marcador para conocer los detalles</p>
              )}
            </aside>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
