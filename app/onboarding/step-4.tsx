import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { LumeButton } from "@/components/lume-button";
import { LumeCard } from "@/components/lume-card";
import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

const FREQUENCY_OPTIONS = [
  { id: "multiple_per_year", label: "Multiple times a year", emoji: "🔄" },
  { id: "few_per_year", label: "Few times a year", emoji: "📅" },
  { id: "once_per_year", label: "Once a year", emoji: "🎯" },
  { id: "occasionally", label: "Occasionally", emoji: "🌍" },
];

const BUDGET_OPTIONS = [
  { id: "budget", label: "Budget", description: "Under $1000", emoji: "💰" },
  {
    id: "midrange",
    label: "Mid-range",
    description: "$1000 - $3000",
    emoji: "💳",
  },
  { id: "luxury", label: "Luxury", description: "$3000+", emoji: "✨" },
];

export default function OnboardingStep4Screen() {
  const router = useRouter();
  const {
    data,
    updateTravelFrequency,
    updateBudget,
    nextStep,
    previousStep,
  } = useOnboarding();

  const handleContinue = () => {
    if (!data.travelFrequency || !data.budget) return;
    nextStep();
    router.push("onboarding/step-5" as any);
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
          <View className="gap-6">
            {/* Travel Frequency Section */}
            <View className="gap-3">
              <Text className="text-2xl font-bold text-foreground">
                How often do you travel?
              </Text>

              <View className="gap-2">
                {FREQUENCY_OPTIONS.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() =>
                      updateTravelFrequency(
                        option.id as any
                      )
                    }
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <LumeCard
                      variant={
                        data.travelFrequency === option.id
                          ? "elevated"
                          : "outlined"
                      }
                      className={cn(
                        "flex-row items-center gap-3 p-3",
                        data.travelFrequency === option.id &&
                          "border-2 border-primary"
                      )}
                    >
                      <Text className="text-2xl">{option.emoji}</Text>
                      <Text className="flex-1 font-medium text-foreground">
                        {option.label}
                      </Text>
                      {data.travelFrequency === option.id && (
                        <View className="w-5 h-5 rounded-full bg-primary" />
                      )}
                    </LumeCard>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Budget Section */}
            <View className="gap-3">
              <Text className="text-2xl font-bold text-foreground">
                What's your typical budget?
              </Text>

              <View className="gap-2">
                {BUDGET_OPTIONS.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => updateBudget(option.id as any)}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <LumeCard
                      variant={
                        data.budget === option.id ? "elevated" : "outlined"
                      }
                      className={cn(
                        "flex-row items-center gap-3 p-3",
                        data.budget === option.id && "border-2 border-primary"
                      )}
                    >
                      <Text className="text-2xl">{option.emoji}</Text>
                      <View className="flex-1">
                        <Text className="font-medium text-foreground">
                          {option.label}
                        </Text>
                        <Text className="text-xs text-muted">
                          {option.description}
                        </Text>
                      </View>
                      {data.budget === option.id && (
                        <View className="w-5 h-5 rounded-full bg-primary" />
                      )}
                    </LumeCard>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View className="gap-3 mt-8">
            <LumeButton
              variant="primary"
              size="lg"
              onPress={handleContinue}
              disabled={!data.travelFrequency || !data.budget}
            >
              Continue
            </LumeButton>

            <LumeButton
              variant="ghost"
              size="lg"
              onPress={handleBack}
            >
              Back
            </LumeButton>

            <Text className="text-center text-sm text-muted">
              Step 4 of 5
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
