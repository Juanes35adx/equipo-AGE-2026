import { useState, useEffect } from "react";
import Header from "../components/organisms/Header2";
import Footer from "../components/organisms/Footer";
import PostContent from "../components/atoms/PostContainer"
import ThreadModal from "../components/organisms/ModalForo";
import Answer from "../components/organisms/Ans";                     
import { getPosts, createPost, getRespuestas, createRespuesta, deleteRespuesta } from "../services/foro.service";


const ThumbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
  </svg>
);

export default function Foro() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [postSeleccionado, setPostSeleccionado] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    getPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  const handleCrearPost = async (e) => {
    e.preventDefault();
    if (!titulo || !contenido) return;
    await createPost(titulo, contenido);
    setTitulo("");
    setContenido("");
    getPosts().then(setPosts);
  };

const handleVerPost = (post) => {
  if (!post?.post_id) return;          // ← keep this safety check
  setPostSeleccionado(post);
  getRespuestas(post.post_id).then(setRespuestas);
};

const handleResponder = async (e) => {
  e.preventDefault();
  if (!respuesta || !postSeleccionado?.post_id) return;   // ← same guard
  await createRespuesta(postSeleccionado.post_id, respuesta);
  setRespuesta("");
  getRespuestas(postSeleccionado.post_id).then(setRespuestas);
};

const handleEliminarRespuesta = async (respuestaId) => {
  if (!postSeleccionado?.post_id) return;                 // ← same guard
  await deleteRespuesta(respuestaId);
  getRespuestas(postSeleccionado.post_id).then(setRespuestas);
};



  const handleLike = (postId) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div>
      <Header />
      
      <div className="px-10 py-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-negro-txt mb-2">Bienvenido al Foro comunitario</h2>
            <p className="text-sm text-negro-txt">
              Aquí podrás publicar dudas generales que tengas para que la comunidad UPB te responda.
            </p>
          </div>
          <div className="w-36 h-28 rounded-xl overflow-hidden bg-gray-200 shrink-0">
            <img
              src="src/assets/students-upb.png"
              alt="Estudiantes UPB"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add("flex", "items-center", "justify-center");
                e.target.parentElement.innerHTML = '<span class="text-gray-400 text-xs text-center p-2">📚 Estudiantes UPB</span>';
              }}
            />
          </div>
        </div>

        {/* Reminder section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-negro-txt mb-2">Recuerda que....</h3>
          <p className="text-sm text-negro-txt">
            Ante toda duda puedes también utilizar el medio de preguntas frecuentes en el cual puedes preguntar directamente a la asesoría integral
          </p>
        </div>

        {/* Create-post form */}
        <form onSubmit={handleCrearPost} className="flex flex-col gap-2 mb-6">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de tu pregunta"
            required
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-negro-txt outline-none"
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Describe tu duda..."
            required
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none text-negro-txt min-h-20 resize-y"
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition"
          >
            Publicar
          </button>
        </form>

        {/* Posts list — using PostContent for the avatar+name layout */}
        <div className="flex flex-col gap-3 mb-6">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            posts.map((p) => (
              <div
                key={p.post_id}
                className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl border border-gray-200"
              >
                {/* PostContent handles avatar + stacked name */}
                <div className="flex-1 min-w-0">
                  <PostContent name={p.profiles?.full_name || "?"}>
                    <p className="text-sm font-medium text-gray-800 leading-snug mb-2">
                      {p.titulo}
                    </p>
                    <button
                      onClick={() => handleVerPost(p)}
                      className="px-4 py-1 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-700 transition cursor-pointer"
                    >
                      Responder
                    </button>
                  </PostContent>
                </div>

                {/* Like button */}
                <button
                  onClick={() => handleLike(p.post_id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    likes[p.post_id]
                      ? "bg-red-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                  aria-label="Me gusta"
                >
                  <ThumbIcon />
                </button>
              </div>
            ))
          )}
        </div>

        <button className="block mx-auto px-8 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition">
          Mostrar Mas...
        </button>

        {/* Thread modal — using the ThreadModal component */}
        {postSeleccionado && (
          <ThreadModal
            post={{
              author: postSeleccionado.profiles?.full_name || "?",
              question: postSeleccionado.titulo,
              meta: `${postSeleccionado.profiles?.full_name || ""} · ${new Date(
                postSeleccionado.fecha
              ).toLocaleDateString()}`,
              contenido: postSeleccionado.contenido,
            }}
            answers={respuestas.map((r) => ({
              author: r.profiles?.full_name || "?",
              answer: r.contenido,
              respuesta_id: r.respuesta_id,
            }))}
            onClose={() => setPostSeleccionado(null)}
            onRespond={handleResponder}
            respuesta={respuesta}
            setRespuesta={setRespuesta}
            onDeleteAnswer={handleEliminarRespuesta}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}