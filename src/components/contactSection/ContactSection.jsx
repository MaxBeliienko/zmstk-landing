import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Send,
  MapPin,
  PhoneCall,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xoveyejg", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Помилка відправки форми:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-24 bg-white text-gray-900 dark:bg-gray-800 dark:text-white border-t border-gray-100 dark:border-gray-700/40 transition-colors duration-500"
      id="contact"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-black tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full">
            Зворотній зв'язок
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-none uppercase">
            Зв'яжіться з нами
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Залиште заявку на навчання або поставте запитання адміністратору
            автошколи.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <h3 className="text-lg font-black uppercase tracking-tight border-b border-gray-100 dark:border-gray-700 pb-3">
              Контактна інформація
            </h3>

            <div className="space-y-4">
              <a
                href="tel:+380503411049"
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-amber-500/5 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/60 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Телефон лінії зв'язку
                  </p>
                  <p className="text-sm font-extrabold font-mono text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    +38 (050) 341 10 49
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/60 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Графік роботи адміністрації
                  </p>
                  <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                    Пн - Пт: 09:00 - 17:00
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=м.+Знам'янка,+вул.+Київська,+23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-amber-500/5 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/60 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Адреса навчальних класів
                  </p>
                  <p className="text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors leading-snug">
                    м. Знам'янка, вул. Київська, 23
                  </p>
                </div>
              </a>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.46788320499!2d32.6624956!3d48.715767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d0426177e089eb%3A0xa1937ff39082da7b!2z0LLRg9C7LiDQmtC40ZfQstGB0YzQutCwLCAyMywg0JfQvdCw0LzRj9C90LrQsCwg0JrRltGA0L7QstC-0LPRgNCw0LTRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgMjU0MDA!5e0!3m2!1suk!2sua!4v1717830000000!3m2!1suk!2sua"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Автошкола ЗМСТК на карті"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 h-full">
            <div className="bg-gray-50 border border-gray-200 dark:bg-gray-900/30 dark:border-gray-700/60 p-6 sm:p-10 rounded-3xl shadow-sm h-full flex flex-col justify-center">
              {submitted ? (
                <div className="text-center space-y-4 py-8 animate-fadeIn">
                  <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto border border-green-500/20">
                    <CheckCircle2 size={30} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-xl uppercase tracking-tight text-gray-900 dark:text-white">
                      Заявку прийнято!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                      Дякуємо за заповнення форми. Адміністратор автошколи
                      «ЗМСТК» перевірить дані та зв'яжеться з Вами найближчим
                      часом.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white">
                      Онлайн запис
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                      Залиште контакти, і ми забронюємо місце у найближчій
                      навчальній групі.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Ваше ім'я
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3.5 top-3 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder="Іван Франко"
                        required
                        className="w-full text-sm rounded-xl pl-11 pr-4 py-2.5 border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Електронна пошта
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3.5 top-3 text-gray-400"
                        size={16}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="yourname@gmail.com"
                        required
                        className="w-full text-sm rounded-xl pl-11 pr-4 py-2.5 border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Номер телефону
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3.5 top-3 text-gray-400"
                        size={16}
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+38 (067) 123 45 67"
                        required
                        className="w-full text-sm rounded-xl pl-11 pr-4 py-2.5 border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                    >
                      {loading ? (
                        "Надсилання..."
                      ) : (
                        <>
                          <Send size={14} />
                          Надіслати заявку
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
