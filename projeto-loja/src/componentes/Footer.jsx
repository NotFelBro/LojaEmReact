import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import torraLogo from "../assets/torra-logo.png";

import "./Footer.css";

export default function Footer({
  onProdutosClick,
  onSobreClick,
}) {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <button
            type="button"
            className="footer-logo"
            onClick={onProdutosClick}
            aria-label="Torra"
          >
            <img
              src={torraLogo}
              alt="Torra"
            />
          </button>

          <p className="footer-description">
            Café, preparo e acessórios
            para transformar cada xícara
            em um momento especial.
          </p>

          <div className="footer-socials">
            <a
              href="#"
              className="footer-social"
              aria-label="Instagram"
            >
              <span className="footer-social-icon">
                ig
              </span>

              Instagram
            </a>

            <a
              href="#"
              className="footer-social"
              aria-label="Facebook"
            >
              <span className="footer-social-icon">
                f
              </span>

              Facebook
            </a>

            <a
              href="#"
              className="footer-social"
              aria-label="GitHub"
            >
              <span className="footer-social-icon">
                gh
              </span>

              GitHub
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Loja</h3>

          <button
            type="button"
            onClick={onProdutosClick}
          >
            Produtos
          </button>

          <button
            type="button"
            onClick={onProdutosClick}
          >
            Grãos
          </button>

          <button
            type="button"
            onClick={onProdutosClick}
          >
            Equipamentos
          </button>

          <button
            type="button"
            onClick={onProdutosClick}
          >
            Acessórios
          </button>
        </div>

        <div className="footer-column">
          <h3>Institucional</h3>

          <button
            type="button"
            onClick={onSobreClick}
          >
            Sobre nós
          </button>

          <button
            type="button"
            onClick={onProdutosClick}
          >
            Nossa loja
          </button>

          <a href="#">
            Termos de uso
          </a>

          <a href="#">
            Privacidade
          </a>
        </div>

        <div className="footer-column footer-contact">
          <h3>Atendimento</h3>

          <a href="mailto:contato@torra.com">
            <Mail
              size={15}
              strokeWidth={1.7}
            />

            <span>
              contato@torra.com
            </span>
          </a>

          <a href="tel:+5500000000000">
            <Phone
              size={15}
              strokeWidth={1.7}
            />

            <span>
              (00) 00000-0000
            </span>
          </a>

          <div className="footer-contact-item">
            <MapPin
              size={15}
              strokeWidth={1.7}
            />

            <span>Brasil</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © {currentYear} Torra.
            Todos os direitos reservados.
          </p>

          <p>
            Projeto autoral desenvolvido
            para fins de demonstração.
          </p>

          <a
            href="#"
            className="footer-back-top"
            onClick={(event) => {
              event.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Voltar ao topo

            <ArrowUpRight
              size={14}
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}