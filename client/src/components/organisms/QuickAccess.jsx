import QuickAccessItem from "../atoms/DashButton"
import { useNavigate } from "react-router-dom";

const QUICK_ITEMS = [
  {
    id: "mapa",
    path: "/mapa",
    label: "Mapa",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <path d="M18 3C12.5 3 8 7.7 8 13.5c0 7.9 10 19.5 10 19.5s10-11.6 10-19.5C28 7.7 23.5 3 18 3z" />
        <circle cx="18" cy="13.5" r="4" />
      </svg>
    ),
  },
  {
    id: "actividades",
    path: "/actividades",
    label: "Actividades",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <circle cx="18" cy="10" r="4" />
        <path d="M10 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M6 22c0 2 1.5 3.5 3.5 4M30 22c0 2-1.5 3.5-3.5 4" />
        <path d="M14 20v8M22 20v8M10 24h16" />
      </svg>
    ),
  },
  {
    id: "buscar",
    path: "/buscar",
    label: "Buscar",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <circle cx="16" cy="16" r="9" />
        <line x1="23" y1="23" x2="30" y2="30" />
      </svg>
    ),
  },
  {
    id: "foro",
    path: "/foro",
    label: "Foro",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <circle cx="18" cy="10" r="3.5" />
        <circle cx="8" cy="20" r="3" />
        <circle cx="28" cy="20" r="3" />
        <path d="M12 26c0-3 2.7-6 6-6s6 3 6 6" />
        <line x1="14" y1="14" x2="9" y2="18" />
        <line x1="22" y1="14" x2="27" y2="18" />
      </svg>
    ),
  },
  {
    id: "preguntas",
    path: "/faqs",
    label: "Preguntas",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <circle cx="18" cy="18" r="12" />
        <path d="M14 14c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-2 3-3 4.5" strokeLinecap="round" />
        <circle cx="18" cy="26" r="1" fill="#111" stroke="none" />
      </svg>
    ),
  },
  {
    id: "mentor",
    path: "/mentores",
    label: "Mentor",
    icon: (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="#111" strokeWidth="2">
        <circle cx="18" cy="10" r="4" />
        <rect x="11" y="16" width="14" height="13" rx="2" />
        <line x1="15" y1="16" x2="15" y2="29" />
        <line x1="21" y1="16" x2="21" y2="29" />
        <line x1="11" y1="22" x2="25" y2="22" />
      </svg>
    ),
  },
];

export default function QuickAccessGrid() {
  const navigate = useNavigate();

  return (
    <section className="px-5 pt-4 pb-6">
      {/* Encabezado. La búsqueda vive en el acceso "Buscar" (/buscar). */}
      <h2 className="text-lg font-bold text-negro-txt mb-1">Accesos Rápidos</h2>

      <p className="text-sm text-negro-txt leading-relaxed mb-4">
        Aquí puedes encontrar accesos rápidos al aplicativo
      </p>

       {/* Botones cuadrados: 3×2 en celular y tablet, una fila de 6 desde lg para llenar el ancho */}
       <div className="w-full max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 w-full">
          {QUICK_ITEMS.map((item) => (
            <QuickAccessItem key={item.id} {...item} onClick={() => navigate(item.path)} />
          ))}
        </div>
       </div>
    </section>
  );
}
