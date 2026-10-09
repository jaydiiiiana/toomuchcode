import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { MASCOT_IMAGE } from "../lib/constants";

/**
 * Robot mascot: positioned to overlap with the left screen edge and content area.
 */
export default function RobotMascot() {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Image
        source={MASCOT_IMAGE}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginLeft: -28,    // overlaps deeper past the left edge so it truly peeks in
    marginTop: 40,      // moved down comfortably
    marginBottom: -24,  // overlaps into the content space below for a cohesive single-screen fit
    zIndex: 10,
  },
  image: {
    width: 200,
    height: 175,
  },
});
