import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { primary, secondary } from "../constants/Colors";
import Pressable from "./Pressable";
import { Text, View } from "./Themed";

export default function Button({
  text,
  onPress,
  disabled,
}: {
  text: string;
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.container,
          { backgroundColor: disabled ? secondary : primary },
        ]}
      >
        <Text style={styles.text}>
          {!disabled ? text : <ActivityIndicator size="small" color="#fff" />}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
