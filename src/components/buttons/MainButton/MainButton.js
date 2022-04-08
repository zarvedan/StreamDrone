import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Constants from "@constants";
import Colors from "@colors";
import Fonts, { fontStyles } from "@fonts";
import CustomIcon from "../../CustomIcon";

export default class MainButton extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    hasOpacity: PropTypes.bool,
    width: PropTypes.any,
    inactive: PropTypes.bool,
    borderColor: PropTypes.string,
    icon: PropTypes.string,
  };

  render() {
    let color = Colors.STREAM_DRONE_ORANGE;
    if (this.props.backgroundColor) color = this.props.backgroundColor;

    return (
      <View
        style={{
          width: this.props.width
            ? this.props.width
            : Constants.MAIN_BUTTON_WIDTH,
          height: Constants.MAIN_BUTTON_HEIGHT,
          marginBottom: Constants.MAIN_MARGIN,
        }}
      >
        <View
          style={{
            backgroundColor: color,
            justifyContent: "center",
            borderRadius: Constants.MAIN_MARGIN,
            borderColor: this.props.borderColor
              ? this.props.borderColor
              : "white",
            borderWidth: 1.5,
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", width: "100%" }}
            onPress={() => (this.props.inactive ? null : this.props.onPress())}
          >
            <Text
              style={[
                fontStyles.normalFontStyle,
                {
                  color: "white",
                  textAlign: this.props.icon ? "left" : "center",
                  paddingLeft: Constants.MAIN_MARGIN,
                  paddingRight: this.props.icon ? 100 : Constants.MAIN_MARGIN,
                  width: "100%",
                },
              ]}
              numberOfLines={1}
            >
              {this.props.title}
            </Text>
            {this.props.icon ? (
              <View
                style={{
                  position: "absolute",
                  right: Constants.MAIN_MARGIN,
                }}
              >
                <CustomIcon
                  name={this.props.icon}
                  size={25}
                  color={this.props.fontColor ?? "white"}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
        {this.props.inactive ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(256, 256, 256, 0.7)",
              borderRadius: 5,
              width: "100%",
              height: "100%",
            }}
          />
        ) : null}
      </View>
    );
  }
}
