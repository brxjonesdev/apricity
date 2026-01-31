import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseUser } from "@/lib/supabase/utils";
import { getServices } from "@/lib/services";
import OnboardingForm from "./_components/onboarding-form";
import { revalidatePath } from "next/cache";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { userService } = await getServices();

  const user = await getSupabaseUser(supabase);
  if (!user) {
    redirect("/");
    return;
  }

  // Check if user is already onboarded
  const profileResult = await userService.getUserProfile(user.id);
  if (profileResult.ok && profileResult.data) {
    redirect("/start");
  }

  async function onboardUser(data: {
    authId: string;
    displayName: string;
    username: string;
  }) {
    "use server";
    const { userService } = await getServices();

    const result = await userService.onboardUserProfile({
      auth_id: data.authId,
      display_name: data.displayName,
      username: data.username,
    } as Parameters<typeof userService.onboardUserProfile>[0]);

    if (!result.ok) {
      return { success: false, error: result.error };
    }
    revalidatePath("/start");
    return { success: true };
  }

  async function isUsernameTaken(username: string) {
    "use server";
    const { userService } = await getServices();
    const result = await userService.checkUsernameAvailability(username);
    if (!result.ok) {
      return { success: false, error: result.error };
    }
    return { success: true, taken: result.data };
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome!</h1>
          <p className="text-muted-foreground">
            Let&apos;s set up your profile to get started.
          </p>
        </div>
        <OnboardingForm
          authId={user.id}
          onSubmit={onboardUser}
          checkUsername={isUsernameTaken}
        />
      </div>
    </main>
  );
}
