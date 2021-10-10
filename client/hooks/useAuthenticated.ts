import * as React from "react";
import * as SecureStore from "expo-secure-store";
import useStateManagement from "../StateManagement/StateManagement";
import Actions from "../StateManagement/Actions";
import customAxios from "../axios/axios";

export default function useCachedResources() {
  const { state, dispatch } = useStateManagement();
  const [loading, setLoading] = React.useState<boolean>(true);
  // Load user data
  React.useEffect(() => {
    async function loadToken() {
      try {
        const token = await SecureStore.getItemAsync("user-token");

        if (token) {
          try {
            const result = await customAxios.get("/user");
            if (result.data.success) {
              dispatch(
                Actions.setUser({
                  name: result.data.data.name,
                  email: result.data.data.email,
                })
              );
            }
          } catch (err) {
            await SecureStore.deleteItemAsync("user-token");
          }
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
      setLoading(false);
    }

    loadToken();
  }, []);

  return { isLoading: loading, isSignedIn: state.user !== null };
}
