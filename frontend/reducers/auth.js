import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

const initialState = {
  token: getToken(),
  resetToken: null,
  isAuthenticated: false,
  user: null,
  users: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "PASSWORD_RESET_SUCCESS":
      return {
        ...state,
        token: payload,
        resetToken: null,
        isAuthenticated: true,
      };

    case "SET_RESET_TOKEN":
      return {
        ...state,
        resetToken: payload,
      };

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "PASSWORD_RESET_FAIL":
    case "LOGOUT":
      return {
        ...state,
        token: null,
        resetToken: null,
        isAuthenticated: false,
      };

    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: payload,
      };

    default:
      return state;
  }
}
