import {
  Sun,
  Moon,
  Coffee,
} from "lucide-react";

const THEMES = [
  {
    id: "light",
    label: "Claro",
    Icon: Sun,
  },
  {
    id: "dark",
    label: "Escuro",
    Icon: Moon,
  },
  {
    id: "coffee",
    label: "Café",
    Icon: Coffee,
  },
];

export default function ThemeSwitcher({
  theme,
  onThemeChange,
}) {
  return (
    <div
      className="theme-switcher"
      role="group"
      aria-label="Escolher tema"
    >
      {THEMES.map(
        ({
          id,
          label,
          Icon,
        }) => (
          <button
            key={id}
            type="button"
            className={`theme-option ${
              theme === id
                ? "active"
                : ""
            }`}
            onClick={() =>
              onThemeChange(id)
            }
            aria-label={`Tema ${label}`}
            aria-pressed={
              theme === id
            }
            title={label}
          >
            <span className="theme-option-inner">
              <Icon
                size={17}
                strokeWidth={1.7}
              />
            </span>
          </button>
        )
      )}
    </div>
  );
}