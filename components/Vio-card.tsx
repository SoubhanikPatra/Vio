import React from "react";
import { View, Pressable, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface VioCardProps extends ViewProps {
  variant?: "default" | "elevated" | "outlined";
  onPress?: () => void;
  children: React.ReactNode;
}

/**
 * VioCard - Card container component for Vio
 *
 * Variants:
 * - default: Light Gray background, no border, subtle shadow
 * - elevated: White background, subtle shadow (2-4px offset)
 * - outlined: White background, Light Gray border (1px)
 *
 * Styling:
 * - Border radius: 12px
 * - Padding: 16px (default)
 * - Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
 */
export function VioCard({
  variant = "default",
  onPress,
  children,
  className,
  ...props
}: VioCardProps) {
  const variantStyles = {
    default: "bg-surface",
    elevated: "bg-background shadow-sm",
    outlined: "bg-background border border-border",
  };

  const cardClassName = cn(
    "rounded-xl p-4",
    variantStyles[variant],
    className
  );

  const content = (
    <View className={cardClassName} {...props}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
