import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchStudents,
  deleteUser,
  updateUser,
} from "../../redux/students/operations";
import {
  selectStudentsList,
  selectIsStudentsLoading,
} from "../../redux/students/selectors";
import {
  Search,
  GraduationCap,
  ArrowUpDown,
  Trash2,
  Edit,
  BarChart3,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Імпортуємо винесені модалки
import DeleteStudentModal from "../modal/DeleteStudentModal";
import EditStudentModal from "../modal/EditStudentModal";
import StudentStatsModal from "../modal/StudentStatsModal"; // 🌟 НАША НОВА МОДЛКА СТАТИСТИКИ

export default function StudentSearch({ isTeacherView = false }) {
  const dispatch = useDispatch();
  const students = useSelector(selectStudentsList);
  const isLoading = useSelector(selectIsStudentsLoading);

  const [searchParams, setSearchParams] = useState({
    name: "",
    groupNumber: "",
  });

  const [sortType, setSortType] = useState("date-desc");

  // Стейт керованих модалок
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null,
    userName: "",
  });
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });

  // 🌟 НОВИЙ СТЕНТ ДЛЯ МОДАЛКИ СТАТИСТИКИ СТУДЕНТА
  const [statsModal, setStatsModal] = useState({
    isOpen: false,
    student: null,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchStudents(searchParams));
  };

  const processedStudents = students.slice().sort((a, b) => {
    switch (sortType) {
      case "date-desc":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "date-asc":
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case "alphabet-asc":
        return (a.name || "").localeCompare(b.name || "", "uk");
      case "group-asc":
        return (b.groupNumber || "").localeCompare(a.groupNumber || "", "uk", {
          numeric: true,
        });
      default:
        return 0;
    }
  });

  const confirmDelete = () => {
    dispatch(deleteUser(deleteModal.userId))
      .unwrap()
      .then(() => {
        toast.success(`Студента ${deleteModal.userName} успішно видалено`);
      })
      .catch((err) => {
        toast.error(err || "Не вдалося видалити студента");
      });

    setDeleteModal({ isOpen: false, userId: null, userName: "" });
  };

  const handleEditSave = (updatedFields) => {
    dispatch(
      updateUser({
        id: editModal.user._id,
        userData: updatedFields,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Дані студента успішно оновлено");
      })
      .catch((err) => {
        toast.error(err || "Не вдалося оновити дані студента");
      });

    setEditModal({ isOpen: false, user: null });
  };

  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg relative transition-colors duration-500">
      {/* Шапка блоку */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 gap-3 transition-colors duration-500">
        <div className="flex items-center gap-2 font-bold text-xl text-amber-500">
          <Search size={22} /> Студенти автошколи
        </div>

        {/* Випадаючий список сортування */}
        <div className="flex items-center gap-2 border rounded-lg px-2.5 py-1.5 text-xs bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-colors duration-500">
          <ArrowUpDown size={14} className="text-gray-400" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-transparent font-medium focus:outline-none cursor-pointer pr-1 text-gray-800 dark:text-gray-200"
          >
            <option
              value="date-desc"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Спочатку нові
            </option>
            <option
              value="date-asc"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Спочатку старі
            </option>
            <option
              value="group-asc"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              За номером групи
            </option>
            <option
              value="alphabet-asc"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              За алфавітом (А-Я)
            </option>
          </select>
        </div>
      </div>

      {/* Форма пошуку */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {/* Пошук за ім'ям */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Пошук за ім'ям"
            value={searchParams.name}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors duration-500"
          />
          {searchParams.name && (
            <button
              type="button"
              onClick={() => setSearchParams((prev) => ({ ...prev, name: "" }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Пошук за номером групи */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Номер групи"
            value={searchParams.groupNumber}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                groupNumber: e.target.value,
              }))
            }
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors duration-500"
          />
          {searchParams.groupNumber && (
            <button
              type="button"
              onClick={() =>
                setSearchParams((prev) => ({ ...prev, groupNumber: "" }))
              }
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-lg text-sm transition-colors py-2 px-4 cursor-pointer"
        >
          {isLoading ? "Шукаю..." : "Шукати"}
        </button>
      </form>

      {/* Список карток */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {processedStudents.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-6 transition-colors duration-500">
            Студентів не знайдено.
          </p>
        ) : (
          processedStudents.map((student) => (
            <div
              key={student._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl gap-3 border bg-gray-50 border-gray-200 hover:border-gray-400 dark:bg-gray-700/30 dark:border-gray-600/50 dark:hover:border-gray-500 transition-colors duration-500"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="text-amber-500 shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white transition-colors duration-500">
                    {student.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-500">
                    {student.email} • Група:{" "}
                    <span className="text-amber-600 dark:text-amber-400 font-medium transition-colors duration-500">
                      {student.groupNumber || "Не вказана"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200 dark:border-gray-700 transition-colors duration-500">
                <span
                  className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-bold ${
                    student.status === "active"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20"
                  }`}
                >
                  {student.status === "active" ? "Активний" : "Архів"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setStatsModal({ isOpen: true, student })}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-blue-500 dark:text-blue-400 transition-colors cursor-pointer"
                    title="Дивитись аналітику"
                  >
                    <BarChart3 size={16} />
                  </button>

                  {!isTeacherView && (
                    <>
                      <button
                        onClick={() =>
                          setEditModal({ isOpen: true, user: student })
                        }
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-amber-600 dark:text-amber-500 transition-colors cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteModal({
                            isOpen: true,
                            userId: student._id,
                            userName: student.name,
                          })
                        }
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-red-500 dark:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🌟 ГЛОБАЛЬНА МОДАЛКА АНАЛІТИКИ СТУДЕНТА (Доступна і адміну, і вчителю) */}
      <StudentStatsModal
        isOpen={statsModal.isOpen}
        onClose={() => setStatsModal({ isOpen: false, student: null })}
        student={statsModal.student}
      />

      {/* Адмін-модалки */}
      {!isTeacherView && (
        <>
          <DeleteStudentModal
            isOpen={deleteModal.isOpen}
            onClose={() =>
              setDeleteModal({ isOpen: false, userId: null, userName: "" })
            }
            userName={deleteModal.userName}
            onConfirm={confirmDelete}
          />
          <EditStudentModal
            isOpen={editModal.isOpen}
            onClose={() => setEditModal({ isOpen: false, user: null })}
            studentData={editModal.user}
            onSave={handleEditSave}
          />
        </>
      )}
    </div>
  );
}
