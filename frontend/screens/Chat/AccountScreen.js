import React from "react";
import colors from "../../colors";
import Header from "../../components/Header";
import ProfileItem from "../../components/ProfileItem";
import ContactItem from "../../components/ContactItem";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const AccountScreen = ({ logout, user }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Header text="Account" />
      </View>

      {user && (
        <>
          <ProfileItem user={user} />
          <View style={styles.content}>
            <TouchableOpacity>
              <ContactItem icon="solution1" text="Update Details" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ContactItem icon="lock1" text="Change Password" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
              <ContactItem icon="logout" text="Logout" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { logout })(AccountScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },

  content: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
