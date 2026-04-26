import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { VioButton } from "@/components/Vio-button";
import { VioCard } from "@/components/Vio-card";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const firstName = user?.name?.split(" ")[0] || "Traveler";

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-8">
          {/* Greeting */}
          <View className="gap-1">
            <Text className="text-4xl font-bold text-foreground">
              Hello, {firstName}! 👋
            </Text>
            <Text className="text-base text-muted">
              Ready for your next adventure?
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <VioCard variant="elevated" className="flex-1">
              <View className="gap-2 items-center">
                <Text className="text-3xl">📍</Text>
                <Text className="text-2xl font-bold text-foreground">0</Text>
                <Text className="text-xs text-muted text-center">
                  Trips Planned
                </Text>
              </View>
            </VioCard>

            <VioCard variant="elevated" className="flex-1">
              <View className="gap-2 items-center">
                <Text className="text-3xl">🌍</Text>
                <Text className="text-2xl font-bold text-foreground">0</Text>
                <Text className="text-xs text-muted text-center">
                  Countries
                </Text>
              </View>
            </VioCard>
          </View>

          {/* Upcoming Trips Section */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">
              Upcoming Trips
            </Text>

            {/* Empty State */}
            <VioCard variant="outlined">
              <View className="gap-3 items-center py-8">
                <Text className="text-5xl">✈️</Text>
                <Text className="text-lg font-semibold text-foreground text-center">
                  No upcoming trips
                </Text>
                <Text className="text-sm text-muted text-center">
                  Start planning your next adventure
                </Text>
                <VioButton
                  variant="primary"
                  size="md"
                  onPress={() => router.push("(tabs)/trips" as any)}
                >
                  Create Trip
                </VioButton>
              </View>
            </VioCard>
          </View>

          {/* Quick Actions */}
          <View className="gap-2">
            <VioButton
              variant="primary"
              size="lg"
              onPress={() => router.push("(tabs)/trips" as any)}
            >
              Create New Trip
            </VioButton>

            <VioButton
              variant="outline"
              size="lg"
              onPress={() => router.push("(tabs)/search" as any)}
            >
              Explore Destinations
            </VioButton>
          </View>

          {/* Trending Section */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">
              Trending Now
            </Text>

            {[1, 2, 3].map((i) => (
              <VioCard key={i} variant="outlined">
                <View className="gap-2">
                  <View className="h-32 bg-surface rounded-lg items-center justify-center">
                    <Text className="text-4xl">🌏</Text>
                  </View>
                  <Text className="font-semibold text-foreground">
                    Destination {i}
                  </Text>
                  <Text className="text-sm text-muted">
                    Coming soon in Phase 2
                  </Text>
                </View>
              </VioCard>
            ))}
          </View>

          {/* Phase 1 Notice
          <VioCard variant="outlined" className="bg-primary/5 border-primary/20">
            <View className="gap-2">
              <Text className="font-semibold text-primary">
                🚀 Phase 1 Complete
              </Text>
              <Text className="text-sm text-foreground">
                Foundation & Design System is ready. Phase 2 will include AI-powered search, trip creation, and more.
              </Text>
            </View>
          </VioCard> */}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
