import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../colors";
import { connect } from "react-redux";
import moment from "moment";

const Messages = ({ messages, user }) => {
  const getTime = (time) => {
    return moment(time).format("h:mm a").toUpperCase();
  };

  const getDate = (time, i) => {
    if (i == 0) return moment(time).format("ddd, D MMM");
    const dateOfPreviousMsg = moment(messages[i - 1].createdAt).format(
      "D/M/YYYY"
    );
    const dateOfCurrentMsg = moment(time).format("D/M/YYYY");
    if (dateOfPreviousMsg === dateOfCurrentMsg) return null;
    return moment(time).format("ddd, D MMM");
  };

  return (
    <View>
      {messages.map((msg, i) => (
        <View key={msg._id}>
          {getDate(msg.createdAt, i) && (
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: colors.primaryLight,
                borderRadius: 50,
                width: "28%",
                paddingVertical: 2,
                marginVertical: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.white,
                  fontWeight: "600",
                }}
              >
                {getDate(msg.createdAt, i)}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.msgContainer,
              user._id === msg.sender._id ? styles.right : styles.left,
            ]}
          >
            <Text style={styles.msg}>{msg.content}</Text>
            <Text style={styles.time}>{getTime(msg.createdAt)}</Text>
          </View>
        </View>
      ))}
      <View style={{ height: 100 }}></View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Messages);

const styles = StyleSheet.create({
  msgContainer: {
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  msg: {
    maxWidth: "75%",
    minWidth: "20%",
    fontSize: 16,
    marginVertical: 2,
    fontFamily: "Avenir-Medium",
  },
  name: {
    fontWeight: "600",
    color: colors.bg,
    fontSize: 13,
    fontFamily: "Avenir-Medium",
  },
  time: {
    fontSize: 11,
    color: colors.muted,
    alignSelf: "flex-end",
    fontFamily: "Avenir-Medium",
  },
  right: {
    alignSelf: "flex-end",
    backgroundColor: colors.whiteMuted,
  },
  left: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
  },
});
