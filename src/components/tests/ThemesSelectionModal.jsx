import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Table,
  LayoutGrid,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import Modal from "../modal/Modal";
import { cleanTopicForUrl } from "../../utils/cleanTopicForUrl";

export default function ThemesSelectionModal({
  isOpen,
  onClose,
  topics,
  completedTopics = [],
  failedTopics = [],
}) {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Допоміжна мікро-функція для порівняння назв без дужок і пробілів
  const getMatchKey = (name) => {
    if (!name) return "";
    return name.split("(")[0].replace(/\s+/g, "").toLowerCase().trim();
  };

  // Мапінг статусів
  const processedThemes = topics.map((topic) => {
    const topicName = topic._id;
    const currentKey = getMatchKey(topicName);

    // Шукаємо об'єкт теми в масиві завершених
    const completedData = completedTopics.find(
      (item) => getMatchKey(item.topicName) === currentKey
    );

    // Шукаємо об'єкт теми в масиві завалених
    const failedData = failedTopics.find(
      (item) => getMatchKey(item.topicName) === currentKey
    );

    let status = "not_started";
    let userScore = null;

    if (completedData) {
      status = "passed";
      userScore = `${completedData.correct}/${completedData.total}`;
    } else if (failedData) {
      status = "failed";
      userScore = `${failedData.correct}/${failedData.total}`;
    }

    return {
      id: cleanTopicForUrl ? cleanTopicForUrl(topicName) : topicName,
      title: topicName,
      status,
      userScore,
      totalQuestions: topic.totalQuestions,
    };
  });

  // 👑 СОРТУВАННЯ ТЕМ ЗА ПОРЯДКОМ (1, 2, 3... 58) ТАК САМО ЯК У СЕЛЕКТОРІ
  const sortedThemes = [...processedThemes].sort((a, b) => {
    const matchA = a.title?.match(/Тема\s+(\d+(?:\.\d+)?)/);
    const matchB = b.title?.match(/Тема\s+(\d+(?:\.\d+)?)/);

    if (!matchA || !matchB) return 0;

    const numA = parseFloat(matchA[1]);
    const numB = parseFloat(matchB[1]);

    return numA - numB;
  });

  const filteredThemes = sortedThemes.filter((theme) =>
    theme.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Обери тему для вивчення"
      size="full"
    >
      {/* Панель пошуку та перемикач */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук теми за назвою..."
            className="w-full rounded-xl pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-300 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-900/60 p-1 rounded-xl w-fit border border-gray-200/50 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setViewType("table")}
            className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewType === "table"
                ? "bg-white dark:bg-gray-800 text-amber-500 shadow-sm"
                : "text-gray-400"
            }`}
          >
            <Table size={14} /> Таблиця
          </button>
          <button
            type="button"
            onClick={() => setViewType("cards")}
            className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewType === "cards"
                ? "bg-white dark:bg-gray-800 text-amber-500 shadow-sm"
                : "text-gray-400"
            }`}
          >
            <LayoutGrid size={14} /> Картки
          </button>
        </div>
      </div>

      {filteredThemes.length === 0 && (
        <div className="p-12 text-center text-sm text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-gray-900/10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          Нічого не знайдено за запитом{" "}
          <span className="font-semibold text-amber-500">"{searchQuery}"</span>
        </div>
      )}

      {/* ФОРМАТ: ТАБЛИЦЯ */}
      {viewType === "table" && filteredThemes.length > 0 && (
        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="pb-2 font-semibold">Назва теми</th>
                {/* 🌟 ОНОВЛЕНО ЗАГОЛОВОК СТОВБЧИКА */}
                <th className="pb-2 text-center font-semibold">
                  Прогрес (Прав/Всього)
                </th>
                <th className="pb-2 text-center font-semibold">Результат</th>
                <th className="pb-2 text-right font-semibold">Дія</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredThemes.map((theme) => {
                const textClass =
                  theme.status === "passed"
                    ? "text-green-600 dark:text-green-400 font-extrabold uppercase tracking-wide text-[11px]"
                    : theme.status === "failed"
                    ? "text-red-500 dark:text-red-400 font-extrabold uppercase tracking-wide text-[11px]"
                    : "text-gray-400 dark:text-gray-500 font-semibold text-xs";

                return (
                  <tr
                    key={theme.title}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/10 transition-colors"
                  >
                    <td className="py-4 pr-2 font-bold max-w-[220px] md:max-w-md lg:max-w-xl truncate text-gray-900 dark:text-white">
                      {theme.title}
                    </td>

                    {/* 🌟 ОНОВЛЕНО: Виводимо рахунок сесії або загальну кількість як фолбек */}
                    <td className="py-4 text-center font-black text-gray-700 dark:text-gray-300">
                      {theme.userScore ? (
                        <span className="bg-gray-100 dark:bg-gray-700/60 px-2 py-1 rounded-md text-xs font-mono">
                          {theme.userScore}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 font-medium">
                          {theme.totalQuestions}
                        </span>
                      )}
                    </td>

                    <td className={`py-4 text-center ${textClass}`}>
                      {theme.status === "passed" && (
                        <span className="flex items-center justify-center gap-1">
                          <CheckCircle
                            size={15}
                            className="text-green-600 dark:text-green-400 shrink-0"
                          />{" "}
                          Успішно
                        </span>
                      )}
                      {theme.status === "failed" && (
                        <span className="flex items-center justify-center gap-1">
                          <XCircle
                            size={15}
                            className="text-red-500 dark:text-red-400 shrink-0"
                          />{" "}
                          Є помилки
                        </span>
                      )}
                      {theme.status === "not_started" && (
                        <span className="flex items-center justify-center gap-1 normal-case tracking-normal font-semibold text-gray-400 dark:text-gray-500 text-xs">
                          <HelpCircle size={15} className="shrink-0" /> Не
                          проходив
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/test/run?mode=theme&id=${theme.id}`)
                        }
                        className="py-1.5 px-4 bg-amber-500 text-gray-900 font-black rounded-xl text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
                      >
                        Вчити
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ФОРМАТ: КАРТКИ */}
      {viewType === "cards" && filteredThemes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          {filteredThemes.map((theme) => {
            const cardStyles =
              theme.status === "passed"
                ? "bg-green-500/10 dark:bg-green-500/15 border-green-500/40 text-green-800 dark:text-green-400"
                : theme.status === "failed"
                ? "bg-red-500/10 dark:bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-400"
                : "bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700 text-gray-400";

            const statusTextClass =
              theme.status === "passed"
                ? "text-green-600 dark:text-green-400 font-extrabold uppercase tracking-wide text-[11px]"
                : theme.status === "failed"
                ? "text-red-600 dark:text-red-400 font-extrabold uppercase tracking-wide text-[11px]"
                : "text-gray-500 dark:text-gray-400 font-semibold text-xs";

            return (
              <div
                key={theme.title}
                className={`p-4 border rounded-xl flex flex-col justify-between gap-3 shadow-xs transition-colors duration-300 ${cardStyles}`}
              >
                <div>
                  <h4 className="font-bold text-xs md:text-sm line-clamp-2 text-gray-900 dark:text-white mb-1">
                    {theme.title}
                  </h4>

                  {/* 🌟 ОНОВЛЕНО: Якщо є рахунок — показуємо його, інакше суху кількість питань */}
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {theme.userScore ? (
                      <>
                        Результат спроби:{" "}
                        <span className="font-mono font-black text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded text-xs">
                          {theme.userScore}
                        </span>
                      </>
                    ) : (
                      <>
                        Всього запитань:{" "}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          {theme.totalQuestions}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t pt-2 border-gray-200/50 dark:border-gray-700/50">
                  <span className={statusTextClass}>
                    {theme.status === "passed" && "Успішно"}
                    {theme.status === "failed" && "Є помилки"}
                    {theme.status === "not_started" && "Не розпочато"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/test/run?mode=theme&id=${theme.id}`)
                    }
                    className="bg-amber-500 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
                  >
                    Старт
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
