import React from "react";
import { View, Text, Platform, Keyboard, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import KeyboardSpacer from "react-native-keyboard-spacer";

import api from "@api";
import Utils from "@utils";
import Constants from "@constants";
import Fonts, { fontStyles } from "@fonts";

import SuperView from "./SuperView.js";
import MainButton from "@buttons/MainButton/MainButton";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";
import Loader from "@components/Loader.js";
import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import CustomImageBackground from "@components/CustomImageBackground.js";

class LostPassword extends SuperView {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      resetSuccess: false,
      showLoader: false,
    };
  }

  onPressCreateNewPassword() {
    if (this.checkAllFieldsAreValid()) {
      Keyboard.dismiss();
      let params = {};
      params.email = this.state.email;
      params.from = "https://apps.drone-geofencing.com";
      this.setState({ showLoader: true });
      api.lostPassword(JSON.stringify(params)).then((response) => {
        this.setState({ showLoader: false });
        if (Utils.isApiReturnOK(response)) {
          this.displayOverlay("SimpleAlert", {
            action: () => Utils.closeModal(this.props.componentId),
            text:
              "Un email pour réinitialiser votre mot de passe vous a été envoyé sur :\n\n" +
              this.state.email,
          });
        }
      });
    }
  }

  checkAllFieldsAreValid() {
    let valid = true;
    let newState = this.state;

    if (this.state.email === "") {
      valid = false;
      newState.emailError = true;
      Utils.showError("Merci d'entrer un mail");
    } else if (!Utils.isEmailValid(this.state.email)) {
      valid = false;
      Utils.showError("Email non valide");
      newState.emailError = true;
    } else newState.emailError = false;

    this.setState(newState);
    return valid;
  }

  renderLostPasswordForm() {
    return (
      <View
        style={{
          alignItems: "center",
          width: Constants.DEVICE_WIDTH,
          paddingTop: Constants.TOP_BAR_HEIGHT + Constants.STATUS_BAR_HEIGHT,
        }}
      >
        <Text style={fontStyles.titleFontStyle}>{"Mot de passe oublié ?"}</Text>

        <CustomTextInput
          ref={"emailRef"}
          value={this.state.email}
          placeholder={"Email"}
          onChangeText={(email) => this.setState({ email })}
          onSubmitEditing={(event) => {
            this.onPressCreateNewPassword();
          }}
          autoCapitalize={"none"}
          returnKeyType={"done"}
          keyboardType={"email-address"}
          hasError={this.state.emailError != ""}
        />

        <View
          style={{
            alignItems: "center",
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            marginTop: Constants.MAIN_MARGIN / 2,
          }}
        >
          <MainButton
            onPress={this.onPressCreateNewPassword.bind(this)}
            title={"Envoyer"}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <>
        <MainTopBar
          noMenu
          onClose={() => Utils.closeModal(this.props.componentId)}
        />
        <CustomImageBackground content={this.renderLostPasswordForm()} />
        {this.state.showLoader ? <Loader /> : null}
        {Platform.OS == "ios" ? <KeyboardSpacer /> : null}
      </>
    );
  }
}

module.exports = connect()(LostPassword);
