import React from "react";
import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { VioButton } from "@/components/Vio-button";
import { useOnboarding, type TravelInterest } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

const INTERESTS: Array<{
  id: TravelInterest;
  label: string;
  emoji: string;
}> = [
  { id: "food", label: "Food & Dining", emoji: "🍽️" },
  { id: "culture", label: "Culture & History", emoji: "🏛️" },
  { id: "nature", label: "Nature & Hiking", emoji: "🌲" },
  { id: "beaches", label: "Beaches & Water", emoji: "🏖️" },
  { id: "nightlife", label: "Nightlife", emoji: "🎉" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "art", label: "Art & Museums", emoji: "🎨" },
];

export default function OnboardingStep3Screen() {
  const router = useRouter();
  const { data, updateInterests, nextStep, previousStep } = useOnboarding();

  const handleToggleInterest = (interest: TravelInterest) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter((i) => i !== interest)
      : [...data.interests, interest];

    updateInterests(newInterests);
  };

  const handleContinue = () => {
    if (data.interests.length < 2) return;
    nextStep();
    router.push("onboarding/step-4" as any);
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
              What interests you most?
            </Text>
            <Text className="text-base text-muted">
              Select at least 2 interests
            </Text>
          </View>

          {/* Interest Chips */}
          <View className="gap-3 flex-1">
            <View className="flex-row flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <Pressable
                  key={interest.id}
                  onPress={() => handleToggleInterest(interest.id)}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View
                    className={cn(
                      "flex-row items-center gap-2 px-4 py-2 rounded-full border",
                      data.interests.includes(interest.id)
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    )}
                  >
                    <Text className="text-lg">{interest.emoji}</Text>
                    <Text
                      className={cn(
                        "font-medium",
                        data.interests.includes(interest.id)
                          ? "text-background"
                          : "text-foreground"
                      )}
                    >
                      {interest.label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {data.interests.length > 0 && (
              <View className="mt-4 p-3 bg-success/10 rounded-lg">
                <Text className="text-success text-sm font-medium">
                  ✓ {data.interests.length} interest{data.interests.length !== 1 ? "s" : ""} selected
                </Text>
              </View>
            )}
          </View>

          {/* Navigation */}
          <View className="gap-3 mt-8">
            <VioButton
              variant="primary"
              size="lg"
              onPress={handleContinue}
              disabled={data.interests.length < 2}
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
              Step 3 of 5
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
