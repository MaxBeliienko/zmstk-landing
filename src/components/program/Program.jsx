import { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Gauge,
  RefreshCw,
  Truck,
} from "lucide-react";

export default function Program() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const courseDetails = [
    {
      icon: BookOpen,
      title: "Теоретичний курс",
      subtitle: "Основи ПДР, безпека та домедична допомога",
      description: [
        "Лекції з атестованим викладачем-практиком в класах або онлайн",
        "Вивчення Правил дорожнього руху, основ безпеки, будови та експлуатації ТЗ",
        "Заняття з надання домедичної допомоги, права, страхування та європротоколів",
        "Повноцінна підготовка до складання теоретичних тестувань у ТСЦ",
      ],
    },
    {
      icon: Gauge,
      title: "Практичний курс",
      subtitle: "Керування автомобілем від автодрому до міста",
      description: [
        "Навчання початковим навичкам керування транспортом",
        "Заняття на власному сертифікованому закритому автодромі",
        "Робота з різними складними дорожніми умовами та перехрестями",
        "Детальний аналіз реальних дорожніх ситуацій та підготовка до іспиту у ТСЦ",
      ],
    },
    {
      icon: Truck,
      title: "Підвищення кваліфікації (Категорія СЕ)",
      subtitle: "Управління вантажівками важкої категорії з причепом",
      description: [
        "Поглиблене вивчення специфіки правил руху для автопоїздів",
        "Особливості маневрування та проходження складних ділянок маршруту",
        "Правила безпечного кріплення, розподілу та перевезення вантажів",
        "Практичні заняття та підготовка до іспиту на автомобілі категорії CE",
      ],
    },
    {
      icon: RefreshCw,
      title: "Відновлення навичок",
      subtitle: "Для тих, хто вже має права, але втратив впевненість",
      description: [
        "Вдосконалення втрачених або слабких водійських вмінь",
        "Індивідуальні маршрути (дім - робота, складні розв'язки, паркування)",
        "Адаптація до сучасних інтенсивних умов дорожнього руху міста",
        "Індивідуальний психологічний підхід до кожного учня",
      ],
    },
  ];

  return (
    <section
      className="py-24 bg-white text-gray-900 dark:bg-gray-800 dark:text-white border-t border-b border-gray-100 dark:border-gray-700/40 transition-colors duration-500"
      id="program"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="inline-block text-xs font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 dark:bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Навчальний план
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-none uppercase">
            Програма навчання
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="space-y-4">
          {courseDetails.map((item, index) => {
            const isOpen = openIndex === index;
            const IconComponent = item.icon;

            return (
              <div
                key={index}
                className={`bg-gray-50 border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen
                    ? "border-amber-500/40 bg-amber-500/[0.01] dark:bg-gray-900/40 dark:border-amber-500/30 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:bg-gray-900/20 dark:border-gray-700/60 dark:hover:border-gray-600/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 flex justify-between items-center text-left gap-4 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-amber-500 text-gray-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                          : "bg-gray-100 dark:bg-gray-800 border-gray-200/40 dark:border-gray-700/30 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:bg-amber-500/5"
                      }`}
                    >
                      <IconComponent
                        size={22}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-base font-black uppercase tracking-tight transition-colors duration-300 ${
                          isOpen
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5 hidden sm:block">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-amber-500/20 text-amber-600 dark:text-amber-400"
                        : "group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800/80">
                      <ul className="space-y-3">
                        {item.description.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-normal animate-fadeIn"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
