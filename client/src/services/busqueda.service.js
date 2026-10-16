/**
 * Búsqueda de secciones de la app (HU-10, HU-11, HU-12). No consulta la base:
 * filtra el índice local `data/searchIndex.json`, así que responde al instante.
 */

/** Pasa a minúsculas y quita tildes, para que "programacion" encuentre "programación". */
export function normalizar(texto) {
  return (texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Filtra las secciones por texto libre y por etiquetas.
 *
 * - Texto: cada palabra tiene que aparecer en el título, la descripción o las etiquetas
 *   de la sección (así "ayuda mapa" escrito a mano no exige la frase exacta).
 * - Etiquetas: se acumulan afinando la búsqueda; la sección tiene que tener todas las
 *   etiquetas elegidas. Para que nunca se llegue a 0 resultados, la lista de etiquetas
 *   solo deja elegir las que tienen sentido con las ya elegidas (ver etiquetasCompatibles).
 * - Si hay texto y etiquetas a la vez, la sección tiene que cumplir las dos cosas.
 *
 * @param {Array<{title: string, description: string, tags: string[]}>} indice Secciones.
 * @param {string} texto Lo que escribió el usuario.
 * @param {string[]} etiquetas Etiquetas activas.
 * @returns {Array} Secciones que coinciden.
 */
export function buscarSecciones(indice, texto, etiquetas = []) {
  const palabras = normalizar(texto).split(/\s+/).filter(Boolean);
  const activas = etiquetas.map(normalizar);
  if (palabras.length === 0 && activas.length === 0) return [];

  return indice.filter((seccion) => {
    const etiquetasSeccion = seccion.tags.map(normalizar);
    const contenido = [normalizar(seccion.title), normalizar(seccion.description), ...etiquetasSeccion].join(" ");
    const cumpleTexto = palabras.every((p) => contenido.includes(p));
    const cumpleEtiquetas = activas.every((e) => etiquetasSeccion.includes(e));
    return cumpleTexto && cumpleEtiquetas;
  });
}

/**
 * Etiquetas que se pueden sumar a la búsqueda actual sin quedarse en 0 resultados.
 * Con nada elegido, son todas las que tienen al menos una sección; con "ayuda" elegida,
 * solo las que comparten sección con "ayuda" (preguntas, faq, tutoria…), no "mapa".
 *
 * @param {Array} indice Secciones.
 * @param {string} texto Texto escrito.
 * @param {string[]} etiquetas Etiquetas ya elegidas.
 * @param {string[]} catalogo Todas las etiquetas.
 * @returns {Set<string>} Etiquetas del catálogo que se pueden elegir.
 */
export function etiquetasCompatibles(indice, texto, etiquetas, catalogo) {
  return new Set(
    catalogo.filter(
      (tag) => etiquetas.includes(tag) || buscarSecciones(indice, texto, [...etiquetas, tag]).length > 0
    )
  );
}
