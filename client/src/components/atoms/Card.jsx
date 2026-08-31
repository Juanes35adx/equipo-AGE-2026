import React from "react";

export default function PageCard({ children, footer }) {

  return (
    <div
      className="flex items-center justify-center p-4 relative"
    >
      <div className="relative z-10 w-full max-w-md">
        <nav className=" rounded-2xl px-10 py-12">
          {children}
        </nav>
        {footer && (
          <p className="text-center text-xs text-white/60 mt-5">{footer}</p>
        )}
      </div>
    </div>
  );
}
