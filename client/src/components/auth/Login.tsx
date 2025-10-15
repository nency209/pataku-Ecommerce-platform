"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/userslice";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
 import { usePathname } from "next/navigation";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signinInitial = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

   const user = useAppSelector((state) => state.user.user);

// ...
const pathname = usePathname();

  useEffect(() => {
    if (!user) return;
    if (user.role === "user") {
      router.push("/");
    } else {
      router.push("/admin/dashboard");
    }
  }, [user, pathname, router]);

  const handleSubmit = async (
    values: typeof signinInitial,
    { resetForm }: FormikHelpers<typeof signinInitial>
  ) => {
    try {
      const res = await api.post("/auth/signin", values);
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));
      if (res.data.user.role === "user") {
        router.push("/");
      } else {
        router.push("/admin/dashboard");
      }
      toast.success("Signed in successfully!");
      resetForm();

    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Sign In
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to start bidding or manage your auctions
        </p>

        <Formik
          validationSchema={SigninSchema}
          initialValues={signinInitial}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
}
