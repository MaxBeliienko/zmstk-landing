import styles from "./installmentSection/InstallmentSection.module.css";

export default function InstallmentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0274ba] bg-opacity-50 flex items-center justify-center z-50 text-red-500">
      <div
        className={`bg-white p-6 rounded shadow-lg max-w-md w-full ${styles["modal-block"]}`}
      >
        <h3 className="text-4xl font-bold mb-4">Увага!</h3>
        <p className="mb-4 text-2xl">
          Перед оформленням Оплати частинами обов’язково зв’яжіться з
          адміністратором автошколи для уникнення непорозумінь.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Відмінити
          </button>
          <a
            href="https://privatbank.ua/ru/chast/forma" // заміни на свою реальну форму
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Перейти до оформлення
          </a>
        </div>
      </div>
    </div>
  );
}
