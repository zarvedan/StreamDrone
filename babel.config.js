module.exports = {
  presets: ["module:metro-react-native-babel-preset"],

  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@assets": "./src/assets/",
          "@images": "./src/assets/images/",
          "@components": "./src/components/",
          "@screens": "./src/screens/",
          "@buttons": "./src/components/buttons/",
          "@topbars": "./src/components/topbars/",
          "@forms": "./src/components/forms/",
          "@api": "./src/requests/Api",
          "@redux": "./src/store/Redux",
          "@constants": "./src/constants/Constants",
          "@colors": "./src/constants/Colors",
          "@fonts": "./src/constants/Fonts",
          "@styles": "./src/constants/GlobalStyles",
          "@utils": "./src/utils/Utils",
        },
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".jsx",
          ".json",
          ".tsx",
          ".ts",
          ".native.js",
        ],
      },
    ],
  ],
};
