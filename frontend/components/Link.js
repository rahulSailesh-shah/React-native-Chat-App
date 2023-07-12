import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";

const Link = ({ infoText, linkText, textAlign, onPress }) => {
  return (
    <Text style={[styles.infoTextStyle, { textAlign, fontSize: 16 }]}>
      {infoText}{" "}
      <TouchableOpacity style={{ margin: 0, padding: 0 }} onPress={onPress}>
        <Text style={styles.linkTextStyle}>{linkText}</Text>
      </TouchableOpacity>
    </Text>
  );
};

export default Link;

const styles = StyleSheet.create({
  infoTextStyle: {
    fontWeight: "500",
    textAlign: "right",
    marginTop: 10,
    color: colors.gray,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    justifyContent: "center",
    alignItems: "center",
  },
  linkTextStyle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir-Medium",
    justifyContent: "center",
    alignItems: "center",
  },
});
