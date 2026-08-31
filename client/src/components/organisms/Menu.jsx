import { useEffect, useRef } from "react";
import Button from "../atoms/Button"; 
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const NAV_ITEMS = [
  { label: "Buscar",       route: "/buscar" },
  { label: "Perfil",       route: "/perfil" },
  { label: "Foro",         route: "/foro" },
  { label: "Actividades",  route: "/actividades" },
  { label: "Dashboard",    route: "/dashboard" },
  { label: "FAQs",         route: "/faqs" },
  { label: "Mentores",     route: "/mentores" },
  { label: "Mapa",         route: "/mapa" },
];
 
/**
 * SidebarNav organism
 *
 * Props:
 *   isOpen(bool) – controlled open state
 *   onClose(fn) – called when user clicks the overlay
 *   onNavigate(fn) – called with the route string when a nav item is clicked
 */
export default function SidebarNav({ isOpen, onClose, onNavigate }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
      await logout();
      navigate("/LogOut");
    };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
 
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
 
  return (
    <>
      {/* ── Overlay ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-51 bg-[#1e0a14]/25 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
 
      {/* ── Sidebar panel ── */}
      <nav
        ref={sidebarRef}
        aria-label="Menú principal"
        className={[
          "fixed top-0 right-0 z-52 h-full w-67.5",
          "border-l border-blanco-bg",
          "flex flex-col",
          "shadow-[0.25rem_0_2rem_rgba(168,0,100,0.08)]",
          "transition-transform duration-350 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* UPB Logo */}
        <div className="flex justify-center items-center pt-8 pb-6 px-6">
            <img
                src="upb.png"
                alt="UPB Logo"
                className="h-14 w-auto object-contain"
            />
        </div>
 
        {/* Divider */}
        <div className="mx-6 h-px bg-linear-to-r from-transparent via-pink-200 to-transparent mb-4" />
 
        {/* Scrollable Page List */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2
                        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#e0d4d8]">
          <ul className="space-y-3">
            {NAV_ITEMS.map(({ label, route }, i) => (
              <li
                key={route}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-0.75rem)",
                  transition: `opacity 0.28s ${0.04 + i * 0.04}s,
                               transform 0.28s ${0.04 + i * 0.04}s`,
                }}
              >
                <Button
                  text={label}
                  onClick={() => { onNavigate(route); onClose(); }}
                  variant="menu"
                />

              </li>
              
            ))}
            <Button 
                  text="Cerrar Sesión"
                  onClick={handleLogout}
                  variant="menu"
                />
          </ul>
        </div>
      </nav>
    </>
  );
}