import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Program from "../components/program/Program";
import InstallmentSection from "../components/installmentSection/InstallmentSection";
import ReviewsSlider from "../components/reviewsSlider/ReviewsSlider";
import ContactSection from "../components/contactSection/ContactSection";
import Price from "../components/price/Price";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Program />
      <Price />
      <InstallmentSection />
      <ReviewsSlider />
      <ContactSection />
    </>
  );
};

export default HomePage;
