import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../lib/constants";

interface Orb {
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
  opacity: number;
}

const ORBS: Orb[] = [
  { size: 260, top: "-5%", left: "-10%", color: COLORS.primaryLight, opacity: 0.6 },
  { size: 320, bottom: "-8%", right: "-12%", color: COLORS.accentLight, opacity: 0.4 },
  { size: 180, top: "45%", right: "-5%", color: COLORS.primaryLight, opacity: 0.3 },
];

export default function BackgroundOrbs() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {ORBS.map((orb, i) => (
        <View
          key={i}
          style={[
            styles.orb,
            {
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              top: orb.top as any,
              bottom: orb.bottom as any,
              left: orb.left as any,
              right: orb.right as any,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: "absolute",
    borderRadius: 9999,
  },
});
