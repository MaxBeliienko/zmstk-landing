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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      if (isOpen) return;

      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 bg-[#1f2d6e] text-white shadow transition-transform duration-300 flex justify-between items-center px-5 py-1 md:py-4 lg:py-2",
          scrollDir === "down" && !isOpen
            ? "-translate-y-full"
            : "translate-y-0"
        )}
      >
        <NavLink to="/" onClick={closeMenu}>
          <img src={logo} alt="logo" className={styles.logo} />
        </NavLink>

        <nav className="hidden md:flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className="hover:underline">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden"
          aria-label="Відкрити меню"
        >
          <Menu size={28} />
        </button>
      </header>

      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 md:w-80 z-[60] bg-black text-white flex flex-col transition-transform duration-500 ease-in-out shadow-xl",

          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-6">
          <button onClick={closeMenu} aria-label="Закрити меню">
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col gap-6 text-xl items-start p-6 pt-0">
          <NavLink to="/" onClick={closeMenu}>
            <img src={logo} alt="logo" className={styles.logo} />
          </NavLink>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className="hover:underline"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300 z-[55] md:hidden",
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />
    </>
  );
}
