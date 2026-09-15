import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Package,
  Sparkles,
} from "lucide-react";

import "./PromoCarousel.css";

const slides = [
  {
    id: 1,
    eyebrow: "Café de verdade",
    title: (
      <>
        Mais sabor
        <br />
        em cada momento
      </>
    ),
    description:
      "Grãos selecionados, equipamentos de qualidade e acessórios para você viver a melhor experiência com o café.",
    button: "Ver produtos",
    icon: Coffee,
    variant: "coffee",
  },
  {
    id: 2,
    eyebrow: "Seleção Torra",
    title: (
      <>
        Escolha seu
        <br />
        próximo café
      </>
    ),
    description:
      "Explore nossa seleção de grãos e encontre novos sabores para fazer parte da sua rotina.",
    button: "Explorar grãos",
    icon: Sparkles,
    variant: "beans",
  },
  {
    id: 3,
    eyebrow: "Seu preparo",
    title: (
      <>
        Tudo para
        <br />
        preparar melhor
      </>
    ),
    description:
      "Equipamentos e acessórios pensados para deixar cada etapa do seu preparo ainda mais especial.",
    button: "Ver equipamentos",
    icon: Package,
    variant: "equipment",
  },
  {
    id: 4,
    eyebrow: "Para quem ama café",
    title: (
      <>
        Seu ritual
        <br />
        começa aqui
      </>
    ),
    description:
      "Produtos escolhidos para transformar uma simples xícara em um momento que vale a pena.",
    button: "Conhecer a loja",
    icon: Coffee,
    variant: "ritual",
  },
];

export default function PromoCarousel({
  onProductsClick,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const totalSlides = slides.length;

  function nextSlide() {
    setCurrent((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  }

  function previousSlide() {
    setCurrent((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  }

  function goToSlide(index) {
    setCurrent(index);
  }

  function handleButtonClick() {
    onProductsClick?.();
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientX);
  }

  function handleTouchEnd(event) {
    if (touchStart === null) {
      return;
    }

    const touchEnd =
      event.changedTouches[0].clientX;

    const distance =
      touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    setTouchStart(null);
  }

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrent((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, 5500);

    return () => {
      window.clearInterval(interval);
    };
  }, [paused, totalSlides]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="promo-carousel"
      aria-label="Destaques da Torra"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`promo-slide promo-slide-${slide.variant}`}
      >
        <div className="promo-content">
          <span className="promo-eyebrow">
            {slide.eyebrow}
          </span>

          <h1 className="promo-title">
            {slide.title}
          </h1>

          <p className="promo-description">
            {slide.description}
          </p>

          <button
            type="button"
            className="promo-button"
            onClick={handleButtonClick}
          >
            {slide.button}

            <ArrowRight
              size={17}
              strokeWidth={1.8}
            />
          </button>
        </div>

        <div
          className="promo-visual"
          aria-hidden="true"
        >
          <div className="promo-glow" />

          <div className="promo-decoration promo-decoration-one" />
          <div className="promo-decoration promo-decoration-two" />
          <div className="promo-decoration promo-decoration-three" />

          <div className="promo-coffee-scene">
            <div className="promo-board" />

            <div className="promo-beans">
              {Array.from(
                { length: 10 },
                (_, index) => (
                  <span key={index} />
                )
              )}
            </div>

            <div className="promo-cup">
              <div className="promo-cup-rim">
                <div className="promo-coffee" />
              </div>

              <div className="promo-cup-body">
                <div className="promo-cup-highlight" />
              </div>

              <div className="promo-cup-handle" />
            </div>

            <div className="promo-steam">
              <i />
              <i />
              <i />
            </div>

            <div className="promo-icon-badge">
              <Icon
                size={28}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="promo-arrow promo-arrow-left"
          onClick={previousSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft
            size={23}
            strokeWidth={1.6}
          />
        </button>

        <button
          type="button"
          className="promo-arrow promo-arrow-right"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          <ChevronRight
            size={23}
            strokeWidth={1.6}
          />
        </button>

        <div
          className="promo-dots"
          aria-label="Selecionar destaque"
        >
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`promo-dot ${
                index === current
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goToSlide(index)
              }
              aria-label={`Ir para slide ${
                index + 1
              }`}
              aria-current={
                index === current
                  ? "true"
                  : undefined
              }
            />
          ))}
        </div>

        <span
          className="promo-counter"
          aria-hidden="true"
        >
          {String(current + 1).padStart(2, "0")}
          {" / "}
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}