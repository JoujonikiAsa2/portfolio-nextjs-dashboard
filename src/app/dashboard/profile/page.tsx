import { ProfileForm } from "@/components/dashboard/profile/profile-form";
import { Form } from "@/components/ui/form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal profile</p>
      </div>
      <div>
        <ProfileForm/>
      </div>
    </div>
  )
}
