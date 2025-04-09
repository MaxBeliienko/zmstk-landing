import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Про нас", href: "#about" },
  { label: "Ціни", href: "#pricing" },
  { label: "Оплата частинами", href: "#installments" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");

  // Блокуємо скрол при відкритому меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Сховання хедера при скролі вниз
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 bg-[#0274ba] text-white shadow transition-transform duration-300 flex max-w-[375px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1440px] justify-between items-center px-1 py-1 md:py-6",
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <a href="/">
          <img src={logo} alt="" className={styles.logo} />
        </a>

        {/* Навігація для великих екранів */}
        <nav className="hidden md:flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Кнопка бургер-меню */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden"
          aria-label="Відкрити меню"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* FULLSCREEN МЕНЮ */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-screen z-50 bg-black text-white flex flex-col px-6 py-12 transition-all duration-300">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)} aria-label="Закрити меню">
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-8 text-2xl items-start">
            <a href="/">
              <img src={logo} alt="" className={styles.logo} />
            </a>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
