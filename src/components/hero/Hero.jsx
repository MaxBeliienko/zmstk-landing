import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section
      className={`h-screen  py-16 bg-cover bg-center text-center relative flex flex-col items-center justify-center ${styles["hero-section"]}`}
    >
      {/* Затемнення */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          Навчання водінню з професіоналами
        </h1>
        <p className="text-lg text-white mb-6">
          Отримайте водійські права з нашою підтримкою!
        </p>

        {/* Якірне посилання на секцію з формою */}
        <a
          href="#form"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Записатися на навчання
        </a>
      </div>
    </section>
  );
};

export default Hero;
