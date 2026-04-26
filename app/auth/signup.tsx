import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { VioButton } from "@/components/Vio-button";
import { VioInput } from "@/components/Vio-input";
import { useAuth } from "@/lib/auth-context";

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    setGeneralError("");

    if (!validateForm()) {
      return;
    }

    try {
      await signup(email, password, name);
      router.replace("onboarding/step-1" as any);
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : "Signup failed. Please try again."
      );
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-6 py-8">
          {/* Header */}
          <View className="gap-2 mb-8">
            <Text className="text-4xl font-bold text-foreground">Create Account</Text>
            <Text className="text-base text-muted">
              Join Vio and start exploring
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4 flex-1">
            {generalError && (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-error text-sm">{generalError}</Text>
              </View>
            )}

            <VioInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              error={errors.name}
              editable={!isLoading}
            />

            <VioInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              editable={!isLoading}
            />

            <VioInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              editable={!isLoading}
            />

            <VioInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              editable={!isLoading}
            />
          </View>

          {/* CTA Buttons */}
          <View className="gap-3 mt-8">
            <VioButton
              variant="primary"
              size="lg"
              onPress={handleSignup}
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "" : "Create Account"}
            </VioButton>

            <View className="flex-row items-center justify-center gap-1">
              <Text className="text-muted text-sm">Already have an account? </Text>
              <Text
                className="text-primary text-sm font-semibold"
                onPress={() => router.push("auth/login" as any)}
              >
                Log In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
