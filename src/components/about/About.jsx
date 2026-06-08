import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ShieldCheck, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const coreValues = [
    {
      icon: <GraduationCap size={24} className="text-amber-500" />,
      title: "Сучасні методики",
      text: "Поєднуємо класичні стандарти підготовки ТСО України з інтерактивними ІТ-тренажерами ПДР.",
    },
    {
      icon: <Users size={24} className="text-amber-500" />,
      title: "Досвідчені інструктори",
      text: "Наші викладачі — атестовані практики, які вміють знайти індивідуальний підхід до кожного учня.",
    },
    {
      icon: <ShieldCheck size={24} className="text-amber-500" />,
      title: "Пріоритет безпеки",
      text: "Вчимо не просто для здачі іспиту в СЦ, а готуємо до реального, безпечного та впевненого життя на дорозі.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500 overflow-hidden"
      id="about"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full">
            Про автошколу
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Автошкола Знам’янського МСТК ТСО України
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="max-w-3xl mx-auto text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
          <p>
            Наша команда навчає не просто кермувати. Ми виховуємо нове покоління
            водіїв — відповідальних, спокійних та готових до будь-яких дорожніх
            викликів.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                {value.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
