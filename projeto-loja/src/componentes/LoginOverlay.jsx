import { useState } from "react";
import { X } from "lucide-react";

export default function LoginOverlay({ open, onClose, onLogin, user, onLogout }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="login-panel" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose}><X size={18} /></button>
        {user ? (
          <>
            <h2>Olá, {user.name.split(" ")[0]}</h2>
            <p className="hero-sub">Você está em uma conta de demonstração.</p>
            <button className="btn-primary" onClick={onLogout}>Sair</button>
          </>
        ) : (
          <>
            <h2>Entrar</h2>
            <p className="hero-sub">Conta simulada — nenhum dado é enviado a um servidor.</p>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim() && email.trim()) onLogin({ name: name.trim(), email: email.trim() });
              }}
            >
              <label>
                Nome
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
              </label>
              <label>
                E-mail
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
              </label>
              <button className="btn-primary" type="submit">Entrar</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
