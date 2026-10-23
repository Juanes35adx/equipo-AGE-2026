import Button from "./Button";
import React,  {useState} from "react";
import { useEffect } from "react";
import { leerEscala, aplicarEscala } from "../../services/accesibilidad.service";

export default function SizeButton(){
    const [scale, setScale] = useState(leerEscala);

    useEffect(() => {
        aplicarEscala(scale);
    }, [scale]);

    return(
        <div aria-live="polite" title={`Tamaño de texto ${Math.round(scale * 100)}%`}>
            <Button
                text="A-"
                onClick={() => setScale(s => Math.max(0.875, s - 0.125))}
                variant="secondary"
            />
            <Button
                text="A+"
                onClick={() => setScale(s => Math.min(1.5, s + 0.125))}
                variant="secondary"
            />
        </div>
    )
}
