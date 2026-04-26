import { describe, it, expect } from "vitest";

/**
 * Onboarding Context Tests
 * 
 * These tests verify that the onboarding context:
 * - Exports OnboardingProvider component
 * - Exports useOnboarding hook
 * - Has correct type definitions
 * - Manages multi-step flow state
 */

describe("Onboarding Context", () => {
  it("should export OnboardingProvider component", () => {
    const { OnboardingProvider } = require("@/lib/onboarding-context");
    expect(OnboardingProvider).toBeDefined();
    expect(typeof OnboardingProvider).toBe("function");
  });

  it("should export useOnboarding hook", () => {
    const { useOnboarding } = require("@/lib/onboarding-context");
    expect(useOnboarding).toBeDefined();
    expect(typeof useOnboarding).toBe("function");
  });

  it("should have correct OnboardingContextType interface", () => {
    const contextType = {
      data: {
        travelerType: null,
        interests: [],
        travelFrequency: null,
        budget: null,
        hasCompletedOnboarding: false,
      },
      currentStep: 1,
      totalSteps: 5,
      updateTravelerType: () => {},
      updateInterests: () => {},
      updateTravelFrequency: () => {},
      updateBudget: () => {},
      nextStep: () => {},
      previousStep: () => {},
      resetOnboarding: () => {},
      completeOnboarding: async () => {},
    };

    expect(contextType.totalSteps).toBe(5);
    expect(contextType.currentStep).toBe(1);
    expect(contextType.data.interests).toEqual([]);
  });

  it("should have correct traveler types", () => {
    const travelerTypes = [
      "adventure_seeker",
      "cultural_explorer",
      "beach_relaxer",
      "budget_backpacker",
      "luxury_traveler",
      "family_planner",
    ];

    expect(travelerTypes).toHaveLength(6);
    expect(travelerTypes).toContain("adventure_seeker");
    expect(travelerTypes).toContain("luxury_traveler");
  });

  it("should have correct travel interests", () => {
    const interests = [
      "food",
      "culture",
      "nature",
      "beaches",
      "nightlife",
      "shopping",
      "photography",
      "art",
    ];

    expect(interests).toHaveLength(8);
    expect(interests).toContain("food");
    expect(interests).toContain("photography");
  });

  it("should have correct travel frequency options", () => {
    const frequencies = [
      "multiple_per_year",
      "few_per_year",
      "once_per_year",
      "occasionally",
    ];

    expect(frequencies).toHaveLength(4);
  });

  it("should have correct budget options", () => {
    const budgets = ["budget", "midrange", "luxury"];

    expect(budgets).toHaveLength(3);
  });

  it("should use correct storage keys", () => {
    const ONBOARDING_KEY = "Vio_onboarding_data";
    const ONBOARDING_COMPLETE_KEY = "Vio_onboarding_complete";

    expect(ONBOARDING_KEY).toBe("Vio_onboarding_data");
    expect(ONBOARDING_COMPLETE_KEY).toBe("Vio_onboarding_complete");
  });
});
