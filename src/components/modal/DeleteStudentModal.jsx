import Modal from "./Modal";

export default function DeleteStudentModal({
  isOpen,
  onClose,
  userName,
  onConfirm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Підтвердження видалення">
      <p className="text-sm mb-6 leading-relaxed transition-colors duration-500 text-gray-600 dark:text-gray-300">
        Ви дійсно хочете видалити користувача з ім'ям{" "}
        <span className="text-amber-600 dark:text-amber-400 font-semibold">
          {userName}
        </span>{" "}
        з бази даних автошколи? Цю дію не можна буде скасувати.
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer"
        >
          Ні, скасувати
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-md cursor-pointer"
        >
          Так, видалити
        </button>
      </div>
    </Modal>
  );
}
