import AccessOpts from "./AccessOpts";
import React, {useState, useEffect, useRef} from "react";

export default function AccessButton(){
    const img = "/accesibilidad.png"
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [isOpen]);

    return(
        <div className="relative" ref={ref}>
            <img
                src={img}
                alt="Accesibilidad"
                role="button"
                tabIndex={0}
                aria-label="Opciones de accesibilidad"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                className="w-8 h-8 md:min-w-11 md:h-11 object-contain cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-negro-txt translate-y-px"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            />
            {isOpen && (
                <div className="absolute top-12 left-0 z-50">
                    <AccessOpts />
                </div>
            )}
        </div>
    )
}
