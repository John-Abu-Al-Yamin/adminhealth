import React, { useState } from "react";
import Logo from "@/assets/image/Logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Eye, EyeClosed, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { loginValidationSchema } from "@/utils/validation";

const Login = () => {
  const { login, loading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full md:max-w-7xl">
        <div className="py-14 px-4 md:px-20">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="logo" className="" />
            <h1 className="text-gray-300 font-bold text-3xl pt-2">
              Welcome admin
            </h1>
          </div>

          <div className="py-14 flex flex-col gap-6 items-center">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                await login(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-6 w-full max-w-4xl">
                  {/* Email Input */}
                  <div className="space-y-2 w-full md:max-w-md mx-auto">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="py-5 pl-10 w-full"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2 w-full md:max-w-md mx-auto">
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
                        className="py-5 pl-10 w-full"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center w-full">
                    <Button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="w-full md:max-w-md bg-green-500 text-white py-5 cursor-pointer"
                    >
                      {loading || isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        </>
                      ) : (
                        <>
                          Login
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <p className="text-center text-sm mt-2 text-gray-400">
            &copy; 2025 Health Care. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
