import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const accesstoken = Cookies.get("accesstoken"); // جلب التوكن من الـ Cookies

  if (!accesstoken) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex gap-10">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
