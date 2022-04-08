import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import BackButtonTopBar from "@topbars/BackButtonTopBar";
import Pdf from "react-native-pdf";
import SuperView from "./SuperView.js";

export default class Cgu extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
  };

  render() {
    const source = {
      uri: Constants.CGU_URL,
      cache: false,
    };

    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          backgroundColor: Constants.MAIN_BACKGROUND_COLOR,
        }}
      >
        <BackButtonTopBar
          navigator={this.props.navigator}
          onClose={() => this.closeView()}
        />
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            // console.log({ "number of pages": numberOfPages });
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log({ "current page": page });
          }}
          onError={(error) => {
            // console.log({ loadPdfError: error });
          }}
          style={{
            flex: 1,
            width: Constants.DEVICE_WIDTH,
          }}
        />
      </View>
    );
  }
}
