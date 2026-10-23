import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// El hook vive junto a su proveedor; separarlo solo por la recarga en caliente complicaría los imports.
// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};