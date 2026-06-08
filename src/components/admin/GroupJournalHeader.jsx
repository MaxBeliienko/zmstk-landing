import { useNavigate } from "react-router-dom";
import { Layers, ArrowLeft } from "lucide-react";

export default function GroupJournalHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
      <div className="space-y-1 flex-1">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2 text-gray-900 dark:text-white">
          <Layers className="text-amber-500" /> Журнал академічних груп
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-2xl">
          Тут ви можете відслідковувати загальний прогрес навчальних груп,
          моніторити кількість активних та заархівованих профілів, а також
          переглядати детальну відомість успішності складання тематичних
          розділів ПДР студентами.
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-950 text-white dark:bg-white dark:text-gray-950 font-black rounded-xl text-xs hover:bg-gray-900 dark:hover:bg-gray-100 transition-all cursor-pointer shrink-0 shadow-sm"
      >
        <ArrowLeft size={14} /> Назад у кабінет
      </button>
    </div>
  );
}
