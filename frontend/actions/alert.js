import uuid from "react-native-uuid";

export const setAlert = (msg, alert) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: "SET_ALERT",
    payload: { id, msg, alert },
  });

  setTimeout(() => {
    dispatch({
      type: "REMOVE_ALERT",
      payload: id,
    });
  }, 3000);
};
