export const ACTION_TYPES = {
  setUser: 1,
};

export default class Actions {
  static setUser(user: any) {
    return { type: ACTION_TYPES.setUser, payload: user };
  }
}
