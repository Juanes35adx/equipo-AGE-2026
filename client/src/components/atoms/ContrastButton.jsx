import "../../index.css"
import Button from "./Button"
import { useEffect, useState } from "react";

const CONTRAST_KEY = "contrast-mode";

function leerContrasteInicial() {
    try {
        return localStorage.getItem(CONTRAST_KEY) === "1";
    } catch {
        return false;
    }
}

function aplicarContraste(alto) {
    if (alto) {
        document.documentElement.style.setProperty('--bg-runtime', '#000');
        document.documentElement.style.setProperty('--color-negro-txt', '#ffffff');
    } else {
        document.documentElement.style.setProperty('--bg-runtime', '#ffffff');
        document.documentElement.style.setProperty('--color-negro-txt', '#000');
    }
}

export default function ContrastButton() {
    const [altoContraste, setAltoContraste] = useState(leerContrasteInicial);

    useEffect(() => {
        aplicarContraste(altoContraste);
    }, [altoContraste]);

    function toggleBg() {
        const activar = !altoContraste;
        setAltoContraste(activar);
        try {
            localStorage.setItem(CONTRAST_KEY, activar ? "1" : "0");
        } catch {
            // ignorar: el ajuste visual ya se aplicó
        }
    }

    return (
        <Button
            text="🌓"
            onClick={toggleBg}
            variant="secondary"
        />
    );
}
