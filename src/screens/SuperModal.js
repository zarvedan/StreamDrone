import React, { Component } from "react";
import PropTypes from "prop-types";
import Constants from "@constants";
import { Linking, Keyboard, Animated } from "react-native";
import { Navigation } from "react-native-navigation";
import SuperView from "./SuperView.js";

const BOTTOM_DELAY = 200;
const FADE_SPEED = 600;

class SuperModal extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    content: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      backgroundOpacity: new Animated.Value(0),
      bounceValue: new Animated.Value(Constants.DEVICE_HEIGHT),
    };
  }

  componentDidMount() {
    this.animateBackgroundFade(1);
    setTimeout(() => {
      this.animateBottomSheet(0);
    }, BOTTOM_DELAY);
  }

  close() {
    this.animateBackgroundFade(0);
    setTimeout(() => {
      this.animateBottomSheet(Constants.DEVICE_HEIGHT);
    }, BOTTOM_DELAY);
    setTimeout(() => {
      this.props.onClose();
    }, 500);
  }

  animateBottomSheet(value) {
    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: value,
      velocity: 3,
      bounciness: 5,
      speed: 14,
    }).start();
  }

  animateBackgroundFade(value) {
    Animated.timing(this.state.backgroundOpacity, {
      toValue: value,
      duration: FADE_SPEED,
    }).start();
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
          backgroundColor: Constants.LIGHTBOX_BACKGROUND,
        }}
      >
        <Animated.View
          style={{
            width: Constants.DEVICE_WIDTH,
            height: Constants.DEVICE_HEIGHT,
            transform: [{ translateY: this.state.bounceValue }],
          }}
        >
          {this.props.content}
        </Animated.View>
      </Animated.View>
    );
  }
}

module.exports = SuperModal;
