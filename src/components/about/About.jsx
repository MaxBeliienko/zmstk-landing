import styles from "./About.module.css";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["fade-up"]); // Додаємо клас анімації
          }
        });
      },
      {
        threshold: 0.2, // Коли 20% елемента видно
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-16 mx-auto px-4 bg-sky-900 opacity-0 text-white transition-all duration-1000 ${styles["about-section"]}`}
      id="about"
    >
      <h2 className="text-3xl font-semibold text-center mb-6">
        Автошкола Знам’янського МСТК ТСО України
      </h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4">
          Навчаємо не просто кермувати, а готуємо впевнених і відповідальних
          водіїв, готових до будь-яких ситуацій на дорозі.
        </p>
        <p className="text-lg">
          Сучасні методики, досвідчені інструктори та індивідуальний підхід —
          усе для вашої безпеки, впевненості та комфорту.
        </p>
      </div>
    </section>
  );
};

export default About;
