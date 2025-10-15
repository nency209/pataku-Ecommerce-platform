"use client";
import { Register } from "@/types";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Initial values
const signupInitial: Register = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (
    values: Register,
    { resetForm }: FormikHelpers<Register>
  ) => {
    try {
      await api.post("/auth/signup", values);
      toast.success("Account created! Please sign in.");
      resetForm();
      router.push("/login"); 
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Create your account to start bidding
        </p>

        <Formik
          validationSchema={SignupSchema}
          initialValues={signupInitial}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-lg text-sm outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border px-4 py-2 rounded-lg text-sm outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border px-4 py-2 rounded-lg text-sm outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
}
