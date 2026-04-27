import React, { useState, useRef } from "react";
import { ScrollView, Text, View, FlatList, Animated } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { VioInput } from "@/components/Vio-input";
import { VioCard } from "@/components/Vio-card";
import { VioButton } from "@/components/Vio-button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { TravelResult, FlightResult, ActivityResult } from "@/services/travelService";

type FilterType = "all" | "flights" | "activities";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const { user } = useAuth();

  // TanStack Query hook for search
  const { data: results = [], isLoading, error } = trpc.travel.search.useQuery(
    {
      query: searchQuery,
      type: filterType,
    },
    {
      enabled: searchQuery.length > 0,
    }
  );

  const isFlightResult = (item: TravelResult): item is FlightResult =>
    item.type === "flight";

  const isActivityResult = (item: TravelResult): item is ActivityResult =>
    item.type === "activity";

  const renderFlightCard = (flight: FlightResult) => (
    <VioCard key={flight.id} variant="elevated" className="mb-3">
      <View className="gap-3">
        {/* Header: Airline & Rating */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-foreground">
            {flight.airline}
          </Text>
          <View className="flex-row items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Text className="text-sm">⭐</Text>
            <Text className="text-sm font-semibold text-primary">
              {flight.rating}
            </Text>
          </View>
        </View>

        {/* Route */}
        <View className="flex-row items-center justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">
              {flight.departure}
            </Text>
            <Text className="text-xs text-muted mt-1">Depart</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-muted text-xs">{flight.duration}</Text>
            <View className="h-px w-12 bg-border mt-1" />
            <Text className="text-muted text-xs mt-1">✈️</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">
              {flight.arrival}
            </Text>
            <Text className="text-xs text-muted mt-1">Arrive</Text>
          </View>
        </View>

        {/* Price & Action */}
        <View className="flex-row justify-between items-center pt-2 border-t border-border">
          <View>
            <Text className="text-xs text-muted">Price</Text>
            <Text className="text-2xl font-bold text-primary">
              ${flight.price}
            </Text>
          </View>
          <SaveToTripButton
            title={`${flight.airline} ${flight.departure}→${flight.arrival}`}
            location={`${flight.departure} to ${flight.arrival}`}
          />
        </View>
      </View>
    </VioCard>
  );

  const renderActivityCard = (activity: ActivityResult) => (
    <VioCard key={activity.id} variant="elevated" className="mb-3">
      <View className="gap-3">
        {/* Header: Title & Rating */}
        <View className="flex-row justify-between items-start gap-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">
              {activity.title}
            </Text>
            <Text className="text-xs text-muted mt-1">{activity.category}</Text>
          </View>
          <View className="flex-row items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Text className="text-sm">⭐</Text>
            <Text className="text-sm font-semibold text-primary">
              {activity.rating}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="flex-row items-center gap-2">
          <Text className="text-lg">📍</Text>
          <Text className="text-sm text-muted flex-1">{activity.location}</Text>
        </View>

        {/* Price & Action */}
        <View className="flex-row justify-between items-center pt-2 border-t border-border">
          <View>
            <Text className="text-xs text-muted">Price</Text>
            <Text className="text-2xl font-bold text-primary">
              ${activity.price}
            </Text>
          </View>
          <SaveToTripButton
            title={activity.title}
            location={activity.location}
          />
        </View>
      </View>
    </VioCard>
  );

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
              Discover flights and activities
            </Text>
          </View>

          {/* Search Bar */}
          <VioInput
            placeholder="Search destinations, activities..."
            type="text"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Filter Tabs */}
          <View className="flex-row gap-2">
            {(["all", "flights", "activities"] as const).map((type) => (
              <VioButton
                key={type}
                variant={filterType === type ? "primary" : "outline"}
                size="sm"
                onPress={() => setFilterType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </VioButton>
            ))}
          </View>

          {/* Empty State */}
          {!searchQuery && (
            <View className="gap-4 py-12">
              <View className="items-center gap-3">
                <Text className="text-5xl">🔍</Text>
                <Text className="text-lg font-semibold text-foreground text-center">
                  Start exploring
                </Text>
                <Text className="text-sm text-muted text-center">
                  Search for destinations or activities to get started
                </Text>
              </View>
            </View>
          )}

          {/* Loading State with Skeleton */}
          {isLoading && searchQuery && (
            <View className="gap-3">
              {[1, 2, 3].map((i) => (
                <VioCard key={i} variant="elevated">
                  <View className="gap-3">
                    <View className="h-6 bg-surface rounded animate-pulse" />
                    <View className="h-12 bg-surface rounded animate-pulse" />
                    <View className="h-6 bg-surface rounded animate-pulse w-2/3" />
                  </View>
                </VioCard>
              ))}
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="bg-error/10 border border-error rounded-lg p-4">
              <Text className="text-error font-semibold">
                Error loading results
              </Text>
              <Text className="text-error text-sm mt-1">
                {error.message || "Please try again"}
              </Text>
            </View>
          )}

          {/* Results */}
          {!isLoading && searchQuery && results.length > 0 && (
            <View className="gap-3">
              {results.map((result) =>
                isFlightResult(result)
                  ? renderFlightCard(result)
                  : renderActivityCard(result)
              )}
            </View>
          )}

          {/* No Results */}
          {!isLoading && searchQuery && results.length === 0 && !error && (
            <View className="gap-3 py-6">
              <Text className="text-base text-muted text-center">
                No results found for "{searchQuery}"
              </Text>
              <Text className="text-sm text-muted text-center">
                Try searching for a different destination or activity
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

/**
 * SaveToTripButton Component
 * Handles saving a travel result to the user's itinerary
 */
function SaveToTripButton({
  title,
  location,
}: {
  title: string;
  location: string;
}) {
  const { user } = useAuth();
  const [showTripSelector, setShowTripSelector] = useState(false);
  const saveToTripMutation = trpc.travel.saveToTrip.useMutation();

  const handleSaveToTrip = async () => {
    if (!user) {
      alert("Please log in to save items to your trip");
      return;
    }

    // For now, use a hardcoded tripId. In a real app, this would be selected from user's trips
    const tripId = 1;
    const today = new Date().toISOString().split("T")[0];

    try {
      await saveToTripMutation.mutateAsync({
        tripId,
        title,
        location,
        itemDate: today,
        description: `Added from search: ${title}`,
      });
      alert("✅ Saved to your trip!");
    } catch (error) {
      alert("Failed to save to trip. Please try again.");
    }
  };

  return (
    <VioButton
      variant="outline"
      size="sm"
      onPress={handleSaveToTrip}
      loading={saveToTripMutation.isPending}
    >
      💾 Save
    </VioButton>
  );
}


// import React, { useState } from "react";
// import { ScrollView, Text, View } from "react-native";
// import { ScreenContainer } from "@/components/screen-container";
// import { VioInput } from "@/components/Vio-input";
// import { VioCard } from "@/components/Vio-card";

// export default function SearchScreen() {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <ScreenContainer className="p-6">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View className="gap-6">
//           {/* Header */}
//           <View className="gap-2">
//             <Text className="text-3xl font-bold text-foreground">
//               Explore
//             </Text>
//             <Text className="text-base text-muted">
//               Discover destinations and trips
//             </Text>
//           </View>

//           {/* Search Bar */}
//           <VioInput
//             placeholder="Search destinations, trips..."
//             type="text"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />

//           {/* Empty State */}
//           {!searchQuery && (
//             <View className="gap-4 py-12">
//               <View className="items-center gap-3">
//                 <Text className="text-5xl">🔍</Text>
//                 <Text className="text-lg font-semibold text-foreground text-center">
//                   Start exploring
//                 </Text>
//                 <Text className="text-sm text-muted text-center">
//                   Search for destinations or browse trending trips
//                 </Text>
//               </View>

//               {/* Trending Section Placeholder */}
//               <View className="gap-3 mt-6">
//                 <Text className="text-lg font-semibold text-foreground">
//                   Trending Now
//                 </Text>
//                 {[1, 2, 3].map((i) => (
//                   <VioCard key={i} variant="outlined">
//                     <View className="gap-2">
//                       <View className="h-32 bg-surface rounded-lg items-center justify-center">
//                         <Text className="text-4xl">🌍</Text>
//                       </View>
//                       <Text className="font-semibold text-foreground">
//                         Destination {i}
//                       </Text>
//                       <Text className="text-sm text-muted">
//                         Coming soon in Phase 2
//                       </Text>
//                     </View>
//                   </VioCard>
//                 ))}
//               </View>
//             </View>
//           )}

//           {/* Search Results Placeholder */}
//           {searchQuery && (
//             <View className="gap-3 py-6">
//               <Text className="text-base text-muted">
//                 No results found for "{searchQuery}"
//               </Text>
//               <Text className="text-sm text-muted">
//                 Search functionality coming in Phase 2
//               </Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </ScreenContainer>
//   );
// }
