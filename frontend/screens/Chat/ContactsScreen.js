import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import colors from "../../colors";
import ContactItem from "../../components/ContactItem";
import SearchBar from "../../components/SearchBar";
import { connect } from "react-redux";
import { getUsers } from "../../actions/auth";

const ContactsScreen = ({ getUsers, users, user, navigation }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Header text="Contacts" />
        <SearchBar icon="search1" placeholder="Search" />
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <ContactItem icon="adduser" text="New Contact" />
            <ContactItem icon="addusergroup" text="New Group" />
            {users && (
              <View>
                {users.map((usr) => {
                  if (usr._id !== user._id)
                    return (
                      <TouchableOpacity
                        key={usr._id}
                        onPress={() =>
                          navigation.navigate("message", {
                            usr,
                          })
                        }
                      >
                        <ContactItem
                          img="https://picsum.photos/200"
                          text={usr.name}
                        />
                      </TouchableOpacity>
                    );
                })}
              </View>
            )}

            <View style={{ height: 100 }}></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  users: state.auth.users,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUsers })(ContactsScreen);

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
