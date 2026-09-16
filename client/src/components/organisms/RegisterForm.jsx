import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, logout } from "../../services/auth.service";
import careerList from "../../data/careerList.json";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "estudiante",
    programa: "",
    semestre: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        role: form.role,
        programa: form.programa,
        semestre: parseInt(form.semestre),
      });

      // signUp deja sesión activa (la confirmación por correo está desactivada),
      // así que se cierra para obligar a iniciar sesión con las credenciales nuevas.
      await logout();

      navigate("/Login", {
        state: { mensaje: "Tu cuenta fue creada. Inicia sesión para continuar." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-100 flex-col gap-4 rounded-xl border border-[#e0e0e0] bg-blanco-bg p-8"
    >
      <h2 className="text-[1.4rem] font-medium text-negro-txt">
        Crear cuenta
      </h2>

      <p className="m-0 text-[0.8125rem] text-negro-txt/70">
        Regístrate con tu correo institucional UPB
      </p>

      {error && (
        <p className="m-0 rounded-md bg-[#fdecea] px-2.5 py-2 text-[0.8125rem] text-[#c0392b]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.875rem] text-negro-txt/70">
          Nombre completo
        </label>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
          className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none placeholder-negro-txt/70"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.875rem] text-negro-txt/70">
          Correo institucional
        </label>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@upb.edu.co"
          required
          className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none placeholder-negro-txt/70"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.875rem] text-negro-txt/70">
          Contraseña
        </label>

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
          required
          className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none placeholder-negro-txt/70"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.875rem] text-negro-txt/70">
          Rol
        </label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none text-negro-txt/70"
        >
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.875rem] text-negro-txt/70">
          Programa académico
        </label>

        <select
          name="programa"
          value={form.programa}
          onChange={handleChange}
          required
          className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none text-negro-txt/70"
        >
          <option value="">Selecciona tu programa</option>
          {careerList.map((carrera) => (
            <option key={carrera} value={carrera}>
              {carrera}
            </option>
          ))}
        </select>
      </div>

      {form.role === "estudiante" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.875rem] text-negro-txt/70">
            Semestre
          </label>

          <select
            name="semestre"
            value={form.semestre}
            onChange={handleChange}
            required
            className="rounded-lg border border-[#ccc] px-3 py-2.5 text-[0.9375rem] outline-none text-negro-txt/70"
          >
            <option value="">Selecciona tu semestre</option>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-lg border-none bg-[#111] px-2.5 py-2.5 text-[0.9375rem] font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>

      <p className="m-0 text-center text-[0.8125rem] text-[#888]">
        ¿Ya tienes cuenta?{" "}
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer font-medium text-negro-txt underline"
        >
          Inicia sesión
        </span>
      </p>
    </form>
  );
}