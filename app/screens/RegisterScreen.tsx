import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, View, SafeAreaView } from "../components/Themed";
import Input from "../components/Input";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import Button from "../components/Button";
import customAxios from "../axios/axios";
import * as SecureStore from "expo-secure-store";
import useStateManagement from "../StateManagement/StateManagement";
import Actions from "../StateManagement/Actions";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const { state, dispatch } = useStateManagement();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errros, setErrors] = React.useState<{
    name?: [];
    email?: [];
    password?: [];
    confirm_password?: [];
  }>({ name: [], email: [], password: [], confirm_password: [] });

  const [credentials, setCredentials] = React.useState<{
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  }>({ name: "", email: "", password: "", confirm_password: "" });

  const nameHandler = useCallback(
    (name: string) => {
      setCredentials((prev) => ({ ...prev, name }));
    },
    [credentials.name]
  );

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

  const passwordConfirmHandler = useCallback(
    (confirm_password: string) => {
      setCredentials((prev) => ({ ...prev, confirm_password }));
    },
    [credentials.confirm_password]
  );

  // function to handle registration
  const registerHandler = async () => {
    if (
      !credentials.name.length &&
      !credentials.email.length &&
      !credentials.password.length &&
      !credentials.confirm_password.length &&
      credentials.password !== credentials.confirm_password
    )
      return;
    try {
      setLoading(true);
      setErrors({});
      const result = await customAxios.post("/register", credentials);
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
        setErrors(result.data.data);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  // function to navigate to login page
  const toLogin = () => {
    setCredentials((prev) => ({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    }));
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.contentStyle}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentStyle}
      >
        <View style={styles.inputs}>
          <Text style={styles.title}>Register</Text>
          <Input
            placeholder="Full name"
            icon="user"
            setValue={nameHandler}
            value={credentials.name}
          />
          {errros?.name?.map((err, idx) => (
            <Text key={`name-validation-${idx}`} style={styles.errColor}>
              {err}
            </Text>
          ))}
          <Input
            placeholder="Email"
            icon="envelope"
            size={20}
            top={2}
            value={credentials.email}
            setValue={emailHandler}
          />
          {errros?.email?.map((err, idx) => (
            <Text key={`email-validation-${idx}`} style={styles.errColor}>
              {err}
            </Text>
          ))}
          <Input
            placeholder="Password"
            icon="lock"
            secureTextEntry={true}
            value={credentials.password}
            setValue={passwordHandler}
          />
          {errros?.password?.map((err, idx) => (
            <Text key={`pwd-validation-${idx}`} style={styles.errColor}>
              {err}
            </Text>
          ))}
          <Input
            placeholder="Confirm assword"
            icon="lock"
            secureTextEntry={true}
            value={credentials.confirm_password}
            setValue={passwordConfirmHandler}
          />
          {errros?.confirm_password?.map((err, idx) => (
            <Text key={`pwd-confirm-validation-${idx}`} style={styles.errColor}>
              {err}
            </Text>
          ))}
        </View>
        <Button text="Register" onPress={registerHandler} disabled={loading} />
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text style={styles.register} onPress={toLogin}>
            Have an account? <Text style={{ color: primary }}>Login</Text>
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
  errColor: {
    color: "red",
  },
});
