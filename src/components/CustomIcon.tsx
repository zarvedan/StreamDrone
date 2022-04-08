import React from "react";
import Constants from "@constants";
import Icon from "react-native-vector-icons/MaterialIcons";
export default (props) => {
  if (!props.name) return null;
  else
    return (
      <Icon
        name={props.name}
        size={props.size ?? Constants.TOP_BAR_BUTTON_ICON_SIZE}
        color={props.color ?? "white"}
      />
    );
};
