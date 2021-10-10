import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";
import Colors, { primary } from "../constants/Colors";
import capitalizeString from "../helpers/capitalize";
import useColorScheme from "../hooks/useColorScheme";
import Pressable from "./Pressable";
import { Text, View } from "./Themed";

export default function Category({
  name,
  icon,
}: {
  name: string;
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
}) {
  const colorScheme = useColorScheme() == "dark" ? "light" : "dark";

  return (
    <Pressable>
      <View style={[styles.container]}>
        <View style={styles.logoContainer}>
          <FontAwesome5
            name={icon}
            size={30}
            color={Colors[colorScheme].text}
          />
        </View>
        <Text style={{ textAlign: "center" }}>{capitalizeString(name)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: "transparent",
    width: 95,
    justifyContent: "center",
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
