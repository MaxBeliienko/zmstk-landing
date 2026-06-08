import { ImageIcon } from "lucide-react";

export default function TestQuestionContent({ currentIdx, question }) {
  if (!question) return null;
  const hasImage = question.images && question.images.length > 0;
  const imageUrl = hasImage ? question.images[0] : null;

  return (
    <div className="w-full bg-white h-min dark:bg-gray-800 p-4 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xs transition-colors relative">
      {hasImage ? (
        <div className="w-full relative rounded-2xl border border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 flex items-center justify-center max-h-[440px] aspect-video mx-auto group">
          <img
            src={imageUrl}
            alt={`Запитання ${currentIdx + 1}`}
            className={`
              w-full h-full object-contain 
              transition-all duration-300 ease-in-out
              cursor-zoom-in
              rounded-2xl
              relative
              group-hover:z-50 
              group-hover:scale-150 
              group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]
              group-hover:bg-gray-50 dark:group-hover:bg-gray-900
              group-hover:border group-hover:border-gray-200 dark:group-hover:border-gray-700
            `}
            loading="eager"
          />
        </div>
      ) : (
        // Блок-заглушка
        <div className="w-full rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-12 flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 gap-2">
          <ImageIcon size={40} strokeWidth={1.5} />
          <span className="text-xs font-semibold uppercase tracking-wider text-center">
            Ситуація змодельована текстово
          </span>
        </div>
      )}
    </div>
  );
}
