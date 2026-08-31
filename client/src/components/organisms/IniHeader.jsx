import React from 'react';
import AccessButton from '../atoms/AccessButton';

const IniHeader = () => {
  return (
<header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 w-full">
  <div className="flex items-center justify-between w-full h-16">

    {/* Left: Accessibility button */}
    <div className="flex flex-col items-center">
      <AccessButton />
      <span className="text-[0.625rem] text-negro-txt font-bold mt-0.5">
        Accesibilidad
      </span>
    </div>

    {/* Center: Logo UPB */}
    <img
      src="upb.png"
      alt="UPB Logo"
      className="h-14 w-auto object-contain"
    />

    {/* Right: empty balancer */}
    <div className="w-15" />

  </div>
</header>
  );
};

export default IniHeader;