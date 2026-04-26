import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { LumeButton } from "@/components/lume-button";
import { LumeCard } from "@/components/lume-card";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("auth/login" as any);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-6 py-12">
            <Text className="text-2xl font-bold text-foreground text-center">
              Please log in to view your profile
            </Text>
            <LumeButton
              variant="primary"
              size="lg"
              onPress={() => router.push("auth/login" as any)}
            >
              Log In
            </LumeButton>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Profile
            </Text>
            <Text className="text-base text-muted">
              Manage your account
            </Text>
          </View>

          {/* User Info Card */}
          <LumeCard variant="elevated">
            <View className="gap-4">
              {/* Avatar Placeholder */}
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
                <Text className="text-3xl">👤</Text>
              </View>

              {/* User Details */}
              <View className="gap-2">
                <Text className="text-2xl font-bold text-foreground">
                  {user.name || "User"}
                </Text>
                <Text className="text-base text-muted">
                  {user.email}
                </Text>
              </View>

              {/* Edit Profile Button */}
              <LumeButton variant="outline" size="md">
                Edit Profile
              </LumeButton>
            </View>
          </LumeCard>

          {/* Traveler Profile Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Traveler Profile
            </Text>

            <LumeCard variant="outlined">
              <View className="gap-3">
                <View>
                  <Text className="text-sm text-muted mb-1">
                    Traveler Type
                  </Text>
                  <Text className="font-semibold text-foreground">
                    {user.travelerType
                      ? user.travelerType.replace(/_/g, " ").toUpperCase()
                      : "Not set"}
                  </Text>
                </View>

                <View>
                  <Text className="text-sm text-muted mb-1">
                    Interests
                  </Text>
                  <Text className="font-semibold text-foreground">
                    {user.interests
                      ? JSON.parse(user.interests).join(", ")
                      : "Not set"}
                  </Text>
                </View>

                <LumeButton variant="outline" size="md">
                  Edit Preferences
                </LumeButton>
              </View>
            </LumeCard>
          </View>

          {/* Settings Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Settings
            </Text>

            <LumeCard variant="outlined">
              <View className="gap-3">
                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View className="flex-row items-center justify-between py-2">
                    <Text className="text-foreground">Notifications</Text>
                    <View className="w-10 h-6 rounded-full bg-primary items-center justify-end pr-1">
                      <View className="w-5 h-5 rounded-full bg-background" />
                    </View>
                  </View>
                </Pressable>

                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View className="flex-row items-center justify-between py-2">
                    <Text className="text-foreground">Dark Mode</Text>
                    <View className="w-10 h-6 rounded-full bg-surface border border-border items-center justify-start pl-1">
                      <View className="w-5 h-5 rounded-full bg-border" />
                    </View>
                  </View>
                </Pressable>
              </View>
            </LumeCard>
          </View>

          {/* Account Actions */}
          <View className="gap-2">
            <LumeButton variant="secondary" size="lg">
              Change Password
            </LumeButton>

            <LumeButton
              variant="destructive"
              size="lg"
              onPress={handleLogout}
            >
              Logout
            </LumeButton>
          </View>

          {/* Footer */}
          <View className="items-center gap-1 py-4">
            <Text className="text-xs text-muted">
              Lume v1.0.0
            </Text>
            <Text className="text-xs text-muted">
              Phase 1 - Foundation & Design System
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
