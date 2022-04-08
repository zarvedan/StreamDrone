import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import CustomIcon from "../CustomIcon";
import SuperView from "@screens//SuperView.js";

export default class BackButtonTopBar extends SuperView {
  static propTypes = {
    navigator: PropTypes.object,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    transparent: PropTypes.bool,
    buttonColor: PropTypes.string,
    noImage: PropTypes.bool,
    editable: PropTypes.bool,
    editUser: PropTypes.func,
    logout: PropTypes.func,
    white: PropTypes.bool,
    qrcode: PropTypes.bool,
    isCross: PropTypes.bool,
    onQrCodeScanned: PropTypes.func,
  };

  close() {
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          padding: Constants.MAIN_MARGIN,
          paddingTop: Constants.STATUS_BAR_HEIGHT + Constants.MAIN_MARGIN,
        }}
      >
        <View
          style={{
            height: Constants.CUSTOM_TOP_BAR_HEIGHT,
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={this.close.bind(this)}>
              <CustomIcon
                name={this.props.isCross ? "close" : "back"}
                size={Constants.TOP_BAR_BUTTON_ICON_SIZE}
                color={this.props.white ? "white" : Constants.TROCR_BLACK}
              />
            </TouchableOpacity>

            {this.props.qrcode ? (
              <TouchableOpacity
                onPress={() =>
                  Utils.displayModal("QrCodeView", {
                    onQrCodeScanned: this.props.onQrCodeScanned.bind(this),
                  })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={[Constants.TITLE_FONT_STYLE, { marginRight: 8 }]}>
                  {"Scanner un QR Code"}
                </Text>
                <CustomIcon
                  name={"qr_code"}
                  size={Constants.TOP_BAR_BUTTON_ICON_SIZE}
                  color={Constants.FONT_COLOR}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text
            numberOfLines={1}
            style={[
              Constants.TITLE_FONT_STYLE,
              {
                fontSize: Constants.MEGA_BIG_FONT_SIZE,
                flexWrap: "wrap",
                paddingRight: Constants.MAIN_MARGIN,
              },
            ]}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}
