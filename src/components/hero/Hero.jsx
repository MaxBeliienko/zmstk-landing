import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section
      className={`h-screen  pt-52 bg-cover bg-center text-center relative flex flex-col items-center ${styles["hero-section"]}`}
      id="home"
    >
      {/* Затемнення */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-xs"></div>

      <div className="relative z-10 flex flex-col items-start">
        <h1
          className={`text-5xl font-bold text-white mb-1 ${styles["main-title"]}`}
        >
          АВТОШКОЛА
        </h1>
        <p className="text-base text-white mb-10">
          Знам'янського МСТК ТСО України
        </p>
        <div className="mx-auto">
          <p className={`text-white mb-1 ${styles["hero-list-title"]}`}>
            Вчимо кермувати:
          </p>
          <ul className={`text-white mb-10 text-start  ${styles["hero-list"]}`}>
            <li>безпечно</li>
            <li>впевнено</li>
            <li>із задоволенням</li>
          </ul>
        </div>

        {/* Якірне посилання на секцію з формою */}
        <a
          href="#contact"
          className="inline-block px-6 py-3 bg-[#1f2d6e] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-base mx-auto"
        >
          Записатися на навчання
        </a>
      </div>
    </section>
  );
};

export default Hero;
