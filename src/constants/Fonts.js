import { PixelRatio, StyleSheet } from "react-native";

import Colors from "@colors";
import Constants from "@constants";

const normalFont = "Montserrat-Regular";
const boldFont = "Montserrat-Bold";
const fontColor = "#141F36";

const pixelRatio = PixelRatio.get();
let fontRatio = 1;
switch (pixelRatio) {
  case 1:
    fontRatio = 0.9;
    break;
  case 1.5:
    fontRatio = 0.95;
    break;
  case 2:
    fontRatio = 1;
    break;
  case 3:
    fontRatio = 1;
    break;
  case 3.5:
    fontRatio = 1.3;
    break;
  default:
}

const bigFontSize = 24 * fontRatio;

const fontStyles = StyleSheet.create({
  boldFontStyle: {
    color: fontColor,
    fontSize: 16 * fontRatio,
    fontFamily: boldFont,
    lineHeight: 24,
  },
  normalFontStyle: {
    color: fontColor,
    fontSize: 16 * fontRatio,
    fontFamily: normalFont,
    lineHeight: 24,
  },
  titleFontStyle: {
    color: fontColor,
    fontSize: 20 * fontRatio,
    fontFamily: boldFont,
    lineHeight: 33,
    marginBottom: Constants.MAIN_MARGIN,
  },
  titleOrange: {
    fontSize: bigFontSize,
    lineHeight: 33,
    color: Colors.STREAM_DRONE_ORANGE,
    marginTop: Constants.MAIN_MARGIN,
    marginBottom: Constants.MAIN_MARGIN,
  },
  titleBlue: {
    fontSize: bigFontSize,
    lineHeight: 33,
    color: Colors.STREAM_DRONE_BLUE,
    marginTop: Constants.MAIN_MARGIN,
    marginBottom: Constants.MAIN_MARGIN,
    width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 4,
    textAlign: "center",
  },
});
export { fontStyles };

export default {
  NORMAL_FONT: normalFont,
  BOLD_FONT: boldFont,
  BIG_FONT_SIZE: bigFontSize,
  NORMAL_FONT_SIZE: 16 * fontRatio,
  MEGA_BIG_FONT_SIZE: 30 * fontRatio,
  SMALL_FONT_SIZE: 12 * fontRatio,
  TITLE_FONT_SIZE: 16 * fontRatio,
  MAIN_BUTTON_TEXT_SIZE: 13 * fontRatio,
  MENU_BUTTON_FONT_SIZE: 13 * fontRatio,
  IN_APP_NOTIF_FONT_SIZE: 17 * fontRatio,
};
