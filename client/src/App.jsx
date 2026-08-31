import AppRouter from "./routes/AppRouter";
import { MenuProvider, useMenu } from "./context/MenuContext";
import Menu from "./components/organisms/Menu";
import { useNavigate } from "react-router-dom";

const AppContent = () => {
  const { isMenuOpen, closeMenu } = useMenu();
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
    closeMenu();
  };

  return (
    <>
       <Menu 
         isOpen={isMenuOpen} 
         onClose={closeMenu} 
         onNavigate={handleNavigate} 
       />
       <AppRouter onNavigate={handleNavigate} />
    </>
  );
};

export default function App() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  );
}
