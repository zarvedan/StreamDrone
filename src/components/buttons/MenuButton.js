import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import { fontStyles } from "@fonts";

export default class MenuButton extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    iconName: PropTypes.any.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    isLast: PropTypes.bool,
    switchValue: PropTypes.bool,
    switchValue: PropTypes.bool,
    hasSwitch: PropTypes.bool,
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          paddingLeft: Constants.MAIN_MARGIN,
          paddingRight: Constants.MAIN_MARGIN,
          height: Constants.MAIN_BUTTON_HEIGHT + 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          width: "100%",
        }}
        onPress={this.props.onPress}
      >
        {this.props.isFirst ? (
          <View
            style={{
              backgroundColor: "white",
              height: 1.5,
              top: 1,
              width: Constants.DEVICE_WIDTH * 0.05,
              position: "absolute",
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: "white",
              height: 1.5,
              top: 1,
              width: Constants.DEVICE_WIDTH * 0.2,
              position: "absolute",
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={[
                fontStyles.normalFontStyle,
                {
                  color: "white",
                },
              ]}
            >
              {this.props.buttonTitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
