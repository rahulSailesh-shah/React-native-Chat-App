const initialState = {
  chats: [],
  messages: [],
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_CHATS_SUCCESS":
      return {
        ...state,
        chats: payload,
      };

    case "GET_MESSAGES_SUCCESS":
      return {
        ...state,
        messages: payload,
      };

    case "MESSAGE_SENT_SUCCESS":
      return {
        ...state,
        message: payload,
      };

    case "GET_MESSAGES_FAIL":
      return {
        ...state,
        messages: [],
      };

    case "MESSAGE_SENT_FAIL":
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
}
