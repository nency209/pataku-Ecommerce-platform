"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/userslice";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save, Camera } from "lucide-react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user?.avatar || "");
  const [isEditing, setIsEditing] = useState(false);

  // Load user profile if Redux empty
  useEffect(() => {
    if (!user) {
      api
        .get("/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data));

          // ✅ Fix: add backend base URL
          setPreview(
            res.data.avatar
              ? `"https://pataku-ecommerce-platform-server.onrender.com"${res.data.avatar}`
              : "/img/user.jpg"
          );
        })
        .catch(() => toast.error("Failed to load profile"));
    } else {
      setPreview(
        user.avatar
          ? `"https://pataku-ecommerce-platform-server.onrender.com"${user.avatar}`
          : "/img/user.jpg"
      );
    }
  }, [user, dispatch]);

  const handleSave = async (values: { name: string; email: string }) => {
    try {
      const form = new FormData();
      form.append("name", values.name);
      if (avatar) form.append("avatar", avatar);

      const res = await api.put("/auth/user/update", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(setUser(res.data));
      setPreview(res.data.avatar);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = () => {
    setPreview(user?.avatar || "");
    setAvatar(null);
    setIsEditing(false);
  };

  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full py-8 flex justify-center">
      <div className="space-y-6 w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>

              <Button type="submit" form="profileForm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details and profile picture
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Formik
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
              }}
              validationSchema={ProfileSchema}
              enableReinitialize
              onSubmit={handleSave}
            >
              {({ values, setFieldValue }) => (
                <Form id="profileForm" className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={preview || user.avatar}
                        alt={values.name}
                      />

                      <AvatarFallback>{values.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <label className="flex items-center cursor-pointer">
                            <Camera className="w-4 h-4 mr-2" />
                            Change Photo
                            <input
                              type="file"
                              accept="image/*"
                              name="avatar"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      disabled={!isEditing}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Field as={Input} id="email" name="email" disabled />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        <ToastContainer />
      </div>
    </div>
  );
}
