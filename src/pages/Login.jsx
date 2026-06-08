import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";
import LoginForm from "../components/loginForm/LoginForm";
import heroVideo from "../assets/hero-bg.mp4";

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/admin-panel");
          break;
        case "teacher":
          navigate("/teacher-panel");
          break;
        case "student":
          navigate("/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* 1. Фонове відео */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>

      {/* 2. Напівпрозорий оверлей (затемнення), щоб форму було добре видно */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 3. Контент форми (піднятий вище за допомогою z-20) */}
      <div className="relative z-20 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
