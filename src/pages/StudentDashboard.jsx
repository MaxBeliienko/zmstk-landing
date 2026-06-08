import StudentHeader from "../components/student/StudentHeader";
import StudentStats from "../components/student/StudentStats";
import TestPromo from "../components/student/TestPromo";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 1. ШАПКА КУРСАНТА */}
        <StudentHeader />

        {/* 2. ГОЛОВНИЙ КОНТЕНТ (СІТКА) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Промо-блок тестування (займає 2 колонки) */}
          <div className="lg:col-span-2">
            <TestPromo />
          </div>

          {/* Швидка статистика (займає 1 колонку) */}
          <div>
            <StudentStats />
          </div>
        </div>
      </div>
    </div>
  );
}
