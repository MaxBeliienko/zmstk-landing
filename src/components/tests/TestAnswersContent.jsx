import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors"; // 🌟 Перевір шлях до твоїх селекторів auth
import { ChevronRight, Edit3 } from "lucide-react"; // 🌟 Додано Edit3
import { cleanTopicForUrl } from "../../utils/cleanTopicForUrl";
import EditQuestionModal from "../modal/EditQuestionModal"; // 🌟 Перевір шлях до файлу модалки

export default function TestAnswersContent({
  questionText,
  options,
  selectedAnswerIdx,
  onSelectAnswer,
  onSkip,
  onSubmit,
  currentIdx,
  totalQuestions,
  savedAnswer,
  currentQuestionObject,
}) {
  const isAlreadyAnswered = !!savedAnswer;
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xs flex flex-col justify-between min-h-[360px] transition-colors">
        {/* Текст питання */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              Запитання {currentIdx + 1} з {totalQuestions}
            </div>

            {/* 🌟 НОВЕ: Іконка редагування для адміна */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="p-1 text-amber-500 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                title="Редагувати це запитання"
              >
                <Edit3 size={13} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <h3 className="text-sm md:text-base font-black leading-snug text-gray-900 dark:text-white transition-colors">
            {questionText}
          </h3>
        </div>

        {/* Варіанти відповідей */}
        <div className="space-y-3 w-full flex flex-col gap-3">
          {options?.map((option, ansIdx) => {
            const isThisOptionChosen = savedAnswer?.chosenIdx === ansIdx;
            const isThisOptionCorrect = option.isCorrect;
            const isSelectedNow = selectedAnswerIdx === ansIdx;

            let btnStyle =
              "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/60";
            let badgeStyle =
              "bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800";

            if (isAlreadyAnswered) {
              if (isThisOptionCorrect) {
                btnStyle = "bg-green-500 border-green-500 text-white font-bold";
                badgeStyle = "bg-green-700 text-white border-green-700";
              } else if (isThisOptionChosen && !isThisOptionCorrect) {
                btnStyle = "bg-red-500 border-red-500 text-white font-bold";
                badgeStyle = "bg-red-700 text-white border-red-700";
              }
            } else if (isSelectedNow) {
              btnStyle =
                "bg-amber-500 border-amber-500 text-gray-950 font-bold scale-[1.005]";
              badgeStyle = "bg-gray-950 text-amber-400 border-gray-950";
            }

            return (
              <button
                key={option._id || ansIdx}
                type="button"
                disabled={isAlreadyAnswered}
                onClick={() => onSelectAnswer(ansIdx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm transition-all duration-300 flex items-start gap-3 shadow-xs font-medium ${
                  isAlreadyAnswered
                    ? "disabled:cursor-default"
                    : "cursor-pointer"
                } ${btnStyle}`}
              >
                <span
                  className={`w-5 h-5 shrink-0 rounded-lg text-[11px] font-black flex items-center justify-center border transition-colors ${badgeStyle}`}
                >
                  {ansIdx + 1}
                </span>
                <span className="leading-tight">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Панель кнопок дій */}
        <div className="flex items-center gap-3 w-full border-t border-gray-100 dark:border-gray-700/50 pt-5 mt-6">
          <button
            type="button"
            onClick={onSkip}
            className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-2xl text-xs transition-colors cursor-pointer text-center border border-gray-200/40 dark:border-gray-800"
          >
            {isAlreadyAnswered ? "Далі" : "Пропустити"}
          </button>

          <div className="w-1/2 min-h-[44px]">
            {!isAlreadyAnswered && selectedAnswerIdx !== null && (
              <button
                type="button"
                onClick={onSubmit}
                className="w-full py-3 bg-gray-950 text-white dark:bg-white dark:text-gray-950 hover:bg-gray-900 dark:hover:bg-gray-100 font-black rounded-2xl text-xs transition-all shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Обрати <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🌟 НОВЕ: Модалка редагування адміном */}
      {isAdmin && (
        <EditQuestionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          question={currentQuestionObject}
        />
      )}
    </>
  );
}
