import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function SerachBar() {
  const [value, setValue] = React.useState<string>("");

  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={25} style={styles.icon} color="grey" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Search..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  input: {
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 40,
    backgroundColor: "#eee",
    borderRadius: 15,
    fontFamily: "space-mono",
    fontWeight: "700",
    color: "grey",
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    top: 30,
    left: 10,
  },
});
