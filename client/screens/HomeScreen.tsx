import * as React from "react";
import { StyleSheet } from "react-native";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import SerachBar from "../components/SerachBar";
import { View, ScrollView } from "../components/Themed";
import WelcomeText from "../components/WelcomeText";
import { RootTabScreenProps } from "../types";
import useStateManagement from "../StateManagement/StateManagement";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const { state } = useStateManagement();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.outer}>
        <WelcomeText name={state.user?.name} />
        <SerachBar />
        <Banner />
        <Categories />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: 30,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
});
