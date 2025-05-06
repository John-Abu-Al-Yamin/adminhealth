import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { doctorValidationSchema } from "@/utils/validation";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/Api/axiosInstance ";

export default function AddDoctor() {
  const { addDoctor, showOtp, setShowOtp } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Urology",
  ];

  const initialValues = {
    doctorName: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experienceYears: "1",
    DOB: "",
    gender: "male",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addDoctor(values);
      // resetForm();
    } catch (error) {
      console.error("Error adding doctor:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // OTP verification handler
  const handleOtpChange = async (otp) => {
    console.log("OTP:", otp,initialValues.email);

    try {
      axiosInstance.post("admin/confirm-doctor-account", { otp });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center p-6 w-full">
      {/* OTP Modal */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-gray-800 rounded-lg md:rounded-2xl p-6 md:p-8 mx-4">
            <div className="flex flex-col items-center text-white space-y-4 md:space-y-6">
              <h1 className="text-lg md:text-2xl font-bold">أدخل رمز التحقق</h1>
              <p className="text-sm md:text-base text-center">
                لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني / هاتفك
              </p>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={handleOtpChange}
              >
                <InputOTPGroup className="gap-1 md:gap-2">
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-8 h-8 md:w-16 md:h-16 text-xl md:text-3xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-gray-400 text-sm md:text-base">
                لم تستلم الرمز؟
                <button className="text-green-500 hover:underline mr-1">
                  إعادة إرسال
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full md:max-w-5xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Add New Doctor</CardTitle>
          <CardDescription>
            Enter the doctor's information to add them to the system.
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={doctorValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, handleChange, setFieldValue }) => (
            <Form>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Doctor Name</Label>
                    <Field
                      as={Input}
                      id="doctorName"
                      placeholder="Dr. John Doe"
                      type="text"
                      name="doctorName"
                    />
                    <ErrorMessage
                      name="doctorName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="doctor@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      {showPassword ? (
                        <EyeClosed
                          className="absolute right-3 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-3 h-4 w-4 text-gray-500 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="py-5 pl-10"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Field
                      as={Input}
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      name="phone"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select
                      value={values.specialization}
                      onValueChange={(value) =>
                        setFieldValue("specialization", value)
                      }
                    >
                      <SelectTrigger id="specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec.toLowerCase()}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="specialization"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceYears">Years of Experience</Label>
                    <Field
                      as={Input}
                      id="experienceYears"
                      name="experienceYears"
                      type="number"
                      min="0"
                      max="70"
                    />
                    <ErrorMessage
                      name="experienceYears"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="DOB">Date of Birth</Label>
                    <Field
                      as={Input}
                      id="DOB"
                      type="date"
                      name="DOB"
                      placeholder="YYYY-MM-DD"
                      className="cursor-pointer"
                    />
                    <ErrorMessage
                      name="DOB"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={values.gender}
                      onValueChange={(value) => setFieldValue("gender", value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="font-normal">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="font-normal">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full mt-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Doctor"}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
