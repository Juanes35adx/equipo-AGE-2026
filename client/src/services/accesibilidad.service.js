// Preferencias de accesibilidad (HU-28): tamaño del texto y alto contraste, guardados en el navegador.
// Se aplican al arrancar la app (main.jsx), no solo al abrir el panel de accesibilidad.

const CLAVE_ESCALA = "font-scale";
const CLAVE_CONTRASTE = "contrast-mode";

/** @returns {number} Escala guardada del texto (1 = 100 %). */
export function leerEscala() {
  try {
    const guardada = parseFloat(localStorage.getItem(CLAVE_ESCALA));
    if (guardada > 0) return guardada;
  } catch {
    // almacenamiento bloqueado: usa el valor base
  }
  return 1;
}

/** Aplica y guarda la escala del texto. @param {number} escala */
export function aplicarEscala(escala) {
  document.documentElement.style.fontSize = `${escala * 16}px`;
  try {
    localStorage.setItem(CLAVE_ESCALA, escala);
  } catch {
    // ignorar: el ajuste visual ya se aplicó
  }
}

/** @returns {boolean} Si el alto contraste quedó activado. */
export function leerContraste() {
  try {
    return localStorage.getItem(CLAVE_CONTRASTE) === "1";
  } catch {
    return false;
  }
}

/** Aplica y guarda el modo de contraste. @param {boolean} alto */
export function aplicarContraste(alto) {
  document.documentElement.style.setProperty("--bg-runtime", alto ? "#000" : "#ffffff");
  document.documentElement.style.setProperty("--color-negro-txt", alto ? "#ffffff" : "#000");
  // La clase cubre los colores fijos (bg-gray-100, text-gray-800...) que no usan las variables.
  document.documentElement.classList.toggle("alto-contraste", alto);
  try {
    localStorage.setItem(CLAVE_CONTRASTE, alto ? "1" : "0");
  } catch {
    // ignorar: el ajuste visual ya se aplicó
  }
}

/** Aplica lo que el usuario dejó elegido la última vez. */
export function aplicarPreferenciasGuardadas() {
  aplicarEscala(leerEscala());
  aplicarContraste(leerContraste());
}
