import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Returns an Animated.Value that fades from 0 → 1 and slides up,
 * staggered by `index * delayMs` after mount.
 */
export function useStaggeredEntry(index: number, delayMs = 200) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, index * delayMs);

    return () => clearTimeout(timer);
  }, [index, delayMs, opacity, translateY]);

  return { opacity, transform: [{ translateY }] };
}
