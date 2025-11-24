import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
