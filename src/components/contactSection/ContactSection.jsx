import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

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
  };

  return (
    <section
      className="py-16 container mx-auto px-4 flex flex-col items-center"
      id="contact"
    >
      <h2 className="text-3xl font-semibold mb-6">Зв'яжіться з нами</h2>
      <div className="w-full md:flex gap-6 justify-around items-center">
        {submitted ? (
          <div className="text-green-600 text-center text-xl font-semibold">
            Дякуємо за заповнення форми. Адміністратор зв'яжеться з Вами
            найближчим часом.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full md:w-1/4"
          >
            <input
              type="text"
              name="name"
              placeholder="Ім'я"
              required
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              required
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Надіслати
            </button>
          </form>
        )}

        <div className="flex flex-col items-center gap-2 text-center mt-8">
          <h2 className="font-bold text-xl">КОНТАКТИ</h2>
          <a href="tel:+380503411049">📞 +38 050 341 10 49</a>
          <a
            href="https://www.google.com/maps/place/%D0%90%D0%B2%D1%82%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D0%B0+%D0%97%D0%9C%D0%A1%D0%A2%D0%9A+%D0%A2%D0%A1%D0%9E%D0%A3/@48.716711,32.687114,16z/data=!4m6!3m5!1s0x40d08d412b26ca47:0x76df939202ed45cd!8m2!3d48.7167108!4d32.6871142!16s%2Fg%2F11vd70xjqj?hl=uk&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
          >
            📍 м. Знам'янка, вул. Київська, 23
          </a>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1354.7715146070134!2d32.68624159274296!3d48.716799374594466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d08d412b26ca47%3A0x76df939202ed45cd!2z0JDQstGC0L7RiNC60L7Qu9CwINCX0JzQodCi0Jog0KLQodCe0KM!5e0!3m2!1suk!2sua!4v1743929848485!5m2!1suk!2sua"
            width="300"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
