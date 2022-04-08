import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  BackHandler,
} from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import TitleComponent from "@components/TitleComponent.js";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";
import Utils from "@utils";
import api from "@api";
import Loader from "@components/Loader.js";
import base64 from "base-64";
import KeyboardSpacer from "react-native-keyboard-spacer";
import SuperView from "@screens//SuperView.js";
import { connect } from "react-redux";
import { updateUser, updateUserDefaultOrg } from "@redux";
import MainButton from "@buttons/MainButton/MainButton";

import CustomIcon from "@components/CustomIcon";
import RNFetchBlob from "react-native-blob-util";

const AVATAR_SIZE = 70;
const UPDATE_AVATAR_SIZE = 30;

class EditUserView extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    user: PropTypes.object,
    isRegister: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
    addressNeeded: PropTypes.bool,
    emailMissing: PropTypes.bool,
    email: PropTypes.any,
    password: PropTypes.any,
    fbNoEmailParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: props.user.firstname
        ? props.user.firstname
        : props.fbNoEmailParams && props.fbNoEmailParams.firstname
        ? props.fbNoEmailParams.firstname
        : "",
      lastname: props.user.lastname
        ? props.user.lastname
        : props.fbNoEmailParams && props.fbNoEmailParams.lastname
        ? props.fbNoEmailParams.lastname
        : "",
      nickname: "",
      email: "",
      phone: "",
      address: props.user.address,
      zip: "",
      city: "",
      firstnameError: false,
      lastnameError: false,
      nicknameError: false,
      emailError: props.emailMissing,
      addressError:
        props.addressNeeded && (!props.user.address || props.user.address == "")
          ? true
          : false,
      zipError:
        props.addressNeeded && (!props.user.zip || props.user.zip == "")
          ? true
          : false,
      cityError:
        props.addressNeeded && (!props.user.city || props.user.city == "")
          ? true
          : false,
      avatarBase64: props.user.avatar
        ? props.user.avatar
        : props.fbNoEmailParams && props.fbNoEmailParams.image
        ? props.fbNoEmailParams.image
        : "",
      showLoader: true,
      shouldAvoidKeyboard: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    api.getUserProfile().then((response) => {
      if (Utils.isApiReturnOK(response)) {
        let userProfile = response.data.user.profile;
        this.setState({
          userProfile: response.data.user.profile,
          email: userProfile.email,
          nickname: userProfile.nickname,
          city: userProfile.city,
          zip: userProfile.zip,
          phone: userProfile.phone,
          showLoader: false,
        });
      }
    });
    if (this.props.fbNoEmailParams) {
      if (this.props.fbNoEmailParams.image) {
        let base64 = this.getBase64ImageWithFbUrl(
          this.props.fbNoEmailParams.image
        );
        this.setState({ avatarBase64: base64 });
      }
      this.displayOverlay("SimpleAlert", {
        cancelTitle: "  OK  ",
        text: "Votre compte facebook n'est lié à aucun email. Merci de compléter votre compte pour finaliser l'inscription.",
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress() {
    // if (this.props.isRegister) this.closeView();
    // else
    this.onCloseView();
    return true;
  }

  getBase64ImageWithFbUrl(url) {
    RNFetchBlob.fetch("GET", url, {})
      .then(async (res) => {
        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64();
          this.setState({
            avatarBase64: "data:image/jpeg;base64," + base64Str,
          });
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log({ errorFetch: errorMessage });
        console.log({ errorFetch: statusCode });
      });
  }

  checkAllFieldsAreValid() {
    let valid = true;
    let newState = this.state;
    if (this.state.firstname === "") {
      valid = false;
      newState.firstnameError = true;
    } else newState.firstnameError = false;
    if (this.state.email === "") {
      valid = false;
      newState.emailError = true;
    } else if (!Utils.isEmailValid(this.state.email)) {
      valid = false;
      newState.emailError = true;
      this.showError("Format d'email non valide");
    } else newState.emailError = false;
    if (!Utils.phoneNumberIsValid(this.state.phone)) {
      valid = false;
      newState.phoneError = true;
      this.showError("Numéro de téléphone invalide");
    } else newState.phoneError = false;

    // if (this.props.isRegister) {
    //   let passwordTest = Utils.isPasswordValid(this.state.password);
    //   if (passwordTest !== "") {
    //     valid = false;
    //     newState.passwordError = true;
    //     this.showError(passwordTest);
    //   } else newState.passwordError = false;
    // }
    this.setState(newState);
    return valid;
  }

  onPressEditUser() {
    if (this.checkAllFieldsAreValid()) {
      let params = {};
      params.firstname = this.state.firstname;
      params.lastname = this.state.lastname;
      params.nickname = this.state.nickname;
      params.address = this.state.address;
      params.zip = this.state.zip;
      params.city = this.state.city;
      params.phone = this.state.phone;
      params.lat = this.state.lat;
      params.lng = this.state.lng;
      if (
        this.state.avatarBase64 != "" &&
        this.state.avatarBase64 != this.props.user.avatar
      )
        params.image = this.state.avatarBase64;
      this.setState({ showLoader: true });
      api.editUserProfile(JSON.stringify(params)).then((response) => {
        if (Utils.isApiReturnOK(response)) {
          if (this.state.userProfile.email != this.state.email) {
            let paramsEmail = {};
            paramsEmail.email = this.state.email;
            api.editUserEmail(JSON.stringify(paramsEmail)).then((response) => {
              this.setState({ showLoader: false });
              if (Utils.isApiReturnOK(response)) {
                Utils.displayModal("MailConfirmationView", {
                  email: this.state.email,
                  manageLoginReturn: this.manageLoginReturn.bind(this),
                  goBackToOldEmail: this.goBackToOldEmail.bind(this),
                  isEditingEmail: true,
                });
              } else {
                this.setState({ email: this.state.userProfile.email });
              }
            });
          } else {
            api.getUserSession().then((response) => {
              this.setState({ showLoader: false });
              if (Utils.isApiReturnOK(response)) {
                this.manageLoginReturn(response.data.user.session);
              }
            });
          }
        }
      });
    }
  }

  manageLoginReturn(user) {
    this.props.updateUser(user);
    this.closeView();
  }

  editAvatar() {
    let params = {};
    params.image = this.state.avatarBase64;
    this.setState({ showLoader: true });
    api.editUserAvatar(JSON.stringify(params)).then((response) => {
      this.setState({ showLoader: false });
      if (Utils.isApiReturnOK(response)) {
        api.getUserSession().then((response) => {
          if (Utils.isApiReturnOK(response)) {
            this.props.updateUser(response.data.user.session);
          }
        });
      }
    });
  }

  //TODO ne devrait plus être utilisé
  // onPressRegister() {
  //   if (this.checkAllFieldsAreValid()) {
  //     this.setState({showLoader: true});
  //
  //     var str = this.state.email + ":" + this.state.password;
  //     var basicAuthToken = "Basic " + base64.encode(str);
  //
  //     // console.log({ "basicAuthToken ": basicAuthToken.toString() });
  //     let params = {};
  //     params.firstname = this.state.firstname;
  //     params.lastname = this.state.lastname;
  //     params.nickname = this.state.nickname;
  //     params.address = this.state.address;
  //     params.zip = this.state.zip;
  //     params.city = this.state.city;
  //     params.phone = this.state.phone;
  //
  //     params.image = this.state.avatarBase64;
  //
  //     api.register(basicAuthToken, JSON.stringify(params)).then(response => {
  //       this.setState({
  //         showLoader: false
  //       });
  //       if (Utils.isApiReturnOK(response)) {
  //         this.props.updateUser(response.data.user);
  //         api.setUserId(response.data.user.user_id);
  //         Utils.setDashboardAsRoot();
  //       }
  //     });
  //   }
  // }

  gotoNextInput(nextInputRef) {
    if (nextInputRef) this.refs[nextInputRef].refs.inputRef.focus();
  }

  // onPressChangePassword() {
  //   this.displayView("ChangePassword");
  // }

  onDeleteAccount() {
    this.displayOverlay("SimpleAlert", {
      text: "Êtes-vous sûr de vouloir supprimer votre compte ?\n\nTous vos dons et achats seront effacés ainsi que vos données personnelles.",
      action: this.deleteAccount.bind(this),
      okTitle: "Supprimer",
      cancelTitle: "Annuler",
      showImage: true,
    });
  }

  deleteAccount() {
    api.deleteUser().then((response) => {
      if (Utils.isApiReturnOK(response)) {
        api.setUserId(null);
        this.logout();
      }
    });
  }

  resetToLogin() {
    this.closeView();
  }

  onCloseView() {
    if (!this.state.email || this.state.email == "") {
      this.setState({ emailError: true });
    } else if (this.userHasUnsavedChanges()) {
      this.displayOverlay("UserProfileChangesAlert", {
        onClose: () => {
          this.closeView();
        },
        save: this.onPressEditUser.bind(this),
      });
    } else {
      this.closeView();
    }
  }
  userHasUnsavedChanges() {
    if (this.state.userProfile.firstname !== this.state.firstname) return true;
    else if (this.state.userProfile.lastname !== this.state.lastname)
      return true;
    else if (this.state.userProfile.nickname !== this.state.nickname)
      return true;
    else if (this.state.userProfile.email !== this.state.email) return true;
    else if (this.state.userProfile.zip !== this.state.zip) return true;
    else if (this.state.userProfile.city !== this.state.city) return true;
    else if (this.props.user.avatar !== this.state.avatarBase64) return true;
    else return false;
  }

  onPictureTaken(response) {
    if (response) {
      this.setState({
        avatarBase64: response[0],
      });
      this.editAvatar();
    }
  }

  onAddressUpdate(params) {
    this.setState({
      address: params.address,
      zip: params.zip,
      city: params.city,
      lat: params.lat,
      lng: params.lng,
    });
  }

  goBackToOldEmail() {
    this.setState({ email: this.state.userProfile.email, showLoader: true });
    let paramsEmail = {};
    paramsEmail.email = this.state.userProfile.email;
    api.rollbackUserEmail(JSON.stringify(paramsEmail)).then((response) => {
      this.setState({ showLoader: false });
      if (Utils.isApiReturnOK(response)) {
      }
    });
  }

  renderCustomTopBar() {
    return (
      <View
        style={{
          width: Constants.DEVICE_WIDTH,
          padding: Constants.MAIN_MARGIN,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Constants.STATUS_BAR_HEIGHT + Constants.MAIN_MARGIN,
        }}
      >
        <View
          style={{
            height: AVATAR_SIZE,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={this.onCloseView.bind(this)}>
            <CustomIcon
              name={"back"}
              size={Constants.TOP_BAR_BUTTON_ICON_SIZE}
              color={Constants.TROCR_BLACK}
            />
          </TouchableOpacity>
          <Text
            style={[
              Constants.TITLE_FONT_STYLE,
              {
                fontSize: Constants.MEGA_BIG_FONT_SIZE,
              },
            ]}
          >
            {"Mon profil"}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        {this.renderCustomTopBar()}
        <ScrollView
          keyboardShouldPersistTaps="never"
          ref="scrollRef"
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "white",
            marginTop: 0,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, marginTop: Constants.MAIN_MARGIN }}>
              <CustomTextInput
                ref={"firstnameRef"}
                value={this.state.firstname}
                placeholder={"Prénom"}
                onChangeText={(firstname) => this.setState({ firstname })}
                onSubmitEditing={(event) => {
                  this.gotoNextInput("lastnameRef");
                }}
                focusMethod={() => {
                  this.setState({ shouldAvoidKeyboard: false });
                }}
                returnKeyType={"next"}
                hasError={this.state.firstnameError}
              />
              <CustomTextInput
                ref={"lastnameRef"}
                value={this.state.lastname}
                placeholder={"Nom"}
                onChangeText={(lastname) => this.setState({ lastname })}
                onSubmitEditing={(event) => {
                  this.gotoNextInput("nicknameRef");
                }}
                focusMethod={() => {
                  this.setState({ shouldAvoidKeyboard: false });
                }}
                returnKeyType={"next"}
                hasError={this.state.lastnameError}
              />
              <CustomTextInput
                ref={"nicknameRef"}
                value={this.state.nickname}
                placeholder={"Pseudo"}
                onChangeText={(nickname) => this.setState({ nickname })}
                onSubmitEditing={(event) => {
                  this.gotoNextInput("emailRef");
                }}
                focusMethod={() => {
                  this.setState({ shouldAvoidKeyboard: false });
                }}
                returnKeyType={"next"}
                hasError={this.state.nicknameError}
              />
              <CustomTextInput
                ref={"emailRef"}
                value={this.state.email}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(email) => this.setState({ email })}
                autoCapitalize={"none"}
                onSubmitEditing={(event) => Keyboard.dismiss()}
                focusMethod={() => {
                  this.setState({ shouldAvoidKeyboard: true });
                }}
                returnKeyType={"done"}
                hasError={this.state.emailError}
              />

              {/*  {!this.props.isRegister ? (
                <TouchableOpacity
                  onPress={this.onPressChangePassword.bind(this)}
                >
                  <TitleComponent />
                  <View
                    style={{
                      flexDirection: "row",
                      width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
                      justifyContent: "space-between",
                      alignSelf: "center",
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    <Text style={Constants.NORMAL_FONT_STYLE}>
                      {"Changer mon mot de passe"}
                    </Text>
                    <CustomIcon
                      name={"arrow-right"}
                      size={20}
                      color={Constants.FONT_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <CustomTextInput
                  ref={"passwordRef"}
                  value={this.state.password}
                  placeholder={"Mot de passe"}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password})}
                  autoCapitalize={"none"}
                  onSubmitEditing={event => {
                    Keyboard.dismiss();
                  }}
                  focusMethod={() => {
                    this.setState({shouldAvoidKeyboard: true});
                  }}
                  returnKeyType={"done"}
                  hasError={this.state.passwordError}
                />
              )}*/}

              <CustomTextInput
                ref={"phoneRef"}
                value={this.state.phone}
                placeholder={"Téléphone"}
                keyboardType={"numeric"}
                onChangeText={(phone) => this.setState({ phone })}
                onSubmitEditing={(event) => Keyboard.dismiss()}
                focusMethod={() => {
                  this.setState({ shouldAvoidKeyboard: true });
                }}
                returnKeyType={"done"}
                hasError={this.state.phoneError}
              />
            </View>
            <TouchableOpacity onPress={this.onDeleteAccount.bind(this)}>
              <TitleComponent />
              <View
                style={{
                  flexDirection: "row",
                  width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
                  justifyContent: "space-between",
                  alignSelf: "center",
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Text style={Constants.NORMAL_FONT_STYLE}>
                  {"Supprimer mon compte"}
                </Text>
                <CustomIcon
                  name={"arrow-right"}
                  size={20}
                  color={Constants.FONT_COLOR}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height:
                  Constants.MAIN_BUTTON_HEIGHT + Constants.MAIN_MARGIN * 2,
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: Constants.MAIN_MARGIN,
          }}
        >
          <MainButton
            onPress={this.onPressEditUser.bind(this)}
            title={"Enregistrer"}
            backgroundColor={Constants.TROCR_SECONDARY_COLOR}
            width={Constants.MAIN_BUTTON_WIDTH}
            noArrow
          />
        </View>
        {Platform.OS == "ios" ? <KeyboardSpacer /> : null}
        {this.state.showLoader ? <Loader /> : null}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (newUser) => dispatch(updateUser(newUser)),
    updateUserDefaultOrg: (newDefaultOrg) =>
      dispatch(updateUserDefaultOrg(newDefaultOrg)),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditUserView);
