import { useState, useEffect } from "react";
import {
  Search,
  X,
  Table,
  LayoutGrid,
  CheckCircle,
  XCircle,
  HelpCircle,
  BookOpen,
  Percent,
  GraduationCap,
} from "lucide-react";
import Modal from "./Modal";
import axios from "axios";
import { cleanTopicForUrl } from "../../utils/cleanTopicForUrl";

export default function StudentStatsModal({ isOpen, onClose, student }) {
  const [viewType, setViewType] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");

  // Локальні стейти для повної ізоляції даних обраного студента
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !student?._id) return;

    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const [topicsRes, statsRes] = await Promise.all([
          axios.get("https://zmstk-back.onrender.com/api/questions/topics"),
          axios.get(
            `https://zmstk-back.onrender.com/api/tests/statistics/${student._id}`
          ),
        ]);

        const topicsData = Array.isArray(topicsRes.data)
          ? topicsRes.data
          : topicsRes.data?.topics || topicsRes.data?.data || [];

        setTopics(topicsData);
        setStats(statsRes.data || null);
      } catch (error) {
        console.error("Помилка завантаження статистики студента:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [isOpen, student]);

  if (!isOpen || !student) return null;

  // Допоміжна мікро-функція для порівняння назв без дужок і пробілів
  const getMatchKey = (name) => {
    if (!name) return "";
    return name.split("(")[0].replace(/\s+/g, "").toLowerCase().trim();
  };

  // Розумний мапінг статусів на основі отриманих об'єктів з бекенду
  const processedThemes = topics.map((topic) => {
    const topicName = topic._id;
    const currentKey = getMatchKey(topicName);

    // Шукаємо тему в об'єктах завершених тем
    const completedData = stats?.completedTopics?.find(
      (item) => getMatchKey(item.topicName) === currentKey
    );

    // Шукаємо тему в об'єктах завалених тем
    const failedData = stats?.failedTopics?.find(
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
      id: cleanTopicForUrl(topicName),
      title: topicName,
      status,
      userScore,
      totalQuestions: topic.totalQuestions,
    };
  });

  // 👑 Сортування тем за номерами (1, 2, 3...)
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

  // Розрахунок загальних показників
  const passedCount = stats?.completedTopics?.length || 0;
  const totalThemes = topics.length;
  const progressPercent =
    totalThemes > 0 ? Math.round((passedCount / totalThemes) * 100) : 0;

  const topicCorrect = stats?.statistics?.topics?.correct || 0;
  const topicIncorrect = stats?.statistics?.topics?.incorrect || 0;
  const totalTopicAnswers = topicCorrect + topicIncorrect;
  const topicAccuracy =
    totalTopicAnswers > 0
      ? Math.round((topicCorrect / totalTopicAnswers) * 100)
      : 0;

  const examCorrect = stats?.statistics?.exams?.correct || 0;
  const examIncorrect = stats?.statistics?.exams?.incorrect || 0;
  const totalExamAnswers = examCorrect + examIncorrect;
  const examAccuracy =
    totalExamAnswers > 0
      ? Math.round((examCorrect / totalExamAnswers) * 100)
      : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Аналітика успішності: ${student.name}`}
      size="full"
    >
      {loading ? (
        <div className="p-12 text-center text-sm font-semibold text-gray-400 animate-pulse">
          Завантаження розгорнутої статистики студента...
        </div>
      ) : (
        <div className="space-y-6">
          {/* БЛОК КАРТОК ЗАГАЛЬНОЇ СТАТИСТИКИ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Розділи ПДР */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-200/60 dark:border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> Засвоєння тем ПДР
                </span>
                <span className="text-green-500 font-black">
                  {passedCount} / {totalThemes}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* ПАНЕЛЬ УПРАВЛІННЯ СПИСКОМ ТЕМ */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-t-gray-100 dark:border-t-gray-800">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук теми за назвою..."
                className="w-full rounded-xl pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 cursor-pointer"
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

          {/* ТАБЛИЧНИЙ РЕЖИМ */}
          {viewType === "table" && filteredThemes.length > 0 && (
            <div className="overflow-x-auto max-h-[45vh] overflow-y-auto pr-1 custom-scrollbar">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                    <th className="pb-2 font-semibold">Назва розділу ПДР</th>
                    {/* 🌟 ОНОВЛЕНО СТОВБЧИК: ТЕПЕР ПРОГРЕС */}
                    <th className="pb-2 text-center font-semibold">
                      Прогрес (Прав/Всього)
                    </th>
                    <th className="pb-2 text-right font-semibold">
                      Статус теми
                    </th>
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
                        <td className="py-3.5 pr-2 font-bold max-w-[260px] md:max-w-md lg:max-w-2xl truncate text-gray-900 dark:text-white">
                          {theme.title}
                        </td>

                        {/* 🌟 ДИНАМІЧНИЙ РЕНДЕР ПРОГРЕСУ СТУДЕНТА */}
                        <td className="py-3.5 text-center font-black text-gray-700 dark:text-gray-300">
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

                        <td className={`py-3.5 text-right ${textClass}`}>
                          {theme.status === "passed" && (
                            <span className="inline-flex items-center gap-1 bg-green-500/10 px-2.5 py-1 rounded-md">
                              <CheckCircle size={14} /> Здано
                            </span>
                          )}
                          {theme.status === "failed" && (
                            <span className="inline-flex items-center gap-1 bg-red-500/10 px-2.5 py-1 rounded-md">
                              <XCircle size={14} /> Не склав
                            </span>
                          )}
                          {theme.status === "not_started" && (
                            <span className="inline-flex items-center gap-1 text-xs normal-case tracking-normal font-semibold text-gray-400 dark:text-gray-500">
                              <HelpCircle size={14} /> Не розпочато
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* РЕЖИМ КАРТОК */}
          {viewType === "cards" && filteredThemes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[45vh] overflow-y-auto pr-1 custom-scrollbar">
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
                    className={`p-4 border rounded-xl flex flex-col justify-between gap-3 shadow-xs transition-all duration-300 ${cardStyles}`}
                  >
                    <div>
                      <h4 className="font-bold text-xs md:text-sm line-clamp-2 text-gray-900 dark:text-white mb-1">
                        {theme.title}
                      </h4>

                      {/* 🌟 ДИНАМІЧНИЙ РЕЗУЛЬТАТ НА КАРТКАХ */}
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
                            База питань:{" "}
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
                        {theme.status === "failed" && "З помилками"}
                        {theme.status === "not_started" && "Не розпочато"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
