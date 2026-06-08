import { useState } from "react";
import { Users, Calendar, BookOpen, X, Check, Search } from "lucide-react";
import axios from "axios";

export default function GroupJournalView({
  viewType,
  groups,
  onSelectGroup,
  validThemes = [],
}) {
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [assignedTopics, setAssignedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenHomeworkModal = async (group) => {
    setSelectedGroup(group);
    setSearchQuery("");
    setIsHomeworkModalOpen(true);
    try {
      const response = await axios.get(
        `https://zmstk-back.onrender.com/api/tests/pending-homework-group/${group.groupName}`
      );
      setAssignedTopics(response.data?.assignedTopics || []);
    } catch (error) {
      setAssignedTopics([]);
    }
  };

  const handleToggleTopic = (topicName) => {
    setAssignedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const handleSaveHomework = async () => {
    if (!selectedGroup) return;
    setIsSaving(true);
    try {
      await axios.post(
        "https://zmstk-back.onrender.com/api/tests/assign-topics",
        {
          groupNumber: selectedGroup.groupName,
          assignedTopics: assignedTopics,
        }
      );
      setIsHomeworkModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Не вдалося зберегти графік домашнього завдання");
    } finally {
      setIsSaving(false);
    }
  };

  const formatGroupDate = (dateString) => {
    if (!dateString) return "Не визначено";
    return new Date(dateString).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredTopics = validThemes.filter((theme) =>
    theme.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (viewType === "table") {
    return (
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-left text-xs md:text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              <th className="p-4 font-semibold">Номер / Назва групи</th>
              <th className="p-4 text-center font-semibold">Студентів</th>
              <th className="p-4 text-center font-semibold">
                Статуси профілів
              </th>
              <th className="p-4 text-center font-semibold">Дата старту</th>
              <th className="p-4 text-right font-semibold">Управління</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {groups.map((group) => (
              <tr
                key={group.groupName}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/10 transition-colors"
              >
                <td className="p-4 font-black text-gray-900 dark:text-white">
                  Група {group.groupName}
                </td>
                <td className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">
                  {group.totalStudents}
                </td>
                <td className="p-4 text-center font-bold">
                  <span className="text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md text-xs">
                    {group.activeCount}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs ml-2">
                    {group.archiveCount}
                  </span>
                </td>
                <td className="p-4 text-center font-medium text-gray-500 dark:text-gray-400 font-mono text-xs">
                  {formatGroupDate(group.startDate)}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Кнопка задати ДЗ у таблиці */}
                    <button
                      type="button"
                      onClick={() => handleOpenHomeworkModal(group)}
                      className="py-1.5 px-3 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen size={13} /> ДЗ
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectGroup(group)}
                      className="py-1.5 px-3 bg-amber-500 text-gray-900 font-black rounded-xl text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
                    >
                      Журнал
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isHomeworkModalOpen && renderHomeworkModal()}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <div
          key={group.groupName}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-xs"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-black text-base text-gray-900 dark:text-white">
                Група {group.groupName}
              </h4>
              <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-1">
                <Calendar size={12} /> {formatGroupDate(group.startDate)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-gray-100 dark:border-gray-700/60 py-2.5">
              <div className="text-gray-500 font-medium flex items-center gap-1">
                <Users size={13} /> Студентів:{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {group.totalStudents}
                </span>
              </div>
              <div className="text-green-600 dark:text-green-400 font-bold">
                ● Активних: {group.activeCount}
              </div>
              <div className="text-gray-400 dark:text-gray-500 font-bold col-start-2">
                ● В архіві: {group.archiveCount}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Кнопка задати ДЗ в картці */}
            <button
              type="button"
              onClick={() => handleOpenHomeworkModal(group)}
              className="px-3 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <BookOpen size={14} /> ДЗ
            </button>
            <button
              type="button"
              onClick={() => onSelectGroup(group)}
              className="w-full bg-amber-500 text-gray-900 py-2 rounded-xl text-xs font-black hover:bg-amber-400 transition-colors cursor-pointer text-center shadow-xs"
            >
              Журнал успішності
            </button>
          </div>
        </div>
      ))}
      {isHomeworkModalOpen && renderHomeworkModal()}
    </div>
  );

  function renderHomeworkModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fadeIn text-gray-900 dark:text-white">
        <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col max-h-[85vh] overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-base">
                Обов'язкове ДЗ: Група {selectedGroup?.groupName}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Виберіть теми, які стануть обов'язковими для виконання
              </p>
            </div>
            <button
              onClick={() => setIsHomeworkModalOpen(false)}
              className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Швидкий пошук теми ПДР..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="p-4 overflow-y-auto space-y-2 flex-1 bg-gray-50/30 dark:bg-gray-900/5">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((theme) => {
                const isChecked = assignedTopics.includes(theme.fullName);
                return (
                  <label
                    key={theme.fullName}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer select-none ${
                      isChecked
                        ? "bg-blue-500/5 border-blue-500/40 text-blue-700 dark:text-blue-400 shadow-xs"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <span className="pr-4 leading-snug">{theme.fullName}</span>
                    <div className="shrink-0 relative">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTopic(theme.fullName)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                          isChecked
                            ? "bg-blue-600 border-blue-600 text-white scale-105"
                            : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  </label>
                );
              })
            ) : (
              <div className="text-center py-8 text-sm text-gray-400">
                Теми не знайдені
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-white dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setIsHomeworkModalOpen(false)}
              className="px-4 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-xl cursor-pointer"
            >
              Скасувати
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveHomework}
              className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md cursor-pointer flex items-center gap-1"
            >
              {isSaving ? "Збереження..." : "Зберегти графік ДЗ"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
