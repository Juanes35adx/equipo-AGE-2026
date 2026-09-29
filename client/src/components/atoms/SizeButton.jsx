import Button from "./Button";
import React,  {useState} from "react";
import { useEffect } from "react";

function leerEscalaInicial() {
    try {
        const saved = localStorage.getItem('font-scale');
        if (saved) return parseFloat(saved);
    } catch {
        // SSR o almacenamiento bloqueado: usa el valor base
    }
    return 1;
}

export default function SizeButton(){
    const [scale, setScale] = useState(leerEscalaInicial);

    useEffect(() => {
        document.documentElement.style.fontSize = `${scale * 16}px`;
        try {
            localStorage.setItem('font-scale', scale);
        } catch {
            // ignorar: el ajuste visual ya se aplicó
        }
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
