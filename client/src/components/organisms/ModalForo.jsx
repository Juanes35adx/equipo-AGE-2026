import { useState } from "react";
import PostContent from "../atoms/PostContainer";
import Answer from "../organisms/Ans";

const ThreadModal = ({ post, answers, onClose, onRespond, respuesta, setRespuesta, onDeleteAnswer }) => {

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <modal className="bg-blanco-bg rounded-xl border border-gray-200 w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col gap-4 p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-900 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          ✕
        </button>

        <modal className="bg-blanco-bg border border-gray-200 rounded-lg p-3">
          <PostContent name={post.author}>
            <p className="text-sm font-medium text-negro-txt leading-snug">
              {post.question}
            </p>
            {post.contenido && (
              <p className="text-sm text-negro-txt/80 mt-1 leading-snug">
                {post.contenido}
              </p>
            )}
            <p className="text-[0.6875rem] text-negro-txt/80 mt-1">{post.meta}</p>
          </PostContent>
        </modal>

        <form onSubmit={onRespond} className="flex flex-col gap-2 mt-4">
          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe tu respuesta..."
            required
            className="w-full min-h-20 border border-gray-200 rounded-lg px-3 py-2 text-sm text-negro-txt/80 placeholder-gray-300 resize-y focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 bg-gray-900 text-blanco-bg text-xs font-medium rounded-full hover:bg-gray-700 transition cursor-pointer"
            >
              Publicar
            </button>
          </div>
        </form>

        <hr className="border-gray-100" />
        <p className="text-[0.9375rem] font-medium text-negro-txt border-negro-txt">Respuestas</p>

        <div className="flex flex-col gap-3">
          {answers.map((a, i) => (
            <Answer
              key={i}
              author={a.author}
              answer={a.answer}
              onDelete={() => onDeleteAnswer(a.respuesta_id)}
            />
          ))}
        </div>

        <div className="flex justify-center pt-1">
          <button className="bg-rojo-enf/60 hover:bg-rojo-enf text-white text-sm font-medium px-7 py-2 rounded-full transition-colors cursor-pointer">
            Cargar más
          </button>
        </div>
      </modal>
    </div>
  );
};

export default ThreadModal;
