import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "./services/useAuthStatus";
import Loading from "./Components/Loading";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loading />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
