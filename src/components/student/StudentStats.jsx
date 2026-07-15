import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import {
  fetchQuestionTopics,
  fetchStudentStatistics,
} from "../../redux/tests/operations";
import {
  selectQuestionTopics,
  selectStudentStatistics,
  selectCompletedTopics,
  selectFailedTopics,
} from "../../redux/tests/selectors";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Percent,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

import ThemesSelectionModal from "../tests/ThemesSelectionModal";

export default function StudentStats() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const topicsFromServer = useSelector(selectQuestionTopics) || [];
  const statsCounters = useSelector(selectStudentStatistics);
  const completedTopics = useSelector(selectCompletedTopics) || [];
  const failedTopics = useSelector(selectFailedTopics) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    dispatch(fetchQuestionTopics());
    dispatch(fetchStudentStatistics(user._id));
  }, [dispatch, user]);

  const totalThemes = topicsFromServer.length;
  const passedCount = completedTopics.length;
  const failedCount = failedTopics.length;

  const themesProgressPercent =
    totalThemes > 0 ? Math.round((passedCount / totalThemes) * 100) : 0;

  const notStartedCount = Math.max(0, totalThemes - passedCount - failedCount);

  const topicCorrect = statsCounters?.topics?.correct || 0;
  const topicIncorrect = statsCounters?.topics?.incorrect || 0;
  const totalTopicAnswers = topicCorrect + topicIncorrect;
  const topicAccuracy =
    totalTopicAnswers > 0
      ? Math.round((topicCorrect / totalTopicAnswers) * 100)
      : 0;

  const examCorrect = statsCounters?.totalCorrect || 0;
  const examIncorrect = statsCounters?.totalIncorrect || 0;
  const totalExamAnswers = examCorrect + examIncorrect;
  const examAccuracy =
    totalExamAnswers > 0
      ? Math.round((examCorrect / totalExamAnswers) * 100)
      : 0;

  const globalTotal = totalTopicAnswers + totalExamAnswers;
  let readinessStatus = "Аналіз даних...";
  let readinessClass = "text-gray-400 bg-gray-100 dark:bg-gray-900";

  if (globalTotal > 0) {
    if (passedCount > totalThemes * 0.7) {
      readinessStatus = "Висока готовність до СЦ";
      readinessClass = "text-green-600 bg-green-500/10 dark:text-green-400";
    } else if (topicAccuracy >= 75) {
      readinessStatus = "Середній рівень";
      readinessClass = "text-amber-600 bg-amber-500/10 dark:text-amber-400";
    } else {
      readinessStatus = "Багато помилок";
      readinessClass = "text-red-500 bg-red-500/10 dark:text-red-400";
    }
  }

  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg transition-colors duration-500 flex flex-col justify-between h-full">
      <div className="space-y-5">
        <div className="flex flex-col gap-1 items-start justify-between border-b border-gray-100 dark:border-gray-700/50 pb-3">
          <div className="flex items-center gap-2 font-black text-lg text-gray-900 dark:text-white">
            <BarChart3 size={22} className="text-amber-500" />
            Центр аналітики знань
          </div>
          <span
            className={`text-[10px] uppercase font-black tracking-wide px-2.5 py-1 rounded-md ${readinessClass}`}
          >
            {readinessStatus}
          </span>
        </div>

        <div className="flex items-center gap-5 bg-gray-50/50 dark:bg-gray-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-900 relative">
          <div className="relative flex items-center justify-center shrink-0 w-16 h-16">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-500 transition-all duration-1000"
                strokeDasharray={`${themesProgressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-gray-900 dark:text-white">
                {themesProgressPercent}%
              </span>
              <span className="text-[7px] text-gray-400 font-bold uppercase tracking-tight">
                Здано
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle size={13} className="text-green-500" /> Засвоєно
                повністю:
              </span>
              <span className="text-gray-900 dark:text-white font-black">
                {passedCount} тем
              </span>
            </div>

            <div className="flex justify-between font-bold text-gray-500">
              <span className="flex items-center gap-1">
                <HelpCircle size={13} className="text-gray-400" /> Ще не
                проходив:
              </span>
              <span className="text-gray-900 dark:text-white font-black">
                {notStartedCount} тем
              </span>
            </div>

            <div className="flex justify-between font-bold text-gray-500 relative group cursor-help py-0.5 rounded-sm hover:bg-gray-100/50 dark:hover:bg-gray-800/50 px-1 -mx-1 transition-colors">
              <span className="flex items-center gap-1">
                <AlertTriangle size={13} className="text-red-400" /> Зверни
                увагу:
              </span>
              <span className="text-gray-900 dark:text-white font-black">
                {failedCount} тем
              </span>

              {failedCount > 0 && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-[11px] p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-30 space-y-2">
                  <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 text-red-500">
                    Теми з помилками ({failedCount}):
                  </p>
                  <div className="max-h-24 overflow-y-auto space-y-1 custom-scrollbar font-medium pr-1">
                    {failedTopics.map((topic, index) => (
                      <p
                        key={index}
                        className="truncate"
                        title={topic.topicName || topic}
                      >
                        • {topic.topicName || topic}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-end text-xs">
            <span className="font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen size={13} /> Загальний теоретичний прогрес
            </span>
            <span className="font-black text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
              {themesProgressPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative border border-gray-200/10">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${themesProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-900/60 space-y-1.5 text-xs">
            <p className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight text-[10px] flex items-center gap-1">
              <Percent size={12} className="text-amber-500" /> Точність у темах
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              {topicAccuracy}%
            </p>
            <div className="flex items-center gap-2 text-[11px] font-medium pt-0.5 text-gray-500">
              <span className="text-green-500 font-bold">✔ {topicCorrect}</span>
              <span className="text-red-400 font-bold">✖ {topicIncorrect}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-900/60 space-y-1.5 text-xs">
            <p className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight text-[10px] flex items-center gap-1">
              <GraduationCap size={13} className="text-red-500" /> Тести
              симулятора
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              {examAccuracy}%
            </p>
            <div className="flex items-center gap-2 text-[11px] font-medium pt-0.5 text-gray-500">
              <span className="text-green-500 font-bold">✔ {examCorrect}</span>
              <span className="text-red-400 font-bold">✖ {examIncorrect}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Головна кнопка */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full !mt-5 py-3 px-4 bg-gray-950 text-white dark:bg-white dark:text-gray-950 font-black rounded-xl text-xs hover:bg-gray-900 dark:hover:bg-gray-100 transition-all text-center cursor-pointer shadow-md transform hover:-translate-y-0.5"
      >
        Статистика за темами
      </button>

      {/* Модальне вікно */}
      <ThemesSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topics={topicsFromServer}
        completedTopics={completedTopics}
        failedTopics={failedTopics}
      />
    </div>
  );
}
