import React, { Component } from "react";
import PropTypes from "prop-types";
import Constants from "@constants";
import Utils from "@utils";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
  Keyboard,
} from "react-native";
import DefaultPreference from "react-native-default-preference";
import api from "@api";
import Geolocation from "react-native-geolocation-service";
import { Navigation } from "react-native-navigation";

import { updateUser, updateUserDefaultOrg, store } from "@redux";
class SuperView extends Component {
  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      updateNeededViewIsDisplayed: false,
    };
  }

  //*********************
  //    FORM
  //*********************

  gotoNextInput(nextInputRef) {
    if (this.refs[nextInputRef]) this.refs[nextInputRef].refs.inputRef.focus();
    else {
      Keyboard.dismiss();
    }
  }

  //****************
  //    GEOLOC
  //****************

  askForGpsActivation(okFunction, koFunction) {
    this.requestLocationPermission(okFunction, koFunction);
  }

  async requestLocationPermission(okFunction, koFunction) {
    //ANDROID
    if (Platform.OS === "android") {
      const chckLocationPermission = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getFineLocation(okFunction, koFunction);
          } else {
            koFunction();
          }
        } catch (err) {}
      }
    } else {
      //IOS
      const status = await Geolocation.requestAuthorization("whenInUse");
      let hasPermission = false;
      if (status === "granted") {
        hasPermission = true;
      }

      if (status === "denied") {
        // Alert.alert("Permission refusée");
      }

      if (status === "disabled") {
        Alert.alert(`Autoriser Trocr à accéder à votre position.`, "", [
          {
            text: "Modifier mes réglages",
            onPress: this.openIosSettings.bind(this),
          },
          { text: "Ne pas autoriser", onPress: () => {} },
        ]);
      }
      // console.log({ status: status });
      if (hasPermission) {
        this.getFineLocation(okFunction, koFunction);
      } else {
        koFunction();
      }
    }
  }

  openIosSettings() {
    Linking.openSettings().catch(() => {
      Alert.alert("Impossible d'ouvrir les réglages");
    });
  }

  getFineLocation(okFunction, koFunction) {
    Geolocation.getCurrentPosition(
      (position) => {
        // this.setState({
        //   showLoader: this.state.refreshing ? false : true,
        // });
        let latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        okFunction(latlng);
      },
      (error) => {
        // this.setState({ showLoader: true });
        // console.log({ error: error });r
        if (Platform.OS === "ios") {
          this.showError(
            "Vous n'avez pas autorisé Trocr à accéder à votre géolocalisation"
          );
        }
        if (koFunction) {
          koFunction();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 4000,
      }
    );
  }

  //*****************************
  //    LOGOUT + REDIRECTION
  //*****************************

  logout() {
    let emptyObject = {};
    this.props.updateUser(emptyObject);
    this.props.updateUserDefaultOrg(emptyObject);
    DefaultPreference.clear(Constants.USER_STORED_KEY).then((value) => {});
    DefaultPreference.clear(Constants.FCM_TOKEN).then((value) => {});
    DefaultPreference.clear(Constants.BADGE).then((value) => {});
    DefaultPreference.clear(Constants.FIRST_DONATION).then((value) => {});
    DefaultPreference.clear(Constants.TUTO_DISPLAYED).then((value) => {});

    this.setLoginViewAsRoot();
  }
}

module.exports = SuperView;
