import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isPanding] = useRole();

  if (isPanding) {
    return <LoadingSpinner />;
  }
  if (role === "admin") {
    return children;
  }
  return <Navigate to={"/"} />;
};

export default AdminRoute;
