import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = () => {
  const accesstoken = Cookies.get("accesstoken"); // جلب التوكن من الـ Cookies
  
  // إذا كان هناك token، نوجه المستخدم للصفحة الرئيسية
  if (accesstoken) {
    return <Navigate to="/doctor" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
