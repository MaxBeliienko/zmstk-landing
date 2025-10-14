import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import ScrollToSection from "./utils/ScrollToSection";

export default function App() {
  return (
    <>
      <Header />
      <ScrollToSection />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2025 Автошкола ЗМСТК ТСО України. Всі права захищені.
      </footer>
    </>
  );
}
