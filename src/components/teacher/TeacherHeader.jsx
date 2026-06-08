import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { LogOut, GraduationCap } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function TeacherHeader() {
  const dispatch = useDispatch();
  const currentTeacher = useSelector(selectUser);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg gap-4 transition-colors duration-500">
      <div>
        <div className="flex items-center gap-2 text-blue-500 font-semibold text-sm uppercase tracking-wider mb-1">
          <GraduationCap size={16} /> Кабінет Викладача
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
          Вітаємо, {currentTeacher?.name || "Вчитель"}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 transition-colors duration-500">
          Моніторинг успішності студентів та груп автошколи
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Інтегруємо перемикач теми з машинкою */}
        <ThemeToggle />

        <button
          onClick={() => dispatch(logoutUser())}
          className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer"
        >
          <LogOut size={16} /> Вийти з акаунту
        </button>
      </div>
    </div>
  );
}
