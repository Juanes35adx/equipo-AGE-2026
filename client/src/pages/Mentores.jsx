import { useEffect, useMemo, useState } from "react";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"
import {
  getMentores,
  getMaterias,
  construirEnlaceTeams,
  registrarContacto,
} from "../services/mentores.service";

export default function Mentores() {
  const [mentores, setMentores] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [mentorActivo, setMentorActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMentores()
      .then(setMentores)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const materias = useMemo(() => getMaterias(mentores), [mentores]);

  const mentoresFiltrados = useMemo(
    () =>
      materiaSeleccionada
        ? mentores.filter((m) => m.materia === materiaSeleccionada)
        : mentores,
    [mentores, materiaSeleccionada]
  );

  const openModal = (mentor) => setMentorActivo(mentor);
  const closeModal = () => setMentorActivo(null);

  const contactarPorTeams = (mentor) => {
    registrarContacto(mentor.mentor_id, "teams");
    window.open(construirEnlaceTeams(mentor.email_institucional), "_blank");
  };

  const contactarPorCorreo = (mentor) => {
    registrarContacto(mentor.mentor_id, "correo");
    window.location.href = `mailto:${mentor.email_institucional}`;
  };

  return (
    <div>
      <Header />
      <main className="animate-[fadeIn_0.5s_ease-out] px-4 md:px-12 py-8">
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(40px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}
        </style>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-[#eaeaea] text-center md:text-left">
          <div className="max-w-full md:max-w-[65%] mb-8 md:mb-0">
            <h1 className="text-[2.2rem] font-bold text-negro-txt mb-3">Bienvenido al apartado de mentores!</h1>
            <p className="text-xl text-negro-txt leading-relaxed">
              Filtra por la materia en la que necesitas apoyo y contacta directamente a tu mentor por Teams
            </p>
          </div>
          <div className="w-30 h-30 opacity-80 ">
            <svg viewBox="0 0 24 24" fill="none" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full stroke-negro-txt">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6 text-negro-txt">Mentores Disponibles</h2>

        {/* Filtro por materia */}
        {!loading && !error && mentores.length > 0 && (
          <div className="mb-8">
            <label htmlFor="filtro-materia" className="block text-sm font-medium text-negro-txt/70 mb-2">
              Filtrar por materia
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <select
                id="filtro-materia"
                value={materiaSeleccionada}
                onChange={(e) => setMateriaSeleccionada(e.target.value)}
                className="w-full sm:w-auto min-w-[16rem] bg-gris-bg2 border border-[#ddd] rounded-lg py-3 px-4 text-base text-negro-txt cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e3001b]/40"
              >
                <option value="">Todas las materias ({mentores.length})</option>
                {materias.map((materia) => (
                  <option key={materia} value={materia}>
                    {materia}
                  </option>
                ))}
              </select>

              {materiaSeleccionada && (
                <button
                  onClick={() => setMateriaSeleccionada("")}
                  className="text-sm text-negro-txt/60 hover:text-negro-txt underline bg-transparent border-none cursor-pointer text-left"
                >
                  Quitar filtro
                </button>
              )}
            </div>
            <p className="text-sm text-negro-txt/60 mt-2">
              Mostrando {mentoresFiltrados.length} de {mentores.length} mentores
            </p>
          </div>
        )}

        {loading && <p className="text-lg text-negro-txt/70 py-8">Cargando mentores...</p>}

        {error && (
          <p className="text-lg text-[#e3001b] py-8">
            No se pudieron cargar los mentores: {error}
          </p>
        )}

        {/* Sin coincidencias para el filtro */}
        {!loading && !error && mentores.length > 0 && mentoresFiltrados.length === 0 && (
          <div className="bg-gris-bg2 rounded-xl p-8 text-center">
            <p className="text-lg text-negro-txt mb-4">
              No hay mentores disponibles para <strong>{materiaSeleccionada}</strong> en este momento.
            </p>
            <button
              onClick={() => setMateriaSeleccionada("")}
              className="bg-[#e3001b] text-white rounded-lg py-3 px-8 text-base font-bold cursor-pointer transition-all duration-300 shadow-md hover:bg-[#bf0015] hover:-translate-y-0.5"
            >
              Ver todos los mentores
            </button>
          </div>
        )}

        {/* Listado vacío en la base de datos */}
        {!loading && !error && mentores.length === 0 && (
          <p className="text-lg text-negro-txt/70 py-8">
            Aún no hay mentores registrados en la plataforma.
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:overflow-x-auto py-4 md:snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {mentoresFiltrados.map((mentor) => (
            <div key={mentor.mentor_id} className="min-w-full md:min-w-[20rem] bg-gris-bg2 rounded-xl pt-8 md:pt-12 pb-8 px-6 md:px-14 flex flex-col items-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg snap-start">
              <div className="w-24 h-24 md:w-25 md:h-25 text-[#333] mb-6">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rounded-full drop-shadow-md">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-[1.6rem] font-bold mb-2 text-[#1a1a1a] text-center">{mentor.nombre}</h3>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#e3001b] mb-3 text-center">
                {mentor.materia}
              </span>
              <p className="text-[0.95rem] text-[#555] text-center mb-8 flex-1">{mentor.tipo_tutor}</p>

              <button
                className="bg-[#e3001b] text-white rounded-lg py-3 px-10 text-[1.2rem] font-bold cursor-pointer transition-all duration-300 shadow-md hover:bg-[#bf0015] hover:-translate-y-0.5 w-full"
                onClick={() => openModal(mentor)}
              >
                Contactar
              </button>
            </div>
          ))}
        </div>

        {/* Modal Desplegable */}
        {mentorActivo && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-1000 p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]" onClick={closeModal}>
            <div className="bg-blanco-bg rounded-xl w-full max-w-[95%] md:max-w-125 relative shadow-[0_15px_50px_rgba(0,0,0,0.3)] pt-8 md:pt-12 px-6 md:px-8 pb-6 md:pb-8 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-3 md:top-3.75 left-3 md:left-3.75 w-8 h-8 md:w-10 md:h-10 bg-amarillo-xbtn text-black rounded-full text-lg font-bold flex items-center justify-center transition-transform hover:scale-110 hover:bg-[#fc0]" onClick={closeModal}>X</button>

              <div className="flex flex-col items-center text-center">
                <div className="w-30 h-30 text-[#333] mb-6">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rounded-full bg-[#f5f5f5] p-4 drop-shadow-md">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                   </svg>
                </div>
                <div className="w-full">
                  <h2 className="text-[1.8rem] font-extrabold text-negro-txt mb-1">{mentorActivo.nombre}</h2>
                  <h3 className="text-base text-negro-txt/80 font-medium mb-8">{mentorActivo.tipo_tutor}</h3>
                  <div className="bg-inherit rounded-lg p-6 text-left mb-8 border border-[#eee] w-full">
                    <p className="text-[1.05rem] text-negro-txt/80 mb-3 flex justify-between items-center gap-4 border-b border-[#eee] pb-2 font-medium">
                      <strong className="text-negro-txt min-w-25 shrink-0">📚 Materia:</strong> {mentorActivo.materia}
                    </p>
                    <p className="text-[1.05rem] text-negro-txt/80 mb-3 flex justify-between items-center gap-4 border-b border-[#eee] pb-2 font-medium break-all">
                      <strong className="text-negro-txt min-w-25 shrink-0">✉️ Correo:</strong> {mentorActivo.email_institucional}
                    </p>
                    {mentorActivo.descripcion && (
                      <p className="text-[0.95rem] text-negro-txt/70 leading-relaxed pt-1">
                        {mentorActivo.descripcion}
                      </p>
                    )}
                  </div>

                  <button
                    className="bg-[#4b53bc] text-white rounded-lg py-4 px-12 text-[1.1rem] font-bold cursor-pointer w-full transition-all duration-300 shadow-md hover:bg-[#373e8f] hover:-translate-y-0.5 hover:shadow-lg mb-3"
                    onClick={() => contactarPorTeams(mentorActivo)}
                  >
                    Abrir chat en Teams
                  </button>

                  <button
                    className="bg-transparent text-negro-txt/70 rounded-lg py-3 px-8 text-[0.95rem] font-medium cursor-pointer w-full border border-[#ddd] transition-all duration-300 hover:bg-gris-bg2 hover:text-negro-txt"
                    onClick={() => contactarPorCorreo(mentorActivo)}
                  >
                    ¿No tienes Teams? Escribir por correo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
