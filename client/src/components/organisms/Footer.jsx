import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gris-bg2 px-4 md:px-8 py-8 md:py-5 flex flex-col md:flex-row text-center md:text-left justify-between gap-8 md:gap-6 w-full mx-auto ">

      {/* Contact info */}
      <div className="w-full md:min-w-50">
        <p className="font-extrabold text-sm text-gray-900 mb-2">
          Contáctanos
        </p>
        <p className="text-sm font-semibold text-gray-900 mb-1">
          Campus Laureles: Circular 1a 70-01 
        </p>
        <a href="tel:+576044488388" className="block text-sm font-semibold text-gray-900 underline mb-0.5">
          +57 604 448 83 88
        </a>
        <a href="tel:3136035630" className="block text-sm font-semibold text-gray-900 underline mb-0.5">
          313 603 56 30
        </a>
        <a href="mailto:asesoria.integral@upb.edu.co" className="block text-sm font-semibold text-gray-900 underline">
          asesoria.integral@upb.edu.co
        </a>
      </div>

      {/* Logo UPB + Legal info */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src="upb-b.png"
          alt="UPB Logo Blanco Y negro"
          className="h-12 md:h-14 w-auto object-contain mb-2 md:mb-0"
        />
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-900">
            Nit UPB: 890.902.922-6.
          </p>
          
          <p className="text-sm text-gray-900">
            Otorgado por el Ministerio de Educación Nacional.
          </p>
          
          <p className="text-sm font-semibold text-gray-900">
            © Todos los derechos reservados, 2025
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

