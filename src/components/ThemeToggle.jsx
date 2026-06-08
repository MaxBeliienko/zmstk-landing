import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const carRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateCar = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const car = carRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // 1. Машинка завжди стартує зліва і пролітає весь перемикач вправо за межі екрану
    tl.to(car, {
      x: 110,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
      // 2. Коли вона зникла праворуч — миттєво перемикаємо тему (світило справа змінюється)
      .call(() => {
        toggleTheme();
      })
      // 3. Переносимо машинку «за лаштунками» назад далеко вліво (за межі перемикача)
      .set(car, {
        x: -50,
      })
      // 4. Машинка плавно повертається з лівого боку на своє фірмове стартове місце
      .to(car, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
  };

  return (
    <button
      onClick={animateCar}
      disabled={isAnimating}
      className={`relative w-24 h-10 rounded-full p-1 border transition-all duration-500 flex items-center justify-end overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] focus:outline-none ${
        theme === "dark"
          ? "bg-slate-950 border-gray-700 text-gray-400"
          : "bg-gradient-to-r from-sky-400 to-amber-100 border-sky-300 text-amber-600"
      }`}
    >
      {/* ПРАВИЙ КУТ: Контейнер для світил, які плавно змінюють одне одного */}
      <div className="relative w-8 h-8 flex items-center justify-center mr-1">
        {/* Сонце — активне у світлій темі */}
        <div
          className={`absolute transition-all duration-500 ${
            theme === "light"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-45"
          }`}
        >
          <Sun size={20} className="text-amber-500 fill-amber-400/20" />
        </div>

        {/* Місяць — активний у темній темі */}
        <div
          className={`absolute transition-all duration-500 ${
            theme === "dark"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-45"
          }`}
        >
          <Moon size={19} className="text-indigo-400 fill-indigo-900/30" />
        </div>
      </div>
      <div
        ref={carRef}
        className="absolute top-1.5 left-1.5 w-10 h-7 text-amber-500 cursor-pointer z-10 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full fill-current drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 8.5c-.83 0-1.5-.67-1.5-1.5 0-.08.01-.16.03-.23l-1.32-1.32c-.37-.37-.88-.58-1.41-.58H5.5c-1.1 0-2 .9-2 2v2.53c0 .53.21 1.04.59 1.41l1.63 1.63c.27.27.64.43 1.03.43H19c1.1 0 2-.9 2-2V10c0-1.1-.9-1.5-2-1.5zM6 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          <circle cx="6" cy="13" r="1" className="fill-amber-100" />
          <circle cx="18" cy="13" r="1" className="fill-amber-100" />
        </svg>
      </div>
    </button>
  );
}
