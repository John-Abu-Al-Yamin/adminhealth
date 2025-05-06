import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
    .matches(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
    .required("كلمة المرور مطلوبة"),
});

// Doctor validation schema

export const doctorValidationSchema = Yup.object({
  doctorName: Yup.string().required("اسم الطبيب مطلوب"),
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب ان تكون على الاقل 8 احرف")
    .required("كلمة المرور مطلوبة"),
  phone: Yup.string()
    .matches(
      /^(010|011|012|015)\d{8}$/,
      "رقم الجوال غير صحيح، يجب أن يكون 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015"
    )
    .required("رقم الجوال مطلوب"),

  specialization: Yup.string().required("التخصص مطلوب"),
  experienceYears: Yup.string().required("سنوات الخبرة مطلوبة"),
  DOB: Yup.string().required("تاريخ الميلاد مطلوب"),
});

// Add appointment validation schema
export const getAllAppointmentsValidationSchema = Yup.object({
  dateTime: Yup.date().required("تاريخ الموعد مطلوب"),
});
