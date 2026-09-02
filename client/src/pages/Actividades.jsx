import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"
import {
  getEventos,
  inscribirse,
  cancelarInscripcion,
  formatearFecha,
} from "../services/eventos.service";

export default function Actividades() {
  const [eventos, setEventos] = useState([]);
  const [eventoActivo, setEventoActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [procesando, setProcesando] = useState(null);
  const [aviso, setAviso] = useState(null);
  const navigate = useNavigate();

  /** Recarga los eventos y devuelve la lista, para poder refrescar el modal abierto. */
  const cargarEventos = async () => {
    try {
      const datos = await getEventos();
      setEventos(datos);
      return datos;
    } catch (e) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const openModal = (evento) => setEventoActivo(evento);
  const closeModal = () => setEventoActivo(null);

  /** Inscribe o cancela según el estado actual, y refresca los cupos. */
  const alternarInscripcion = async (evento) => {
    setProcesando(evento.evento_id);
    setAviso(null);
    try {
      if (evento.inscrito) {
        await cancelarInscripcion(evento.evento_id);
        setAviso({ tipo: "ok", texto: `Cancelaste tu inscripción a ${evento.titulo}` });
      } else {
        await inscribirse(evento.evento_id);
        setAviso({ tipo: "ok", texto: `Te inscribiste a ${evento.titulo}` });
      }
      // El modal se queda abierto mostrando el estado nuevo: tras participar
      // aparece "Cancelar inscripción", y tras cancelar vuelve a "Participar".
      const datos = await cargarEventos();
      const refrescado = datos.find((e) => e.evento_id === evento.evento_id);
      setEventoActivo(refrescado ?? null);
    } catch (e) {
      setAviso({ tipo: "error", texto: e.message });
    } finally {
      setProcesando(null);
    }
  };

  const irAlMapa = (evento) =>
    navigate("/mapa", { state: { ubicacionId: evento.ubicacion_id } });

  return (
    <div>
      <Header />
      <div className="flex flex-col pb-8 animate-[fadeIn_0.4s_ease-out] overflow-x-hidden">
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(0.625rem); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(2.5rem) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}
        </style>

        {/* Banner Superior */}
        <div className="w-full bg-activid bg-center mb-8 flex items-center justify-center relative overflow-hidden shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-black/20 before:content-[''] py-20">
          <div className="relative z-10 bg-gris-bg2/85 backdrop-blur-md py-12 mb-20 px-12 rounded-xl text-center max-w-140">
            <h1 className="text-[2.5rem] font-extrabold text-negro-txt mb-2">Actividades</h1>
            <p className="text-[1.5rem] font-light wrap-normal text-negro-txt">Aquí podrás ver las actividades de las que puedes participar</p>
          </div>
        </div>

        <div className="px-10">
          <h2 className="text-4xl font-bold mb-8 text-negro-txt">Disponibles</h2>

          {/* Aviso de resultado de la inscripción */}
          {aviso && (
            <div
              className={`mb-6 rounded-lg px-5 py-4 text-base ${
                aviso.tipo === "ok"
                  ? "bg-[#e8f5e9] text-[#1b5e20] border border-[#a5d6a7]"
                  : "bg-[#fdecea] text-[#b71c1c] border border-[#f5c6c2]"
              }`}
              role="status"
            >
              {aviso.texto}
            </div>
          )}

          {loading && <p className="text-lg text-negro-txt/70 py-8">Cargando actividades...</p>}

          {error && (
            <p className="text-lg text-[#e3001b] py-8">
              No se pudieron cargar las actividades: {error}
            </p>
          )}

          {!loading && !error && eventos.length === 0 && (
            <p className="text-lg text-negro-txt/70 py-8">
              Por ahora no hay actividades programadas. Vuelve pronto.
            </p>
          )}

          {/* Grilla de Actividades */}
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-4">
            {eventos.map((evento) => (
              <div key={evento.evento_id} className="group rounded-xl overflow-hidden shadow-[0_0.25rem_0.9375rem_rgba(0,0,0,0.05)] flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0.5rem_1.5625rem_rgba(0,0,0,0.15)]">
                <div className="w-full h-50 overflow-hidden p-4 bg-blanco-bg" />

                <div className="p-6 text-center flex flex-col grow">
                  <h3 className="text-[1.6rem] font-bold mb-1 text-negro-txt">{evento.titulo}</h3>
                  <p className="text-base text-negro-txt mb-4">{evento.subtitulo}</p>

                  <p className="text-[0.95rem] text-negro-txt mb-1">{evento.lugar}</p>
                  <p className="text-[0.95rem] text-negro-txt/70 mb-4 first-letter:uppercase">
                    {formatearFecha(evento.fecha_inicio)}
                  </p>

                  {/* Estado del cupo */}
                  <p className="text-[0.9rem] mb-4 grow">
                    {evento.cupo_maximo === null ? (
                      <span className="text-negro-txt/60">Cupo ilimitado</span>
                    ) : evento.lleno ? (
                      <span className="text-[#e3001b] font-semibold">Cupo lleno</span>
                    ) : (
                      <span className="text-negro-txt/60">
                        {evento.cupos_disponibles} de {evento.cupo_maximo} cupos disponibles
                      </span>
                    )}
                  </p>

                  {evento.ubicacion_id && (
                    <button
                      onClick={() => irAlMapa(evento)}
                      className="text-[0.9rem] text-[#4da6ff] underline cursor-pointer mb-4 bg-transparent border-none"
                    >
                      ¿No sabes cómo llegar?
                    </button>
                  )}

                  {evento.inscrito && (
                    <span className="text-[0.85rem] font-semibold text-[#1b5e20] bg-[#e8f5e9] rounded-full py-1 px-3 mb-3 self-center">
                      Ya estás inscrito
                    </span>
                  )}

                  <button
                    className="bg-[#e3001b] text-white rounded-lg py-3 px-6 text-[1.1rem] font-bold cursor-pointer w-full transition-all duration-300 hover:bg-[#bf0015] hover:-translate-y-0.5"
                    onClick={() => openModal(evento)}
                  >
                    Mas Información
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Desplegable */}
          {eventoActivo && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-1000 p-8 animate-[fadeIn_0.3s_ease-out]" onClick={closeModal}>
              <div className="bg-blanco-bg rounded-xl w-full max-w-175 max-h-[90vh] overflow-y-auto relative shadow-[0_0.9375rem_3.125rem_rgba(0,0,0,0.3)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3.75 left-3.75 w-10 h-10 bg-amarillo-xbtn text-negro-txt rounded-full text-lg font-bold flex items-center justify-center transition-transform hover:scale-110 hover:bg-[#fc0] z-10" onClick={closeModal}>X</button>

                <div className="w-full h-87.5 p-6 pb-0" />

                <div className="p-8 text-center">
                  <h2 className="text-[2.2rem] font-extrabold mb-2 text-negro-txt">{eventoActivo.titulo}</h2>
                  <p className="text-[1.05rem] text-negro-txt/60 mb-1">{eventoActivo.lugar}</p>
                  <p className="text-[1.05rem] text-negro-txt/60 mb-6 first-letter:uppercase">
                    {formatearFecha(eventoActivo.fecha_inicio)}
                  </p>

                  <p className="text-[1.15rem] text-negro-txt/70 leading-relaxed mb-8">
                    {eventoActivo.descripcion}
                  </p>

                  {eventoActivo.lleno && !eventoActivo.inscrito ? (
                    <p className="text-[1.1rem] text-[#e3001b] font-semibold mb-4">
                      Este evento ya alcanzó su cupo máximo
                    </p>
                  ) : (
                    <button
                      disabled={procesando === eventoActivo.evento_id}
                      className={`rounded-lg py-4 px-12 text-[1.3rem] font-bold w-full transition-all duration-300 shadow-md hover:-translate-y-0.75 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 ${
                        eventoActivo.inscrito
                          ? "bg-transparent text-negro-txt border border-[#ccc] hover:bg-gris-bg2"
                          : "bg-[#e3001b] text-white hover:bg-[#bf0015]"
                      }`}
                      onClick={() => alternarInscripcion(eventoActivo)}
                    >
                      {procesando === eventoActivo.evento_id
                        ? "Procesando..."
                        : eventoActivo.inscrito
                        ? "Cancelar inscripción"
                        : "Participar"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
