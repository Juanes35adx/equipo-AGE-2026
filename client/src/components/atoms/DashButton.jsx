export default function QuickAccessItem({ id, label, icon, onClick }) {
  return (
    <button
      onClick={() => onClick?.(id)}
      aria-label={label}
      className="group aspect-square w-full flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-2xl bg-rosa-menu p-1 sm:p-3 shadow-sm ring-1 ring-black/5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rojo-enf"
    >
      {/* El ícono llega con tamaño fijo; aquí se escala según el ancho del botón */}
      <span className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 [&>svg]:w-full [&>svg]:h-full">
        {icon}
      </span>
      <span className="text-xs sm:text-base md:text-lg font-bold text-negro-txt text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
