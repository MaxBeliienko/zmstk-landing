const CategoriesList = () => {
  return (
    <section className="pt-36 pb-6 px-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-sky-700">
        Автошкола Знам’янського МСТК ТСО України
      </h1>
      <ul className="flex flex-wrap gap-6 justify-center">
        <li
          id="a-categor-page"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">КАТЕГОРІЯ «А»</h2>
            <p>
              Категорія «А» призначена для управління двоколісними ТЗ, у яких
              обсяг двигуна перевищує 50 см³ або 4 кВт для електромоторів.
            </p>
            <p className="text-sky-700">Категорію можна отримати з 16 років</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 5500 грн.
            </h4>
          </div>
        </li>

        <li className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]">
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">КАТЕГОРІЯ «А1»</h2>
            <p>
              Категорія «А1» призначена для управління двоколісними ТЗ, у яких
              обсяг двигуна не перевищує 50 см³ або 4 кВт для електромоторів.
            </p>
            <p className="text-sky-700">Категорію можна отримати з 16 років</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 5500 грн.
            </h4>
          </div>
        </li>

        <li
          id="b-categor-page"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">КАТЕГОРІЯ «В»</h2>
            <p>
              Категорія «В» призначена для управління автомобілями, максимальна
              вага яких не перевищує 3500 кг, а кількість місць для сидіння,
              крім сидіння водія, не перевищує восьми
            </p>
            <p className="text-sky-700">Категорію можна отримати з 18 років</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 8000 грн.
            </h4>
          </div>
        </li>

        <li
          id="c-categor-page"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">КАТЕГОРІЯ «С»</h2>
            <p>
              Категорія «С» призначена для управління вантажними автомобілями
              важкої категорії (від 7,5 т).
            </p>

            <p className="text-sky-700">Категорію можна отримати з 18 років</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 8000 грн.
            </h4>
          </div>
        </li>

        <li
          id="d-categor-page"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">
              КАТЕГОРІЯ «<span className="text-[24px]">D</span>»
            </h2>
            <p>
              Категорія «D» призначена для управління автобусами, у яких
              кількість місць для сидіння, крім сидіння водія, понад 16.
            </p>
            <p className="text-sky-700">Категорію можна отримати з 21 року</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 8000 грн.
            </h4>
          </div>
        </li>

        <li
          id="ce-categor-page"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2 justify-between">
            <h2 className="text-xl font-bold">КАТЕГОРІЯ «СЕ»</h2>
            <p>
              Категорія «CE» призначена для управління вантажними автомобілями,
              масою понад 7.5 т з причепом.
            </p>
            <p className="text-sky-700">
              Відкривається при наявності посвідчення водія категорії «С».
            </p>
            <p className="text-sky-700">Категорію можна отримати з 19 років</p>
            <h4 className="p-2 bg-sky-700 text-white rounded-xl text-center">
              Вартість навчання - 8000 грн.
            </h4>
          </div>
        </li>

        <li
          id="dopidgotovka"
          className="border-2 border-dashed border-sky-700 p-6 rounded-xl flex gap-2 w-[300px]"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Відновлення навичок</h2>
            <p>
              Поверніть собі впевненість за кермом! Якщо ви відчуваєте, що
              водійські навички потребують оновлення, ми пропонуємо ефективне
              відновлення майстерності. Наша автошкола — ваш надійний шлях до
              безпеки та комфорту на дорозі.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default CategoriesList;
