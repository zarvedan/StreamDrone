import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Y_VALUE = -1000;

class SuperAlert extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    actionAfterClose: PropTypes.func,
    content: PropTypes.object.isRequired,
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
      if (this.props.onClose) this.props.onClose();
      if (this.props.actionAfterClose) this.props.actionAfterClose();
    }, 1000);
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
          height: Constants.SCREEN_HEIGHT,
        }}
      >
        <AnimatedTouchable
          activeOpacity={1}
          style={{
            width: "100%",
            height: "100%",
            opacity,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Constants.LIGHTBOX_BACKGROUND,
          }}
          onPress={this.close.bind(this)}
        >
          <Animated.View
            style={{
              transform: [{ translateY: this.state.bounceValue }],
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: Constants.DEVICE_WIDTH,
              top: Constants.SCREEN_HEIGHT * 0.3,
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  Constants.SHADOW_STYLE,
                  {
                    width: Constants.ALERT_WIDTH,
                    borderRadius: Constants.MAIN_MARGIN * 2,
                    borderColor: Constants.STREAM_DRONE_ORANGE,
                    borderWidth: 1.5,
                    backgroundColor: "white",
                    padding: Constants.MAIN_MARGIN * 2,
                  },
                ]}
              >
                {this.props.content}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </AnimatedTouchable>
      </Animated.View>
    );
  }
}
module.exports = SuperAlert;
