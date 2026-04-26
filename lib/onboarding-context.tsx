import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TravelerType =
  | "adventure_seeker"
  | "cultural_explorer"
  | "beach_relaxer"
  | "budget_backpacker"
  | "luxury_traveler"
  | "family_planner";

export type TravelInterest =
  | "food"
  | "culture"
  | "nature"
  | "beaches"
  | "nightlife"
  | "shopping"
  | "photography"
  | "art";

export interface OnboardingData {
  travelerType: TravelerType | null;
  interests: TravelInterest[];
  travelFrequency: "multiple_per_year" | "few_per_year" | "once_per_year" | "occasionally" | null;
  budget: "budget" | "midrange" | "luxury" | null;
  hasCompletedOnboarding: boolean;
}

export interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  totalSteps: number;
  updateTravelerType: (type: TravelerType) => void;
  updateInterests: (interests: TravelInterest[]) => void;
  updateTravelFrequency: (frequency: OnboardingData["travelFrequency"]) => void;
  updateBudget: (budget: OnboardingData["budget"]) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetOnboarding: () => void;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

const ONBOARDING_KEY = "Vio_onboarding_data";
const ONBOARDING_COMPLETE_KEY = "Vio_onboarding_complete";

const initialData: OnboardingData = {
  travelerType: null,
  interests: [],
  travelFrequency: null,
  budget: null,
  hasCompletedOnboarding: false,
};

/**
 * OnboardingProvider - Manages multi-step onboarding flow
 */
export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateTravelerType = (type: TravelerType) => {
    setData((prev) => ({ ...prev, travelerType: type }));
  };

  const updateInterests = (interests: TravelInterest[]) => {
    setData((prev) => ({ ...prev, interests }));
  };

  const updateTravelFrequency = (
    frequency: OnboardingData["travelFrequency"]
  ) => {
    setData((prev) => ({ ...prev, travelFrequency: frequency }));
  };

  const updateBudget = (budget: OnboardingData["budget"]) => {
    setData((prev) => ({ ...prev, budget }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetOnboarding = () => {
    setData(initialData);
    setCurrentStep(1);
  };

  const completeOnboarding = async () => {
    try {
      const completedData = {
        ...data,
        hasCompletedOnboarding: true,
      };

      await AsyncStorage.setItem(
        ONBOARDING_KEY,
        JSON.stringify(completedData)
      );
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");

      setData(completedData);
    } catch (error) {
      console.error("[Onboarding] Failed to complete:", error);
      throw error;
    }
  };

  const value: OnboardingContextType = {
    data,
    currentStep,
    totalSteps,
    updateTravelerType,
    updateInterests,
    updateTravelFrequency,
    updateBudget,
    nextStep,
    previousStep,
    resetOnboarding,
    completeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * useOnboarding - Hook to access onboarding context
 */
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
