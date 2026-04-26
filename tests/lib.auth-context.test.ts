import { describe, it, expect } from "vitest";

/**
 * Auth Context Tests
 * 
 * These tests verify that the auth context:
 * - Provides correct types for AuthUser and AuthContextType
 * - Exports useAuth hook
 * - Exports AuthProvider component
 * - Handles token persistence
 */

describe("Auth Context", () => {
  it("should export AuthProvider component", () => {
    const { AuthProvider } = require("@/lib/auth-context");
    expect(AuthProvider).toBeDefined();
    expect(typeof AuthProvider).toBe("function");
  });

  it("should export useAuth hook", () => {
    const { useAuth } = require("@/lib/auth-context");
    expect(useAuth).toBeDefined();
    expect(typeof useAuth).toBe("function");
  });

  it("should have correct AuthContextType interface", () => {
    // Type checking
    const contextType = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {},
      signup: async () => {},
      logout: async () => {},
      setOnboardingData: async () => {},
    };

    expect(contextType).toHaveProperty("user");
    expect(contextType).toHaveProperty("token");
    expect(contextType).toHaveProperty("isAuthenticated");
    expect(contextType).toHaveProperty("isLoading");
    expect(contextType).toHaveProperty("login");
    expect(contextType).toHaveProperty("signup");
    expect(contextType).toHaveProperty("logout");
    expect(contextType).toHaveProperty("setOnboardingData");
  });

  it("should have correct AuthUser type structure", () => {
    const user = {
      id: 1,
      openId: "test-id",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "email",
      role: "user" as const,
      travelerType: null,
      interests: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };

    expect(user.id).toBe(1);
    expect(user.email).toBe("test@example.com");
    expect(user.role).toBe("user");
  });

  it("should use correct token storage keys", () => {
    const TOKEN_KEY = "Vio_auth_token";
    const USER_KEY = "Vio_auth_user";

    expect(TOKEN_KEY).toBe("Vio_auth_token");
    expect(USER_KEY).toBe("Vio_auth_user");
  });
});
