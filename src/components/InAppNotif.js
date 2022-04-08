import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Platform } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import Colors from "@colors";
import Fonts, { fontStyles } from "@fonts";
import Utils from "@utils";
import { connect } from "react-redux";

const Y_VALUE = -700;
const IN_APP_NOTIF_DURATION = 2000;

class InAppNotif extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    error: PropTypes.any,
    success: PropTypes.any,
    info: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(Y_VALUE),
    };
  }

  componentDidMount() {
    this.animateTopSheet(0);
    setTimeout(() => {
      this.animateTopSheet(Y_VALUE / 2);
      setTimeout(() => {
        Utils.closeOverlay(this.props.componentId);
      }, IN_APP_NOTIF_DURATION / 2);
    }, IN_APP_NOTIF_DURATION);
  }

  animateTopSheet(value) {
    Animated.spring(this.state.bounceValue, {
      toValue: value,
      velocity: 3,
      bounciness: 5,
      speed: 14,
      useNativeDriver: true,
    }).start();
  }

  render() {
    let text = "";
    let backgroundColor = "#111";
    if (this.props.error) {
      text = this.props.error.toString();
      backgroundColor = Colors.IN_APP_NOTIF_ERROR_COLOR;
    } else if (this.props.success) {
      text = this.props.success;
      backgroundColor = Colors.IN_APP_NOTIF_SUCCESS_COLOR;
    } else if (this.props.info) {
      text = this.props.info;
      backgroundColor = Colors.IN_APP_NOTIF_INFO_COLOR;
    }
    return (
      <Animated.View
        style={{ transform: [{ translateY: this.state.bounceValue }] }}
      >
        <View
          style={
            (styles.shadowStyle,
            Platform.OS === "ios"
              ? styles.containerAndroid
              : styles.containerAndroid)
          }
        >
          <View
            style={[styles.inAppView, { backgroundColor: backgroundColor }]}
          >
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  shadowStyle: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "#141F36",
    shadowRadius: 10,
    shadowOpacity: Platform.OS === "ios" ? 0.5 : 0.5,
    elevation: 2,
  },
  containerAndroid: {
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    flex: 1,
    position: "absolute",
    top: 30,
    zIndex: 50,
    height: 250,
  },
  containerIOS: {
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    flex: 1,
    zIndex: 50,
  },
  inAppView: {
    marginTop: 20,
    width: Constants.DEVICE_WIDTH * 0.9,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 7,
    borderColor: "white",
    borderWidth: 1.5,
    elevation: 10,
    zIndex: 50,
  },
  text: {
    margin: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: Fonts.BOLD_FONT,
    fontSize: Fonts.IN_APP_NOTIF_FONT_SIZE,
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    defaultOrg: state.userReducer.defaultOrg,
  };
};

export default connect(mapStateToProps)(InAppNotif);
