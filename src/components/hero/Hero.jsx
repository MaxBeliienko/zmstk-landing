import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { selectUser } from "../../redux/auth/selectors";
import {
  ShieldCheck,
  Compass,
  CheckCircle,
  ArrowRight,
  User,
} from "lucide-react";
import heroVideo from "../../assets/hero-bg.mp4";

export default function Hero() {
  const user = useSelector(selectUser);

  const videoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonsRef = useRef(null);
  const rightBlockRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.15 },
      { opacity: 0.75, scale: 1.05, duration: 1.6 }
    );

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
      "-=1.0"
    );

    tl.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 40, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.15 },
      "-=0.6"
    );

    if (cardsRef.current.length > 0) {
      tl.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );
    }

    tl.fromTo(
      [buttonsRef.current, rightBlockRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.4"
    );
  }, []);

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/admin-panel";
      case "teacher":
        return "/teacher-panel";
      case "student":
        return "/dashboard";
      default:
        return "/login";
    }
  };

  const dashboardPath = getDashboardPath();

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center pt-2 overflow-hidden bg-gray-950 text-white"
      id="home"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0 brightness-50"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 via-gray-950/10 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950 z-10 backdrop-blur-[1.5px]" />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 text-left max-w-2xl mx-auto lg:mx-0">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest rounded-full"
          >
            Професійна підготовка водіїв
          </div>

          <div className="space-y-4">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
            >
              Автошкола
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400 tracking-tight leading-tight flex flex-col xl:flex-row xl:gap-2"
            >
              Знам'янського МСТК <span>ТСО України</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-4 pl-1 sm:p-5 rounded-2xl flex flex-col gap-2.5 hover:border-amber-500/30 transition-all duration-300 shadow-xs"
            >
              <ShieldCheck className="text-amber-500" size={24} />
              <span className="text-sm font-black uppercase tracking-wider text-gray-200">
                Безпечно
              </span>
            </div>
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-4 pl-1 sm:p-5 rounded-2xl flex flex-col gap-2.5 hover:border-amber-500/30 transition-all duration-300 shadow-xs"
            >
              <Compass className="text-amber-500" size={24} />
              <span className="text-sm font-black uppercase tracking-wider text-gray-200">
                Впевнено
              </span>
            </div>
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-4 pl-1 sm:p-5 rounded-2xl flex flex-col gap-2.5 hover:border-amber-500/30 transition-all duration-300 shadow-xs"
            >
              <CheckCircle className="text-amber-500" size={24} />
              <span className="text-sm font-black uppercase tracking-wider text-gray-200">
                Надійно
              </span>
            </div>
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition-all text-xs uppercase tracking-widest cursor-pointer"
            >
              Записатися на навчання
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        <div
          ref={rightBlockRef}
          className="hidden lg:block lg:col-span-5 relative"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-lg p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-700" />

            <div className="space-y-1.5">
              <span className="text-4xl font-black text-amber-500 font-mono">
                80%
              </span>
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-200">
                Успішна здача іспитів
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Наші випускники впевнено складають як теоретичну частину в
                нашому інтерактивному додатку, так і практичний іспит у ТСЦ.
              </p>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-1.5">
              <span className="text-4xl font-black text-sky-400 font-mono">
                50+
              </span>
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-200">
                Років досвіду
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Гарантія якості навчання, перевірена часом і тисячами
                випускників.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
