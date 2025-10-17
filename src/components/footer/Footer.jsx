import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "Категорії", href: "/categories" },
  { label: "Відгуки", href: "/#reviews" },
  { label: "Контакти", href: "/#contact" },
  { label: "Повернення коштів", href: "/return" },
];

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 flex flex-col items-center gap-4">
      <NavLink to="/">
        <img src={logo} alt="logo" className="h-[70px]" />
      </NavLink>
      <nav className="flex flex-wrap justify-center space-x-6 text-lg">
        {navLinks.map((link) => (
          <NavLink key={link.href} to={link.href} className="hover:underline">
            {link.label}
          </NavLink>
        ))}
        <a href="/DogovirOferty.pdf" target="_blank" rel="noopener noreferrer">
          Договір публічної оферти
        </a>
      </nav>
      <p>© 2025 Автошкола ЗМСТК ТСО України. Всі права захищені.</p>
    </footer>
  );
};

export default Footer;
