import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { VioButton } from "@/components/Vio-button";
import { useOnboarding } from "@/lib/onboarding-context";

export default function OnboardingStep1Screen() {
  const router = useRouter();
  const { nextStep } = useOnboarding();

  const handleContinue = () => {
    nextStep();
    router.push("onboarding/step-2" as any);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-6 py-12">
          {/* Hero Section */}
          <View className="gap-6 flex-1 justify-center">
            <View className="gap-3">
              <Text className="text-5xl font-bold text-foreground text-center">
                Welcome to Vio
              </Text>
              <Text className="text-lg text-muted text-center leading-relaxed">
                Your AI-powered travel companion. Let's get to know your travel style.
              </Text>
            </View>

            {/* Illustration Placeholder */}
            <View className="bg-primary/10 rounded-2xl h-48 items-center justify-center">
              <Text className="text-6xl">✈️</Text>
            </View>
          </View>

          {/* CTA */}
          <View className="gap-3">
            <VioButton
              variant="primary"
              size="lg"
              onPress={handleContinue}
            >
              Get Started
            </VioButton>

            <Text className="text-center text-sm text-muted">
              Step 1 of 5
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
