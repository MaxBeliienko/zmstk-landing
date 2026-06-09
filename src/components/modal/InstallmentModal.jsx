import { AlertTriangle, ExternalLink, X } from "lucide-react";

export default function InstallmentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fadeIn">
      {/* Головний контейнер модалки */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden text-gray-900 dark:text-white transition-colors duration-500">
        {/* Кнопка закриття (хрестик у верхньому кутку) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer z-10"
        >
          <X size={16} />
        </button>

        {/* Контентне вікно модалки */}
        <div className="p-6 pt-8 flex flex-col items-center text-center gap-4">
          {/* Пульсуюча іконка попередження */}
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-inner animate-pulse">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
              Важливе повідомлення!
            </h3>
            <span className="text-[10px] font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full">
              Узгодження деталей
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-2">
            Оформлення послуги{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              «Оплата частинами»
            </span>{" "}
            відбувається безпосередньо у навчальному закладі
          </p>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-2 bg-gray-50/50 dark:bg-gray-900/20">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-xl transition-all cursor-pointer"
          >
            Скасувати
          </button>

          <a
            href="tel:+380503411049"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-black bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-600/20 transition-all text-center uppercase tracking-wider"
          >
            Зателефонувати
            <ExternalLink size={12} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
}
