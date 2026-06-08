import { useNavigate } from "react-router-dom";
import { AlertTriangle, Check } from "lucide-react";
import Modal from "../modal/Modal";

export default function ExamInstructionModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🚨 Офіційний інструктаж перед іспитом"
      size="md"
    >
      <div className="space-y-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        <div className="flex gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 dark:text-red-400">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide">
              Умови суворого контролю
            </h4>
            <p className="text-xs mt-0.5 opacity-90">
              Симуляція повністю відповідає чинному регламенту Сервісних Центрів
              ГСЦ МВС України.
            </p>
          </div>
        </div>

        <div className="space-y-3 pl-1">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-amber-500 shrink-0 mt-0.5">
              <Check size={14} />
            </div>
            <p>
              <strong>20 випадкових запитань:</strong> Система згенерує
              унікальний комп'ютерний білет із абсолютно різних розділів.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-amber-500 shrink-0 mt-0.5">
              <Check size={14} />
            </div>
            <p>
              <strong>Таймер 20 хвилин:</strong> Час запускається автоматично.
              Ви можете пропустити питання і повернутися до нього потім.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-amber-500 shrink-0 mt-0.5">
              <Check size={14} />
            </div>
            <p>
              <strong>Максимум 2 помилки:</strong> Допущення 3-ї помилки
              автоматично завершує іспит зі статусом{" "}
              <span className="text-red-500 font-bold">"НЕ СКЛАВ"</span>.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center italic pt-2">
          Зосередься. Підказок чи пояснень ПДР під час іспиту не буде.
        </p>

        <div className="flex gap-3 border-t border-gray-100 dark:border-gray-800 pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer text-center text-xs"
          >
            Скасувати
          </button>
          <button
            type="button"
            onClick={() => navigate("/test/run?mode=exam")}
            className="w-1/2 py-2.5 rounded-xl bg-red-600 text-white font-black hover:bg-red-500 transition-all cursor-pointer text-center text-xs shadow-md transform hover:-translate-y-0.5"
          >
            Розпочати екзамен
          </button>
        </div>
      </div>
    </Modal>
  );
}
