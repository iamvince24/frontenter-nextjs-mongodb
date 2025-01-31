import { getCurrentUser } from "@/actions/getCurrentUser";
import ProfilePage from "@/features/profile/page/ProfilePage";

export default async function Profile() {
  const currentUser = await getCurrentUser();

  return <ProfilePage currentUser={currentUser} />;
}
