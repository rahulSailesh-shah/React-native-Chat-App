import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import colors from "../../colors";
import ProfileBanner from "../../components/ProfileBanner";
import Messages from "../../components/Messages";
import SearchBar from "../../components/SearchBar";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getMessages, sendMessage } from "../../actions/chat";
import io from "socket.io-client";

const ENDPOINT = "http://192.168.0.104:8000";

let socket, selectedChatCompare;

const MessageScreen = ({
  navigation,
  route,
  chats,
  getMessages,
  sendMessage,
  user,
}) => {
  const { usr } = route.params;
  const scrollViewRef = useRef();

  const [msg, setMsg] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getChat();
    });
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      socket.on("messageReceived", (newMessage) => {
        setChatMessages([...chatMessages, newMessage]);
      });
    }

    return () => {
      isMounted = false;
    };
  });

  const getChat = async () => {
    const chat = chats.find((chat) => {
      const chatParticipants = chat.users.map((participant) => participant._id);
      if (
        chatParticipants.includes(usr._id) &&
        chatParticipants.includes(user._id)
      ) {
        return chat;
      } else return null;
    });
    if (chat) {
      const allMessages = await getMessages(chat._id);
      setChatMessages(allMessages);
      socket.emit("joinChat", chat._id);
    } else {
      getMessages(0);
    }
  };

  const messageSend = async () => {
    if (msg !== "") {
      const lastMessage = await sendMessage(msg, usr._id, socket);
      setChatMessages([...chatMessages, lastMessage]);
      setMsg("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        <ProfileBanner navigation={navigation} usr={usr} />
        <View style={styles.content}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
          >
            {chatMessages.length !== 0 && <Messages messages={chatMessages} />}
          </ScrollView>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 30,
            backgroundColor: colors.primary,
            position: "absolute",
            bottom: 0,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <SearchBar placeholder="Message" term={msg} setTerm={setMsg} />
          </View>

          <Pressable onPress={messageSend}>
            <View style={styles.sendIcon}>
              <Feather name="send" size={24} color={colors.primary} />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  chats: state.chat.chats,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getMessages, sendMessage })(
  MessageScreen
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  sendIcon: {
    marginRight: 20,
    alignSelf: "center",
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 100,
  },
});
