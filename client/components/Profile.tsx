import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { primary } from "../constants/Colors";

const profile = {
  uri: "https://picsum.photos/200",
};

export default function Profile() {
  return (
    <View style={[styles.profile, { borderColor: primary }]}>
      <ImageBackground
        source={profile}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 42,
    height: 42,
    backgroundColor: "grey",
    borderRadius: 21,
    marginRight: 15,
    overflow: "hidden",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
