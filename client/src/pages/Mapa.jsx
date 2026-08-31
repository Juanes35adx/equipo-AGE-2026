import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"
import MapInfo from "../components/organisms/MapInfo";

export default function Mapa() {
  const [selectedPoi, setSelectedPoi] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
        <Header />
        <main style={styles.container} className='relative min-w-9/10'>
          <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
          <h1 style={styles.title} classname="text-negro-txt">Mapa del Campus UPB</h1>
          <div className="flex flex-col md:flex-row w-full">
 
            {/* ── Map panel ─────────────────────────────────────────────────── */}
            <div className="w-full md:flex-1 h-120 md:h-209">
              <MapInfo onMarkerSelect={setSelectedPoi} />
            </div>
      
            {/* ── Info panel ────────────────────────────────────────────────── */}
            <aside className="w-full md:w-72 h-auto md:h-209 p-6 border-t md:border-t-0 md:border-l border-gray-200 ml-20 overflow-y-auto">
              {selectedPoi ? (
                <>
                  <h2 className="text-lg text-negro-txt mb-2 font-bold">{selectedPoi.name}</h2>
                  {selectedPoi.image && (
                    <img
                      src={selectedPoi.image}
                      alt={selectedPoi.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-sm text-negro-txt mb-3">{selectedPoi.description}</p>
                  <small className="text-xs text-gray-400">
                    {selectedPoi.position.lat.toFixed(6)},{" "}
                    {selectedPoi.position.lng.toFixed(6)}
                  </small>
                </>
              ) : (
                <p className="text-sm text-negro-txt">Selecciona un marcador para conocer los detalles</p>
              )}
            </aside>
      
          </div>
        </main>
        <Footer />
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, marginBottom: "1.5rem" },
  mapWrapper: { borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" },
};