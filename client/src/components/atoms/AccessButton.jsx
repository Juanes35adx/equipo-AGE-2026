import AccessOpts from "./AccessOpts";
import React, {useState} from "react";

export default function AccessButton(){
    const img = "/accesibilidad.png"
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative">
            <img
                src={img}
                alt="Accesibilidad"
                className="w-8 h-8 md:min-w-11 md:h-11 object-contain cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-negro-txt translate-y-px"
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className="absolute top-12 left-0 z-50">
                    <AccessOpts />
                </div>
            )}
        </div>
    )
}
