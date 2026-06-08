import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "https://zmstk-back.onrender.com/api/users/forgot-password",
        { email }
      );
      setIsSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Помилка мережі. Спробуйте пізніше."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-xl text-gray-900 dark:text-white">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> На сторінку входу
        </Link>

        {isSent ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-black text-lg uppercase tracking-tight">
              Перевірте пошту
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Ми надіслали інструкції для встановлення нового пароля на вказану
              електронну адресу. Посилання дійсне 1 годину.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Відновлення пароля
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Введіть email вашого акаунта, і ми надішлемо посилання для
                скидання пароля.
              </p>
            </div>

            {error && (
              <div className="text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Ваш Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm rounded-xl pl-10 pr-4 py-2 border bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? "Відправка..." : "Надіслати посилання"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
