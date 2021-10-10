import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, View, SafeAreaView } from "../components/Themed";
import Input from "../components/Input";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import customAxios from "../axios/axios";
import Button from "../components/Button";
import Actions from "../StateManagement/Actions";
import * as SecureStore from "expo-secure-store";
import useStateManagement from "../StateManagement/StateManagement";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const { state, dispatch } = useStateManagement();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const [credentials, setCredentials] = React.useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const emailHandler = useCallback(
    (email: string) => {
      setCredentials((prev) => ({ ...prev, email }));
    },
    [credentials.email]
  );

  const passwordHandler = useCallback(
    (password: string) => {
      setCredentials((prev) => ({ ...prev, password }));
    },
    [credentials.password]
  );

  // function to handle authentication
  const authHandler = async () => {
    if (!credentials.email.length && !credentials.password.length) return;
    try {
      setLoading(true);
      setError("");
      const result = await customAxios.post("/login", credentials);
      if (result.data.success) {
        await SecureStore.setItemAsync("user-token", result.data.data.token);
        dispatch(
          Actions.setUser({
            name: result.data.data.name,
            email: result.data.data.email,
          })
        );
      } else {
        setLoading(false);
        setError(result.data?.message);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  // function to navigate to register page
  const toRegister = () => {
    setCredentials((prev) => ({ email: "", password: "" }));
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.contentStyle}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentStyle}
      >
        <View style={styles.inputs}>
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder="Email"
            icon="envelope"
            size={20}
            top={2}
            value={credentials.email}
            setValue={emailHandler}
          />
          <Input
            placeholder="Password"
            icon="lock"
            secureTextEntry={true}
            value={credentials.password}
            setValue={passwordHandler}
          />
          <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>
        </View>
        <Button text="Login" onPress={authHandler} disabled={loading} />
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text style={styles.register} onPress={toRegister}>
            New to Page? <Text style={{ color: primary }}>Register</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputs: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: primary,
    marginBottom: 20,
  },
  register: {
    fontSize: 15,
    color: "grey",
  },
});
