import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

export default function RestrictedRoute() {
  const user = useSelector(selectUser);

  // Якщо користувач вже залогінений, перенаправляємо його на відповідний кабінет
  if (user) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin-panel" replace />;
      case "teacher":
        return <Navigate to="/teacher-panel" replace />;
      case "student":
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
