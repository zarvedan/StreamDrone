import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Constants from "@constants";
import Colors from "@colors";
import { fontStyles } from "@fonts";

import CustomIcon from "../../CustomIcon";

const SIDE_MARGIN = 10;
const CANCEL_ICON_SIZE = 20;
const CANCEL_ICON_PADDING = Constants.MAIN_MARGIN;
const TITLE_HEIGHT = 25;

export default class CustomTextInput extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    icon: PropTypes.string,
    customPlaceholder: PropTypes.string,
    title: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    focusMethod: PropTypes.func,
    hasError: PropTypes.bool,
    customHeight: PropTypes.number,
    customWidth: PropTypes.number,
    transparent: PropTypes.bool,
    noBorder: PropTypes.bool,
    mandatory: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isTextSecure: Boolean(this.props.secureTextEntry),
    };
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  onFocus() {
    if (this.props.focusMethod) this.props.focusMethod();
    this.setState({ isFocused: true });
  }

  renderClearButton() {
    if (this.props.value && this.props.value !== "")
      return (
        <TouchableOpacity
          onPress={() => {
            this.refs.inputRef.focus();
            this.props.onChangeText("");
          }}
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            top: this.props.title ? TITLE_HEIGHT : 0,
            right: 0,
            height: Constants.TEXT_INPUT_HEIGHT,
            width: Constants.TEXT_INPUT_HEIGHT,
          }}
        >
          <CustomIcon
            name={"cancel"}
            size={CANCEL_ICON_SIZE}
            color={Constants.GRAY_LIGHT3}
          />
        </TouchableOpacity>
      );
    else return null;
  }

  renderShowPasswordButton() {
    if (
      this.props.value &&
      this.props.value !== "" &&
      this.props.secureTextEntry
    )
      return (
        <TouchableOpacity
          onPress={() =>
            this.setState({ isTextSecure: !this.state.isTextSecure })
          }
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            right: Constants.TEXT_INPUT_HEIGHT,
            width: Constants.TEXT_INPUT_HEIGHT,
            height: Constants.TEXT_INPUT_HEIGHT,
          }}
        >
          <CustomIcon
            name={"visibility"}
            size={CANCEL_ICON_SIZE}
            color={
              this.state.isTextSecure
                ? Constants.TRANSLUCENT_GRAY
                : Constants.NAWAK_SECONDARY_COLOR
            }
          />
        </TouchableOpacity>
      );
    else return null;
  }

  render() {
    let isFocused = this.state.isFocused;

    let rightMargin = SIDE_MARGIN;
    if (this.props.value && this.props.value !== "")
      rightMargin +=
        (CANCEL_ICON_SIZE + CANCEL_ICON_PADDING) *
        (Boolean(this.props.secureTextEntry) ? 2 : 1);

    return (
      <View
        style={[
          {
            width: this.props.customWidth
              ? this.props.customWidth
              : Constants.MAIN_BUTTON_WIDTH,
            height:
              Constants.TEXT_INPUT_HEIGHT +
              (this.props.title ? TITLE_HEIGHT : 0) +
              Constants.MAIN_MARGIN / 2,
          },
        ]}
      >
        {this.props.title ? (
          <Text
            style={[
              fontStyles.normalFontStyle,
              {
                height: TITLE_HEIGHT,
              },
            ]}
          >
            {this.props.title}
            {this.props.mandatory ? (
              <Text
                style={[
                  fontStyles.normalFontStyle,
                  { color: Colors.STREAM_DRONE_ORANGE },
                ]}
              >
                {" *"}
              </Text>
            ) : null}
          </Text>
        ) : null}
        <TextInput
          {...this.props}
          placeholderTextColor={
            this.props.hasError && this.props.noBorder
              ? Colors.TROCR_PRIMARY_COLOR
              : Colors.PLACEHOLDER_GRAY
          }
          secureTextEntry={this.state.isTextSecure}
          ref={"inputRef"}
          style={[
            fontStyles.normalFontStyle,
            {
              backgroundColor: this.props.transparent
                ? "transparent"
                : Colors.TEXT_INPUT_BACKGROUND_COLOR,
              borderRadius: Constants.MAIN_MARGIN,
              borderRightWidth: this.props.noBorder ? 0 : 1,
              borderColor: isFocused
                ? Colors.STREAM_DRONE_BLUE
                : Colors.STREAM_DRONE_ORANGE,
              borderWidth: this.props.noBorder ? 0 : 1.5,
              width: "100%",
              height: Constants.TEXT_INPUT_HEIGHT,
              overflow: "hidden",
              paddingLeft: Constants.MAIN_MARGIN / 2,
              paddingRight:
                this.props.value == ""
                  ? 0
                  : CANCEL_ICON_SIZE + CANCEL_ICON_PADDING * 2,
            },
          ]}
          blurOnSubmit={false}
          onFocus={() => {
            this.onFocus();
          }}
          onBlur={() => {
            this.onBlur();
          }}
        />
        <Text
          style={[
            fontStyles.normalFontStyle,
            {
              overflow: "hidden",
              right: rightMargin,
              color: this.props.hasError
                ? Colors.TROCR_PRIMARY_COLOR
                : Colors.PLACEHOLDER_GRAY,
            },
          ]}
        >
          {this.props.customPlaceholder}
        </Text>
        {this.renderClearButton()}
        {this.renderShowPasswordButton()}
      </View>
    );
  }
}
