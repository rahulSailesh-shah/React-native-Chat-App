import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../colors";

const ProfileItem = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://picsum.photos/200" }} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 40,
    marginHorizontal: 20,
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    marginLeft: 20,
    alignItems: "center",
  },
  name: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "700",
    fontFamily: "Avenir-Medium",
  },
  email: {
    color: colors.muted,
    fontSize: 18,
    fontFamily: "Avenir-Medium",
  },
});
