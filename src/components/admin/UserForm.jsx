import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  searchStudents,
  fetchTeachers,
} from "../../redux/students/operations";
import { selectIsStudentsLoading } from "../../redux/students/selectors";
import { UserPlus, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function UserForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsStudentsLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    groupNumber: "",
    role: "student",
    accessDays: "45",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    const userRole = formData.role;

    dispatch(addUser(formData))
      .unwrap()
      .then(() => {
        const roleLabels = {
          student: "Студента",
          teacher: "Викладача",
          admin: "Адміністратора",
        };
        const label = roleLabels[userRole] || "Користувача";

        toast.success(
          `Акаунт для ${label} "${formData.name}" успішно створено!`
        );

        if (userRole === "teacher") {
          dispatch(fetchTeachers());
        } else {
          dispatch(searchStudents());
        }

        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          password: "",
          groupNumber: "",
        }));
      })
      .catch((err) => {
        console.error("Помилка при додаванні користувача:", err);
        toast.error(
          err || "Не вдалося створити користувача. Спробуйте ще раз."
        );
      });
  };

  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg transition-colors duration-500">
      <div className="flex items-center gap-2 font-bold text-xl mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 text-amber-500 transition-colors duration-500">
        <UserPlus size={22} /> Реєстрація нового користувача
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Прізвище та Ім'я"
              className="w-full rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            {formData.name && (
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "name", value: "" } })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            {formData.email && (
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "email", value: "" } })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full">
            <input
              type="text"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль для входу"
              className="w-full rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            {formData.password && (
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "password", value: "" } })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="text"
              name="groupNumber"
              disabled={formData.role !== "student"}
              value={formData.role === "student" ? formData.groupNumber : ""}
              onChange={handleChange}
              placeholder={
                formData.role === "student"
                  ? "Номер групи (напр. 20-А)"
                  : "Не застосовується"
              }
              className="w-full rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            {formData.role === "student" && formData.groupNumber && (
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "groupNumber", value: "" } })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer"
          >
            <option
              value="student"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Студент (Курсант)
            </option>
            <option
              value="teacher"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Викладач
            </option>
            <option
              value="admin"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Адміністратор
            </option>
          </select>
          <div className="relative w-full">
            <input
              type="number"
              name="accessDays"
              min="1"
              required
              disabled={formData.role === "admin"}
              value={formData.role === "admin" ? "" : formData.accessDays}
              onChange={handleChange}
              placeholder={formData.role === "admin" ? "Безліміт" : "Термін"}
              // Додаємо великий правий паддінг (pr-20), щоб текст та хрестик не заважали цифрам
              className="w-full rounded-lg pl-3 pr-20 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all duration-500 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            {/* Постійний бейдж/підказка у правому кутку (приховується, якщо це адмін із безлімітом) */}
            {formData.role !== "admin" && (
              <div className="absolute inset-y-0 right-0 md:bottom-2 flex items-center pr-3 pointer-events-none text-xs font-medium text-gray-400 dark:text-gray-500">
                днів доступу
              </div>
            )}

            {/* Кнопка очищення (хрестик) — зсунута трохи лівіше від постійного тексту */}
            {formData.role !== "admin" && formData.accessDays && (
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "accessDays", value: "" } })
                }
                // Позиціонуємо хрестик лівіше від напису "днів доступу"
                className="absolute inset-y-0 right-24 md:bottom-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-amber-500 py-2.5 px-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 disabled:opacity-50 transition-all mt-2 cursor-pointer shadow-md"
        >
          {isLoading ? "Збереження..." : "Створити акаунт"}
        </button>
      </form>
    </div>
  );
}
