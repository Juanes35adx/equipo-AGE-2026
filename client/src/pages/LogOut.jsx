import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/organisms/IniHeader';
import Footer from "../components/organisms/Footer";
import PageCard from '../components/atoms/Card';
import Button from "../components/atoms/Button";

export default function LogOut() {
  const navigate = useNavigate();

  const supportEmail = (
   "asesoria.integral@upb.edu.co"
  );
  /**SupaBase Log Out
    *Making use of Supabase's function "signOut" the user's local session is terminated
    *Once the session is terminated, the user will be lead to this page
    *This page is not listed under the menu, as it serves more as a proof of the log out's functionality
  */
  return (
    <div className="bg-landing bg-center bg-cover flex flex-col h-screen">
      <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-12 relative">
          <div className="fixed inset-0 backdrop-blur-xs" />
          <PageCard footer={supportEmail ? `¿Necesitas ayuda? ${supportEmail}` : "¿Necesitas ayuda? Contacta al soporte técnico."}>
            <div className='text-center flex flex-col items-center gap-0 '>

                {/*-----*/}

                <h1 className="text-2xl font-bold text-negro-txt/80 tracking-tight mb-4">
                  Cierre de Sesión
                </h1>
                <div className="mb-8">
                  <div className="space-y-1.5">
                    <p className="text-base font-semibold text-negro-txt/80 ">
                      Su sesión se ha cerrado con éxito
                    </p>
                    <p className="text-sm text-negro-txt/80 ">
                      Por favor cierre esta pestaña en su navegador
                    </p>
                  </div>
                </div>

                <Button
                      text="Regresar"
                      onClick={() => navigate("../")}
                      variant="menu2"
                />
                
            </div>
          </PageCard>
        </main>
    </div>
  );
}
