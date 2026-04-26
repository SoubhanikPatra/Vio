import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { VioButton } from "@/components/Vio-button";
import { VioCard } from "@/components/Vio-card";
import { useOnboarding, type TravelerType } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

const TRAVELER_TYPES: Array<{
  id: TravelerType;
  label: string;
  emoji: string;
  description: string;
}> = [
  {
    id: "adventure_seeker",
    label: "Adventure Seeker",
    emoji: "🏔️",
    description: "Hiking, sports, adrenaline",
  },
  {
    id: "cultural_explorer",
    label: "Cultural Explorer",
    emoji: "🏛️",
    description: "Museums, history, traditions",
  },
  {
    id: "beach_relaxer",
    label: "Beach Relaxer",
    emoji: "🏖️",
    description: "Sun, sand, relaxation",
  },
  {
    id: "budget_backpacker",
    label: "Budget Backpacker",
    emoji: "🎒",
    description: "Hostels, local experiences",
  },
  {
    id: "luxury_traveler",
    label: "Luxury Traveler",
    emoji: "✨",
    description: "Premium experiences",
  },
  {
    id: "family_planner",
    label: "Family Planner",
    emoji: "👨‍👩‍👧‍👦",
    description: "Family-friendly activities",
  },
];

export default function OnboardingStep2Screen() {
  const router = useRouter();
  const { data, updateTravelerType, nextStep, previousStep } = useOnboarding();

  const handleSelect = (type: TravelerType) => {
    updateTravelerType(type);
  };

  const handleContinue = () => {
    if (!data.travelerType) return;
    nextStep();
    router.push("onboarding/step-3" as any);
  };

  const handleBack = () => {
    previousStep();
    router.back();
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-6 py-8">
          {/* Header */}
          <View className="gap-2 mb-6">
            <Text className="text-3xl font-bold text-foreground">
              What type of traveler are you?
            </Text>
            <Text className="text-base text-muted">
              Choose the style that best describes you
            </Text>
          </View>

          {/* Options Grid */}
          <View className="gap-3 flex-1">
            {TRAVELER_TYPES.map((type) => (
              <Pressable
                key={type.id}
                onPress={() => handleSelect(type.id)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <VioCard
                  variant={
                    data.travelerType === type.id ? "elevated" : "outlined"
                  }
                  className={cn(
                    "flex-row items-center gap-4 p-4",
                    data.travelerType === type.id && "border-2 border-primary"
                  )}
                >
                  <Text className="text-4xl">{type.emoji}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">
                      {type.label}
                    </Text>
                    <Text className="text-sm text-muted">
                      {type.description}
                    </Text>
                  </View>
                  {data.travelerType === type.id && (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Text className="text-background text-lg">✓</Text>
                    </View>
                  )}
                </VioCard>
              </Pressable>
            ))}
          </View>

          {/* Navigation */}
          <View className="gap-3 mt-8">
            <VioButton
              variant="primary"
              size="lg"
              onPress={handleContinue}
              disabled={!data.travelerType}
            >
              Continue
            </VioButton>

            <VioButton
              variant="ghost"
              size="lg"
              onPress={handleBack}
            >
              Back
            </VioButton>

            <Text className="text-center text-sm text-muted">
              Step 2 of 5
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
