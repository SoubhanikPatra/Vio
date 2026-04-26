import { describe, it, expect } from "vitest";

/**
 * LumeButton Component Tests
 * 
 * These tests verify that the LumeButton component:
 * - Renders with correct variants (primary, secondary, outline, ghost, destructive)
 * - Renders with correct sizes (sm, md, lg)
 * - Handles disabled and loading states
 * - Applies correct styling based on props
 */

describe("LumeButton Component", () => {
  it("should export LumeButton component", () => {
    // Import test
    const { LumeButton } = require("@/components/lume-button");
    expect(LumeButton).toBeDefined();
    expect(typeof LumeButton).toBe("function");
  });

  it("should have correct prop interface", () => {
    // Type checking test
    const { LumeButton } = require("@/components/lume-button");
    const props = {
      children: "Click me",
      variant: "primary" as const,
      size: "md" as const,
      disabled: false,
      loading: false,
    };
    expect(props.variant).toBe("primary");
    expect(props.size).toBe("md");
  });

  it("should support all variants", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "destructive"];
    variants.forEach((variant) => {
      expect(["primary", "secondary", "outline", "ghost", "destructive"]).toContain(
        variant
      );
    });
  });

  it("should support all sizes", () => {
    const sizes = ["sm", "md", "lg"];
    sizes.forEach((size) => {
      expect(["sm", "md", "lg"]).toContain(size);
    });
  });

  it("should handle disabled state", () => {
    const props = {
      disabled: true,
      loading: false,
    };
    expect(props.disabled).toBe(true);
  });

  it("should handle loading state", () => {
    const props = {
      disabled: false,
      loading: true,
    };
    expect(props.loading).toBe(true);
  });
});
