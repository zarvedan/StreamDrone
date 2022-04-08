import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Constants from "@constants";
import { fontStyles } from "@fonts";
import { styles } from "./Styles";
import User from "interfaces/User";

export default (user: User) => {
  return (
    <View
      style={{
        width: Constants.DEVICE_WIDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Text style={fontStyles.normalFontStyle}>
          {user.first_name + " " + user.last_name + " todo avatar"}
        </Text>
      </View>
      {/* <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
          resizeMode={"cover"}
          source={{
            uri: Constants.API_URL + props.user.avatar,
          }}
        />  */}
    </View>
  );
};

// };
