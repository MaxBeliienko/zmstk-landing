import styles from "./Program.module.css";
import { useEffect, useRef } from "react";

const Program = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const listItems = entry.target.querySelectorAll("li");
            listItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add(styles["fade-up"]);
              }, index * 300); // Затримка для кожного елементу
            });
          }
        });
      },
      {
        threshold: 0.2, // Коли 20% елемента видно
      }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Програма навчання
      </h2>
      <ul
        ref={listRef}
        className="list-disc pl-6 flex flex-col items-center space-y-4"
      >
        <li className={styles["program-item"]}>
          <img
            src="/path-to-your-image1.jpg"
            alt="Теоретичні заняття з ПДР"
            className={styles["program-image"]}
          />
          Теоретичні заняття з ПДР
        </li>
        <li className={styles["program-item"]}>
          <img
            src="/path-to-your-image2.jpg"
            alt="Практичне водіння в місті"
            className={styles["program-image"]}
          />
          Практичне водіння в місті
        </li>
        <li className={styles["program-item"]}>
          <img
            src="/path-to-your-image3.jpg"
            alt="Підготовка до іспитів"
            className={styles["program-image"]}
          />
          Підготовка до іспитів
        </li>
      </ul>
    </section>
  );
};

export default Program;
