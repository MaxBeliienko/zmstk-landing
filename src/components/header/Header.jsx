import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Про нас", href: "/#about" },
  { label: "Категорії", href: "/categories" },
  { label: "Відгуки", href: "/#reviews" },
  { label: "Контакти", href: "/#contact" },
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
          "fixed top-0 left-0 w-full z-50 bg-[#1f2d6e] text-white shadow transition-transform duration-300 flex justify-between items-center px-5 py-1 md:py-4 lg:py-2",
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <NavLink to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </NavLink>

        {/* Навігація для великих екранів */}
        <nav className="hidden md:flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className="hover:underline">
              {link.label}
            </NavLink>
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
            <NavLink to="/">
              <img
                src={logo}
                alt=""
                className={styles.logo}
                onClick={() => setIsOpen(false)}
              />
            </NavLink>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
