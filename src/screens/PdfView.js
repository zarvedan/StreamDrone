import React, { Component } from "react";
import { View, Text, Dimensions, BackHandler } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import Utils from "@utils";
import BackButtonTopBar from "@topbars/BackButtonTopBar";
import Pdf from "react-native-pdf";
import SuperView from "./SuperView.js";
import RNFetchBlob from "react-native-blob-util";
import { connect } from "react-redux";

let pdfUri;

class PdfView extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    uri: PropTypes.any,
    title: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showLoader: true,
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let token = Utils.getToken(this.props.user.id);
    pdfUri = this.props.uri + "?token=" + token;
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    RNFetchBlob.fetch("GET", pdfUri)
      .then((res) => {
        this.setState({
          source: {
            uri: "data:application/pdf;base64," + res.base64(),
          },
        });
      })
      .catch((e) => console.log({ error: e }));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress() {
    this.closeModal();
    return true;
  }

  render() {
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
          title={this.props.title}
          onClose={this.closeModal.bind(this)}
          isLoading={this.state.showLoader}
        />
        {this.state.source ? (
          <Pdf
            source={this.state.source}
            onLoadComplete={(numberOfPages, filePath) => {
              this.setState({ showLoader: false });
            }}
            onPageChanged={(page, numberOfPages) => {}}
            onError={(error) => {
              console.log({ loadPdfError: error });
              this.showError("Erreur lors de la récupération du document");
            }}
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
            }}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

module.exports = connect(mapStateToProps)(PdfView);
