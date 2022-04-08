// module.exports = {
//   verbose: true,
//   testURL: "http://localhost/",
//   transform: {},
// };
module.exports = {
  preset: "react-native",
  verbose: true,
  testURL: "http://localhost/",
  haste: {
    defaultPlatform: "ios",
    platforms: ["android", "ios", "native"],
  },

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  transformIgnorePatterns: ["node_modules/(?!@react-native|react-native)"],
  // transformIgnorePatterns: [
  //   "node_modules/(?!react-native|@react-native-community/async-storage|native-base-shoutem-theme|@shoutem/animation|@shoutem/ui|tcomb-form-native)",
  // ],
  // transformIgnorePatterns: [
  //   "node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.)|@react-native-community/(.)|@react-navigation/(.*))",
  // ],
  // setupFiles: ["<rootDir>/node_modules/react-native/jest/setup.js"],

  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
