import { LoginContent } from "./_components/login-content";
export async function Login({ step }: { step?: "login" | "verify" }) {
  return (
    <section className="relative overflow-hidden">
      <LoginContent step={step} />
    </section>
  );
}
