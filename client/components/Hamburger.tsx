import React from "react";
import { StyleSheet } from "react-native";
import { primary } from "../constants/Colors";
import { View } from "./Themed";

export default function Hamburger() {
  return (
    <View style={styles.container}>
      <View
        lightColor={primary}
        darkColor="#FFF"
        style={[styles.bar, styles.barTop]}
      />
      <View
        lightColor={primary}
        darkColor="#FFF"
        style={[styles.bar, styles.barMiddle]}
      />
      <View
        lightColor={primary}
        darkColor="#FFF"
        style={[styles.bar, styles.barBottom]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  bar: {
    height: 3,
    marginBottom: 3,
    borderRadius: 10,
  },
  barTop: {
    width: 25,
  },
  barMiddle: {
    width: 15,
  },
  barBottom: {
    width: 10,
  },
});
