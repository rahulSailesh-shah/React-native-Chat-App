import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import colors from "../../colors";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import ChatItem from "../../components/ChatItem";
import { connect } from "react-redux";
import { getChats } from "../../actions/chat";

const ChatScreen = ({ navigation, user, getChats, chats }) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      getChats();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Header text="Chats" />
        <SearchBar icon="search1" placeholder="Search" />
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chats.length !== 0 && (
            <View style={{ marginTop: 20 }}>
              {chats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  chat={chat}
                  onPress={() => {
                    const usr = chat.users.filter(
                      (usr) => usr._id !== user._id
                    );
                    navigation.navigate("message", {
                      usr: usr[0],
                    });
                  }}
                />
              ))}
              <View style={{ height: 100 }}></View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  chats: state.chat.chats,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getChats })(ChatScreen);

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
    marginTop: 30,
  },
});
