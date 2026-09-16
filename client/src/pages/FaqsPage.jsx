import { useEffect, useMemo, useState } from "react";
import { getFaqs, agruparPorCategoria, filtrarFaqs } from "../services/faqs.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  // Las categorías de los botones salen de todas las preguntas, no de las filtradas,
  // para que no desaparezcan al buscar.
  const categorias = useMemo(() => agruparPorCategoria(faqs), [faqs]);

  // Las preguntas llegan ya ordenadas por `orden`; aquí se filtran y se reparten por categoría.
  const grupos = useMemo(
    () => agruparPorCategoria(filtrarFaqs(faqs, busqueda, categoria)),
    [faqs, busqueda, categoria]
  );

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

        {!loading && faqs.length > 0 && (
          <div style={styles.filtros}>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar una pregunta..."
              aria-label="Buscar en las preguntas frecuentes"
              style={styles.buscador}
            />
            <div style={styles.chips} role="group" aria-label="Filtrar por categoría">
              {[{ categoria: "", titulo: "Todas" }, ...categorias].map((c) => {
                const activa = categoria === c.categoria;
                return (
                  <button
                    key={c.categoria || "todas"}
                    onClick={() => setCategoria(c.categoria)}
                    aria-pressed={activa}
                    style={{ ...styles.chip, ...(activa ? styles.chipActiva : {}) }}
                  >
                    {c.titulo}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!loading && faqs.length > 0 && grupos.length === 0 && (
          <div style={styles.vacio}>
            <p style={styles.vacioTexto}>No encontramos preguntas que coincidan con tu búsqueda.</p>
            <div style={styles.vacioAcciones}>
              <button
                onClick={() => { setBusqueda(""); setCategoria(""); }}
                style={styles.dudasBtn}
              >
                Ver todas las preguntas
              </button>
              <button
                onClick={() => navigate("/foro", { state: { tituloSugerido: busqueda.trim() } })}
                style={styles.dudasBtn}
              >
                Preguntar en el foro
              </button>
            </div>
          </div>
        )}

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
  filtros: { display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" },
  buscador: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#242424",
    outline: "none",
    boxSizing: "border-box",
  },
  chips: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  chip: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "999px",
    padding: "6px 14px",
    fontSize: "13px",
    color: "#333",
    cursor: "pointer",
  },
  chipActiva: { background: "#111", borderColor: "#111", color: "#fff" },
  vacio: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  },
  vacioTexto: { fontSize: "14px", color: "#555", margin: "0 0 12px 0" },
  vacioAcciones: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" },
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