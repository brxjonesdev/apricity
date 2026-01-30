interface OnboardingFormProps {
  authId: string;
  onSubmit: (data: { authId: string; username: string; displayName: string }) => Promise<{ success: boolean; error?: string }>;
  checkUsername: (username: string) => Promise<{ success: boolean; taken?: boolean; error?: string }>;
}
export default function OnboardingForm({ authId, onSubmit, checkUsername }: OnboardingFormProps) {
  return <div>Onboarding Form Component</div>;
}
