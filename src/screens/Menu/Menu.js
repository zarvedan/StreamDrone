import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import Utils from "@utils";
import MenuButton from "@buttons/MenuButton";
import Colors from "@colors";
import Fonts, { fontStyles } from "@fonts";

const Y_VALUE = -1000;

export default class Menu extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    content: PropTypes.any,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(Y_VALUE),
      backgroundOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animateTopSheet(0);
    this.animateBackgroundFade(1);
  }

  onPressSettings() {
    this.close();
    Utils.displayModal("Settings");
  }

  onPressLogout() {
    this.close();
    Utils.displayOverlay("SimpleAlert", {
      action: () => Utils.logout(),
      text: "Êtes-vous sûr(e) de vouloir vous déconnecter ?",
      okTitle: "Confirmer",
    });
  }

  animateTopSheet(value) {
    Animated.spring(this.state.bounceValue, {
      toValue: value,
      velocity: 3,
      bounciness: 5,
      speed: 14,
      useNativeDriver: true,
    }).start();
  }

  animateBackgroundFade(value) {
    Animated.timing(this.state.backgroundOpacity, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  close() {
    this.animateTopSheet(Y_VALUE / 2);
    this.animateBackgroundFade(0);
    setTimeout(() => {
      Utils.closeOverlay(this.props.componentId);
    }, 1000);
  }
  renderButtons() {
    return (
      <View
        style={{
          marginTop: Constants.MAIN_MARGIN / 2,
          alignItems: "center",
        }}
      >
        <MenuButton
          onPress={this.onPressSettings.bind(this)}
          iconName={"bell"}
          buttonTitle={"Paramètres"}
          isFirst
        />
        <MenuButton
          onPress={this.onPressLogout.bind(this)}
          iconName={"bell"}
          buttonTitle={"Déconnexion"}
        />
      </View>
    );
  }

  render() {
    const opacity = this.state.backgroundOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
      useNativeDriver: false,
    });
    return (
      <Animated.View
        style={{
          opacity,
          width: Constants.DEVICE_WIDTH,
          height: Constants.DEVICE_HEIGHT,
        }}
      >
        <TouchableOpacity
          onPress={() => this.close()}
          activeOpacity={1.0}
          style={{
            justifyContent: "flex-end",
            backgroundColor: "transparent",
            height: Constants.DEVICE_HEIGHT,
            width: Constants.DEVICE_WIDTH,
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: this.state.bounceValue }],
              justifyContent: "flex-start",
              position: "absolute",
              backgroundColor: Colors.STREAM_DRONE_BLUE,
              width: Constants.DEVICE_WIDTH,
              top: Constants.TOP_BAR_HEIGHT + Constants.STATUS_BAR_HEIGHT,
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => console.log({ pressCatched: "ok" })}
            >
              <>
                <Text style={fontStyles.titleOrange}>{"MENU"}</Text>
                {this.renderButtons()}
              </>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
