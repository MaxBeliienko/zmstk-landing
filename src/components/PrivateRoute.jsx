import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

export default function PrivateRoute({ allowedRoles }) {
  const user = useSelector(selectUser);

  // 1. Якщо користувач взагалі не авторизований
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Якщо користувач залогінений, але його роль не дозволена для цього маршруту
  // (наприклад, студент намагається зайти в панель викладача чи адміна)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Якщо все добре — показуємо сторінку
  return <Outlet />;
}
