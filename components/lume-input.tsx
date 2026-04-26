import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  type TextInputProps,
} from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

export interface LumeInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
  containerClassName?: string;
}

/**
 * LumeInput - Text input component for Lume
 *
 * Features:
 * - Label support
 * - Error message display
 * - Password visibility toggle
 * - Multiple input types
 * - Disabled state
 *
 * Styling:
 * - Border radius: 8px
 * - Border: 1px Light Gray
 * - Padding: 12px 16px
 * - Font: 16px, Inter
 * - Focus state: Deep Indigo border (2px)
 * - Error state: Error red border, error message below
 * - Disabled state: Light Gray background, opacity 0.5
 */
export function LumeInput({
  label,
  error,
  type = "text",
  disabled = false,
  containerClassName,
  placeholder,
  value,
  onChangeText,
  ...props
}: LumeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmail = type === "email";
  const isNumber = type === "number";

  const inputType = isPassword && showPassword ? "text" : type;
  const keyboardType =
    isEmail ? "email-address" : isNumber ? "numeric" : "default";

  const inputContainerClassName = cn(
    "flex-row items-center border rounded-lg px-4 py-3 bg-background",
    error ? "border-error" : isFocused ? "border-primary border-2" : "border-border",
    disabled && "opacity-50 bg-surface"
  );

  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-sm font-semibold text-foreground mb-2">
          {label}
        </Text>
      )}

      <View className={inputContainerClassName}>
        <TextInput
          className="flex-1 text-base text-foreground"
          placeholderTextColor="#9CA3AF"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          editable={!disabled}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}
      </View>

      {error && (
        <Text className="text-xs text-error mt-1">{error}</Text>
      )}
    </View>
  );
}
