import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { getProfile } from "../services/profile.service";
import Header from "../components/organisms/Header2";
import Footer from "../components/organisms/Footer";
import Button from "../components/atoms/Button";

export default function Perfil() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      getProfile()
        .then(setProfile)
        .finally(() => setLoading(false));
  }, []);
  
  const handleLogout = async () => {
    await logout();
    navigate("/LogOut");
  };

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
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold text-negro-txt mb-6 md:mb-8 text-center md:text-left">Usuario, {profile.full_name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Tarjeta de Información Personal */}
          {loading ? <p>Cargando...</p> : (
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
              <p className="text-[1rem] md:text-[1.1rem] text-griso-prf leading-relaxed"><strong>ID:</strong> 000558233</p>
            </div>
          </div>
          )}
          

          {/* Área de Notificaciones y Acciones */}
          <div className="flex flex-col h-full">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-negro-txt text-center mb-8 md:mb-12 mt-4">No tienes ninguna notificación!</h2>
            
            <div className="text-center text-xl text-[#333] mb-auto">
              {/* Notificaciones vacías según solicitud */}
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-8 md:mt-16 px-4 md:px-20 h-auto md:h-18">
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
