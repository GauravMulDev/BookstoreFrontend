import { Route, Navigate } from "react-router-dom";

function GuardedRoute(props) {
  const { path, element } = props;
  const userRole = localStorage.getItem("role");

  if (path === "/admin" && userRole !== "admin") {
    return <Navigate to="/error" replace />;
  }

  return <Route path={path} element={element} />;
}

export default GuardedRoute;
