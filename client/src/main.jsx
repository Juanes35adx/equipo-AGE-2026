import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { aplicarPreferenciasGuardadas } from "./services/accesibilidad.service";

// Tamaño de texto y contraste elegidos antes (HU-28), aplicados antes de dibujar la primera pantalla.
aplicarPreferenciasGuardadas();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);