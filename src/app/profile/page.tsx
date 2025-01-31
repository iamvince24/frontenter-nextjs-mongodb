import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfilePage from "@/components/page/profile/ProfilePage";

export default async function Profile() {
  const currentUser = await getCurrentUser();

  return <ProfilePage currentUser={currentUser} />;
}
