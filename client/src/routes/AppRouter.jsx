import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProfesoresPage from "../pages/ProfesoresPage";
import FaqsPage from "../pages/FaqsPage";
import Mapa from "../pages/Mapa";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Buscar from "../pages/Buscar"
import Perfil from "../pages/Perfil";
import Actividades from "../pages/Actividades";
import Mentores from "../pages/Mentores"
import Foro from "../pages/Foro";
import LogOut from "../pages/LogOut";

export default function AppRouter({ onNavigate }) {
  return (
    <Routes>
       <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login />} />
       <Route path="/dashboard" element={<ProtectedRoute><Dashboard onNavigate={onNavigate} /></ProtectedRoute>} />
      <Route path="/profesores" element={<ProtectedRoute><ProfesoresPage /></ProtectedRoute>} />
      <Route path="/faqs" element={<ProtectedRoute><FaqsPage /></ProtectedRoute>} />
      <Route path="/mapa" element={<ProtectedRoute><Mapa /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/buscar" element={<ProtectedRoute><Buscar /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/actividades" element={<ProtectedRoute><Actividades /></ProtectedRoute>} />  
      <Route path="/mentores" element={<ProtectedRoute><Mentores /></ProtectedRoute>} />  
      <Route path="/foro" element={<ProtectedRoute><Foro /></ProtectedRoute>} />  
      <Route path="/LogOut" element={<LogOut />} />
    </Routes>
  );
}