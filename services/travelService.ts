/**
 * Travel Service for Vio
 * Handles flight and activity searches using Amadeus and Overpass APIs.
 * Includes a Mock Mode for development without API keys.
 */

export interface FlightResult {
  id: string;
  type: "flight";
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  currency: string;
  rating: number;
  duration: string;
}

export interface ActivityResult {
  id: string;
  type: "activity";
  title: string;
  category: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  imageUrl?: string;
}

export type TravelResult = FlightResult | ActivityResult;

export interface SearchFilters {
  query: string;
  type: "all" | "flights" | "activities";
  minPrice?: number;
  maxPrice?: number;
}

class TravelService {
  private isMockMode: boolean = true;

  constructor() {
    // In a real app, this might be driven by an env var or config
    this.isMockMode = true; 
  }

  setMockMode(enabled: boolean) {
    this.isMockMode = enabled;
  }

  async search(filters: SearchFilters): Promise<TravelResult[]> {
    if (this.isMockMode) {
      return this.getMockResults(filters);
    }

    // Real API integration logic would go here
    // For now, we'll fall back to mock if real APIs aren't fully configured
    try {
      return await this.fetchRealResults(filters);
    } catch (error) {
      console.error("Error fetching real travel results:", error);
      return this.getMockResults(filters);
    }
  }

  private async getMockResults(filters: SearchFilters): Promise<TravelResult[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockFlights: FlightResult[] = [
      {
        id: "f1",
        type: "flight",
        airline: "Vio Air",
        departure: "SFO",
        arrival: "NRT",
        price: 850,
        currency: "USD",
        rating: 4.8,
        duration: "11h 30m",
      },
      {
        id: "f2",
        type: "flight",
        airline: "Global Jet",
        departure: "JFK",
        arrival: "LHR",
        price: 420,
        currency: "USD",
        rating: 4.2,
        duration: "7h 15m",
      },
    ];

    const mockActivities: ActivityResult[] = [
      {
        id: "a1",
        type: "activity",
        title: "Tokyo Night Food Tour",
        category: "Food & Drink",
        location: "Shinjuku, Tokyo",
        price: 75,
        currency: "USD",
        rating: 4.9,
      },
      {
        id: "a2",
        type: "activity",
        title: "Louvre Museum Guided Tour",
        category: "Culture",
        location: "Paris, France",
        price: 55,
        currency: "USD",
        rating: 4.7,
      },
      {
        id: "a3",
        type: "activity",
        title: "Grand Canyon Helicopter Tour",
        category: "Adventure",
        location: "Arizona, USA",
        price: 299,
        currency: "USD",
        rating: 4.9,
      },
    ];

    let results: TravelResult[] = [];
    if (filters.type === "all") {
      results = [...mockFlights, ...mockActivities];
    } else if (filters.type === "flights") {
      results = mockFlights;
    } else {
      results = mockActivities;
    }

    // Simple filtering by query
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter((r) => {
        if (r.type === "flight") {
          return (
            r.airline.toLowerCase().includes(q) ||
            r.departure.toLowerCase().includes(q) ||
            r.arrival.toLowerCase().includes(q)
          );
        } else {
          return (
            r.title.toLowerCase().includes(q) ||
            r.location.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q)
          );
        }
      });
    }

    return results;
  }

  private async fetchRealResults(filters: SearchFilters): Promise<TravelResult[]> {
    // Placeholder for Amadeus and Overpass API integration
    // This will be implemented as keys become available
    throw new Error("Real API integration not yet implemented");
  }
}

export const travelService = new TravelService();
