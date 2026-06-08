import { Award, Frown, CheckCircle2, RotateCcw } from "lucide-react";

export default function TestResultsContent({
  mode,
  topicId,
  totalCorrect,
  totalQuestions,
  timeSpent,
  actualMistakesCount,
  onMistakesReview,
  onReturn,
}) {
  const totalIncorrect =
    typeof actualMistakesCount === "number"
      ? actualMistakesCount
      : totalQuestions - totalCorrect;

  const successRate =
    totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  // 🌟 Додаємо перевірку, чи це режим роботи над помилками
  const isMistakesReview = mode === "mistakes_review";

  const isExamPassed = mode === "exam" && totalCorrect >= 18;
  const isTopicPassed = mode === "theme" && successRate >= 90;

  // У режимі роботи над помилками успіхом вважається повна відсутність нових помилок
  const isSuccess = isMistakesReview
    ? totalIncorrect === 0
    : mode === "exam"
    ? isExamPassed
    : isTopicPassed;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-12 px-4 transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-6 md:p-10 text-center space-y-8">
        {/* ДИНАМІЧНА ШАПКА */}
        <div className="space-y-3">
          {isSuccess ? (
            <div className="inline-flex p-4 bg-green-500/10 text-green-500 rounded-full animate-bounce">
              <Award size={48} />
            </div>
          ) : (
            <div className="inline-flex p-4 bg-red-500/10 text-red-500 rounded-full animate-pulse">
              <Frown size={48} />
            </div>
          )}

          {/* 🌟 ОНОВЛЕНО: Текст головного заголовку */}
          <h2 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight uppercase">
            {isMistakesReview
              ? isSuccess
                ? "🎉 ВСІ ПОМИЛКИ ВИПРАВЛЕНО!"
                : "❌ ЗАЛИШИЛИСЬ НЕВИПРАВЛЕНІ ПОМИЛКИ"
              : mode === "exam"
              ? isSuccess
                ? "🎉 ЕКЗАМЕН СКЛАДЕНО!"
                : "❌ ЕКЗАМЕН НЕ СКЛАДЕНО"
              : isSuccess
              ? "🎉 ТЕМУ УСПІШНО ЗДАНО!"
              : "❌ ТЕМУ НЕ ЗДАНО"}
          </h2>

          {/* 🌟 ОНОВЛЕНО: Текст підзаголовку/опису результату */}
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {isMistakesReview
              ? isSuccess
                ? "Чудова робота! Ви успішно розібрали та подужали всі проблемні питання цієї сесії."
                : `Ви повторно опрацювали пул помилок, але припустилися ще ${totalIncorrect} неточностей. Спробуйте ще раз!`
              : mode === "exam"
              ? `Результат симуляції іспиту в СЦ. Відповіді: ${totalCorrect}/20.`
              : `Опрацювання теми: "${topicId}". Результат: ${successRate.toFixed(
                  1
                )}% правильних відповідей (треба від 90%).`}
          </p>
        </div>

        {/* СТАТИСТИКА У ЦИФРАХ */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto bg-gray-50 dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-200/60 dark:border-gray-800">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase">
              Правильно
            </p>
            <p className="text-2xl font-black text-green-500">{totalCorrect}</p>
          </div>
          <div className="space-y-1 border-x border-gray-200 dark:border-gray-800">
            <p className="text-[11px] font-bold text-gray-400 uppercase">
              Помилки
            </p>
            <p className="text-2xl font-black text-red-500">{totalIncorrect}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase">Час</p>
            <p className="text-2xl font-black text-amber-500">
              {formatTime(timeSpent)}
            </p>
          </div>
        </div>

        {/* КНОПКИ ДІЙ */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
          {/* Робота над помилками доступна, якщо вони є і передана функція-колбек */}
          {onMistakesReview && totalIncorrect > 0 && (
            <button
              type="button"
              onClick={onMistakesReview}
              className="w-full sm:w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {/* 🌟 Динамічний текст на самій кнопці повторного кола */}
              {isMistakesReview
                ? "Повторити роботу над помилками"
                : "Робота над помилками"}
            </button>
          )}
          <button
            type="button"
            onClick={onReturn}
            className={`py-3 font-bold rounded-xl text-xs transition-all cursor-pointer text-center border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 ${
              onMistakesReview && totalIncorrect > 0
                ? "w-full sm:w-1/2"
                : "w-full max-w-xs mx-auto"
            }`}
          >
            Повернутись до центру тестів
          </button>
        </div>
      </div>
    </div>
  );
}
