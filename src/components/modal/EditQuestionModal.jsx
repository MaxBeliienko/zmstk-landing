import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../redux/tests/operations";
import { X, Save, CheckCircle2 } from "lucide-react";

export default function EditQuestionModal({ isOpen, onClose, question }) {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [options, setOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (question && isOpen) {
      setTopic(question.topic || "");
      setText(question.text || "");
      setExplanation(question.explanation || "");
      // Робимо глибоку копію варіантів, щоб не мутувати вихідний стейт Redux у формі
      setOptions(
        question.options ? JSON.parse(JSON.stringify(question.options)) : []
      );
    }
  }, [question, isOpen]);

  if (!isOpen || !question) return null;

  const handleOptionTextChange = (idx, value) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === idx ? { ...opt, text: value } : opt))
    );
  };

  const handleSelectCorrect = (idx) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === idx, // Тільки один вибраний варіант стає true, інші false
      }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(
        editQuestion({
          questionId: question._id,
          updatedData: {
            topic,
            text,
            explanation,
            options,
          },
        })
      ).unwrap();
      onClose();
    } catch (err) {
      alert(err || "Не вдалося оновити запитання");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Хедер модалки */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Редагування питання (Адмін)
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 flex-1 overflow-y-auto"
        >
          {/* Назва теми */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider">
              Тема ПДР
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full text-xs font-semibold rounded-xl p-3 border bg-gray-50 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Текст питання */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider">
              Текст запитання
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              required
              className="w-full text-xs rounded-xl p-3 border bg-gray-50 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Варіанти відповідей */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider block">
              Варіанти відповідей
            </label>
            <div className="space-y-2.5">
              {options.map((opt, idx) => (
                <div
                  key={opt._id || idx}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900/20 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  {/* Чекбокс правильної відповіді */}
                  <button
                    type="button"
                    onClick={() => handleSelectCorrect(idx)}
                    className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                      opt.isCorrect
                        ? "bg-green-500/10 border-green-500 text-green-500 shadow-xs"
                        : "border-gray-300 dark:border-gray-700 text-transparent hover:border-gray-400"
                    }`}
                    title={
                      opt.isCorrect
                        ? "Правильна відповідь"
                        : "Позначити як правильну"
                    }
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.5}
                      className={
                        opt.isCorrect
                          ? "scale-100"
                          : "scale-90 text-gray-300 dark:text-gray-700"
                      }
                    />
                  </button>

                  {/* Поле вводу відповіді */}
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionTextChange(idx, e.target.value)
                    }
                    required
                    className="flex-1 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-b border-transparent focus:border-amber-500 py-0.5 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Пояснення */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider">
              Пояснення правильної відповіді
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              className="w-full text-xs rounded-xl p-3 border bg-gray-50 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:border-amber-500 transition-colors"
              placeholder="Додайте роз'яснення пунктів ПДР (необов'язково)..."
            />
          </div>

          {/* Кнопки дій */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-md"
            >
              <Save size={14} />
              {isSubmitting ? "Зберігаю..." : "Зберегти зміни"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
