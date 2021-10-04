import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { ColorSchemeName, StyleSheet, TouchableOpacity } from "react-native";

import { primary, secondary } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";

import {
  RootDrawerParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Profile from "../components/Profile";
import Pressable from "../components/Pressable";
import Hamburger from "../components/Hamburger";
import { View } from "../components/Themed";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import isAuthenticated from "../hooks/useAuthenticated";
import * as SecureStore from "expo-secure-store";
import SplashScreen from "../screens/SplashScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isAuth = isAuthenticated();

  if (isAuth.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      {isAuth.isSignedIn ? (
        <>
          <Stack.Screen
            name="Root"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
        tabBarStyle: { ...styles.tabBar, ...styles.shadow },
        headerStyle: {
          elevation: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Hamburger />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Products"
        component={ModalScreen}
        options={({ navigation }: RootTabScreenProps<"Products">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="shopping-bag"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Hamburger />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Add"
        component={NotFoundScreen}
        options={({ navigation }: RootTabScreenProps<"Add">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <Entypo
              name="plus"
              size={40}
              color={"#fff"}
              style={{ marginBottom: -3 }}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -20,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
              }}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <View style={[styles.addBtn, { backgroundColor: primary }]}>
                {props.children}
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Hamburger />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={ModalScreen}
        options={({ navigation }: RootTabScreenProps<"Search">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="search"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Hamburger />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Hamburger />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        drawerActiveTintColor: primary,
        drawerInactiveTintColor: secondary,
        drawerLabelStyle: {
          fontFamily: "space-mono",
          fontWeight: "700",
          fontSize: 16,
        },
      }}
      initialRouteName="Main"
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ title: "Home" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBar: {
    elevation: 0,
    borderTopWidth: 0,
    height: 60,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
