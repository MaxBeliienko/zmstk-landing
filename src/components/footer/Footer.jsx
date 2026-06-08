import { NavLink } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react"; // 🌟 Додано Phone та MapPin
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "Категорії", href: "/categories" },
  // { label: "Відгуки", href: "/#reviews" },
  { label: "Контакти", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t transition-colors duration-500 bg-white border-gray-200 text-gray-600 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start text-center md:text-left">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <NavLink
              to="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src={logo}
                alt="Автошкола ЗМСТК"
                className="h-[65px] object-contain brightness-100 dark:brightness-95"
              />
            </NavLink>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white transition-colors duration-500">
              Навігація
            </h4>
            <nav className="flex flex-col space-y-2.5 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-block w-fit mx-auto md:mx-0"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white transition-colors duration-500">
              Контакти
            </h4>
            <div className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <a
                href="tel:+380503411049"
                className="flex items-center gap-2 hover:text-amber-500 dark:hover:text-amber-400 transition-colors group"
              >
                <Phone
                  size={16}
                  className="text-amber-500 group-hover:scale-110 transition-transform"
                />
                <span>+38 050 341 10 49</span>
              </a>
              <a
                href="https://maps.google.com/?q=Автошкола+ЗМСТК+Знам'янка+вулиця+Київська+23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-center md:text-left group max-w-[200px] md:max-w-none mx-auto md:mx-0"
              >
                <MapPin
                  size={18}
                  className="text-amber-500 group-hover:scale-110 transition-transform shrink-0 mt-0.5"
                />
                <span className="flex flex-col lg:flex-row xl:gap-1">
                  м. Знам'янка, <span>вул. Київська, 23</span>
                </span>
              </a>
            </div>
          </div>

          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white transition-colors duration-500">
              Ми в соцмережах
            </h4>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.instagram.com/autoschool.znamianka?igsh=dzNneGtwc3k2eGR2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-500 hover:text-white dark:bg-gray-900 dark:hover:bg-amber-500 text-gray-500 dark:text-gray-400 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/18sewCkjRy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-500 hover:text-white dark:bg-gray-900 dark:hover:bg-amber-500 text-gray-500 dark:text-gray-400 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@avtoshkola.znamianka?_r=1&_t=ZS-96iEWv69F7k"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-amber-500 hover:text-white dark:bg-gray-900 dark:hover:bg-amber-500 text-gray-500 dark:text-gray-400 transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-800"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.01 2.61-.01 3.91-.01.08 1.53.63 3.02 1.63 4.18 1.15 1.22 2.75 1.95 4.41 2.06v3.83c-1.74-.06-3.44-.69-4.82-1.77-.28-.22-.54-.47-.79-.73V14c.01 3.36-2.12 6.47-5.34 7.48-3.56 1.05-7.46-.66-8.98-3.95-1.55-3.45-.11-7.61 3.16-9.19 1.13-.53 2.39-.7 3.63-.48v3.91c-.8-.21-1.65-.07-2.35.41-.83.6-1.25 1.66-1.03 2.67.27 1.13 1.35 1.9 2.51 1.77 1.2-.04 2.15-1.08 2.13-2.28V.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-xs text-gray-400 dark:border-gray-900 dark:text-gray-500 transition-colors duration-500">
          <a
            href="/return"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-block w-fit mx-auto text-gray-400 dark:text-gray-500 text-xs pt-1 border-t border-gray-100 dark:border-gray-900"
          >
            Повернення коштів
          </a>
          <a
            href="/DogovirOferty.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-block w-fit mx-auto md:mx-0 text-gray-400 dark:text-gray-500 text-xs pt-1 border-t border-gray-100 dark:border-gray-900"
          >
            Договір публічної оферти
          </a>
          <p className="mt-2">
            © {new Date().getFullYear()} Автошкола ЗМСТК ТСО України. Всі права
            захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
