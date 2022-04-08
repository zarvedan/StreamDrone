import React from "react";
import { View, Text, BackHandler } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import api from "@api";
import SuperView from "./SuperView.js";
import MainButton from "@buttons/MainButton/MainButton";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import { updateUser } from "@redux";

import Geocoder from "react-native-geocoding";
Geocoder.init(Constants.GOOGLE_API_KEY); // use a valid API key

class AddressView extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    onPress: PropTypes.func,
    address: PropTypes.string,
    zip: PropTypes.string,
    city: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      distance: props.distance || null,
      address:
        props.address != "" ? props.address : " Sélectionnez votre ville",
      zip: props.zip != "" ? props.zip : " Sélectionnez votre ville",
      city: props.city != "" ? props.city : " Sélectionnez votre ville",
      lat: null,
      lng: null,
    };
  }

  componentDidMount() {
    this.geolocalize();
    setTimeout(
      function () {
        if (this.addressRef && this.props.city) {
          this.addressRef.setAddressText(this.props.city);
        }
      }.bind(this),
      200
    );
  }

  geolocalize() {
    this.setState({ showLoader: true });
    this.askForGpsActivation(
      (latlng) => this.getGeoloc(latlng),
      () => {
        this.setState({ showLoader: false });
        Utils.showInfo(
          "Vous n'avez pas autorisé Trocr à accéder à votre géolocalisation"
        );
      }
    );
  }

  getGeoloc(latlng) {
    console.log({ latlng });
    Geocoder.from(latlng.lat, latlng.lng)

      .then((res) => {
        let newAddress = {};
        newAddress = res.results[0];
        console.log({ newAddress });

        this.setState({
          city: newAddress.formatted_address ?? "Ville inconnue",
          lat: latlng.lat,
          lng: latlng.lng,
          showLoader: true,
        });

        this.addressRef.setAddressText(newAddress.locality ?? "Ville inconnue");
      })

      .catch((error) => console.warn(error));
  }

  render() {
    return (
      <View
        style={{
          height: Constants.SCREEN_HEIGHT,
          width: Constants.DEVICE_WIDTH,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            Constants.TITLE_FONT_STYLE,
            { margin: Constants.MAIN_MARGIN, alignSelf: "center" },
          ]}
        >
          {this.state.city}
        </Text>
        <Text
          style={[
            Constants.TITLE_FONT_STYLE,
            { margin: Constants.MAIN_MARGIN, alignSelf: "center" },
          ]}
        >
          {"lat :" + this.state.lat}
        </Text>
        <Text
          style={[
            Constants.TITLE_FONT_STYLE,
            { margin: Constants.MAIN_MARGIN, alignSelf: "center" },
          ]}
        >
          {"lng :" + this.state.lng}
        </Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (newUser) => dispatch(updateUser(newUser)),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressView);
