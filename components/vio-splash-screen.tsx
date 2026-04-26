import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/use-colors";

export function VioSplashScreen() {
  const colors = useColors();
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, rise]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.glowTop, { borderColor: colors.border }]} />
      <View style={[styles.glowBottom, { borderColor: colors.border }]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ translateY: rise }],
          },
        ]}
      >
        <View style={[styles.logoWrap, { borderColor: colors.border }]}> 
          <Text style={[styles.logoLetter, { color: colors.primary }]}>V</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Vio</Text>
        <Text style={[styles.tagline, { color: colors.icon }]}>Your path, simplified.</Text>
      </Animated.View>

      <View style={[styles.hairline, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    overflow: "hidden",
  },
  content: {
    alignItems: "center",
    gap: 14,
  },
  logoWrap: {
    width: 84,
    height: 84,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 95, 62, 0.08)",
    marginBottom: 6,
  },
  logoLetter: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  glowTop: {
    position: "absolute",
    top: -130,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255, 95, 62, 0.14)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -150,
    left: -90,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255, 95, 62, 0.08)",
  },
  hairline: {
    position: "absolute",
    bottom: 52,
    width: 84,
    height: StyleSheet.hairlineWidth,
    borderRadius: 999,
  },
});
