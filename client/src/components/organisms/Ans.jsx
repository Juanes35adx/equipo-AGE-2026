import PostContent from "../atoms/PostContainer";

/**
 * Answer
 * Muestra una respuesta del foro y, debajo, las respuestas anidadas que cuelgan
 * de ella. Se dibuja a sí misma de forma recursiva por cada nivel.
 *
 * @param {object}   respuesta    Respuesta con author, answer, respuesta_id e hijas.
 * @param {Function} onResponder  Se llama con la respuesta a la que se quiere contestar.
 * @param {number}   [nivel=0]    Profundidad actual, solo para la sangría.
 */
const Answer = ({ respuesta, onResponder, nivel = 0 }) => (
  <div className={nivel > 0 ? "ml-5 border-l-2 border-gray-200 pl-3" : ""}>
    <div className="bg-inherit border border-gray-200 rounded-lg p-3 flex flex-col gap-3">
      <PostContent name={respuesta.author}>
        <p className="text-sm text-negro-txt leading-relaxed pt-1">{respuesta.answer}</p>
      </PostContent>
      <div className="pl-12">
        <button
          type="button"
          onClick={() => onResponder?.(respuesta)}
          className="px-4 py-1 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          Responder
        </button>
      </div>
    </div>

    {respuesta.hijas?.length > 0 && (
      <div className="mt-2 flex flex-col gap-2">
        {respuesta.hijas.map((h) => (
          <Answer
            key={h.respuesta_id}
            respuesta={h}
            onResponder={onResponder}
            nivel={nivel + 1}
          />
        ))}
      </div>
    )}
  </div>
);

export default Answer;
