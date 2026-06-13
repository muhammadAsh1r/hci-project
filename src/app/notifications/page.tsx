import { NotificationsContent } from "@/components/notifications/notifications-content";
import { RequireFreelancerAuth } from "@/components/auth/require-freelancer-auth";

export const metadata = {
  title: "Notifications — FreelanceAI",
  description: "View and manage your project, payment, and message notifications.",
};

export default function NotificationsPage() {
  return (
    <RequireFreelancerAuth clientRedirect="notifications">
      <NotificationsContent />
    </RequireFreelancerAuth>
  );
}
