import { StyleSheet } from "react-native";
import Constants from "@constants";

const styles = StyleSheet.create({
  container: {
    width: Constants.DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
});

export { styles };
