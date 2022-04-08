import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
});

export { styles };
