import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import ScrollToSection from "./utils/ScrollToSection";
import Footer from "./components/footer/Footer";

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
      <Footer />
    </>
  );
}
