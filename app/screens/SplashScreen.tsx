import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView, Text, View } from "../components/Themed";
import { primary } from "../constants/Colors";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.contentStyle}>
      <View>
        <ActivityIndicator size="large" color={primary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
