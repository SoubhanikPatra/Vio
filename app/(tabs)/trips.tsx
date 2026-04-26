import React, { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { LumeButton } from "@/components/lume-button";
import { LumeCard } from "@/components/lume-card";

type TabType = "active" | "planned" | "completed";

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("planned");

  const trips = {
    active: [],
    planned: [],
    completed: [],
  };

  const tabOptions: Array<{ id: TabType; label: string }> = [
    { id: "active", label: "Active" },
    { id: "planned", label: "Planned" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              My Trips
            </Text>
            <Text className="text-base text-muted">
              Manage your travel plans
            </Text>
          </View>

          {/* Tab Navigation */}
          <View className="flex-row gap-2">
            {tabOptions.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === tab.id
                      ? "bg-primary"
                      : "bg-surface border border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      activeTab === tab.id
                        ? "text-background"
                        : "text-foreground"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Empty State */}
          <View className="gap-4 py-12">
            <View className="items-center gap-3">
              <Text className="text-5xl">✈️</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                No {activeTab} trips
              </Text>
              <Text className="text-sm text-muted text-center">
                Start planning your next adventure
              </Text>
            </View>

            <LumeButton variant="primary" size="lg">
              Create New Trip
            </LumeButton>
          </View>

          {/* Trips List Placeholder */}
          <View className="gap-3">
            {trips[activeTab].length === 0 && (
              <Text className="text-sm text-muted text-center py-4">
                Trip management coming in Phase 2
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
