import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getApiBaseUrl } from "@/constants/oauth";

export interface AuthUser {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "admin";
  travelerType: string | null;
  interests: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setOnboardingData: (data: {
    travelerType: string;
    interests: string[];
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "Vio_auth_token";
const USER_KEY = "Vio_auth_user";

const buildApiUrl = (path: string) => `${getApiBaseUrl()}${path}`;

/**
 * AuthProvider - Manages user authentication state
 * Handles token persistence across app sessions
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app launch
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let storedToken: string | null = null;

        // Retrieve token from platform-specific storage
        if (Platform.OS === "web") {
          storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        } else {
          storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        }

        if (storedToken) {
          setToken(storedToken);
          // In a real app, validate token with backend
          const storedUser = await AsyncStorage.getItem(USER_KEY);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("[Auth] Failed to initialize:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Call backend API
      const response = await fetch(buildApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      const { token: newToken, user: newUser } = data;

      // Store token and user
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      }
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      console.error("[Auth] Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);

      // Call backend API
      const response = await fetch(buildApiUrl("/api/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      const { token: newToken, user: newUser } = data;

      // Store token and user
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      }
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      console.error("[Auth] Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Call backend API
      if (token) {
        await fetch(buildApiUrl("/api/auth/logout"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear stored data
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
      await AsyncStorage.removeItem(USER_KEY);

      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("[Auth] Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setOnboardingData = async (data: {
    travelerType: string;
    interests: string[];
  }) => {
    try {
      if (!user || !token) {
        throw new Error("User not authenticated");
      }

      // Call backend API to save onboarding data
      const response = await fetch(
        buildApiUrl("/api/users/onboarding"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            travelerType: data.travelerType,
            interests: JSON.stringify(data.interests),
          }),
        }
      );

      const updatedUser = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(updatedUser.error || "Failed to save onboarding data");
      }

      setUser(updatedUser);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("[Auth] Failed to set onboarding data:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    signup,
    logout,
    setOnboardingData,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/**
 * useAuth - Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
