import { useNavigate } from "react-router-dom";
import Header from '../components/organisms/IniHeader'
import PageCard from "../components/atoms/Card";
import Button from '../components/atoms/Button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-landing bg-center bg-cover flex flex-col h-screen">
        <Header />
        <div className="fixed inset-0 backdrop-blur-xs" />
        <main className="flex flex-1 items-center justify-center px-4 py-12 relative">
          <PageCard>
            <div className="flex flex-col gap-8">
              <div className="text-center">
                {/* Título */}
                <h1 className="text-2xl font-bold text-negro-txt tracking-tight mb-4">
                  Asistente General Estudiantil (AGE)
                </h1>

                {/* Divisor decorativo */}
                <div className="w-12 h-0.5 bg-negro-txt mx-auto mb-5 rounded-full" />

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <p className="text-base font-semibold text-negro-txt/80">
                    ¡Sea bienvenido al Asistente General Estudiantil de la UPB!
                  </p>
                  <p className="text-sm text-negro-txt/80">
                    El primer ayudante general para estudiantes.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => navigate("/Login")}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md"
                text='Ingresar'
                variant='menu2'
              />
            </div>
          </PageCard>
        </main>
    </div>
  );
};

export default Landing;