import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../colors";

const NewContactItem = ({ icon, text, img }) => {
  return (
    <View style={styles.container}>
      {icon ? (
        <View style={styles.iconContainer}>
          <AntDesign name={icon} size={24} color={colors.primary} />
        </View>
      ) : (
        <Image source={{ uri: img }} style={styles.img} />
      )}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default NewContactItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 18,
  },
  iconContainer: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 50,
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
  text: {
    color: colors.primary,
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Avenir-Medium",
  },
});
