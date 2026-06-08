import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import aCard from "../../assets/a-card-price.png";
import bCard from "../../assets/b-card-price.png";
import cCard from "../../assets/truck-price.png";
import ceCard from "../../assets/ce-card-price.png";
import dCard from "../../assets/d-card-price.png";
import ruleCard from "../../assets/vidn-card-price.png";

gsap.registerPlugin(ScrollTrigger);

export default function Price() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const priceCards = [
    {
      id: "a-categor-page",
      bgImage: aCard,
      title: "Категорія А",
      desc: "Курси водіння мотоциклів і скутерів",
      bgSize: "55%",
      bgPos: "right 10% bottom 10%",
    },
    {
      id: "b-categor-page",
      bgImage: bCard,
      title: "Категорія В",
      desc: "Курси водіння легкових автомобілів",
      bgSize: "55%",
      bgPos: "right 5% bottom 10%",
    },
    {
      id: "c-categor-page",
      bgImage: cCard,
      title: "Категорія С",
      desc: "Курси водіння вантажних автомобілів",
      bgSize: "60%",
      bgPos: "right 5% bottom 5%",
    },
    {
      id: "d-categor-page",
      bgImage: dCard,
      title: "Категорія D",
      desc: "Курси водіння автобусів та мікроавтобусів",
      bgSize: "50%",
      bgPos: "right 5% bottom 10%",
    },
    {
      id: "ce-categor-page",
      bgImage: ceCard,
      title: "Категорія СЕ",
      desc: "Додаткова категорія для важких причепів",
      bgSize: "55%",
      bgPos: "right 5% bottom 5%",
    },
    {
      id: "dopidgotovka",
      bgImage: ruleCard,
      title: "Відновлення",
      desc: "Практичне відновлення навичок водіння",
      bgSize: "40%",
      bgPos: "right 10% bottom 15%",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-500 overflow-hidden"
      id="prices"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Хедер секції */}
        <div className="text-center space-y-4">
          <span className="inline-block text-xs font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Напрямки підготовки
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            Доступні{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">
              Категорії
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Сітка карток */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {priceCards.map((card, idx) => (
            <div
              key={idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="group relative p-6 rounded-2xl overflow-hidden 
                         bg-white border border-gray-200/80 shadow-lg shadow-gray-200/50
                         dark:bg-gray-900/40 dark:border-gray-800 dark:shadow-none
                         backdrop-blur-sm w-full max-w-[340px] h-[280px] flex flex-col justify-between 
                         transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl 
                         hover:shadow-amber-500/5 hover:border-amber-500/50 dark:hover:border-amber-400/40"
            >
              {/* Декоративна точка-індикатор (Світиться при ховері) */}
              <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-500 group-hover:bg-amber-500 group-hover:scale-125 group-hover:shadow-[0_0_10px_#f59e0b] z-20" />

              {/* Динамічний градієнт на фоні при наведенні */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/[0.02] dark:to-amber-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Зображення транспорту (З виправленою видимістю на темній темі) */}
              <div
                className="absolute inset-0 bg-no-repeat transition-all duration-700 
                           opacity-15 group-hover:opacity-30 group-hover:scale-105 pointer-events-none
                           dark:invert dark:brightness-150 dark:contrast-120"
                style={{
                  backgroundImage: `url(${card.bgImage})`,
                  backgroundSize: card.bgSize,
                  backgroundPosition: card.bgPos,
                }}
              />

              {/* Текстовий контент */}
              <div className="relative z-10 space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-[85%]">
                  {card.desc}
                </p>
              </div>

              {/* Кнопка "Детальніше" */}
              <div className="relative z-10 pt-4 border-t border-gray-100 dark:border-gray-800/60">
                <NavLink
                  to={`/categories#${card.id}`}
                  className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-gray-900 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 focus:outline-none"
                >
                  Детальніше
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-amber-500 group-hover:text-gray-950 dark:group-hover:bg-amber-400 transition-all duration-300">
                    <ArrowRight
                      size={12}
                      className="transform group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </div>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
