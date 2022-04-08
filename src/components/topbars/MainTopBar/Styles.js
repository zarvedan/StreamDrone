import { StyleSheet } from "react-native";
import Constants from "@constants";
import Colors from "@colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.STATUS_BAR_HEIGHT,
    backgroundColor: Colors.STREAM_DRONE_BLUE,
  },
  logoBig: {
    height: Constants.LOGO_ONLY_HEIGHT,
    width: Constants.DEVICE_WIDTH * 0.8,
  },
  logoSmall: {
    height: Constants.LOGO_ONLY_HEIGHT,
    width: Constants.DEVICE_WIDTH * 0.6,
  },
});

export { styles };
