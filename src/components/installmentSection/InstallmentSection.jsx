import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CreditCard, CheckCircle2 } from "lucide-react";
import InstallmentModal from "../modal/InstallmentModal";
import och from "../../assets/och.png";

gsap.registerPlugin(ScrollTrigger);

export default function InstallmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
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
      className="py-20 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white border-t border-b border-gray-100 dark:border-gray-800/40 transition-colors duration-500 overflow-hidden"
      id="installments"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center text-center gap-6 overflow-hidden max-w-3xl mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-inner group hover:scale-105 transition-transform duration-300">
            <img
              src={och}
              alt="ПриватБанк Оплата Частинами"
              className="w-16 sm:w-20 object-contain"
            />
          </div>

          <div className="space-y-2 relative z-10 max-w-xl">
            <span className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Без переплат • 0%
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight uppercase">
              Оплата частинами
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed pt-1">
              Розділіть вартість навчання на комфортні щомісячні платежі через
              ПриватБанк. Отримуйте знання та водійські права вже зараз без
              зайвого фінансового навантаження на бюджет.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-gray-600 dark:text-gray-300 relative z-10 border-t border-b border-gray-100 dark:border-gray-700/60 py-3 w-full max-w-lg">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Перший
              внесок 0%
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Без
              прихованих комісій
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Оформлення
              за 1 хвилину
            </div>
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/10 hover:shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <CreditCard size={14} />
              Оформити ОЧ
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <InstallmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
