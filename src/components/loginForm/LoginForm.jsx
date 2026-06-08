import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // 🌟 НОВЕ: Імпортуємо Link для навігації
import { loginUser } from "../../redux/auth/operations";
import { selectIsAuthLoading } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsAuthLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Вхід успішний! Ласкаво просимо.");
      })
      .catch((errorMessage) => {
        toast.error(errorMessage);
      });
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl p-8 shadow-xl border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-500">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors duration-500">
          Вхід до кабінету
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
          Автошкола «ЗМСТК»
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-500"
            >
              Електронна пошта
            </label>
            <input
              id="email-address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full rounded-lg border px-3 py-2 text-sm focus:border-amber-500 focus:outline-none transition-all duration-500 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="you@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-500"
            >
              Пароль
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border pl-3 pr-10 py-2 text-sm focus:border-amber-500 focus:outline-none transition-all duration-500 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* 🌟 НОВИЙ БЛОК: Кнопка відновлення пароля */}
        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-gray-400 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
          >
            Забули пароль?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-lg bg-amber-500 py-2.5 px-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 focus:outline-none disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isLoading ? "Вхід..." : "Увійти"}
          </button>
        </div>
      </form>
    </div>
  );
}
