"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CurrentUser } from "@/actions/getCurrentUser";

interface ProfilePageProps {
  currentUser: CurrentUser | null;
}

const ProfilePage = ({ currentUser }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
  });

  if (!currentUser?.id) {
    return <p>Please sign in.</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  使用者名稱
                </label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  電子郵件
                </label>
                <p className="mt-1 text-gray-900">{currentUser?.email}</p>
                {/* <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                /> */}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  自我介紹
                </label>
                <Input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "儲存中..." : "儲存變更"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  取消
                </Button>
              </div>
            </form>
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
