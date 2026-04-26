import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { LumeInput } from "@/components/lume-input";
import { LumeCard } from "@/components/lume-card";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Explore
            </Text>
            <Text className="text-base text-muted">
              Discover destinations and trips
            </Text>
          </View>

          {/* Search Bar */}
          <LumeInput
            placeholder="Search destinations, trips..."
            type="text"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Empty State */}
          {!searchQuery && (
            <View className="gap-4 py-12">
              <View className="items-center gap-3">
                <Text className="text-5xl">🔍</Text>
                <Text className="text-lg font-semibold text-foreground text-center">
                  Start exploring
                </Text>
                <Text className="text-sm text-muted text-center">
                  Search for destinations or browse trending trips
                </Text>
              </View>

              {/* Trending Section Placeholder */}
              <View className="gap-3 mt-6">
                <Text className="text-lg font-semibold text-foreground">
                  Trending Now
                </Text>
                {[1, 2, 3].map((i) => (
                  <LumeCard key={i} variant="outlined">
                    <View className="gap-2">
                      <View className="h-32 bg-surface rounded-lg items-center justify-center">
                        <Text className="text-4xl">🌍</Text>
                      </View>
                      <Text className="font-semibold text-foreground">
                        Destination {i}
                      </Text>
                      <Text className="text-sm text-muted">
                        Coming soon in Phase 2
                      </Text>
                    </View>
                  </LumeCard>
                ))}
              </View>
            </View>
          )}

          {/* Search Results Placeholder */}
          {searchQuery && (
            <View className="gap-3 py-6">
              <Text className="text-base text-muted">
                No results found for "{searchQuery}"
              </Text>
              <Text className="text-sm text-muted">
                Search functionality coming in Phase 2
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
