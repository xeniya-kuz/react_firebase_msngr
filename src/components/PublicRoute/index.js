import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectAuth } from "../../store/profile/selectors";
import { Outlet } from "react-router";

export const PublicRoute = () => {
  // селектор авторизации (true or false)
  const authed = useSelector(selectAuth);

  return !authed ? <Outlet /> : <Navigate to="/profile" replace />
}