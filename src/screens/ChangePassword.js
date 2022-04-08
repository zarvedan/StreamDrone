import React from "react";
import { StyleSheet, ScrollView, View, Keyboard } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import base64 from "base-64";

import Constants from "@constants";
import Colors from "@colors";
import Fonts from "@fonts";
import Utils from "@utils";
import { updateUser } from "@redux";
import api from "@api";

import SuperView from "./SuperView.js";
import MainButton from "@buttons/MainButton/MainButton";
import BackButtonTopBar from "@topbars/BackButtonTopBar";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";

class ChangePassword extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordError: false,
      confirmPasswordError: false,
    };
  }

  keyboardDidHide() {
    if (this.refs.passwordRef.refs.inputRef.isFocused()) {
      this.refs.passwordRef.refs.inputRef.blur();
    }
    if (this.refs.confirmPasswordRef.refs.inputRef.isFocused()) {
      this.refs.confirmPasswordRef.refs.inputRef.blur();
    }
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide.bind(this)
    );
    setTimeout(() => {
      this.refs.passwordRef.refs.inputRef.focus();
    }, 500);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  gotoNextInput(nextInputRef) {
    this.refs[nextInputRef].refs.inputRef.focus();
  }

  onSubmitConfirm() {
    Keyboard.dismiss();
  }

  checkAllFieldsAreValid() {
    //TODO regles pour mot de passe
    let valid = true;
    let newState = this.state;
    let passwordTest = Utils.isPasswordValid(this.state.password);
    if (passwordTest !== "") {
      valid = false;
      newState.passwordError = true;
      this.showError(passwordTest);
    } else newState.passwordError = false;

    if (this.state.confirmPassword === "") {
      valid = false;
      newState.confirmPasswordError = true;
    } else if (this.state.confirmPassword !== this.state.password) {
      valid = false;
      newState.confirmPasswordError = true;
    } else newState.confirmPasswordError = false;
    this.setState(newState);
    return valid;
  }

  onPressChangePassword() {
    if (this.checkAllFieldsAreValid()) {
      let params = {};
      params.password = base64.encode(this.state.password);
      api.changePassword(params).then((response) => {
        if (Utils.isApiReturnOK(response)) {
          this.showSuccess("Votre mot de passe a été mis à jour");
          this.closeView();
        }
      });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Constants.MAIN_BACKGROUND_COLOR,
        }}
      >
        <BackButtonTopBar
          navigator={this.props.navigator}
          title={"Mot de passe"}
          onClose={() => this.closeView()}
        />
        <ScrollView
          style={{ width: "100%", height: "100%" }}
          keyboardShouldPersistTaps={"always"}
        >
          <CustomTextInput
            ref={"passwordRef"}
            value={this.state.password}
            placeholder={"Nouveau mot de passe"}
            onChangeText={(password) => this.setState({ password })}
            onSubmitEditing={(event) => {
              this.gotoNextInput("confirmPasswordRef");
            }}
            returnKeyType={"next"}
            secureTextEntry={true}
            hasError={this.state.passwordError}
          />
          <CustomTextInput
            ref={"confirmPasswordRef"}
            value={this.state.confirmPassword}
            placeholder={"Confirmez votre nouveau mot de passe"}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            onSubmitEditing={(event) => {
              this.onSubmitConfirm();
            }}
            returnKeyType={"done"}
            secureTextEntry={true}
            hasError={this.state.confirmPasswordError}
          />
        </ScrollView>
        <MainButton
          onPress={this.onPressChangePassword.bind(this)}
          title={"Envoyer"}
        />
        <View style={{ height: Constants.MAIN_MARGIN * 2 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    margin: 20,
    color: Colors.TROCR_BLACK,
    fontSize: Fonts.MENU_BUTTON_FONT_SIZE,
    fontFamily: Fonts.MENU_BUTTON_FONT,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (newUser) => dispatch(updateUser(newUser)),
  };
}

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
