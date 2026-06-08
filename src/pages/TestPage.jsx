import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 🌟 Додано useNavigate
import { selectUser } from "../redux/auth/selectors";
import {
  fetchQuestionTopics,
  fetchStudentStatistics,
} from "../redux/tests/operations";
import {
  selectQuestionTopics,
  selectCompletedTopics,
  selectFailedTopics,
} from "../redux/tests/selectors";

import { BookOpen, Timer, LayoutDashboard } from "lucide-react"; // 🌟 Додано LayoutDashboard
import ThemesSelectionModal from "../components/tests/ThemesSelectionModal";
import ExamInstructionModal from "../components/tests/ExamInstructionModal";

export default function TestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🌟 Ініціалізуємо навігацію
  const user = useSelector(selectUser);

  // Підключаємо чисті селектори
  const topicsFromServer = useSelector(selectQuestionTopics) || [];
  const completedTopics = useSelector(selectCompletedTopics);
  const failedTopics = useSelector(selectFailedTopics);

  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    dispatch(fetchQuestionTopics());
    dispatch(fetchStudentStatistics(user._id));
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 🌟 ОНОВЛЕНО: Шапка сторінки стала флекс-контейнером для кнопки кабінету */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Центр Тестування ПДР
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Обери формат навчання та перевір свій рівень готовності до
              офіційного іспиту.
            </p>
          </div>

          {/* 🌟 НОВА КНОПКА: Перехід в особистий кабінет */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700/80 dark:text-white font-bold rounded-xl text-xs border border-gray-200 dark:border-gray-700 transition-all cursor-pointer shadow-xs mx-auto md:mx-0 transform hover:-translate-y-0.5"
          >
            <LayoutDashboard size={16} className="text-amber-500" />
            <span>Особистий кабінет</span>
          </button>
        </div>

        {/* Картки вибору режимів */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Режим: Теми */}
          <div
            onClick={() => setIsThemesOpen(true)}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between min-h-[240px]"
          >
            <div className="absolute -right-6 -bottom-6 text-amber-500/5 dark:text-amber-500/10 transition-transform group-hover:scale-110 duration-500 pointer-events-none">
              <BookOpen size={140} />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl w-fit">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">
                Проходити по темах
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                Послідовне вивчення всіх розділів ПДР. Ідеяльно для ретельного
                опрацювання знань без обмежень у часі.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-500 flex items-center gap-1.5 mt-4">
              Відкрити список тем <MoveRightIcon />
            </div>
          </div>

          {/* Режим: Екзамен */}
          <div
            onClick={() => setIsExamOpen(true)}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col justify-between min-h-[240px]"
          >
            <div className="absolute -right-6 -bottom-6 text-red-500/5 dark:text-red-500/10 transition-transform group-hover:scale-110 duration-500 pointer-events-none">
              <Timer size={140} />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl w-fit">
                <Timer size={28} />
              </div>
              <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">
                Екзамен в СЦ МВС
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                Повна симуляція офіційного теоретичного іспиту: 20 випадкових
                запитань, жорсткий ліміт часу та максимум 2 помилки.
              </p>
            </div>
            <div className="text-xs font-semibold text-red-500 flex items-center gap-1.5 mt-4">
              Перейти до симулятора <MoveRightIcon />
            </div>
          </div>
        </div>

        {/* Підключаємо перевикористовувані модалки з папки tests */}
        <ThemesSelectionModal
          isOpen={isThemesOpen}
          onClose={() => setIsThemesOpen(false)}
          topics={topicsFromServer}
          completedTopics={completedTopics}
          failedTopics={failedTopics}
        />

        <ExamInstructionModal
          isOpen={isExamOpen}
          onClose={() => setIsExamOpen(false)}
        />
      </div>
    </div>
  );
}

function MoveRightIcon() {
  return (
    <svg
      className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
