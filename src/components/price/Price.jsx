import { NavLink } from "react-router-dom";
// import styles from "./Price.module.css";
import aCard from "../../assets/a-card-price.png";
import bCard from "../../assets/b-card-price.png";
import cCard from "../../assets/c-card-price.png";
import ceCard from "../../assets/ce-card-price.png";
import dCard from "../../assets/d-card-price.png";
import ruleCard from "../../assets/vidn-card-price.png";

const Price = () => {
  return (
    <section
      className={`py-16 container mx-auto px-4 flex flex-col items-center text-center`}
    >
      <h2 className="text-3xl font-semibold mb-4">Категорії</h2>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${aCard})`,
              backgroundSize: "50%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">КАТЕГОРІЯ А</h3>
            <p className="text-lg">Курси водіння мотоциклів і скутерів</p>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#a-categor-page"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>

        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${bCard})`,
              backgroundSize: "50%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">КАТЕГОРІЯ В</h3>
            <p className="text-lg">Курси водіння легкових автомобілів</p>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#b-categor-page"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>

        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${cCard})`,
              backgroundSize: "55%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">КАТЕГОРІЯ С</h3>
            <p className="text-lg">Курси водіння вантажних автомобілів</p>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#c-categor-page"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>

        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${dCard})`,
              backgroundSize: "40%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">
              КАТЕГОРІЯ <span className="text-[33px]">D</span>
            </h3>
            <p className="text-lg">Курси водіння мотоциклів і скутерів</p>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#d-categor-page"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>

        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${ceCard})`,
              backgroundSize: "50%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">КАТЕГОРІЯ СЕ</h3>
            <p className="text-lg">Додаткова категорія для важких причепів</p>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#ce-categor-page"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>

        <li className="relative p-6 rounded-xl overflow-hidden shadow-xl w-[300px] min-h-[280px] bg-sky-800 text-white flex flex-col items-center justify-between">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${ruleCard})`,
              backgroundSize: "30%", // Розтягуємо зображення
              backgroundPosition: "center 70%", // Розміщуємо нижче та правіше
              opacity: 0.2, // Робимо напівпрозорим
            }}
          ></div>

          {/* 5. Контент картки (текст) */}
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2 text-start">
              ВІДНОВЛЕННЯ НАВИЧОК ВОДІННЯ
            </h3>
          </div>

          {/* 6. Посилання "ДЕТАЛЬНІШЕ" */}
          <div className="absolute bottom-2 left-6 z-10 flex items-center mt-8 w-full">
            <NavLink
              to="/categories#dopidgotovka"
              className="text-lg font-bold uppercase text-white"
            >
              ДЕТАЛЬНІШЕ
            </NavLink>
            <span className="ml-2 text-xl">→</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Price;
