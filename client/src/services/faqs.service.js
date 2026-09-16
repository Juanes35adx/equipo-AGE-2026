import { supabase } from "./supabase";

export async function getFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("orden");
  if (error) throw new Error(error.message);
  return data;
}

/** Nombre legible de cada categoría, para no mostrar el valor crudo de la tabla. */
const TITULOS_CATEGORIA = {
  academico: "Académico",
  bienestar: "Bienestar",
  financiero: "Financiero",
  matricula: "Matrícula",
  tramites: "Trámites",
};

/**
 * Agrupa las preguntas por categoría, conservando el orden en que llegaron
 * (que ya viene ordenado por el campo `orden` de la base de datos).
 *
 * @param {Array} faqs Preguntas tal como las devuelve getFaqs().
 * @returns {Array<{categoria: string, titulo: string, preguntas: Array}>}
 */
export function agruparPorCategoria(faqs) {
  const grupos = new Map();

  for (const f of faqs) {
    const categoria = f.categoria ?? "otros";
    if (!grupos.has(categoria)) {
      grupos.set(categoria, {
        categoria,
        titulo: TITULOS_CATEGORIA[categoria] ?? "Otros",
        preguntas: [],
      });
    }
    grupos.get(categoria).preguntas.push(f);
  }

  return [...grupos.values()];
}

/** Pasa a minúsculas y quita tildes, para que "matricula" encuentre "Matrícula". */
function normalizar(texto) {
  return (texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Filtra las preguntas por texto (en la pregunta o la respuesta) y por categoría.
 *
 * @param {Array} faqs Preguntas tal como las devuelve getFaqs().
 * @param {string} texto Lo que escribió el usuario; vacío no filtra.
 * @param {string} categoria Categoría elegida; vacío muestra todas.
 * @returns {Array} Preguntas que cumplen ambos filtros, en el mismo orden.
 */
export function filtrarFaqs(faqs, texto, categoria) {
  const busqueda = normalizar(texto).trim();
  return faqs.filter((f) => {
    const coincideCategoria = !categoria || (f.categoria ?? "otros") === categoria;
    const coincideTexto =
      !busqueda ||
      normalizar(f.pregunta).includes(busqueda) ||
      normalizar(f.respuesta).includes(busqueda);
    return coincideCategoria && coincideTexto;
  });
}