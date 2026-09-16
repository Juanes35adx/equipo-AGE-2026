import { useState } from "react";
import fallbackImg from "../../assets/students-upb.png";

export default function NewsCard({ image, fallbackBg = "#c9bfb0", title, description, renderImage }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = imgError || !image;

  return (
    <div className="w-64 sm:w-72 lg:w-auto lg:basis-72 lg:grow rounded-xl overflow-hidden shadow-sm shrink-0 snap-start flex flex-col shadow-negro-txt hover:cursor-pointer">
      {/* Zona de imagen */}
      {renderImage ? (
        renderImage()
      ) : (
        <div className="w-full h-40 shrink-0" style={{ background: fallbackBg }}>
          <img
            src={showFallback ? fallbackImg : image}
            alt={title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-40 object-cover aspect-[4/3]"
            onError={() => { if (!imgError) setImgError(true); }}
          />
        </div>
      )}

      {/* Texto */}
      <div className="p-4 flex flex-col gap-1.5 grow">
        <h3 className="text-base font-bold text-negro-txt mb-1 leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-negro-txt/70 leading-relaxed line-clamp-3 min-h-[3.5rem]">{description}</p>
      </div>
    </div>
  );
}