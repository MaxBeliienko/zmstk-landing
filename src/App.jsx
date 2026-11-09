import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";
import ScrollToSection from "./utils/ScrollToSection";
import Footer from "./components/footer/Footer";
import Loader from "./components/loader/Loader";

import { useTheme } from "./context/ThemeContext";
import { PDRCHYK_LOGIN } from "./pdrchyk";

import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Return from "./pages/Return";

// Колишні адреси тестування і кабінетів — тепер усе в ПДРчик (логін і пароль ті самі)
const MOVED = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/test",
  "/test/run",
  "/dashboard",
  "/teacher-panel",
  "/admin-panel",
  "/groups/journal",
];

function ToPdrchyk() {
  useEffect(() => {
    window.location.replace(PDRCHYK_LOGIN);
  }, []);
  return <Loader />;
}

export default function App() {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <ScrollToSection />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/return" element={<Return />} />

          {MOVED.map((path) => (
            <Route key={path} path={path} element={<ToPdrchyk />} />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

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
