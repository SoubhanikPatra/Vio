import React, { useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { LumeButton } from "@/components/lume-button";
import { useOnboarding } from "@/lib/onboarding-context";
import { useAuth } from "@/lib/auth-context";

export default function OnboardingStep5Screen() {
  const router = useRouter();
  const { data, completeOnboarding } = useOnboarding();
  const { setOnboardingData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Save onboarding data to backend
      await setOnboardingData({
        travelerType: data.travelerType || "",
        interests: data.interests,
      });

      // Mark onboarding as complete locally
      await completeOnboarding();

      // Navigate to home
      router.replace("/(tabs)");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete onboarding"
      );
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-6 py-12">
          {/* Success Section */}
          <View className="gap-6 flex-1 justify-center">
            {/* Illustration */}
            <View className="bg-success/10 rounded-3xl h-40 items-center justify-center">
              <Text className="text-7xl">🎉</Text>
            </View>

            {/* Message */}
            <View className="gap-3 text-center">
              <Text className="text-4xl font-bold text-foreground text-center">
                Profile Complete!
              </Text>
              <Text className="text-lg text-muted text-center leading-relaxed">
                You're all set. Ready to explore the world with Lume.
              </Text>
            </View>

            {/* Summary */}
            <View className="bg-surface rounded-xl p-4 gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">🧑‍🤝‍🧑</Text>
                <Text className="flex-1 text-foreground">
                  Traveler Type:{" "}
                  <Text className="font-semibold">
                    {data.travelerType?.replace(/_/g, " ").toUpperCase()}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="text-lg">❤️</Text>
                <Text className="flex-1 text-foreground">
                  Interests:{" "}
                  <Text className="font-semibold">
                    {data.interests.length} selected
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View className="bg-error/10 border border-error rounded-lg p-3 mb-4">
              <Text className="text-error text-sm">{error}</Text>
            </View>
          )}

          {/* CTA */}
          <View className="gap-3 mt-8">
            <LumeButton
              variant="primary"
              size="lg"
              onPress={handleComplete}
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "" : "Start Exploring"}
            </LumeButton>

            <Text className="text-center text-sm text-muted">
              Step 5 of 5
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
