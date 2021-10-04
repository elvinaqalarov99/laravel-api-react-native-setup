import React, { useMemo, useReducer, useContext } from "react";
import reducer from "./Reducer";

export const MainContext = React.createContext(null);

export const initialState: any = {
  user: null,
};

export function StateManagement(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <MainContext.Provider value={contextValue as any}>
      {props.children}
    </MainContext.Provider>
  );
}

export default function useStateManagement() {
  const context: any = useContext(MainContext);
  return { state: context.state, dispatch: context.dispatch };
}
