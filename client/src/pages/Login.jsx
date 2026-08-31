import LoginForm from "../components/organisms/LoginForm";
import Header from "../components/organisms/IniHeader"

export default function Login() {
  return (
    <div className="bg-landing bg-center bg-cover flex flex-col h-screen">
      <Header />
      <div className="fixed inset-0 backdrop-blur-xs" />
      <main className="flex flex-1 items-center justify-center px-4 py-12 relative">
        <LoginForm />
      </main>
    </div>
  );
}