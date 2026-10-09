import React from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { useStaggeredEntry } from "../hooks/useStaggeredEntry";
import { LOGO_WORDMARK } from "../lib/constants";

/**
 * Lexora Gold and Black Wordmark placed in the center, moved further down from the top edge.
 */
export default function WordmarkLogo() {
  const anim = useStaggeredEntry(0);

  return (
    <Animated.View style={[styles.container, anim]}>
      <Image
        source={LOGO_WORDMARK}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 100, // moved further down
    paddingBottom: 0,
  },
  logo: {
    width: 210,
    height: 70,
  },
});
