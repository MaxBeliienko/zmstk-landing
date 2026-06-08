import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 🌟 Додано для редіректу на тест
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { fetchPendingHomework } from "../../redux/tests/operations";
import { LogOut, Award, AlertCircle, X, Play, ArrowRight } from "lucide-react"; // 🌟 Нові іконки
import ThemeToggle from "../ThemeToggle";

export default function StudentHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🌟 Хук навігації
  const user = useSelector(selectUser);

  const pendingHomework =
    useSelector((state) => state.tests.pendingHomework) || [];
  const hasPendingHomework = pendingHomework.length > 0;

  // 🌟 Стейт для відкриття модалки зі списком ДЗ
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?._id && user?.role === "student") {
      dispatch(fetchPendingHomework(user._id));
    }
  }, [dispatch, user?._id]);

  // 🌟 Функція запуску тесту по обраній темі
  const handleStartTest = (topicName) => {
    setIsModalOpen(false);
    navigate(`/test/run?mode=theme&id=${encodeURIComponent(topicName)}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg gap-4 transition-colors duration-500">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider mb-1">
            <Award size={16} /> Кабінет Курсанта
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
            Вітаємо, {user?.name || "Учню"}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 transition-colors duration-500">
            Твій особистий тренажер ПДР. Готуйся до іспиту впевнено.
          </p>

          {/* 🌟 ОНОВЛЕНИЙ БЛОК СПОВІЩЕННЯ З КНОПКОЮ ПЕРЕХОДУ */}
          {hasPendingHomework && (
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 px-4 py-2.5 rounded-xl text-xs font-medium">
              <div className="flex items-center gap-2">
                {/* Пульсує тепер тільки сама іконка, щоб інтерфейс виглядав спокійніше */}
                <AlertCircle
                  size={15}
                  className="text-amber-500 animate-pulse shrink-0"
                />
                <span className="opacity-95">
                  <span className="font-bold">Невиконане ДЗ:</span> У вас є
                  нездані теми за графіком вашої групи ({pendingHomework.length}{" "}
                  шт.).
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="shrink-0 flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black rounded-lg transition-colors cursor-pointer shadow-xs uppercase tracking-wider text-[10px]"
              >
                Перейти <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-gray-700">
          <ThemeToggle />

          <button
            onClick={() => dispatch(logoutUser())}
            className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer"
          >
            <LogOut size={16} /> Вийти
          </button>
        </div>
      </div>

      {/* 🌟 МОДАЛЬНЕ ВІКНО З СПИСКОМ ТЕМ ДОМАШНЬОГО ЗАВДАННЯ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fadeIn text-gray-900 dark:text-white">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden transition-all duration-500">
            {/* Хедер модалки */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-base uppercase tracking-tight">
                  Ваші домашні завдання
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Теми, які призначив викладач для обов'язкового проходження
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Скрол-список обов'язкових тем */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1 bg-gray-50/30 dark:bg-gray-900/5 custom-scrollbar">
              {pendingHomework.map((topicName, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all shadow-xs gap-4"
                >
                  <span className="text-xs md:text-sm font-semibold leading-snug text-gray-800 dark:text-gray-200">
                    {topicName}
                  </span>

                  {/* Кнопка швидкого старту тесту */}
                  <button
                    type="button"
                    onClick={() => handleStartTest(topicName)}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-black rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <Play size={11} fill="currentColor" /> Здати
                  </button>
                </div>
              ))}
            </div>

            {/* Кнопка закриття */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end bg-white dark:bg-gray-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all cursor-pointer"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
