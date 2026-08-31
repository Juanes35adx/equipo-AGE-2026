import NewsCard from "../atoms/NewsCard"
import { useState } from "react";

const DEFAULT_NEWS = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Hands_of_God_and_Adam.jpg/250px-Hands_of_God_and_Adam.jpg",
    title: "Convocatoria Diálogos Arte, Ciencia y Humanidades",
    description:
      "Tu investigación puede transformar, ¿Qué esperas para compartirla e inspirar a la comunidad UPB?",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29muy1uYtuHQ3FQam38EA744hesApDd247ldnuR9IAvjTXLZMN2WbxiD785K0Z2WM78hpI8uFxlx8Oros0KK0LKuqP1piSXZaENXl_MLMqGohXjg&s=10&ec=121638480",
    title: "Global Game Jam 2026",
    description:
      "¡Prepárate para sumergirte en un fin de semana extraordinario en el Global Game Jam UPB 2026!",
  },
  {
    image: "https://thumbs.dreamstime.com/b/bolas-del-bingo-17846216.jpg",
    title: "Gran Bingo Comunitario",
    description:
      "Estudiantes se unen en gran evento comunitario en la Universidad Pontificia Bolivariana",
  },
];

export default function NewsCarousel({ items = DEFAULT_NEWS }) {
  return (
    <section className="px-5 pt-6 pb-2">
      <h2 className="text-lg font-bold text-negro-txt mb-4">Novedades - Noticias</h2>
      <div
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}