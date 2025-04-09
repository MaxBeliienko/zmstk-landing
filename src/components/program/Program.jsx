import { useState } from "react";
import styles from "./Program.module.css";
import theory from "../../assets/theory.png";
import steering from "../../assets/steering.png";
import car from "../../assets/car.png";
import truck from "../../assets/truck.png";

const Program = () => {
  const [openedItems, setOpenedItems] = useState([]);

  const toggleItem = (index) => {
    if (openedItems.includes(index)) {
      setOpenedItems(openedItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setOpenedItems([...openedItems, index]);
    }
  };

  const courseDetails = [
    {
      path: theory,
      title: "Теоретичний курс",
      description: [
        "Лекції з атестованим викладачем-практиком",
        "Вивчення Правил дорожнього руху, основ безпеки руху, будови та експлуатації ТЗ",
        "Заняття з надання домедичної допомоги, права, страхування, європротоколи",
        "Підготовка до тестувань у СЦ",
        "Заняття онлайн або в аудиторії",
      ],
    },
    {
      path: steering,
      title: "Практичний курс",
      description: [
        "Навчання керуванню транспортом",
        "Практика на власному закритому автодромі",
        "Робота з різними дорожніми умовами",
        "Аналіз реальних ситуацій на дорозі",
        "Підготовка до практичного іспиту у СЦ",
      ],
    },
    {
      path: car,
      title: "Відновлення навичок",
      description: [
        "Вдосконалення водійських вмінь",
        "Робота з небезпечними ситуаціями на дорозі",
        "Підвищення впевненості за кермом",
        "Адаптація до сучасних умов дорожнього руху",
        "Індивідуальний підхід до кожного учня",
      ],
    },
    {
      path: truck,
      title: "Підвищення кваліфікації",
      description: [
        "Поглиблене вивчення правил дорожнього руху для категорії CE",
        "Особливості керування великогабаритними та зчленованими транспортними засобами",
        "Маневрування та проходження складних ділянок маршруту",
        "Правила безпечного перевезення вантажів",
        "Практичні заняття на автомобілях категорії CE та напівпричепах",
        "Підготовка до іспиту на отримання прав категорії CE",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 container mx-auto px-4 text-black">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Програма навчання
      </h2>
      <ul
        className={`list-none flex flex-col gap-1 items-center space-y-4 sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-4 text-black ${styles["program-list"]}`}
      >
        {courseDetails.map((item, index) => (
          <li
            key={index}
            className={`bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ${styles["program-item"]}`}
            onClick={() => toggleItem(index)}
          >
            <div
              className={`p-6 flex justify-between items-center ${styles["program-item-header"]}`}
            >
              <div className="flex gap-2 items-center">
                <img
                  src={item.path}
                  alt={item.title}
                  className="w-8 h-8 mr-4"
                />
                <span>{item.title}</span>
              </div>
              <svg
                className={`transform transition-transform duration-300 ${
                  openedItems.includes(index) ? "rotate-180" : "rotate-0"
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 5.707a1 1 0 011.414 0L8 8.586l2.293-2.879a1 1 0 111.512 1.344l-3 3.75a1 1 0 01-1.512 0l-3-3.75a1 1 0 010-1.344z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div
              className={`${styles["program-item-content"]} ${
                openedItems.includes(index) ? styles["open"] : ""
              }`}
            >
              <ol className={`px-6 py-2 space-y-2 ${styles["opend-list"]}`}>
                {item.description.map((detail, i) => (
                  <li key={i} className="text-sm text-white">
                    {detail}
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Program;
