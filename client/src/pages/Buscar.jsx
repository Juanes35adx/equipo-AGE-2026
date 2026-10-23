import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import searchData from '../data/searchIndex.json';
import Header from '../components/organisms/Header2'
import Footer from '../components/organisms/Footer'
import SearchBar from '../components/organisms/Search';
import tagList from '../data/tagList.json';
import { buscarSecciones, etiquetasCompatibles } from '../services/busqueda.service';

// Etiquetas que se sugieren cuando una búsqueda no encuentra nada (HU-11).
const ETIQUETAS_SUGERIDAS = ['ayuda', 'mapa', 'eventos', 'preguntas', 'tutoria', 'comida'];

/** Buscar
    * Busca entre las secciones de la app (searchIndex.json) por texto libre y por etiquetas.
    * El filtro vive en services/busqueda.service.js: ignora tildes y mayúsculas, y las
    * etiquetas se acumulan afinando la búsqueda; solo se ofrecen las que combinan.
    */
const Buscar = () => {
  const [query, setQuery] = useState('');
  const [etiquetas, setEtiquetas] = useState([]);
  const navigate = useNavigate();

  const filteredResults = useMemo(
    () => buscarSecciones(searchData, query, etiquetas),
    [query, etiquetas]
  );

  const disponibles = useMemo(
    () => etiquetasCompatibles(searchData, query, etiquetas, tagList),
    [query, etiquetas]
  );

  const hayBusqueda = query.trim() !== '' || etiquetas.length > 0;
  const sinResultados = hayBusqueda && filteredResults.length === 0;

  const alternarEtiqueta = (tag) =>
    setEtiquetas((actuales) =>
      actuales.includes(tag) ? actuales.filter((t) => t !== tag) : [...actuales, tag]
    );

  /** Vuelve al inicio de la búsqueda: sin texto ni etiquetas. */
  const reiniciar = () => {
    setQuery('');
    setEtiquetas([]);
  };

  /** Buscar solo por una etiqueta, desde las sugerencias del mensaje sin resultados. */
  const buscarPorEtiqueta = (tag) => {
    setQuery('');
    setEtiquetas([tag]);
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-9/10 mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-negro-txt mb-2">
              Sección de Búsquedas
            </h1>
          </div>
          
          {/* Search Bar Container */}
          {/* La búsqueda es instantánea, así que Enter y la flecha no necesitan hacer nada.
              Antes se pasaba onSearch={Buscar} (el propio componente) y eso rompía React.
              Si la búsqueda no encontró nada, abrir las etiquetas (+) arranca de cero (HU-11). */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            etiquetas={etiquetas}
            onToggleEtiqueta={alternarEtiqueta}
            onAbrirEtiquetas={() => { if (sinResultados) reiniciar(); }}
            etiquetasDisponibles={disponibles}
          />


          {/* Results Section */}
          <div className="space-y-4">
            {!hayBusqueda ? (
              <div className="text-center py-20 text-negro-txt">
                <svg
                  className="mx-auto h-12 w-12 text-negro-txt"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="mt-4 text-lg">Empieza a buscar</p>
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => navigate(result.path)}
                  className="group p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-md hover:border-azul-url cursor-pointer transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-negro-txt group-hover:text-azul-url transition-colors">
                      {result.title}
                    </h2>
                    <span className="text-xs font-medium text-azul-url bg-blue-50 px-2 py-1 rounded-full">
                      Ver página
                    </span>
                  </div>
                  <p className="mt-2 text-griso-prf text-sm leading-relaxed">
                    {result.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.625rem] uppercase tracking-wider font-bold text-griso-prf bg-gris-bg2 px-2 py-0.5 rounded"
                    >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              
                <div className="text-center py-16 px-4 rounded-sm border border-dashed border-reg_bg2">
                  <p className="text-negro-txt text-lg">
                    {query.trim() ? (
                      <>No encontramos resultados para "<strong>{query.trim()}</strong>"</>
                    ) : (
                      <>No encontramos secciones con esas etiquetas</>
                    )}
                    {query.trim() && etiquetas.length > 0 && <> con las etiquetas elegidas</>}
                  </p>
                  <p className="text-negro-txt text-sm mt-2">
                    Prueba con otras palabras clave, o busca por etiquetas:
                  </p>
                  {/* Alternativa de navegación: las etiquetas (HU-11) */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {ETIQUETAS_SUGERIDAS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => buscarPorEtiqueta(tag)}
                        className="px-3 py-1 rounded-full text-sm border border-negro-txt text-negro-txt bg-transparent hover:bg-gris-bg2 cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  <p className="text-negro-txt/60 text-xs mt-4">
                    También puedes pulsar + para ver todas las etiquetas.
                  </p>
                </div>
            )}
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Buscar;
