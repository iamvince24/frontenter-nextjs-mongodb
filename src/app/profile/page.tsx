import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfilePage from "@/components/page/profile/ProfilePage";

export default function Profile() {
  return (
    <div>
      <ProfilePage />
    </div>
  );
}
