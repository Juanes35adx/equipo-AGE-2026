import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import Button from "../atoms/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-95 p-8 rounded-xl border border-gray-200 bg-blanco-bg">
    <h2 className="m-0 text-[1.4rem] font-medium text-negro-txt">Iniciar Sesión</h2>

    {error && (
      <p className="text-[#c0392b] text-[0.8125rem] m-0 px-2.5 py-2 bg-blanco-bg rounded-md">
        {error}
      </p>
    )}

    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-negro-txt/60">Correo</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-gray-300 placeholder-negro-txt/60 text-[0.9375rem] outline-none"
        placeholder="correo@upb.edu.co"
        required
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-negro-txt/60">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-gray-300 placeholder-negro-txt/60 text-[0.9375rem] outline-none"
        placeholder="••••••••"
        required
      />
    </div>

    <Button type="submit" text={loading ? "Ingresando..." : "Entrar"} disabled={loading} />

    <p className="text-[0.8125rem] text-center text-negro-txt/70 m-0">
      ¿No tienes cuenta?{" "}
      <span
        onClick={() => navigate("/register")}
        className="text-negro-txt font-medium cursor-pointer underline"
      >
        Regístrate
      </span>
    </p>
  </form>
  );
}

