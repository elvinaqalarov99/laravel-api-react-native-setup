import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { primary } from "../constants/Colors";

type InputProps = {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  placeholder: string;
  secureTextEntry?: boolean;
  size?: number;
  top?: number;
  value: string;
  setValue: (text: string) => void;
};

export default function SerachBar({
  icon,
  placeholder,
  secureTextEntry,
  size,
  top,
  value,
  setValue,
}: InputProps) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={icon}
        size={size || 25}
        style={[styles.icon, { top: 27 + (top || 0) }]}
        color={primary}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  input: {
    paddingVertical: 15,
    paddingRight: 10,
    paddingLeft: 40,
    borderRadius: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 2,
    fontFamily: "space-mono",
    fontWeight: "700",
    color: "grey",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    top: 27,
    left: 10,
  },
});
