import RegisterForm from "../components/organisms/RegisterForm";
import Header from "../components/organisms/IniHeader"
import { useNavigate } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-landing bg-center bg-cover flex flex-col min-h-screen">
      <Header />
      <div className="fixed  inset-0 backdrop-blur-xs min-h-screen" />
      <main className="flex flex-1 items-center justify-center px-4 py-12 relative">
        <RegisterForm />
      </main>
    </div>
  );
}

