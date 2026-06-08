import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import {
  Bike,
  Car,
  Truck,
  Bus,
  Award,
  Calendar,
  CircleDollarSign,
  Phone,
} from "lucide-react";

export default function CategoriesList() {
  const location = useLocation();
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add(
            "ring-2",
            "ring-amber-500",
            "shadow-[0_0_25px_rgba(245,158,11,0.4)]"
          );
          setTimeout(() => {
            element.classList.remove(
              "ring-2",
              "ring-amber-500",
              "shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            );
          }, 2000);
        }, 100);
      }
    }
  }, [location]);

  // 🌟 Додано поле phone до кожної категорії
  const categories = [
    {
      id: "a-categor-page",
      title: "Категорія «А»",
      icon: Bike,
      description:
        "Призначена для управління двоколісними ТЗ, у яких обсяг двигуна перевищує 50 см³ або 4 кВт для електромоторів.",
      age: "З 16 років",
      price: "5 500 грн",
      phone: "+38 (050) 341-10-49", // Вкажіть реальний номер автошколи
    },
    {
      id: "a1-categor-page",
      title: "Категорія «А1»",
      icon: Bike,
      description:
        "Призначена для управління легкими двоколісними ТЗ, у яких обсяг двигуна не перевищує 50 см³ або 4 кВт для електромоторів.",
      age: "З 16 років",
      price: "5 500 грн",
      phone: "+38 (050) 341-10-49",
    },
    {
      id: "b-categor-page",
      title: "Категорія «В»",
      icon: Car,
      description:
        "Управління автомобілями, максимальна вага яких не перевищує 3500 кг, а кількість місць для сидіння, крім водія, не більше 8.",
      age: "З 18 років",
      price: "8 000 грн",
      phone: "+38 (050) 341-10-49",
    },
    {
      id: "c-categor-page",
      title: "Категорія «С»",
      icon: Truck,
      description:
        "Призначена для управління важкими вантажними автомобілями та транспортними засобами масою від 7,5 тонн.",
      age: "З 18 років",
      price: "8 000 грн",
      phone: "+38 (050) 341-10-49",
    },
    {
      id: "d-categor-page",
      title: "Категорія «D»",
      icon: Bus,
      description:
        "Призначена для управління пасажирськими автобусами, у яких кількість місць для сидіння, крім сидіння водія, понад 16.",
      age: "З 21 року",
      price: "8 000 грн",
      phone: "+38 (050) 341-10-49",
    },
    {
      id: "ce-categor-page",
      title: "Категорія «СЕ»",
      icon: Truck,
      description:
        "Управління вантажними автомобілями важкої категорії (понад 7.5 т) з масивними причепами або напівпричепами.",
      note: "Відкривається при наявності стажу та категорії «С».",
      age: "З 19 років",
      price: "8 000 грн",
      phone: "+38 (050) 341-10-49",
    },
    {
      id: "dopidgotovka",
      title: "Відновлення навичок",
      icon: Award,
      description:
        "Поверніть собі впевненість за кермом! Якщо ви відчуваєте, що водійські навички потребують оновлення, ми пропонуємо ефективні практичні заняття.",
      isSpecial: true,
      phone: "+38 (050) 341-10-49",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="pt-32 pb-24 px-4 max-w-6xl mx-auto flex flex-col items-center gap-16 text-gray-900 dark:text-white transition-colors duration-500"
    >
      {/* ХЕДЕР СТОРІНКИ */}
      <div className="text-center space-y-4 max-w-3xl">
        <span className="inline-block text-xs font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          Програми навчання
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
          Автошкола{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">
            ЗМСТК ТСО України
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Оберіть потрібну категорію та розпочніть якісну теоретичну й практичну
          підготовку разом із нашими досвідченими інструкторами.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mt-2" />
      </div>

      {/* СІТКА КАРТОК */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {categories.map((item, idx) => {
          const IconComponent = item.icon;
          // Очищаємо номер телефону від зайвих символів для коректного лінку tel:
          const cleanPhone = item.phone
            ? item.phone.replace(/[^+\d]/g, "")
            : "";

          return (
            <div
              key={item.id}
              id={item.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`group relative p-6 rounded-2xl border bg-white border-gray-200/70 shadow-lg shadow-gray-100/40 dark:bg-gray-950 dark:border-gray-800/80 dark:shadow-none transition-all duration-500 flex flex-col justify-between gap-6 overflow-hidden scroll-mt-36 hover:-translate-y-2 hover:shadow-xl dark:hover:border-amber-400/30 hover:border-amber-500/40 ${
                item.isSpecial
                  ? "border-sky-500/30 dark:border-sky-400/20 bg-gradient-to-b from-white to-sky-500/[0.02] dark:from-gray-950 dark:to-sky-400/[0.01]"
                  : ""
              }`}
            >
              <div className="absolute -inset-px bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center shrink-0 border border-amber-500/10 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-gray-950 dark:group-hover:bg-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <IconComponent
                      size={22}
                      className="text-amber-600 dark:text-amber-400 transition-colors duration-500 group-hover:text-gray-950 dark:group-hover:text-gray-950"
                    />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-gray-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {item.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                  {item.description}
                </p>

                {item.note && (
                  <div className="inline-block text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-400/10 px-3 py-1 rounded-lg leading-snug border border-sky-500/10">
                    ⚠️ {item.note}
                  </div>
                )}
              </div>

              {/* Нижня частина */}
              <div className="space-y-4 relative z-10 mt-auto">
                {/* Вік та Телефонний блок */}
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800/50">
                  {item.age && (
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <Calendar size={14} />
                      <span>
                        Віковий поріг:{" "}
                        <span className="text-gray-800 dark:text-gray-300 font-black">
                          {item.age}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* 🌟 СТИЛЬНИЙ БЛОК ТЕЛЕФОНУ */}
                  {item.phone && (
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors duration-300 w-fit group/phone"
                    >
                      <Phone
                        size={14}
                        className="text-gray-400 dark:text-gray-500 group-hover/phone:animate-pulse group-hover/phone:text-amber-500"
                      />
                      <span>
                        Запис:{" "}
                        <span className="font-extrabold tracking-wide font-mono text-gray-700 dark:text-gray-300 group-hover/phone:underline">
                          {item.phone}
                        </span>
                      </span>
                    </a>
                  )}
                </div>

                {/* Блок ціни або кнопка зворотного зв'язку */}
                {item.price ? (
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 dark:bg-gray-900/50 rounded-xl dark:border-gray-800/80 group-hover:border-amber-500/20 dark:group-hover:border-amber-400/20 transition-all duration-300">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <CircleDollarSign size={13} /> Вартість курсу
                    </span>
                    <span className="text-base font-black text-amber-600 dark:text-amber-400 tracking-tight">
                      {item.price}
                    </span>
                  </div>
                ) : (
                  <div className="pt-1">
                    <a
                      href="/#contact"
                      className="w-full block py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer text-center"
                    >
                      Дізнатись деталі
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
