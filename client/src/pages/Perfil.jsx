import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { getProfile } from "../services/profile.service";
import { getNotificaciones } from "../services/notificaciones.service";
import Header from "../components/organisms/Header2";
import Footer from "../components/organisms/Footer";
import Button from "../components/atoms/Button";

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargandoNotificaciones, setCargandoNotificaciones] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      getProfile()
        .then((p) => {
          setProfile(p);
          setError(null);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));

      // Si fallan, el perfil se sigue mostrando; solo queda el mensaje de "sin notificaciones".
      getNotificaciones()
        .then(setNotificaciones)
        .catch((e) => console.error("No se pudieron cargar las notificaciones:", e.message))
        .finally(() => setCargandoNotificaciones(false));
  }, []);
  
  const handleLogout = async () => {
    await logout();
    navigate("/LogOut");
  };

  // HU-27: ID corto (8 primeros del UUID) con UUID completo en tooltip
  const idCorto = profile?.profile_id ? String(profile.profile_id).slice(0, 8) : "—";

  return (
    <div className="flex flex-col flex-1 relative min-h-screen">
      <Header />
      <div className="animate-[fadeIn_0.5s_ease-out] flex flex-1 flex-col py-6 md:py-12 px-4 md:px-12">
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold text-negro-txt mb-6 md:mb-8 text-center md:text-left">Usuario, {profile?.full_name ?? ""}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Tarjeta de Información Personal (HU-27) */}
          {loading ? <p>Cargando...</p> : error ? (
            <p role="alert" className="text-[#e3001b]">No se pudo cargar tu perfil: {error}</p>
          ) : (
            <div className="bg-rosa-menu rounded-sm py-8 md:py-12 px-6 md:px-8 flex flex-col shadow-[0_0.5rem_1.875rem_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0.75rem_2.5rem_rgba(0,0,0,0.1)]">
            <div className="w-24 h-24 md:w-37.5 md:h-37.5 bg-transparent text-[#242424] mx-auto mb-6 md:mb-8">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rounded-full drop-shadow-[0_0.25rem_0.625rem_rgba(0,0,0,0.15)]">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            
            <div className="flex flex-col gap-3">
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed wrap-break-words"><strong>Nombre:</strong> {profile.full_name} </p>
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed wrap-break-words"><strong>Correo:</strong> {profile.email} </p>
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed wrap-break-words"><strong>Cursando:</strong> {profile.programa} </p>
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed wrap-break-words" title={profile.profile_id ?? ""}>
                <strong>ID:</strong> {idCorto}
              </p>
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed wrap-break-words"><strong>Semestre:</strong> {profile.semestre ?? "—"} </p>
            </div>
          </div>
          )}
          

          {/* Área de Notificaciones y Acciones */}
          <div className="flex flex-col h-full">
            {/* HU-27: próximas actividades inscritas y respuestas recientes a tus publicaciones */}
            {cargandoNotificaciones ? (
              <p className="text-center text-negro-txt/60 mt-4 mb-auto">Cargando notificaciones...</p>
            ) : notificaciones.length === 0 ? (
              <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-negro-txt text-center mb-8 md:mb-12 mt-4">No tienes ninguna notificación!</h2>
            ) : (
              <div className="mb-auto">
                <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-negro-txt text-center md:text-left mb-4 mt-4">
                  Notificaciones
                </h2>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {notificaciones.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => navigate(n.ruta)}
                        className="w-full text-left flex items-start gap-3 bg-blanco-bg border border-gray-200 rounded-lg px-4 py-3 cursor-pointer transition-shadow hover:shadow-md"
                      >
                        <span className="text-xl shrink-0" aria-hidden="true">{n.tipo === "actividad" ? "📅" : "💬"}</span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-negro-txt">{n.titulo}</span>
                          <span className="block text-xs text-negro-txt/60 mt-0.5 first-letter:uppercase">{n.detalle}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-8 md:mt-16 px-4 md:px-4 h-auto md:h-18">
              <Button 
                variant="header"
                onClick={handleLogout}
                text="Cerrar Sesión"
                className=""
               />
               <Button 
                variant="header"
                onClick={()=>window.open("https://sigaa.upb.edu.co/ssomanager/c/SSB")}
                text="SIGAA"
                className=""
               />
            
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
