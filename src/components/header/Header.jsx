import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Menu, X, User, ClipboardCheck, PhoneCall } from "lucide-react";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const [isTop, setIsTop] = useState(true);

  const user = useSelector(selectUser);
  const location = useLocation();

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/admin-panel";
      case "teacher":
        return "/teacher-panel";
      case "student":
        return "/dashboard";
      default:
        return "/login";
    }
  };

  const dashboardPath = getDashboardPath();
  const buttonLabel = user ? "Кабінет" : "Увійти";

  // Керування скролом сторінки при відкритому мобільному меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Відслідковування скролу
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isOpen) return;
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY < 20);
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // Логіка підсвічування активного пункту
  const isLinkActive = (path, hash = "") => {
    if (hash) {
      return location.pathname === path && location.hash === hash;
    }
    if (path === "/" && !hash) {
      return location.pathname === "/" && !location.hash;
    }
    return location.pathname === path;
  };

  // 🌟 ОНОВЛЕНО: Стабільні класи для посилань (завжди чіткі у світлій та темній темах)
  const getLinkClass = (path, hash = "") => {
    const active = isLinkActive(path, hash);
    return clsx(
      "relative py-1 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer text-nowrap",
      active
        ? "text-amber-500"
        : "text-gray-700 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400"
    );
  };

  return (
    <>
      {/* 🌟 ОНОВЛЕНО: Тепер Header завжди має підкладку та ефект розмиття backdrop-blur-md */}
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-4 sm:px-6 md:px-12",
          "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-900/50 shadow-xs",
          // Динамічна висота для красивого візуального переходу при скролі
          isTop ? "h-20" : "h-16 shadow-lg",
          scrollDir === "down" && !isOpen
            ? "-translate-y-full"
            : "translate-y-0"
        )}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className="transition-transform hover:scale-105 shrink-0"
        >
          <img src={logo} alt="logo" className="h-12 md:h-14 object-contain" />
        </NavLink>

        {/* ПРАВА ЧАСТИНА */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Десктопна навігація */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={getLinkClass("/", "")}>
              Головна
            </NavLink>

            <NavLink to="/categories" className={getLinkClass("/categories")}>
              Категорії
            </NavLink>

            <NavLink to="/#contact" className={getLinkClass("/", "#contact")}>
              Контакти
            </NavLink>

            {user && (
              <NavLink to="/test" className={getLinkClass("/test")}>
                <span className="flex items-center gap-1.5">
                  <ClipboardCheck size={16} className="text-amber-500" />
                  Тестування
                </span>
              </NavLink>
            )}
          </nav>
          <a
            href="tel:+380503411049"
            className="flex items-center gap-2 px-3.5 py-2 border bg-gray-100/80 border-gray-200 text-gray-900 dark:bg-gray-900/80 dark:border-gray-800 dark:text-white hover:border-amber-500/30 dark:hover:border-amber-400/30 rounded-xl transition-all group cursor-pointer shadow-xs"
          >
            <div className="w-5 h-5 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <PhoneCall size={12} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black font-mono tracking-tight shrink-0">
              +38 (050) 341 10 49
            </span>
          </a>

          {/* Кнопка кабінету */}
          <NavLink
            to={dashboardPath}
            className="hidden md:flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-gray-900 hover:bg-amber-400 transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            <User size={14} />
            {buttonLabel}
          </NavLink>

          {/* Бургер-кнопка для мобільних */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-xl transition-colors cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
            aria-label="Відкрити меню"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Мобільне бічне меню (Sidebar) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-72 z-[60] flex flex-col border-l transition-transform duration-500 ease-in-out shadow-2xl p-6 bg-white border-gray-200 text-gray-900 dark:bg-gray-950 dark:border-gray-900 dark:text-white",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <NavLink to="/" onClick={closeMenu}>
            <img src={logo} alt="logo" className="h-10 object-contain" />
          </NavLink>
          <button
            onClick={closeMenu}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
            aria-label="Закрити меню"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5 text-sm font-black uppercase tracking-wider w-full items-start pl-2">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              clsx(
                "w-full py-1",
                isLinkActive("/", "")
                  ? "text-amber-500"
                  : "hover:text-amber-500"
              )
            }
          >
            Головна
          </NavLink>

          <NavLink
            to="/categories"
            onClick={closeMenu}
            className={({ isActive }) =>
              clsx(
                "w-full py-1",
                isActive ? "text-amber-500" : "hover:text-amber-500"
              )
            }
          >
            Категорії
          </NavLink>

          <NavLink
            to="/#contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              clsx(
                "w-full py-1",
                isLinkActive("/", "#contact")
                  ? "text-amber-500"
                  : "hover:text-amber-500"
              )
            }
          >
            Контакти
          </NavLink>

          {user && (
            <NavLink
              to="/test"
              onClick={closeMenu}
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors py-1 w-full flex items-center gap-2 border-t border-gray-100 dark:border-gray-900 pt-4 mt-1"
            >
              <ClipboardCheck size={18} className="text-amber-500" />
              Тестування
            </NavLink>
          )}

          <NavLink
            to={dashboardPath}
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-900 hover:bg-amber-400 transition-all shadow-md w-full mt-6 text-center cursor-pointer shadow-amber-500/10"
          >
            <User size={14} />
            {buttonLabel}
          </NavLink>
        </div>
      </div>

      {/* Напівпрозорий задній фон для мобільного меню */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-[55] md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />
    </>
  );
}
