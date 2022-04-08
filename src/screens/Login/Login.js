import React, { Component } from "react";
import { View, Text, Keyboard, Platform, TouchableOpacity } from "react-native";
import base64 from "base-64";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import { updateUser } from "@redux";
import api from "@api";
import Utils from "@utils";
import Constants from "@constants";

import MainButton from "@buttons/MainButton/MainButton";
import MainTopBar from "@components/topbars/MainTopBar/MainTopBar";
import CustomImageBackground from "@components/CustomImageBackground.js";
import Loader from "@components/Loader.js";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";
import { fontStyles } from "@fonts";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLostPassword: false,
      // email: "",
      // password: "",
      email: "andre@trocr.com",
      password: "Abcd1234!",
      firstnameError: "",
      emailError: "",
      passwordError: "",
      showLoader: false,
      loginError: false,
    };
  }

  componentDidMount() {
    this.hideSplashScreen();
  }

  hideSplashScreen() {
    if (Platform.OS == "android")
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
  }
  gotoNextInput(nextInputRef) {
    this.refs[nextInputRef].refs.inputRef.focus();
  }
  checkAllFieldsAreValid() {
    let valid = true;
    let newState = this.state;

    if (this.state.email === "") {
      valid = false;
      newState.emailError = "Merci d'entrer un email";
    } else if (!Utils.isEmailValid(this.state.email)) {
      valid = false;
      newState.emailError = "Email non valide";
      Utils.showError("Email non valide");
    } else newState.emailError = "";

    let passwordTest = Utils.isPasswordValid(this.state.password);
    if (passwordTest !== "") {
      valid = false;
      if (this.state.password != "") Utils.showError(passwordTest);
      newState.passwordError = "Mot de passe non valide";
    } else newState.passwordError = false;

    this.setState(newState);
    return valid;
  }

  onPressLogin() {
    if (this.checkAllFieldsAreValid()) {
      var str = this.state.email + ":" + this.state.password;
      var basicAuthToken = "Basic " + base64.encode(str);
      Keyboard.dismiss();
      this.setState({ showLoader: true });

      let params = {
        email: this.state.email,
        password: this.state.password,
      };

      api.login(basicAuthToken, JSON.stringify(params)).then((response) => {
        this.setState({ showLoader: false });
        if (Utils.isApiReturnOK(response)) {
          this.manageLoginReturn(response.data.infos, response.data.token);
        } else {
          this.setState({ loginError: true });
        }
      });
    }
  }

  manageLoginReturn(user, token) {
    Utils.showInfo("todo afficher et valider CGU");
    api.setToken(token);
    this.props.updateUser(user);

    Utils.setDashboardAsRoot();
  }

  onPressForgotPassword() {
    Utils.displayModal("LostPassword");
  }

  renderLoginForm() {
    return (
      <View
        style={{
          alignItems: "center",
          width: Constants.DEVICE_WIDTH,
          paddingTop: Constants.TOP_BAR_HEIGHT + Constants.STATUS_BAR_HEIGHT,
        }}
      >
        <Text style={fontStyles.titleBlue}>{"Connexion"}</Text>

        <CustomTextInput
          ref={"emailRef"}
          value={this.state.email}
          placeholder={"Email"}
          onChangeText={(email) => this.setState({ email })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("passwordRef");
          }}
          autoCapitalize={"none"}
          returnKeyType={"next"}
          keyboardType={"email-address"}
        />

        <CustomTextInput
          ref={"passwordRef"}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Mot de passe"}
          onChangeText={(password) => this.setState({ password })}
          onSubmitEditing={(event) => {
            Keyboard.dismiss();
            this.onPressLogin();
          }}
          returnKeyType={"done"}
        />
        <View
          style={{
            alignItems: "center",
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            marginTop: Constants.MAIN_MARGIN / 2,
          }}
        >
          <MainButton
            onPress={this.onPressLogin.bind(this)}
            title={"Se connecter"}
            testID={"LoginButton"}
          />
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 20,
            marginTop: 5,
          }}
          onPress={this.onPressForgotPassword.bind(this)}
          testID={"LostPasswordButton"}
        >
          <Text
            style={[
              Constants.NORMAL_FONT_STYLE,
              { textDecorationLine: "underline" },
            ]}
          >
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderErrorBloc() {
    return (
      <View
        style={{
          alignItems: "center",
          width: Constants.DEVICE_WIDTH,
          paddingTop: Constants.TOP_BAR_HEIGHT + Constants.STATUS_BAR_HEIGHT,
        }}
      >
        <Text style={fontStyles.titleFontStyle}>{"Connexion"}</Text>

        <Text
          style={[
            fontStyles.normalFontStyle,
            {
              marginTop: Constants.MAIN_MARGIN * 2,
              marginBottom: Constants.MAIN_MARGIN * 2,
              color: "red",
              textAlign: "center",
            },
          ]}
        >
          {"Authentification\néchouée !"}
        </Text>

        <View
          style={{
            alignItems: "center",
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            marginTop: Constants.MAIN_MARGIN / 2,
          }}
        >
          <MainButton
            onPress={() => this.setState({ loginError: false })}
            title={"Réessayer"}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <>
        <MainTopBar noMenu noBack />
        <CustomImageBackground
          content={
            this.state.loginError
              ? this.renderErrorBloc()
              : this.renderLoginForm()
          }
        />
        {this.state.showLoader ? <Loader /> : null}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (newUser) => dispatch(updateUser(newUser)),
  };
}

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
