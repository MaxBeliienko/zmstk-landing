import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Car,
  Laptop,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const coreValues = [
    {
      icon: <GraduationCap size={24} className="text-amber-500" />,
      title: "Сучасні методики",
      text: "Поєднуємо класичні стандарти підготовки водіїв з інноваційними методами навчання.",
    },
    {
      icon: <Users size={24} className="text-amber-500" />,
      title: "Досвідчені інструктори",
      text: "Майстри виробничого навчання з багаторічним досвідом, які спокійно та зрозуміло пояснюють усі тонкощі водіння.",
    },
    {
      icon: <ShieldCheck size={24} className="text-amber-500" />,
      title: "Пріоритет безпеки",
      text: "Навчаємо нове та свідоме покоління водіїв, готових до викликів за кермом.",
    },
    {
      icon: <Car size={24} className="text-amber-500" />,
      title: "Широкий автопарк",
      text: "Великий вибір сучасних транспортних засобів: від маневреної мототехніки до різноманітних легкових автомобілів.",
    },
    {
      icon: <Laptop size={24} className="text-amber-500" />,
      title: "Теорія онлайн / офлайн",
      text: "Гнучкий формат навчання. Обирайте зручні класи або підключайтеся до інтерактивних занять у режимі онлайн.",
    },
    {
      icon: <HeartHandshake size={24} className="text-amber-500" />,
      title: "Індивідуальний підхід",
      text: "Адаптуємо графік водіння та темп навчання под ваші особисті потреби, зайнятість та рівень підготовки.",
    },
  ];

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500 overflow-hidden"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Заголовок */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-black tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full">
            Про автошколу
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Автошкола Знам’янського МСТК <br />
            ТСО України
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Текстовий блок */}
        <div className="max-w-3xl mx-auto text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
          <p>
            Наша команда навчає не просто кермувати, а готує впевнених і
            відповідальних водіїв, готових до будь-яких ситуацій на дорозі.
          </p>
          <p className="text-lg">
            Сучасні методики, досвідчені інструктори та індивідуальний підхід —
            усе для вашої безпеки, впевненості та комфорту.
          </p>
        </div>

        {/* Слайдер та навігація */}
        <div className="flex items-center justify-between gap-2 md:gap-4 pt-6">
          {/* Маленька та акуратна стрілочка Ліворуч */}
          <button
            ref={prevRef}
            className="p-1.5 rounded-full text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 transition-all shrink-0 focus:outline-none disabled:opacity-20"
            aria-label="Попередній слайд"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Вікно каруселі */}
          <div className="w-full overflow-hidden px-1">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                // Цей хак примусово оновлює прив'язку кнопок після ініціалізації Swiper у DOM
                setTimeout(() => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {coreValues.map((value, idx) => (
                <SwiperSlide key={idx} className="py-2">
                  <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 space-y-3 h-full select-none">
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Маленька та акуратна стрілочка Праворуч */}
          <button
            ref={nextRef}
            className="p-1.5 rounded-full text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 transition-all shrink-0 focus:outline-none disabled:opacity-20"
            aria-label="Наступний слайд"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
