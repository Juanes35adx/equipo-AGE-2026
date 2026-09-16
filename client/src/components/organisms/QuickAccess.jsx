import { useState } from "react";
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
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Lleva el término a /buscar, que lo toma de la URL y muestra los resultados.
  const handleSearch = () => {
    const termino = query.trim();
    if (termino) navigate(`/buscar?q=${encodeURIComponent(termino)}`);
  };

  return (
    <section className="px-5 pt-4 pb-6">
      {/* Encabezado + buscador */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
        <h2 className="text-lg font-bold text-negro-txt">Accesos Rápidos</h2>
        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Escribe algo para buscar...."
            className="outline-none px-3 py-1.5 text-sm text-gray-600 w-44"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Buscar en el asistente"
          />
          <button
            onClick={handleSearch}
            aria-label="Ejecutar búsqueda"
            className="bg-gray-800 text-white px-3 py-2 text-sm hover:bg-gray-700 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <p className="text-xs text-negro-txt mb-4">
        Aqui puedes encontrar accesos rapidos al aplicativo
      </p>

       {/* Grid 3×2 */}
       <div className="w-full">
        <div className="grid grid-cols-3 gap-3 w-full">
          {QUICK_ITEMS.map((item) => (
            <QuickAccessItem key={item.id} {...item} onClick={() => navigate(item.path)} />
          ))}
        </div>
       </div>
    </section>
  );
}
