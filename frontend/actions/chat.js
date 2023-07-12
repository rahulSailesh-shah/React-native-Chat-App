import chat from "../api/chat";
import { setAlert } from "./alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../utils/RootNavigation";

export const getChats = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await chat.get("/chats", config);
    if (response.data.data !== null) {
      dispatch({
        type: "GET_CHATS_SUCCESS",
        payload: response.data.data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getMessages = (id) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (id === 0) {
    dispatch({
      type: "GET_MESSAGES_SUCCESS",
      payload: [],
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await chat.get(`/message/${id}`, config);
      if (response.data.data !== null) {
        dispatch({
          type: "GET_MESSAGES_SUCCESS",
          payload: response.data.data,
        });
        return response.data.data;
      }
    } catch (error) {
      dispatch({
        type: "GET_MESSAGES_FAIL",
      });
    }
  }
};

export const sendMessage = (msg, receiver, socket) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ content: msg });
    const response = await chat.post(`/message/${receiver}`, body, config);
    if (response.data.data !== null) {
      dispatch({
        type: "MESSAGE_SENT_SUCCESS",
        payload: response.data.data,
      });
      socket.emit("newMessage", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "MESSAGE_SENT_FAIL",
    });
  }
};
