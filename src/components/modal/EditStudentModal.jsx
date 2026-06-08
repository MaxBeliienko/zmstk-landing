import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";

export default function EditStudentModal({
  isOpen,
  onClose,
  studentData,
  onSave,
  hideGroup = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    groupNumber: "",
    status: "active",
    accessDays: "",
  });

  // Перевіряємо, чи був користувач початково заархівований
  const isInitiallyArchived = studentData?.status === "archived";

  // Умова для показу інпута днів: якщо користувач викладач, то дні не потрібні (hideGroup),
  // а якщо студент — показуємо лише тоді, коли статус змінюється з "archived" на "active"
  const showAccessDaysInput =
    isInitiallyArchived && formData.status === "active";

  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        groupNumber: studentData.groupNumber || "",
        status: studentData.status || "active",
        accessDays: "",
      });
    }
  }, [studentData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={hideGroup ? "Редагування викладача" : "Редагування студента"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Прізвище та Ім'я */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">
            Прізвище та Ім'я
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Електронна пошта */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">
            Електронна пошта
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Номер групи */}
        {!hideGroup && (
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">
              Номер групи
            </label>
            <input
              type="text"
              value={formData.groupNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  groupNumber: e.target.value,
                }))
              }
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        )}

        {/* Статус доступу */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">
            Статус доступу
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer"
          >
            <option
              value="active"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Активний (Є доступ)
            </option>
            <option
              value="archived"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Архів (Доступ заблоковано)
            </option>
          </select>
        </div>

        {/* 🌟 ДИНАМІЧНЕ ПОЛЕ: Кількість днів при розархівації студента */}
        {showAccessDaysInput && (
          <div className="animate-fadeIn">
            <label className="block text-xs font-medium text-amber-600 dark:text-amber-400 mb-1 font-bold">
              Надати термін доступу (Обов'язково)
            </label>
            <div className="relative w-full">
              <input
                type="number"
                min="1"
                required={showAccessDaysInput}
                value={formData.accessDays}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accessDays: e.target.value,
                  }))
                }
                placeholder="Вкажіть термін"
                className="w-full rounded-lg pl-3 pr-24 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-amber-500/5 border border-amber-500/30 text-gray-900 dark:text-white placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              {/* Постійний текстовий маркер справа всередині інпута */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-xs font-semibold text-amber-600/60 dark:text-amber-400/50">
                днів доступу
              </div>

              {/* Кнопка швидкого очищення (хрестик) */}
              {formData.accessDays && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, accessDays: "" }))
                  }
                  className="absolute inset-y-0 right-28 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Кнопки дій */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer"
          >
            Скасувати
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold text-gray-900 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-md"
          >
            Зберегти
          </button>
        </div>
      </form>
    </Modal>
  );
}
