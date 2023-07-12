import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import colors from "../colors";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

const ChatItem = ({ onPress, chat, user }) => {
  const getSenderName = () => {
    const sender = chat.users.find(
      (usr) => usr._id.toString() !== user._id.toString()
    );
    return sender.name;
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{ uri: "https://picsum.photos/200" }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{getSenderName()}</Text>
          <Text style={styles.msg} numberOfLines={2}>
            <Ionicons name="md-checkmark-done" size={17} color={colors.muted} />{" "}
            {chat.latestMessage.content}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ChatItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomColor: "#e9ecef",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 100,
    marginRight: 15,
  },
  textContainer: {
    width: "100%",
    flex: 1,
  },
  name: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Avenir-Medium",
  },
  msg: {
    color: colors.muted,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
  },
});
