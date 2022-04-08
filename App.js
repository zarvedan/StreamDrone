import { Platform } from "react-native";

import Constants from "@constants";
const { Navigation } = require("react-native-navigation");
const { registerScreens } = require("./screens");

function start() {
  registerScreens();
  if (Platform.OS == "ios")
    setTimeout(() => {
      startApp();
    }, 200);
  else startApp();
}

function startApp() {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: Constants.STATUS_BAR,
      topBar: {
        visible: false,
      },
      layout: {
        orientation: ["portrait"],
      },

      overlay: {
        interceptTouchOutside: true,
      },
      animations: {
        showModal: {
          waitForRender: true,
        },
        push: {
          enabled: true, // Optional, used to enable/disable the animation
          waitForRender: false,
        },
        pop: {
          waitForRender: true,
          enabled: true, // Optional, used to enable/disable the animation
        },
      },
      modalPresentationStyle: "fullScreen",
    }),
      Navigation.setRoot({
        root: {
          stack: {
            id: Constants.LOGIN_STACK_ID,
            children: [
              {
                component: {
                  name: "Login",
                  options: {
                    statusBar: Constants.STATUS_BAR,
                  },
                },
              },
            ],
          },
        },
      });
  });
}

module.exports = {
  start,
};
