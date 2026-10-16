import { useState, useRef, useEffect } from "react";
import tagListData from "../../data/tagList.json"

/**
 * Botón "+" con el catálogo de etiquetas (HU-12).
 * Cada etiqueta se activa o desactiva con un clic; la lista queda abierta para poder
 * combinar varias, y se cierra al tocar fuera.
 *
 * @param {string[]} seleccionadas Etiquetas activas.
 * @param {Function} onToggle      Recibe la etiqueta tocada.
 * @param {Function} [onAbrir]     Se llama al abrir la lista (la búsqueda la usa para reiniciarse).
 * @param {Set<string>} [disponibles] Etiquetas que tienen sentido con las ya elegidas; las demás se apagan.
 */
export default function TagPicker({ seleccionadas = [], onToggle, onAbrir, disponibles }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const alternarLista = () => {
    if (!open) onAbrir?.();
    setOpen((v) => !v);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={alternarLista}
        aria-label="Filtrar por etiquetas"
        aria-expanded={open}
        className={`w-9 h-9 flex items-center justify-center rounded-sm border text-xl transition-colors text-negro-txt cursor-pointer
          ${open ? "bg-gris-bg2 border-negro-txt text-negro-txt" : "border-negro-txt hover:bg-gris-bg2"}`}
      >
        +
      </button>

      {open && (
        <search className=" bg-blanco-bg absolute left-0 top-[calc(100%+6px)] w-64 border border-negro-txt rounded-sm shadow-sm p-3 z-50">
          <p className="m-0 mb-2 text-[0.7rem] text-griso-prf">Elige una o varias etiquetas; las tachadas no combinan con las que ya elegiste</p>
          <div className="flex flex-wrap gap-1.5">
            {tagListData.map(tag => {
              const activa = seleccionadas.includes(tag);
              // Apagada si sumarla a las ya elegidas no dejaría ninguna sección.
              const apagada = !activa && disponibles != null && !disponibles.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggle?.(tag)}
                  disabled={apagada}
                  title={apagada ? "No hay secciones con esta combinación" : undefined}
                  aria-pressed={activa}
                  className={`px-2.5 py-0.5 rounded-sm text-xs border transition-colors cursor-pointer ${
                    activa
                      ? "bg-[#111] border-[#111] text-white"
                      : apagada
                        ? "border-gris-bg2 text-negro-txt/30 cursor-not-allowed line-through"
                        : "border-gris-bg2 text-negro-txt hover:border-negro-txt"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </search>
      )}
    </div>
  );
}
