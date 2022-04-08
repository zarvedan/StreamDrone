import Constants from "@constants";
import { Keyboard } from "react-native";
import KJUR from "jsrsasign";
import moment from "moment";
import { Navigation } from "react-native-navigation";

import "../ReactotronConfig";

export default class Utils {
  static isEmailValid(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isPasswordValid(password) {
    let error = "";
    if (!/\d/.test(password))
      error = "Le mot de passe doit contenir au moins un caractère numérique.";
    else if (!/[a-z]/.test(password) && !/[A-Z]/.test(password))
      error =
        "Le mot de passe doit contenir au moins un caractère alphabétique.";
    else if (password.length < 8)
      error =
        "Le mot de passe doit contenir au moins 8 caractères alphanumériques.";
    return error;
  }

  static getArrayOfImages(images) {
    let data = images.slice(1, images.length - 1).split(",");
    return data;
  }
  static getDonationImageUri(objectId, imageId, modifiedTs) {
    let imageUri =
      Constants.DONATION_IMAGES_URL + objectId + "/" + imageId + ".jpg";
    if (modifiedTs) imageUri += "?" + modifiedTs;

    return imageUri.toString();
  }
  static getImageUri(imageId, modifiedTs) {
    let imageUri = Constants.API_URL + "media/" + imageId;
    if (modifiedTs) imageUri += "?" + modifiedTs;

    return imageUri.toString();
  }

  static stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  }

  static getDonationSharingUrl(objectId, donationName) {
    // donationNameSlugged = this.stringToSlug(donationName);
    // if (donationNameSlugged == "") donationNameSlugged = "nom-de-l-objet";

    let donationUrl = Constants.EXTERNAL_DEEPLINK_APP_DONATIONS + objectId;
    return donationUrl.toString();
  }

  static getUserImageUri(userId) {
    let userUri = Constants.USER_AVATAR_URL + userId + ".jpg";
    return userUri;
  }

  //CHECKPOINT POUR CREER UN DON
  static userIsComplete(user) {
    return (
      user.email &&
      user.email != "" &&
      user.address &&
      user.firstname &&
      user.lastname
    );
  }

  static getDistance(distance) {
    // on reçoit la distance en m
    let dist;
    let unit;
    if (distance < 1000) {
      dist = distance;
      unit = " m";
    } else {
      dist = (Number(distance) / 1000).toFixed(0);
      unit = " km";
    }

    if (dist > 999) {
      dist = 999;
      return "> " + dist.toString() + unit;
    } else if (dist < 1.0) dist = 1;
    return "< " + dist.toString() + unit;
  }

  static getFormatedPrice(price) {
    return Math.floor(price) + " €";
  }

  static formatDate(dateStr) {
    if (dateStr) {
      let date = new Date(dateStr.slice(0, 10).toString());
      var monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + " " + monthNames[monthIndex] + " " + year;
    } else return "";
  }

  static formatDate2(dateStr) {
    if (dateStr) {
      let date = new Date(dateStr.slice(0, 10).toString());
      var day = "0" + date.getDate();
      var month = "0" + date.getMonth();
      var year = date.getFullYear();
      return day.slice(-2) + "/" + month.slice(-2) + "/" + year;
    } else return "";
  }

  static getDiffFromDate(dateStr) {
    if (dateStr) {
      let date = this.getDateFromString(dateStr);
      let currentDate = new Date();
      let diffInSeconds = parseInt((currentDate - date) / 1000);
      let minInSeconds = 60;
      let hourInSeconds = 60 * minInSeconds;
      let dayInSeconds = 24 * hourInSeconds;
      let result;

      if (diffInSeconds < hourInSeconds) {
        result = Math.floor(diffInSeconds / minInSeconds);
        if (result == 0) result = "1 mn";
        else result += " mn";
      } else if (diffInSeconds < dayInSeconds)
        result = Math.floor(diffInSeconds / hourInSeconds) + " h";
      else {
        result = Math.floor(diffInSeconds / dayInSeconds) + " j";
      }
      return result;
    } else return "";
  }

  static getDiffFromDateInSeconds(dateStr) {
    if (dateStr) {
      let endDate = this.getDateFromString(dateStr);
      let currentDate = new Date();
      let diffInSeconds = parseInt((endDate - currentDate) / 1000);
      return diffInSeconds;
    } else return "";
  }

  static formatDateForChat(dateStr) {
    if (dateStr) return moment(dateStr).format("HH:mm");
    else return "";
  }

  static getDateFromString(dateStr) {
    let tmp = dateStr.substring(0, dateStr.length - 3).replace("T", " ");
    let tmp2 = tmp.replace(/-/g, "/");
    let date = new Date(tmp2);
    return date;
  }

  static generateToken(userId, date, checkoutId) {
    var oHeader = { alg: "HS256", typ: "JWT" };
    var oPayload = {};
    oPayload.iss = 117;
    // oPayload.app_version = VersionNumber.appVersion;
    oPayload.iat = Math.floor(date / 1000);
    oPayload.aud = "trocr";
    if (userId) oPayload.user_id = userId;
    // if (checkoutId) oPayload.checkout_id = checkoutId;
    // Le token expire au bout de 10 min
    oPayload.exp = Math.floor(date / 1000) + 600;
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var socketToken = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      Constants.MILA
    );

    return socketToken;
  }

  // static getSocketToken() {
  //   var date = Date.now();
  //   return this.generateToken(null, date);
  // }

  static getToken(userId) {
    var date = Date.now();
    return this.generateToken(userId, date);
  }
  static getTokenForIosPayment(userId, checkoutId) {
    var date = Date.now();
    return this.generateToken(userId, date, checkoutId);
  }

  static phoneNumberIsValid(phoneNumber) {
    var test = phoneNumber.match(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gim
    );
    return test;
  }

  //*************************
  //    SCREEN MANAGEMENT
  //*************************

  static closeOverlay(componentId) {
    Keyboard.dismiss();
    try {
      Navigation.dismissOverlay(componentId);
    } catch (err) {
      this.showError("no overlay id");
    }
  }

  static displayView(viewName, props) {
    Keyboard.dismiss();
    Navigation.push(Constants.LOGIN_STACK_ID, {
      component: {
        name: viewName,
        passProps: props,
        options: {
          statusBar: Constants.STATUS_BAR,
        },
      },
    });
  }
  static closeView() {
    Keyboard.dismiss();
    Navigation.pop(Constants.LOGIN_STACK_ID);
  }

  static displayModal(viewName, props) {
    let statusBarProps = Constants.STATUS_BAR;
    Keyboard.dismiss();
    Navigation.showModal({
      component: {
        name: viewName,
        passProps: props,
        options: {
          screenBackgroundColor: "transparent",
          modalPresentationStyle: "overCurrentContext",
          statusBar: statusBarProps,
          layout: {
            componentBackgroundColor: "transparent",
          },
        },
      },
    });
  }

  static closeModal(componentId) {
    Keyboard.dismiss();
    Navigation.dismissModal(componentId);
  }

  static displayOverlay(viewName, props) {
    Keyboard.dismiss();
    Navigation.showOverlay({
      component: {
        name: viewName,
        passProps: props,
        options: {
          statusBar: Constants.STATUS_BAR_LIGHT,
          layout: {
            componentBackgroundColor: "transparent",
          },
        },
      },
    });
  }

  static setDashboardAsRoot() {
    Navigation.setRoot({
      root: {
        stack: {
          id: Constants.MAIN_STACK_ID,
          children: [
            {
              component: {
                name: "Dashboard",
                options: {
                  statusBar: Constants.STATUS_BAR,
                },
              },
            },
          ],
        },
      },
    });
  }

  static setLoginViewAsRoot() {
    Navigation.setRoot({
      root: {
        stack: {
          id: Constants.LOGIN_STACK_ID,
          children: [
            {
              component: {
                name: "Login",
                options: {
                  statusBar: Constants.STATUS_BAR,
                },
              },
            },
          ],
        },
      },
    });
  }

  //*********************
  //    IN APP NOTIFS
  //*********************

  static showSuccess(message) {
    this.showMessage(message, true, false, false);
  }

  static showInfo(message) {
    this.showMessage(message, false, true, false);
  }

  static showError(message) {
    this.showMessage(message, false, false, true);
  }

  static showMessage(message, success, info, error) {
    this.displayOverlay("InAppNotif", {
      success: success ? message : null,
      info: info ? message : null,
      error: error ? message : null,
    });
  }

  //*************************************
  //    GESTION DES RETOURS API SI KO
  //*************************************

  static isApiReturnOK(response) {
    // console.log({ isApiReturnOK: response });
    if (!response) return false;
    else if (response.problem && response.problem == "TIMEOUT_ERROR") {
      this.showError("Problème de communication avec nos serveurs");
      return false;
    } else if (!response.data) {
      this.showError("Veuillez vérifier votre connexion internet");
      return false;
    } else if (response.status == 403) return false;
    else if (response.status == 200) return true;
    else if (response.data.status === "WARNING") {
      Utils.showInfo(response.data.message);
      return false;
    } else if (response.data.status === "UNKNOWN_USER") {
      this.showError(response.data.message);
      this.logout();
      return false;
    } else {
      this.showError(
        response.data.message
          ? response.data.message
          : "Problème de communication avec les serveurs StreamDrone"
      );
      return false;
    }
  }

  //*****************************
  //    LOGOUT
  //*****************************

  static logout() {
    this.setLoginViewAsRoot();
  }
}
