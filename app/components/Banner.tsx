import { TabActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { primary } from "../constants/Colors";
import Pressable from "./Pressable";
import { Text, View } from "./Themed";

const banner = {
  uri: "https://picsum.photos/1000",
};

export default function Banner() {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <ImageBackground source={banner} resizeMode="cover" style={styles.banner}>
        <View style={styles.bannerContent} lightColor="#fff" darkColor="#fff">
          <Text lightColor="#fff" darkColor="#fff" style={styles.contentTitle}>
            New Items with Free Shipping
          </Text>
          <Pressable
            onPress={() => navigation.dispatch(TabActions.jumpTo("Add"))}
          >
            <View style={styles.contentBtn}>
              <Text lightColor="#fff" darkColor="#fff">
                See out products
              </Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
    height: 200,
    overflow: "hidden",
    borderRadius: 20,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    left: 20,
    top: 40,
    backgroundColor: "transparent",
    width: "70%",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  contentBtn: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: primary,
    width: 150,
    borderRadius: 20,
  },
});
