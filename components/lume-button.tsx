import React from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  type PressableProps,
} from "react-native";
import { cn } from "@/lib/utils";

export interface LumeButtonProps extends Omit<PressableProps, "children" | "style"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

/**
 * LumeButton - Core button component for Lume
 *
 * Variants:
 * - primary: Deep Indigo background, white text (main CTA)
 * - secondary: Light Gray background, dark text
 * - outline: Transparent background, Deep Indigo border and text
 * - ghost: Transparent background, dark text (minimal)
 * - destructive: Error red background, white text
 *
 * Sizes:
 * - sm: 12px padding, 14px font
 * - md: 16px padding, 16px font (default)
 * - lg: 20px padding, 18px font
 */
export function LumeButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  ...props
}: LumeButtonProps) {
  const isDisabled = disabled || loading;

  // Base styles
  const baseStyles = "rounded-lg items-center justify-center flex-row";

  // Variant styles
  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-surface border border-border",
    outline: "bg-transparent border-2 border-primary",
    ghost: "bg-transparent",
    destructive: "bg-error",
  };

  // Size styles (padding)
  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-5 py-4",
  };

  // Text color based on variant
  const textColorStyles = {
    primary: "text-background",
    secondary: "text-foreground",
    outline: "text-primary",
    ghost: "text-foreground",
    destructive: "text-background",
  };

  // Font size based on size
  const fontSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const buttonClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isDisabled && "opacity-50"
  );

  const textClassName = cn(
    "font-semibold",
    textColorStyles[variant],
    fontSizeStyles[size]
  );

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed && !isDisabled ? 0.8 : 1,
      })}
      {...props}
    >
      <View className={buttonClassName}>
        {loading ? (
          <ActivityIndicator
            color={
              variant === "primary" || variant === "destructive"
                ? "#FFFFFF"
                : "#FF5F3E"
            }
            size="small"
          />
        ) : (
          <Text className={textClassName}>{children}</Text>
        )}
      </View>
    </Pressable>
  );
}
