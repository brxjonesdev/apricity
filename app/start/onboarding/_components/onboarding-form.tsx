"use client";

import React from "react";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Card, CardContent, CardFooter } from "@/lib/components/ui/card";
import { Spinner } from "@/lib/components/ui/spinner";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { debounce } from "@/lib/utils";

interface OnboardingFormProps {
  authId: string;
  onSubmit: (data: {
    authId: string;
    username: string;
    displayName: string;
  }) => Promise<{ success: boolean; error?: string }>;
  checkUsername: (
    username: string,
  ) => Promise<{ success: boolean; taken?: boolean; error?: string }>;
}

export default function OnboardingForm({
  authId,
  onSubmit,
  checkUsername,
}: OnboardingFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid" | "error"
  >("idle");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateUsername = (
    value: string,
  ): { valid: boolean; error?: string } => {
    if (value.length === 0) {
      return { valid: false };
    }
    if (value.length < 3) {
      return { valid: false, error: "Username must be at least 3 characters" };
    }
    if (value.length > 20) {
      return { valid: false, error: "Username must be 20 characters or less" };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return {
        valid: false,
        error: "Username can only contain letters, numbers, and underscores",
      };
    }
    if (/^[0-9]/.test(value)) {
      return { valid: false, error: "Username cannot start with a number" };
    }
    return { valid: true };
  };

  const checkUsernameAvailability = useCallback(
    async (value: string) => {
      const validation = validateUsername(value);
      if (!validation.valid) {
        if (validation.error) {
          setUsernameStatus("invalid");
          setUsernameError(validation.error);
        } else {
          setUsernameStatus("idle");
          setUsernameError(null);
        }
        return;
      }

      setUsernameStatus("checking");
      setUsernameError(null);

      try {
        const result = await checkUsername(value.toLowerCase());
        if (!result.success) {
          setUsernameStatus("error");
          setUsernameError(result.error || "Failed to check username");
          return;
        }
        if (result.taken) {
          setUsernameStatus("taken");
          setUsernameError("This username is already taken");
        } else {
          setUsernameStatus("available");
          setUsernameError(null);
        }
      } catch {
        setUsernameStatus("error");
        setUsernameError("Failed to check username availability");
      }
    },
    [checkUsername],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheck = useCallback(
    debounce((value: string) => checkUsernameAvailability(value), 500),
    [checkUsernameAvailability],
  );

  useEffect(() => {
    if (username) {
      const validation = validateUsername(username);
      if (validation.valid) {
        setUsernameStatus("checking");
      }
      debouncedCheck(username);
    } else {
      setUsernameStatus("idle");
      setUsernameError(null);
    }
  }, [username, debouncedCheck]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (usernameStatus !== "available") {
      return;
    }

    if (!displayName.trim()) {
      setSubmitError("Please enter a display name");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        authId,
        username: username.toLowerCase(),
        displayName: displayName.trim(),
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to complete onboarding");
        setIsSubmitting(false);
        return;
      }

      router.push("/start");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = () => {
    switch (usernameStatus) {
      case "checking":
        return (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        );
      case "available":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "taken":
      case "invalid":
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const isFormValid =
    usernameStatus === "available" && displayName.trim().length > 0;

  return (
    <Card className="border-border/50 shadow-lg p-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="pr-10"
                disabled={isSubmitting}
                autoComplete="off"
                aria-describedby={usernameError ? "username-error" : undefined}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getStatusIcon()}
              </div>
            </div>
            {usernameError && (
              <p
                id="username-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {usernameError}
              </p>
            )}
            {usernameStatus === "available" && (
              <p className="text-sm text-green-500">Username is available!</p>
            )}
            <p className="text-xs text-muted-foreground">
              3-20 characters. Letters, numbers, and underscores only.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Your Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={isSubmitting}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              This is how your name will appear to others.
            </p>
          </div>

          {submitError && (
            <div
              className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              {submitError}
            </div>
          )}
        </CardContent>

        <CardFooter className="pb-6">
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Creating your profile...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
