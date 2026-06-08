import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Lock, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // Чистий токен з URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError("Паролі не збігаються!");
    }
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://zmstk-back.onrender.com/api/users/reset-password",
        {
          token,
          newPassword,
        }
      );
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 4000); // через 4 сек редірект на логін
    } catch (err) {
      setError(err.response?.data?.message || "Не вдалося оновити пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-xl text-gray-900 dark:text-white">
        {isSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-black text-lg uppercase tracking-tight">
              Пароль змінено!
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ваш новий пароль успішно збережено. Зараз ви будете автоматично
              перенаправлені на сторінку входу...
            </p>
            <Link
              to="/login"
              className="inline-block text-xs font-bold text-amber-500 hover:underline pt-2"
            >
              Увійти зараз
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Новий пароль
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Придумайте надійний пароль для захисту вашого кабінету.
              </p>
            </div>

            {error && (
              <div className="text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Новий Пароль
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm rounded-xl pl-10 pr-4 py-2 border bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Підтвердження пароля
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm rounded-xl pl-10 pr-4 py-2 border bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Оновити пароль"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
