import axiosInstance from "@/Api/axiosInstance ";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth-admin/login-admin",
        userData
      );

      // حفظ الـ tokens في الـ Cookies لمدة 7 أيام
      Cookies.set("accesstoken", response.accesstoken, {
        expires: 7,
        secure: true,
      });
      Cookies.set("refreshToken", response.refreshtoken, {
        expires: 7,
        secure: true,
      });

      console.log(response);

      if (response) {
        toast.success(response.message);
        navigate("/doctor");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshToken");
    toast.info("تم تسجيل الخروج بنجاح");
    navigate("/login");
    toast.info("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  const addDoctor = async (doctorData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/admin/admin-create-doctor-account",
        doctorData
      );
      console.log(response);

      toast.success(response.message);
      setShowOtp(true); // عرض نافذة OTP
      // navigate("/doctor");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إضافة الدكتور"
      );
      setShowOtp(false);
    } finally {
      setLoading(false);
    }
  };

  // get all doctors
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("doctor/doctors");
      console.log(response.doctor);
      setDoctors(response.doctor);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "error while fetching doctors"
      );
    } finally {
      setLoading(false);
    }
  };

  // getAllAppointments
  const getAllAppointments = (dateTime) => {
    try {
      axiosInstance
        .get(`admin/getAllAppointmentInday?dateTime=${dateTime}`)
        .then((res) => {
          console.log(res);
          toast.success(res.message);
        });
    } catch (error) {
      console.log(error);
      toast.error(response?.error || "حدث خطأ أثناء إضافة الدكتور");
    } finally {
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        setLoading,
        addDoctor,
        showOtp,
        setShowOtp,
        getAllDoctors,
        doctors,
        getAllAppointments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// هوك مخصص لاستخدام الـ AuthContext بسهولة
const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
export default AuthContext;
