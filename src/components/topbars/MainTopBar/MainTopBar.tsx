import React from "react";
import { View, TouchableOpacity } from "react-native";
import Constants from "@constants";
import CustomIcon from "@components/CustomIcon";
import FastImage from "react-native-fast-image";
import Utils from "@utils";
import { styles } from "./Styles";

export default (props) => {
  const renderLogoOnly = () => {
    return (
      <FastImage
        style={styles.logoBig}
        resizeMode="contain"
        source={require("@images/Logo_StreamDRONE_WhiteRedCouleur.png")}
      />
    );
  };

  const openMenu = () => {
    Utils.displayOverlay("Menu");
  };

  return (
    <View style={styles.container}>
      {props.noBack && props.noMenu ? (
        renderLogoOnly()
      ) : (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            flexDirection: "row",
            height: Constants.TOP_BAR_HEIGHT,
          }}
        >
          <TouchableOpacity
            onPress={
              props.onClose
                ? () => props.onClose()
                : () => Utils.showInfo("todo set action")
            }
            activeOpacity={props.noBack ? 1.0 : 0.8}
            style={{
              width: Constants.TOP_BAR_BUTTON_ICON_SIZE,
            }}
          >
            {props.noBack ? null : props.cross ? (
              <CustomIcon name={"close"} />
            ) : (
              <CustomIcon name={"chevron-left"} />
            )}
          </TouchableOpacity>
          <FastImage
            style={styles.logoSmall}
            resizeMode="contain"
            source={require("@images/Logo_StreamDRONE_WhiteRedCouleur.png")}
          />
          <TouchableOpacity
            onPress={() => (props.noMenu ? null : openMenu())}
            activeOpacity={props.noMenu ? 1.0 : 0.8}
            style={{
              width: Constants.TOP_BAR_BUTTON_ICON_SIZE,
            }}
          >
            {props.noMenu ? null : <CustomIcon name={"menu"} />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
