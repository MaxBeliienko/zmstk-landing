import { useNavigate } from "react-router-dom"; // 🌟 Додано useNavigate
import { Layers, ChevronRight } from "lucide-react"; // 🌟 Додано іконки

import TeacherHeader from "../components/teacher/TeacherHeader";
import ActiveStudentsCounter from "../components/admin/ActiveStudentsCounter";
import StudentSearch from "../components/admin/StudentSearch";

export default function TeacherDashboard() {
  const navigate = useNavigate(); // 🌟 Ініціалізуємо навігацію

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Шапка викладача з кнопкою виходу */}
        <TeacherHeader />

        {/* Головна робоча сітка кабінету */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Основна частина: Пошук студентів (ліві 2 колонки) */}
          <div className="lg:col-span-2">
            {/* Передаємо фільтр-пропс, який заблокує видалення та редагування */}
            <StudentSearch isTeacherView={true} />
          </div>

          {/* Бічна панель: Статистика школи (права 1 колонка) */}
          <div className="space-y-6">
            {/* 🌟 НОВИЙ БЛОК: Кнопка переходу до Журналу академічних груп для Викладача */}
            <div
              onClick={() => navigate("/groups/journal")}
              className="group p-5 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white rounded-2xl border border-blue-500/20 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-between relative overflow-hidden"
            >
              {/* Декоративне тло */}
              <div className="absolute -right-4 -bottom-4 text-white/5 transition-transform group-hover:scale-110 duration-500 pointer-events-none">
                <Layers size={90} />
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-black/20 rounded-xl text-white shrink-0">
                  <Layers size={22} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-black text-sm uppercase tracking-wide">
                    Журнал академічних груп
                  </h4>
                  <p className="text-[11px] text-white/80 font-medium max-w-[180px]">
                    Контроль успішності та відомість тем 1-39
                  </p>
                </div>
              </div>

              <div className="p-1.5 bg-black/10 group-hover:bg-black/20 rounded-lg transition-colors text-white">
                <ChevronRight
                  size={16}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>

            <ActiveStudentsCounter />

            {/* Швидка пам'ятка для викладача */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 bg-gray-800 p-6 rounded-2xl border border-blue-500/20 shadow-lg">
              <h3 className="font-bold text-blue-400 mb-2 text-sm uppercase tracking-wide">
                Пам'ятка викладача
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Ви маєте повний доступ до перегляду прогресу курсантів,
                аналітики складання внутрішніх тестів та вивчених тем ПДР.
              </p>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                <li>Шукайте курсантів за ПІБ або групою.</li>
                <li>Для аналізу помилок тисніть на іконку графіка.</li>
                <li>Змінити дані учня може лише адміністратор.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
