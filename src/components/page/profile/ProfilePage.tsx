import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/page/navbar/Navbar";
import { getCurrentUser } from "@/actions/getCurrentUser";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return <p>Please sign in.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">會員資料</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                使用者名稱
              </label>
              <Input
                type="text"
                name="username"
                value={currentUser?.username}
                // onChange={{handleChange}}
                className="mt-1 block w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                電子郵件
              </label>
              <Input
                type="email"
                name="email"
                value={currentUser?.email}
                // onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                自我介紹
              </label>
              <Input
                type="text"
                name="bio"
                value={currentUser?.bio || ""}
                // onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>
            <Button className="mt-4">儲存變更</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
