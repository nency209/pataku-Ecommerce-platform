"use client";

import {
  ErrorMessage,
  Field,
  Form as Formikform,
  Formik,
  FormikHelpers,
} from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { ContactFormValues } from "@/types/User";
import { ToastContainer, toast } from "react-toastify";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too long")
    .required("Your name is required"),
  email: Yup.string().email("Invalid Email").required("email is required"),
  subject: Yup.string().max(100, "Too Long!"),
  message: Yup.string().required("Message is required"),
});

const InitialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const metadata = {
  title: "Contact Us - My Website",
  description:
    "Get in touch with us. Find our address, contact info, and more.",
};

export default function Contact() {
  const handleSubmit = (
    values: ContactFormValues,
    { resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    console.log("Form Submitted:", values);
    toast.success("Message sent Successfully");
    resetForm();
  };

  return (
    <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl px-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 py-12 lg:py-24 gap-10 lg:gap-20">
        {/* Left Info Section */}
        <div className="space-y-8">
          <h1 className="text-2xl lg:text-3xl font-lato">Contact Us</h1>

          {/* Address */}
          <div className="border-b space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Image
                src="/img/contact-icon1.jpg"
                width={34}
                height={40}
                alt="Address"
              />
              <h4 className="font-bold text-lg lg:text-xl font-lato">
                Address
              </h4>
            </div>
            <div>
              <p>123 Main Street, Anytown, CA 12345 </p>
              <p>– USA</p>
            </div>
          </div>

          {/* Phone */}
          <div className="border-b space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Image
                src="/img/contact-icon2.jpg"
                width={34}
                height={40}
                alt="Phone"
              />
              <h4 className="font-bold text-lg lg:text-xl font-lato">Phone</h4>
            </div>
            <div>
              <p>Mobile: (08) 123 456 789 </p>
              <p>Hotline: 1009 678 456</p>
            </div>
          </div>

          {/* Email */}
          <div className="border-b space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Image
                src="/img/contact-icon3.jpg"
                width={34}
                height={40}
                alt="Email"
              />
              <h4 className="font-bold text-lg lg:text-xl font-lato">Email</h4>
            </div>
            <div>
              <p>yourmail@domain.com </p>
              <p>support@example.company</p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-2xl sm:text-3xl font-lato">
            Tell Us Your Message
          </h1>

          <Formik
            validationSchema={ContactSchema}
            initialValues={InitialValues}
            onSubmit={handleSubmit}
          >
            <Formikform className="space-y-6">
              <div>
                <label>Your Name</label>
                <Field name="name" className="border p-2 w-full rounded" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Your Email</label>
                <Field
                  name="email"
                  type="email"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Subject</label>
                <Field name="subject" className="border p-2 w-full rounded" />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Message</label>
                <Field
                  as="textarea"
                  name="message"
                  className="border p-2 w-full rounded min-h-[120px]"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                SEND
              </button>
            </Formikform>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
