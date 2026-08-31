import { useState, useRef, useEffect } from "react";
import tagListData from "../../data/tagList.json"

export default function TagPicker({ onTagSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-9 h-9 flex items-center justify-center rounded-sm border text-xl transition-colors text-negro-txt cursor-pointer
          ${open ? "bg-gris-bg2 border-negro-txt text-negro-txt" : "border-negro-txt hover:bg-gris-bg2"}`}
      >
        +
      </button>

      {open && (
        <search className=" bg-blanco-bg absolute left-0 top-[calc(100%+6px)] w-64 border border-negro-txt rounded-sm shadow-sm p-3 z-50">
          <div className="flex flex-wrap gap-1.5">
            {tagListData.map(tag => (
              <button
                key={tag}
                onClick={() => { onTagSelect(tag); setOpen(false); }}
                className="px-2.5 py-0.5 rounded-sm text-xs border border-gris-bg2 text-negro-txt hover:border-negro-txt hover:text-negro-txt transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </search>
      )}
    </div>
  );
}