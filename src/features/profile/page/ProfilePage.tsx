"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CurrentUser } from "@/actions/getCurrentUser";
import ProfileForm from "../components/ProfileForm";
import { profileFormSchema, useUpdateProfile } from "../hooks/useUpdateProfile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
interface ProfilePageProps {
  currentUser: CurrentUser | null;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = ({ currentUser }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
  });

  const { mutateAsync: updateProfile, isPending, error } = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: formData.username,
      bio: formData.bio,
    },
  });

  if (!currentUser?.id) {
    return <p>Please sign in.</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    await updateProfile(values);
    setFormData({ ...formData, ...values });
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">會員資料</h2>
          {!isEditing && (
            <Button type="button" onClick={handleEdit}>
              編輯資料
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <ProfileForm
              currentUser={currentUser}
              isLoading={isLoading || isPending}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              form={form}
            />
          ) : (
            <div className="space-y-4">
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">
                  使用者名稱：
                </h3>
                <p className="mt-1 text-gray-900">{currentUser?.username}</p>
              </div>
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">
                  電子郵件：
                </h3>
                <p className="mt-1 text-gray-900">{currentUser?.email}</p>
              </div>
              <div className="w-full">
                <h3 className="text-base text-gray-700 font-bold">
                  自我介紹：
                </h3>
                <p className="mt-1 text-gray-900">
                  {currentUser?.bio || "尚未填寫"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
