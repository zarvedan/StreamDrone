import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
class TitleComponent extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    title: PropTypes.string,
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: Constants.MAIN_MARGIN,
          marginBottom: Constants.MAIN_MARGIN / 2,
        }}
      >
        <Text
          style={[
            Constants.TITLE_FONT_STYLE,
            {
              color: Constants.FONT_COLOR,
            },
          ]}
        >
          {this.props.title}
        </Text>
        <View
          style={{
            backgroundColor: Constants.GRAY_LIGHT3,
            opacity: 0.2,
            marginLeft: 7,
            marginBottom: 7,
            marginRight: -Constants.MAIN_MARGIN,
            flex: 1,
            height: 1,
            alignSelf: "flex-end",
          }}
        />
      </View>
    );
  }
}

module.exports = TitleComponent;
