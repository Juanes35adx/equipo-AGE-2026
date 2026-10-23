import "../../index.css"
import Button from "./Button"
import { useEffect, useState } from "react";
import { leerContraste, aplicarContraste } from "../../services/accesibilidad.service";

export default function ContrastButton() {
    const [altoContraste, setAltoContraste] = useState(leerContraste);

    useEffect(() => {
        aplicarContraste(altoContraste);
    }, [altoContraste]);

    return (
        <Button
            text="🌓"
            onClick={() => setAltoContraste((alto) => !alto)}
            variant="secondary"
        />
    );
}
