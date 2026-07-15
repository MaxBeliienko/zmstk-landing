import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import Modal from "./Modal";

export default function GroupJournalModal({
  isOpen,
  onClose,
  groupData,
  validThemes = [],
}) {
  if (!isOpen || !groupData) return null;

  const getTopicStats = (student, themeFullName) => {
    if (student.passedTopics && student.passedTopics[themeFullName]) {
      return student.passedTopics[themeFullName];
    }
    return null;
  };

  const handleExportToExcel = () => {
    const header = [
      "Прізвище та ім'я студента",
      ...validThemes.map((t) => `Тема ${t.displayNum}`),
    ];

    const rows = groupData.students.map((student) => {
      const studentRow = [student.name];

      validThemes.forEach((theme) => {
        const stats = getTopicStats(student, theme.fullName);
        // Якщо є статистика (неважливо, складено чи ні) — записуємо бали, інакше "—"
        studentRow.push(stats ? `${stats.correct}/${stats.total}` : "—");
      });

      return studentRow;
    });

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Група ${groupData.groupName}`
    );

    const maxNameLen = Math.max(
      ...groupData.students.map((s) => s.name.length),
      25
    );
    worksheet["!cols"] = [
      { wch: maxNameLen },
      ...validThemes.map(() => ({ wch: 10 })),
    ];

    const fileName = `Журнал_Група_${
      groupData.groupName
    }_${new Date().toLocaleDateString("uk-UA")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Академічний журнал групи: ${groupData.groupName}`}
      size="full"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl">
            У клітинках відображається співвідношення правильних відповідей до
            загальної кількості питань (наприклад, 18/20). Зелений колір — тему
            успішно складено. Червоний з балами — тему пройдено, але не
            складено. Прочерк (—) — тему ще не розпочато.
          </p>

          {/* 🌟 КНОПКА СКАЧУВАННЯ */}
          <button
            type="button"
            onClick={handleExportToExcel}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <Download size={14} />
            Експорт в Excel
          </button>
        </div>

        {/* Контейнер таблиці із горизонтальним скролом */}
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/40 max-h-[65vh] custom-scrollbar">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-xs">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 font-bold text-gray-900 dark:text-white min-w-[180px] bg-white dark:bg-gray-800 sticky left-0 z-20 border-r border-gray-200 dark:border-gray-700">
                  Прізвище та ім'я студента
                </th>
                {validThemes.map((theme, index) => (
                  <th
                    key={index}
                    className="p-2 text-center align-bottom border-r border-gray-100 dark:border-gray-700/60 min-w-[48px]"
                    title={theme.fullName}
                  >
                    <div className="inline-block tracking-wider font-bold text-[10px] text-gray-400 uppercase [writing-mode:vertical-lr] transform rotate-180 py-2 h-16 whitespace-nowrap">
                      Тема {theme.displayNum}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {groupData.students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-100/50 dark:hover:bg-gray-700/20 transition-colors"
                >
                  <td className="p-3 font-bold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10 shadow-md">
                    {student.name}
                  </td>

                  {validThemes.map((theme, index) => {
                    const stats = getTopicStats(student, theme.fullName);

                    // 🌟 Визначаємо стани
                    const hasAttempt = stats !== null;
                    const isPassed = hasAttempt && stats.isPassed;

                    // Підбираємо кольори під світлу/темну тему на основі результату
                    let cellBgColor =
                      "bg-red-500/10 text-red-500 dark:bg-red-500/5 dark:text-red-400"; // За замовчуванням (тему ще не проходили — тьмяно-червоний прочерк)

                    if (hasAttempt) {
                      if (isPassed) {
                        cellBgColor =
                          "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400"; // Складено (зелений)
                      } else {
                        cellBgColor =
                          "bg-red-500/25 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-extrabold"; // Спроба була, але не складена (більш насичений червоний)
                      }
                    }

                    return (
                      <td
                        key={index}
                        className={`p-1 text-center border-r border-gray-100 dark:border-gray-700/40 font-mono font-bold text-[10px] transition-colors duration-300 ${cellBgColor}`}
                      >
                        <div className="flex items-center justify-center w-full h-full min-h-[24px]">
                          {hasAttempt ? `${stats.correct}/${stats.total}` : "—"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
