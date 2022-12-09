import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "./services/useAuthStatus";
import Loading from "./Components/Loading";

export default function DisableIfAuth() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loading />;
  }
  return loggedIn ?  <Navigate to="/" />:<Outlet /> ;
}
