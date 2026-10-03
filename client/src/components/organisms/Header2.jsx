import React from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import Button from "../atoms/Button";
import { useMenu } from "../../context/MenuContext";
import AccessButton from '../atoms/AccessButton';

const Header2 = () => {
  const navigate = useNavigate();
  const { toggleMenu } = useMenu();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };


  return (
    <header className="sticky top-0 z-50 border-b border-negro-txt px-2 md:px-4 py-2 md:py-4 w-full">
      {/* Sin w-full + mx-4: juntos medían 100 % + 16 px y en celular la página se desbordaba hacia el lado */}
      <div className="flex items-center justify-between h-14 md:h-16">

        {/* Left: UPB Logo */}
          
          <img
          src="upb.png"
          alt="UPB Logo"
          className="h-10 md:h-14 w-auto object-contain cursor-pointer ml-6 md:ml-8"
          onClick={() => navigate("/dashboard")}
          />

        {/* Right: Buttons (Perfil and Menú) */}
        <div className="flex items-center px-1">
          <AccessButton />
          <Button
            text="Perfil"
            onClick={() => navigate("/perfil")}
            variant="header"
          />
          <Button
            text="Menú"
            onClick={toggleMenu}
            variant="header"
          />
        </div>

      </div>
    </header>
  );
};
  
export default Header2;
