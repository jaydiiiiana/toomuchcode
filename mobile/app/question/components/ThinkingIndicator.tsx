/**
 * ThinkingIndicator component – Visual feedback when Lexora AI is generating answers.
 */
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { AI_COLORS, AI_MASCOT_IMAGE } from "../lib/constants";

export default function ThinkingIndicator() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = pulse(dot1, 0);
    const anim2 = pulse(dot2, 200);
    const anim3 = pulse(dot3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarThumb}>
        <Image
          source={AI_MASCOT_IMAGE}
          style={styles.avatarImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bubble}>
        <Text style={styles.thinkingText}>Analyzing Philippine legal sources</Text>
        <View style={styles.dotsRow}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 8,
  },
  avatarThumb: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AI_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: AI_COLORS.border,
  },
  avatarImg: {
    width: 28,
    height: 28,
  },
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AI_COLORS.aiBubble,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: AI_COLORS.aiBorder,
    gap: 8,
  },
  thinkingText: {
    fontSize: 12.5,
    color: AI_COLORS.textSecondary,
    fontStyle: "italic",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AI_COLORS.primary,
  },
});
