import { useEffect, useState } from "react";
import { getFaqs } from "../services/faqs.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          <div style={styles.list}>
            {faqs.map((f) => (
              <div key={f.id} style={styles.card}>
                <p style={styles.pregunta}>{f.pregunta}</p>
                <p style={styles.respuesta}>{f.respuesta}</p>
                {f.link_oficial && (
                  <a href={f.link_oficial} target="_blank" rel="noreferrer" style={styles.link}>
                    Ver en página oficial →
                  </a>
                )}
              </div>
            ))}
          </div>
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
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem" },
  pregunta: { fontWeight: 500, fontSize: "15px", margin: "0 0 8px 0" },
  respuesta: { fontSize: "14px", color: "#555", margin: "0 0 8px 0" },
  link: { fontSize: "13px", color: "#0066cc" },
};