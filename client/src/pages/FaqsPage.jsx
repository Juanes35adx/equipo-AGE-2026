import { useEffect, useMemo, useState } from "react";
import { getFaqs, agruparPorCategoria } from "../services/faqs.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Las preguntas llegan ya ordenadas por `orden`; aquí solo se reparten por categoría.
  const grupos = useMemo(() => agruparPorCategoria(faqs), [faqs]);

  useEffect(() => {
    getFaqs()
      .then(setFaqs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header />
      <main style={styles.container}>
        <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
        <h1 style={styles.title}>Preguntas Frecuentes</h1>
        {loading ? <p>Cargando...</p> : (
          grupos.map((grupo) => (
            <section key={grupo.categoria} style={styles.grupo}>
              <h2 style={styles.categoria}>
                {grupo.titulo}
                <span style={styles.conteo}>{grupo.preguntas.length}</span>
              </h2>

              <div style={styles.list}>
                {grupo.preguntas.map((f) => (
                  <div key={f.faq_id ?? f.id} style={styles.card}>
                    <p style={styles.pregunta}>{f.pregunta}</p>
                    <p style={styles.respuesta}>{f.respuesta}</p>
                    {f.link_oficial && (
                      <a href={f.link_oficial} target="_blank" rel="noreferrer" style={styles.link}>
                        Ver en página oficial →
                      </a>
                    )}
                    <button
                      onClick={() =>
                        navigate("/foro", {
                          state: { tituloSugerido: f.pregunta, contenidoSugerido: f.respuesta },
                        })
                      }
                      style={styles.dudasBtn}
                    >
                      ¿Aún con dudas?
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))
      )}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "700px", margin: "0 auto" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, marginBottom: "1.5rem" },
  grupo: { marginBottom: "2rem" },
  categoria: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#242424",
    margin: "0 0 0.75rem 0",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  conteo: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#666",
    background: "#f0f0f0",
    borderRadius: "999px",
    padding: "1px 8px",
  },
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem" },
  pregunta: { fontWeight: 500, fontSize: "15px", margin: "0 0 8px 0" },
  respuesta: { fontSize: "14px", color: "#555", margin: "0 0 8px 0" },
  link: { fontSize: "13px", color: "#0066cc", display: "block", marginBottom: "10px" },
  dudasBtn: {
    background: "none",
    border: "1px solid #ccc",
    borderRadius: "999px",
    padding: "6px 14px",
    fontSize: "12px",
    color: "#333",
    cursor: "pointer",
  },
};