import React from "react";
import {
  StyleSheet,
  Pressable as DefaultPressable,
  PressableProps as DefautlPressableProps,
} from "react-native";

export default function Pressable(props: DefautlPressableProps) {
  return (
    <DefaultPressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
      {...props}
    />
  );
}

const styles = StyleSheet.create({});
