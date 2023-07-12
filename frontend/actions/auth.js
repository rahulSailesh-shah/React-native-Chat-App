import chat from "../api/chat";
import { setAlert } from "./alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../utils/RootNavigation";

export const getLoggedInUser = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await chat.get("/auth/me", config);
    if (response.data.data !== null) {
      dispatch({
        type: "GET_USER_SUCCESS",
        payload: response.data.data,
      });
      navigate("chatStack");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password });
      const response = await chat.post("/auth/register", body, config);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(getLoggedInUser());
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data.token,
      });
      dispatch(setAlert("User Registered", "success"));
    } catch (err) {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "REGISTER_FAIL" });
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const response = await chat.post("/auth/login", body, config);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(getLoggedInUser());
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.token,
      });
    } catch (err) {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "LOGIN_FAIL" });
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email });
      const response = await chat.post("/auth/sendotp", body, config);
      dispatch(setAlert(response.data.data, "success"));
      navigate("verifyotp");
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  };

export const verifyOtp =
  ({ otp }) =>
  async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ otp });
      const response = await chat.post("/auth/verifyotp", body, config);
      dispatch({
        type: "SET_RESET_TOKEN",
        payload: response.data.resetToken,
      });
      navigate("resetpassword");
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  };

export const resetPassword =
  ({ password }) =>
  async (dispatch, getState) => {
    const { resetToken } = getState().auth;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ password });
      await chat.put(`/auth/resetpassword/${resetToken}`, body, config);
      dispatch(setAlert("Password Changed", "success"));
      navigate("login");
    } catch (err) {
      dispatch({ type: "PASSWORD_RESET_FAIL" });
      dispatch(setAlert(err.response.data.message, "danger"));
    }
  };

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "LOGOUT",
  });
  navigate("authStack");
};

export const getUsers = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await chat.get("/auth/users", config);
    if (response.data.data !== null) {
      dispatch({
        type: "GET_USERS_SUCCESS",
        payload: response.data.data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
