import React, { useContext, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import Link from "../../components/Link";
import validate from "../../utils/validate";
import { verifyOtp } from "../../actions/auth";
import { connect } from "react-redux";
import OtpInput from "../../components/OtpInput";
import colors from "../../utils/colors";

const VerifyOtp = ({ navigation, verifyOtp }) => {
  const [fields, setFields] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const otp = fields.pin1 + fields.pin2 + fields.pin3 + fields.pin4;
    const errors = validate({ otp });
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      verifyOtp({ otp });
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.taglineContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          Check your mail. We have sent you a 4 digit verification code.
        </Text>
      </View>
      <View style={styles.content}>
        <OtpInput
          value={fields}
          onChangeText={(text, type) => handleTextChange(text, type)}
          errorText={error.otp}
        />

        <Button text="Verify OTP" onPress={onFormSubmit} />
        <Link
          linkText="Login"
          infoText="Go back to"
          textAlign="center"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </View>
  );
};

export default connect(null, { verifyOtp })(VerifyOtp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.primary,
  },
  taglineContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Avenir-Medium",
    color: colors.white,
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    marginVertical: 20,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    color: colors.muted,
  },
  content: {
    paddingTop: 20,
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 30,
  },
});
