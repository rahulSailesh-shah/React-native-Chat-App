import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import colors from "../utils/colors";

const Alert = ({ alerts }) => {
  const renderAlerts = () => {
    return alerts.map((alert) => (
      <View
        key={alert.id}
        style={[
          styles.alertContainer,
          {
            backgroundColor:
              alert.alert === "success" ? colors.success : colors.danger,
            color: alert.alert === "success" ? colors.success : colors.danger,
          },
        ]}
      >
        <Text style={styles.alertText}>{alert.msg}</Text>
      </View>
    ));
  };

  if (alerts.length === 0) {
    return null;
  }

  return <View style={styles.container}>{renderAlerts()}</View>;
};

const mapStateToProps = (state) => ({ alerts: state.alerts });

export default connect(mapStateToProps)(Alert);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    width: "100%",
    zIndex: 100,
    paddingHorizontal: 20,
  },
  alertText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Avenir-Medium",
    color: colors.white,
    fontWeight: "500",
  },
  alertContainer: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 20,
    textAlign: "center",
    borderRadius: 10,
  },
});
