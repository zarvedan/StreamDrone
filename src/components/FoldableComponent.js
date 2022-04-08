import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
// import * as Animatable from "react-native-animatable";
import CustomIcon from "./CustomIcon";
import SuperView from "@screens//SuperView.js";

let totalWidth = Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2;
let columnWidth = totalWidth * 0.19;

const PIC_MARGIN = Constants.MAIN_MARGIN / 2;
const PIC_WIDTH = Constants.DEVICE_WIDTH / 3 - PIC_MARGIN * 3;
const PIC_HEIGHT = PIC_WIDTH * 1.3;
const LEFT_MARGIN = Constants.DEVICE_WIDTH * 0.15;

class FoldableComponent extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    content: PropTypes.any.isRequired,
    title: PropTypes.string,
    unfolded: PropTypes.bool,
    unfold: PropTypes.func,
    isFilter: PropTypes.bool,
    isSettings: PropTypes.bool,
    headerBackgroundColor: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(props.unfolded ? 0 : 1),
      isComponentFolded: !props.unfolded,
    };
  }

  foldComponent() {
    this.animateFolding(Boolean(this.state.isComponentFolded) ? 1 : 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.unfolded == this.state.isComponentFolded) {
      this.setState({ isComponentFolded: !nextProps.unfolded });
      this.animateFolding(Boolean(!nextProps.unfolded) ? 1 : 0);
    }
  }

  animateFolding(value) {
    Animated.timing(this.state.spinValue, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
    }).start();

    this.setState({ isComponentFolded: !this.state.isComponentFolded });
  }

  // render() {
  //   return (
  //     <View>
  //       {this.state.isComponentFolded ? null : (
  //         <Animatable.View
  //           animation={"fadeInDown"}
  //           delay={0}
  //           duration={250}
  //           useNativeDriver
  //           onAnimationEnd={() => null}
  //           style={{
  //             marginTop: Constants.MAIN_MARGIN,
  //           }}
  //         >
  //           {this.props.content}
  //         </Animatable.View>
  //       )}
  //     </View>
  //   );
  // }
  render() {
    return <View>{this.state.isComponentFolded ? null : null}</View>;
  }
}

module.exports = FoldableComponent;
