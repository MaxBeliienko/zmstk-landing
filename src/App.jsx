import { useState } from "react";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Program from "./components/program/Program";
import InstallmentSection from "./components/installmentSection/InstallmentSection";
import ReviewsSlider from "./components/reviewsSlider/ReviewsSlider";
import ContactSection from "./components/contactSection/ContactSection";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Program />
        <InstallmentSection />
        <ReviewsSlider />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2025 Автошкола ЗМСТК ТСО України. Всі права захищені.
      </footer>
    </>
  );
}
