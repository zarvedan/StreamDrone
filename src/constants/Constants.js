import { Platform, Dimensions, PixelRatio } from "react-native";

const isProd = true;
const apiUrl = isProd
  ? "https://api.demo.drone-geofencing.com/"
  : "https://api.demo.drone-geofencing.com/";
const mainMargin = 20;
const orgLogoSize = 90;

export default {
  IS_DEBUG: false,
  // HAS_NOTCH: DeviceInfo.hasNotch(),
  IS_PROD: isProd,
  API_VERSION: "1.0",
  LOCALE: "fr-FR",

  // SIZES
  DEVICE_WIDTH: Dimensions.get("window").width,
  DEVICE_HEIGHT: Dimensions.get("window").height,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  MAIN_MARGIN: mainMargin,
  //MAIN BUTTON
  MAIN_BUTTON_HEIGHT: 45,
  MAIN_BUTTON_BOTTOM_MARGIN: mainMargin * 2,
  MAIN_BUTTON_WIDTH: Dimensions.get("window").width * 0.7,
  TEXT_INPUT_HEIGHT: 45,
  //API
  API_URL: apiUrl,
  CGU_URL: "https://trocr.com/cgu",
  // DEFAULT PREFERENCE -> STORED IN USER'S DEVICE
  USER_STORED_KEY: "USER_STORED_KEY",

  //ALERTS
  ALERT_WIDTH: Dimensions.get("window").width * 0.85,

  //TOP BAR
  TOP_BAR_BUTTON_ICON_SIZE: 40,
  LOGO_ONLY_HEIGHT: 50,
  TOP_BAR_BUTTON_COLOR: "white",
  TOP_BAR_HEIGHT: Platform.OS === "ios" ? 64 : 66,
  STATUS_BAR_HEIGHT: (Platform.OS === "ios" ? 20 : 30) + mainMargin,

  CUSTOM_TOP_BAR_HEIGHT: orgLogoSize,
  ORG_LOGO_SIZE: orgLogoSize,
  TAB_BAR_HEIGHT: 40,

  GOOGLE_API_KEY: "AIzaSyAfIUMQfBkDHEVa6M7dRx9e-TTz5GOu1T8",
  GEOCODING_GOOGLE_URL: "https://maps.google.com/maps/api/geocode/json",

  //RNN
  LOGIN_STACK_ID: "loginStack",
  MAIN_STACK_ID: "mainStack",
  MENU_ID: "menu",

  //DEEPLINKS
  DEEPLINK: "deepLink",

  SHADOW_STYLE: {
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowColor: "#141F36",
    shadowRadius: 5,
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
    elevation: 2,
  },
  STATUS_BAR: {
    visible: true,
    backgroundColor: "transparent",
    style: "light",
    drawBehind: true,
  },
  STATUS_BAR_DARK: {
    visible: true,
    backgroundColor: "transparent",
    style: "dark",
    drawBehind: true,
  },
  STATUS_BAR_LIGHT: {
    visible: true,
    backgroundColor: "transparent",
    style: "light",
    drawBehind: true,
  },
  ANIMATION_OPTIONS: {
    push: {
      waitForRender: true,
      content: {
        x: {
          from: 1000,
          to: 0,
          duration: 500,
          interpolation: "accelerate",
        },
        alpha: {
          from: 0,
          to: 1,
          duration: 500,
          interpolation: "accelerate",
        },
      },
    },

    pop: {
      waitForRender: true,
      content: {
        x: {
          from: 0,
          to: 1000,
          duration: 500,
          interpolation: "decelerate",
        },
        alpha: {
          from: 1,
          to: 0,
          duration: 500,
          interpolation: "decelerate",
        },
      },
    },
  },
};
