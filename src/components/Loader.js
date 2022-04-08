import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import { connect } from "react-redux";

class Loader extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          position: "absolute",
          width: Constants.DEVICE_WIDTH,
          height: Constants.SCREEN_HEIGHT,
          justifyContent: "center",
          alignSelf: "center",
          top: 0,
        }}
      >
        <Image
          source={require("../assets/images/drone.png")}
          resizeMode={"contain"}
          style={{
            tintColor: Constants.STREAM_DRONE_BLUE,
            alignSelf: "center",
            height: 100,
            width: "100%",
          }}
        />
        <ActivityIndicator size="large" color={Constants.STREAM_DRONE_BLUE} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultOrg: state.userReducer.defaultOrg,
  };
};

export default connect(mapStateToProps)(Loader);
