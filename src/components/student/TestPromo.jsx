import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectQuestionTopics,
  selectCompletedTopics,
  selectFailedTopics,
} from "../../redux/tests/selectors";

import {
  BookOpen,
  ShieldAlert,
  Sparkles,
  MoveRight,
  Layers,
} from "lucide-react";

// Імпортуємо наші перевикористовувані модалки з нової профільної папки tests
import ThemesSelectionModal from "../tests/ThemesSelectionModal";
import ExamInstructionModal from "../tests/ExamInstructionModal";

// Пул із 15 водійських лайфхаків та порад
const DRIVING_TIPS = [
  "Більшість помилок на іспиті стаються через неуважність до деталей на картинках. Вивчайте питання послідовно!",
  "Пам'ятай про правило «Перешкоди праворуч»: на рівнозначному перехресті завжди пропускай того, хто наближається справа.",
  "Сигнали регулювальника легко запам'ятати: якщо рука піднята вгору — рух усіх транспортних засобів і пішоходів заборонено.",
  "Якщо регулювальник стоїть до тебе грудьми або спиною — це як червоний сигнал світлофора. Рух повністю заборонено!",
  "Головна дорога не змінює свого статусу, навіть якщо на ній є вибоїни. Дивись на знаки, а не на якість асфальту.",
  "На іспиті МВС уважно читай питання до кінця. Часто слова «заборонено» або «дозволено» змінюють весь сенс в останній момент.",
  "Обгін заборонено на перехрестях, мостах, шляхопроводах, естакадах, у тунелях, на залізничних переїздах і ближче ніж за 100 м перед ними.",
  "Зелена стрілка на табличці поруч із червоним світлофором дозволяє поворот праворуч, але ТІЛЬКИ після того, як пропустиш усіх.",
  "При в'їзді на перехрестя з круговим рухом (круг) вмикати покажчик повороту не обов'язково, але при виїзді з нього — обов'язково правий!",
  "Пам'ятай: трамвай майже завжди має перевагу руху над безрейковими машинами у рівнозначних умовах. Пропускай його!",
  "Знак «Stop» (Проїзд без зупинки заборонено) вимагає обов'язкової фіксації зупинки коліс перед стоп-лінією або краєм дороги.",
  "Пішохідний перехід — це святе. Навіть якщо пішохід тільки ступив на зебру на протилежній смузі, зменшуй швидкість.",
  "Під час сильного дощу чи туману звичайних фар може бути замало. Обов'язково вмикай ближнє світло або протитуманні фари.",
  "Безпечна дистанція — це відстань у метрах, яку твоє авто проїжджає за 2 секунди. У дощ збільшуй її вдвічі!",
  "Проходячи тести по темам, не зубри відповіді візуально. На реальному іспиті МВС картинку можуть дзеркально перевернути.",
];

export default function TestPromo() {
  // Підключаємо дані з нашого tests слайсу для передачі в модалку тем
  const topicsFromServer = useSelector(selectQuestionTopics) || [];
  const completedTopics = useSelector(selectCompletedTopics);
  const failedTopics = useSelector(selectFailedTopics);

  const [tipOfDay, setTipOfDay] = useState("");

  // Нові стейти для відкриття модалок «на льоту»
  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);

  // Вибираємо рандомну пораду при монтуванні компонента
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DRIVING_TIPS.length);
    setTipOfDay(DRIVING_TIPS[randomIndex]);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-6 md:p-8 shadow-xl border border-amber-500/20 text-gray-950 flex flex-col justify-between h-full group transition-all duration-500">
      {/* Великий фоновий декоративний елемент */}
      <div className="absolute -right-8 -bottom-10 text-gray-950/5 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
        <BookOpen size={200} className="fill-current" />
      </div>

      <div className="space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-gray-950 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
          <Sparkles size={12} className="fill-current" /> Порада дня
        </div>

        <h2 className="text-xl md:text-3xl font-black tracking-tight leading-none max-w-xl text-gray-950">
          Не залишай іспиту жодного шансу!
        </h2>

        <p className="text-sm md:text-base font-bold text-gray-900/90 max-w-lg leading-snug">
          Охопи всі питання з бази даних сервісного центру. Поетапне вивчення
          тем максимально підвищує відсоток здачі іспиту з першої спроби.
        </p>

        {/* Блок з рандомним лайфхаком */}
        <div className="text-xs md:text-sm font-medium text-gray-900/85 leading-relaxed bg-white/20 p-3.5 rounded-xl border border-white/30 backdrop-blur-xs max-w-xl min-h-[60px] flex items-center">
          <p className="italic">"{tipOfDay}"</p>
        </div>
      </div>

      {/* НИЖНЯ ПАНЕЛЬ З КНОПКАМИ */}
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-gray-950/10 pt-5 relative z-10">
        {/* Кнопка "Скласти екзамен" — Замість navigate відкриває ExamInstructionModal */}
        <button
          type="button"
          onClick={() => setIsExamOpen(true)}
          className="flex items-center gap-2 text-gray-900/70 hover:text-gray-950 border border-gray-950/20 hover:border-gray-950/50 py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center justify-center cursor-pointer order-2 sm:order-1 font-semibold"
        >
          <ShieldAlert size={15} />
          Перевірити себе: Екзамен ПДР
        </button>

        {/* Кнопка "Вчити по темам" — Замість navigate відкриває ThemesSelectionModal */}
        <button
          type="button"
          onClick={() => setIsThemesOpen(true)}
          className="flex items-center gap-2.5 bg-gray-950 text-white hover:bg-gray-900 py-3 px-6 rounded-xl text-sm font-black shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-center justify-center group/btn order-1 sm:order-2 shadow-gray-950/20"
        >
          <Layers size={16} className="text-amber-400" />
          Вчити по темам
          <MoveRight
            size={16}
            className="transform group-hover/btn:translate-x-1 transition-transform text-amber-400"
          />
        </button>
      </div>

      {/* Модалки */}
      <ThemesSelectionModal
        isOpen={isThemesOpen}
        onClose={() => setIsThemesOpen(false)}
        topics={topicsFromServer}
        completedTopics={completedTopics}
        failedTopics={failedTopics}
      />

      <ExamInstructionModal
        isOpen={isExamOpen}
        onClose={() => setIsExamOpen(false)}
      />
    </div>
  );
}
