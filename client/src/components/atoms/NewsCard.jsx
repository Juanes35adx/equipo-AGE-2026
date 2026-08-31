import { useState } from "react";

export default function NewsCard({ image, fallbackBg = "#c9bfb0", title, description, renderImage }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-w-40 rounded-xl overflow-hidden shadow-sm shrink-0 shadow-negro-txt hover:cursor-pointer">
      {/* Zona de imagen */}
      {renderImage ? (
        renderImage()
      ) : imgError || !image ? (
        <div className="w-full h-24" style={{ background: fallbackBg }} />
      ) : (
        <a href="">
          <img
          src={image}
          alt={title}
          className="w-full h-24 object-cover"
          onError={() => setImgError(true)}
          />
        </a>
        
      )}

      {/* Texto */}
      <div className="p-2.5">
        <h3 className="text-xs font-bold text-negro-txt mb-1 leading-snug">{title}</h3>
        <p className="text-[0.75rem] text-negro-txt leading-snug">{description}</p>
      </div>
    </div>
  );
}