import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/your_form_id", {
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
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6">Зв'яжіться з нами</h2>

      {submitted ? (
        <div className="text-green-600 text-center text-xl font-semibold">
          Дякуємо за заповнення форми. Адміністратор зв'яжеться з Вами
          найближчим часом.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto"
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

      <div className="text-center mt-8">
        <p className="font-semibold">Наша адреса:</p>
        <p>м. Знам'янка, вул. Київська, 23</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1354.7715146070134!2d32.68624159274296!3d48.716799374594466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d08d412b26ca47%3A0x76df939202ed45cd!2z0JDQstGC0L7RiNC60L7Qu9CwINCX0JzQodCi0Jog0KLQodCe0KM!5e0!3m2!1suk!2sua!4v1743929848485!5m2!1suk!2sua"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactSection;
