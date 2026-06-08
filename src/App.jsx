import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";
import ScrollToSection from "./utils/ScrollToSection";
import Footer from "./components/footer/Footer";

// Захист роутів та Спінер
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import Loader from "./components/loader/Loader";

// Операції та Селектори Redux
import { checkAuth } from "./redux/auth/operations";
import { selectIsAuthLoading } from "./redux/auth/selectors";

// Імпортуємо хук теми для адаптації глобальних компонентів
import { useTheme } from "./context/ThemeContext";

// Старі публічні сторінки (залишаємо звичайний імпорт, бо вони потрібні одразу)
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Return from "./pages/Return";

// Нові сторінки через Lazy Loading
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const TestPage = lazy(() => import("./pages/TestPage"));
const TestRunPage = lazy(() => import("./pages/TestRunPage"));
const GroupJournalPage = lazy(() => import("./pages/GroupJournalPage"));

// 🌟 ЛІНІЙНИЙ ІМПОРТ НОВИХ СТОРІНОК ВІДНОВЛЕННЯ ПАРОЛЯ
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

export default function App() {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(selectIsAuthLoading);

  // Отримуємо поточну тему з контексту
  const { theme } = useTheme();

  // Перевіряємо сесію (куку /me) при старті додатка один раз
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Якщо бекенд ще перевіряє токен користувача, показуємо глобальний лоадер
  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <ScrollToSection />

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Публічні маршрути лендингу */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/return" element={<Return />} />

            {/* 🌟 МАРШРУТИ ТІЛЬКИ ДЛЯ ГОСТЕЙ (Додано відновлення пароля всередину RestrictedRoute) */}
            <Route element={<RestrictedRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Доступно всім авторизованим користувачам */}
            <Route
              element={
                <PrivateRoute allowedRoles={["student", "teacher", "admin"]} />
              }
            >
              <Route path="/test" element={<TestPage />} />
              <Route path="/test/run" element={<TestRunPage />} />
            </Route>

            {/* Приватні маршрути для СТУДЕНТІВ */}
            <Route element={<PrivateRoute allowedRoles={["student"]} />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Приватні маршрути для ВИКЛАДАЧІВ */}
            <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
              <Route path="/teacher-panel" element={<TeacherDashboard />} />
            </Route>

            {/* Приватні маршрути для АДМІНІСТРАТОРІВ */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-panel" element={<AdminDashboard />} />
            </Route>

            {/* Доступно ТІЛЬКИ викладачам та адмінам */}
            <Route
              element={<PrivateRoute allowedRoles={["teacher", "admin"]} />}
            >
              <Route path="/groups/journal" element={<GroupJournalPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#111827",
            border:
              theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
      />
    </>
  );
}
