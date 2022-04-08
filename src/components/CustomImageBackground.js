import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class CustomImageBackground extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    content: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: Constants.DEVICE_WIDTH,
          height:
            Constants.SCREEN_HEIGHT -
            Constants.TOP_BAR_HEIGHT -
            Constants.STATUS_BAR_HEIGHT,
          alignItems: "center",
        }}
        resizeMode="cover"
        source={require("../assets/images/background_1080x1920_litecolor.jpg")}
      >
        {this.props.content}
        <KeyboardSpacer topSpacing={Platform.OS == "ios" ? 0 : 80} />
      </ImageBackground>
    );
  }
}
