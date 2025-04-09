import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import styles from "./ReviewsSlider.module.css";
import carIcon from "../../assets/car-icon.png";
import { Pagination } from "swiper/modules";

// Додаткові імпорти для анімацій
import { motion } from "framer-motion";

// Відгуки
const reviews = [
  {
    id: 1,
    name: "Олександр",
    text: "Навчання було зручним та ефективним! Рекомендую.",
  },
  {
    id: 2,
    name: "Ірина",
    text: "Цей курс допоміг мені підготуватись до іспитів. Дуже вдячна!",
  },
  {
    id: 3,
    name: "Максим",
    text: "Педагоги досвідчені, матеріал доступний. Рекомендую всім!",
  },
  {
    id: 4,
    name: "Катерина",
    text: "Чудова програма навчання! Все чітко та зрозуміло.",
  },
  {
    id: 5,
    name: "Андрій",
    text: "Після цього курсу я став набагато впевненішим за кермом.",
  },
];

const ReviewsSlider = () => {
  return (
    <section className="py-16 bg-gray-100 container mx-auto px-4" id="reviews">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Відгуки наших учнів
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1, // На мобільних пристроях
          },
          768: {
            slidesPerView: 2, // На планшетах
          },
          1024: {
            slidesPerView: 3, // На десктопах
          },
        }}
        loop={false} // Без безкінечного циклу
        autoplay={{
          delay: 3000,
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true, // Дозволяє клікати на крапки
          dynamicBullets: true, // Анімація для крапок
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className={styles["review-card"]}>
              <motion.div
                className={styles["car-animation"]}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 100, duration: 4 }}
              >
                <img src={carIcon} alt="car icon" className={styles["car"]} />
                {/* Тут буде ваша анімація машини */}
              </motion.div>
              <blockquote className="italic mt-4">
                “{review.text}” <br />
                <span className="font-bold">— {review.name}</span>
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewsSlider;
