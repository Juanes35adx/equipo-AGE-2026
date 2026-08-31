import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import Header from "../components/organisms/Header2"
import Footer from "../components/organisms/Footer"
import NewsCarousel from "../components/organisms/Carousel"
import QuickAccessGrid from "../components/organisms/QuickAccess"
import NewsCard from "../components/atoms/NewsCard"

export default function Dashboard({ onNavigate, onSearch }) {
  return (
    <div >
      <Header />
      {/* Header */}
      <main className=" px-8 pt-7 border-gray-200 animate-[fadeIn_0.5s_ease-out] py-8">
        <div >
          <h1 className="text-xl font-bold text-negro-txt mb-1">
            Bienvenido al Asistente General Estudiantil
          </h1>
          <p className="text-sm text-negro-txt leading-relaxed">
            Aqui podras encontrar información general relevante
            <br />
            dentro de la institución
          </p>
        </div>

        
        <NewsCarousel />
        <QuickAccessGrid onNavigate={onNavigate} onSearch={onSearch} />
      </main>
      <Footer />
    </div>
  );
}
