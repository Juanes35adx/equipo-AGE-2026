export default function Button({ text, onClick, type = "button", disabled = false, variant = "primary" }) {
  const variants = {
    primary: "bg-black text-blanco-bg border-negro-txt hover:bg-griso-prf px-4 py-2.5 font-medium text-[0.9375rem] rounded-lg",
    secondary: "bg-transparent text-negro-txt/80 border border-gris-bg2 hover:bg-rosa-menu px-4 py-2.5 font-medium text-[0.9375rem] rounded-lg mb-2",
    header: "bg-rojo-enf text-blanco-bg border-transparent hover:opacity-70 px-3 md:px-7 py-1.5 font-bold text-[0.875rem] md:text-[1.25rem] ml-1 md:ml-10 hover:shadow-negro-txt translate-y-px rounded-lg",
    menu: "bg-rosa-menu font-bold text-griso-prf border-transparent py-3 rounded-3xl text-[1.25rem] mb-5",
    menu2: "bg-rojo-enf font-bold text-blanco-bg border-transparent py-3 rounded-3xl text-[1.25rem] mb-5"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        w-full border transition-all duration-300 hover:-translate-y-0.5
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
      `}
    >
      {text}
    </button>
  );
}