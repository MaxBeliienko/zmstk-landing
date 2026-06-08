import { useNavigate } from "react-router-dom"; // 🌟 Додано useNavigate
import { Layers, ChevronRight } from "lucide-react"; // 🌟 Додано іконки

import AdminHeader from "../components/admin/AdminHeader";
import UserForm from "../components/admin/UserForm";
import ActiveStudentsCounter from "../components/admin/ActiveStudentsCounter";
import StudentSearch from "../components/admin/StudentSearch";
import TeachersList from "../components/admin/TeachersList";

export default function AdminDashboard() {
  const navigate = useNavigate(); // 🌟 Ініціалізуємо навігацію

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Шапка з логаутом */}
        <AdminHeader />

        {/* Головна сітка */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Блок з формами та пошуком (ліві 2 колонки) */}
          <div className="lg:col-span-2 space-y-6">
            <UserForm />
            <StudentSearch />
          </div>

          {/* Блок з аналітикою та списками вчителів (права 1 колонка) */}
          <div className="space-y-6">
            {/* 🌟 НОВИЙ БЛОК: Швидкий перехід до Журналу академічних груп */}
            <div
              onClick={() => navigate("/groups/journal")}
              className="group p-5 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-gray-950 dark:text-white rounded-2xl border border-amber-400/20 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-between relative overflow-hidden"
            >
              {/* Декоративне тло */}
              <div className="absolute -right-4 -bottom-4 text-gray-950/5 dark:text-white/5 transition-transform group-hover:scale-110 duration-500 pointer-events-none">
                <Layers size={90} />
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-white/20 dark:bg-black/20 rounded-xl text-gray-950 dark:text-white shrink-0">
                  <Layers size={22} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-black text-sm uppercase tracking-wide">
                    Журнал груп
                  </h4>
                  <p className="text-[11px] text-gray-900/80 dark:text-white/80 font-medium max-w-[180px]">
                    Успішність студентів та контроль тем 1-39
                  </p>
                </div>
              </div>

              <div className="p-1.5 bg-white/10 group-hover:bg-white/20 dark:bg-black/10 dark:group-hover:bg-black/20 rounded-lg transition-colors text-gray-950 dark:text-white">
                <ChevronRight
                  size={16}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>

            <ActiveStudentsCounter />
            <TeachersList />
          </div>
        </div>
      </div>
    </div>
  );
}
