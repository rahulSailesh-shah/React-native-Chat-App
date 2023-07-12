import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";

const Header = ({ text }) => {
  return (
    <View>
      <Text style={styles.header}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    color: colors.white,
    fontSize: 48,
    marginTop: 20,
    fontWeight: "800",
    marginHorizontal: 20,
    fontFamily: "Avenir-Medium",
  },
});
