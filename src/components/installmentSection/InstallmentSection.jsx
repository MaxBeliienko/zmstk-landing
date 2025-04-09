import styles from "./InstallmentSection.module.css";
import { useState, useEffect, useRef } from "react";
import InstallmentModal from "../InstallmentModal";
import och from "../../assets/och.png";

const InstallmentSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["fade-up"]);
          }
        });
      },
      {
        threshold: 0.2,
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
      className={`py-16 container mx-auto px-4 flex flex-col items-center text-center ${styles["installment-section"]}`}
      id="installments"
    >
      <img src={och} alt="pay-logo" className="w-20" />
      <h2 className="text-3xl font-semibold mb-4">Оплата частинами</h2>
      <p className="mb-6 text-lg">
        Можливість оформити навчання на виплату через ПриватБанк. Це дозволить
        вам отримати необхідні знання та навички без зайвих фінансових
        навантажень.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-lime-500 text-white px-6 py-3 rounded hover:bg-lime-600 transition duration-300"
      >
        Оформити ОЧ
      </button>
      {isModalOpen && (
        <InstallmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default InstallmentSection;
