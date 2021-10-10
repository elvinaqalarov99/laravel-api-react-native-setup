import { ACTION_TYPES as AT } from "./Actions";

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case AT.setUser:
      const user = action.payload;
      return { ...state, user };
    default:
      return state;
  }
}
