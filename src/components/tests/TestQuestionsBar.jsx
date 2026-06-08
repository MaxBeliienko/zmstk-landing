export default function TestQuestionsBar({
  questions,
  currentIdx,
  userAnswers,
  onQuestionClick,
}) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 py-3.5 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-[repeat(20,minmax(0,1fr))] gap-2 p-1 justify-items-center max-w-full">
        {questions.map((q, index) => {
          const ansStatus = userAnswers[q._id];
          const isActive = index === currentIdx;

          let btnClass =
            "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-700";

          if (isActive) {
            btnClass =
              "bg-blue-600 border-blue-600 text-white font-black shadow-md shadow-blue-500/20 scale-105 z-10 ring-2 ring-blue-500/30";
          } else if (ansStatus?.isCorrect) {
            btnClass = "bg-green-500 border-green-500 text-white font-bold";
          } else if (ansStatus && !ansStatus.isCorrect) {
            btnClass = "bg-red-500 border-red-500 text-white font-bold";
          }

          return (
            <button
              key={q._id}
              type="button"
              onClick={() => onQuestionClick(index)}
              className={`w-full aspect-square max-w-9 min-w-7 text-xs font-semibold rounded-xl border flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
