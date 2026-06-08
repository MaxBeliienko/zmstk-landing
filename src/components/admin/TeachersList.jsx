import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  deleteUser,
  updateUser,
} from "../../redux/students/operations";
import { selectTeachersList } from "../../redux/students/selectors";
import { Briefcase, Trash2, Edit } from "lucide-react";
import { toast } from "react-hot-toast";

// ІМПОРТУЄМО ТІ Ж САМІ КОМПОНЕНТИ, ЩО Й ДЛЯ СТУДЕНТІВ
import DeleteStudentModal from "../modal/DeleteStudentModal";
import EditStudentModal from "../modal/EditStudentModal";

export default function TeachersList() {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachersList);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: "",
  });
  const [editModal, setEditModal] = useState({ isOpen: false, teacher: null });

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Дія підтвердження видалення викладача
  const handleConfirmDelete = () => {
    dispatch(deleteUser(deleteModal.id))
      .unwrap()
      .then(() => {
        toast.success(`Викладача ${deleteModal.name} успішно видалено`);
        dispatch(fetchTeachers()); // Оновлюємо список на екрані
      })
      .catch((err) => {
        toast.error(err || "Не вдалося видалити викладача");
      });

    setDeleteModal({ isOpen: false, id: null, name: "" });
  };

  // Дія збереження змін після редагування викладача
  const handleSaveEdit = (updatedFields) => {
    dispatch(updateUser({ id: editModal.teacher._id, userData: updatedFields }))
      .unwrap()
      .then(() => {
        toast.success("Профіль викладача успішно оновлено");
        dispatch(fetchTeachers()); // Оновлюємо список на екрані
      })
      .catch((err) => {
        toast.error(err || "Не вдалося оновити профіль викладача");
      });

    setEditModal({ isOpen: false, teacher: null });
  };

  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg relative transition-colors duration-500">
      <div className="flex items-center gap-2 font-bold text-lg mb-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-500">
        <Briefcase size={20} className="text-amber-500" /> Команда викладачів
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="p-3 border rounded-xl flex justify-between items-center bg-gray-50 border-gray-200 hover:border-gray-400 dark:bg-gray-700/20 dark:border-gray-700 dark:hover:border-gray-500 transition-colors duration-500"
          >
            <div>
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 transition-colors duration-500">
                {teacher.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-500">
                {teacher.email}
              </p>
              {teacher.status === "archived" && (
                <span className="text-[9px] text-red-500 dark:text-red-400 font-semibold uppercase bg-red-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                  Заблоковано
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditModal({ isOpen: true, teacher })}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-amber-600 dark:text-amber-500 transition-colors cursor-pointer"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() =>
                  setDeleteModal({
                    isOpen: true,
                    id: teacher._id,
                    name: teacher.name,
                  })
                }
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-red-500 dark:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ПЕРЕВИКОРИСТОВУЄМО СТУДЕНТСЬКІ МОДАЛКИ */}
      <DeleteStudentModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, name: "" })}
        userName={deleteModal.name}
        onConfirm={handleConfirmDelete}
      />
      <EditStudentModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, teacher: null })}
        studentData={editModal.teacher}
        onSave={handleSaveEdit}
        hideGroup={true}
      />
    </div>
  );
}
