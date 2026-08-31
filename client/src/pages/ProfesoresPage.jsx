import { useEffect, useState } from "react";
import { getProfesores } from "../services/profesores.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"

export default function ProfesoresPage() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfesores()
      .then(setProfesores)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header />

      <main className="max-w-225 mx-auto p-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-sm text-negro-txt/60 hover:text-negro-txt transition bg-transparent border-none cursor-pointer"
        >
          ← Volver
        </button>

        <h1 className="text-[1.8rem] font-medium mb-6 text-negro-txt">
          Profesores
        </h1>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] gap-4">
            {profesores.map((p) => (
              <section
                key={p.id}
                className="bg-blanco-bg border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-1.5"
              >
                <div className="w-12 h-12 rounded-full bg-black border border-white text-blanco-bg flex items-center justify-center text-xl font-medium">
                  {p.nombre.charAt(0)}
                </div>

                <h3 className="text-[0.9375rem] font-medium text-center text-negro-txt m-0">
                  {p.nombre}
                </h3>

                <p className="text-[0.8125rem] text-negro-txt/60 m-0">
                  {p.materia}
                </p>

                <p className="text-xs text-gray-400 m-0">
                  {p.facultad}
                </p>

                <a
                  href={`mailto:${p.email_institucional}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {p.email_institucional}
                </a>

                {p.extension && (
                  <p className="text-xs text-gray-400 m-0">
                    Ext. {p.extension}
                  </p>
                )}
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

