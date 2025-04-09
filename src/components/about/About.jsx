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
      className={`py-16 mx-auto px-4 bg-amber-600 opacity-0 transition-all duration-1000 ${styles["about-section"]}`}
      id="about"
    >
      <h2 className="text-3xl font-semibold text-center mb-6">
        Про нашу автошколу
      </h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4">
          Ми готуємо водіїв понад 10 років. Наші інструктори — професіонали
          своєї справи. Під час навчання ми забезпечуємо індивідуальний підхід
          до кожного учня і створюємо комфортну атмосферу для навчання.
        </p>
        <p className="text-lg">
          Наша автошкола має сучасний автопарк і використовує найновіші методики
          викладання. Ми пропонуємо як теоретичні, так і практичні заняття на
          всіх етапах навчання.
        </p>
      </div>
    </section>
  );
};

export default About;
