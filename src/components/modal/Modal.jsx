import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { gsap } from "gsap";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  const overlayRef = useRef(null);
  const modalBoxRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // АНІМАЦІЯ ВІДКРИТТЯ ЧЕРЕЗ GSAP
  useEffect(() => {
    if (isOpen && modalBoxRef.current && overlayRef.current) {
      // 1. Плавно проявляємо темний задній фон (Overlay)
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      // 2. Виштовхуємо саме вікно знизу вгору із легким масштабуванням
      gsap.fromTo(
        modalBoxRef.current,
        {
          opacity: 0,
          scale: 0.94,
          y: -24,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power4.out",
        }
      );
    }
  }, [isOpen]); // Спрацьовує щоразу, коли модалка створюється в DOM

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef} // 🌟 Вішаємо реф на оверлей
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        ref={modalBoxRef} // 🌟 Вішаємо реф на вікно модалки
        className={clsx(
          "w-full p-6 rounded-2xl shadow-2xl relative border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700",
          size === "full" && "max-w-6xl",
          size === "md" && "max-w-md"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
          aria-label="Закрити модальне вікно"
        >
          <X size={20} />
        </button>

        {title && (
          <h3 className="text-xl font-bold mb-4 border-b pb-2 transition-colors duration-500 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
            {title}
          </h3>
        )}

        <div className="mt-2 text-gray-700 dark:text-gray-300 transition-colors duration-500">
          {children}
        </div>
      </div>
    </div>
  );
}
