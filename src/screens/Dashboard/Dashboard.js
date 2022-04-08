import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import Constants from "@constants";
import Utils from "@utils";

import MainButton from "@buttons/MainButton/MainButton";
import MainTopBar from "@components/topbars/MainTopBar/MainTopBar";
import CustomImageBackground from "@components/CustomImageBackground.js";
import { fontStyles } from "@fonts";

function Dashboard(props) {
  const renderDash = () => {
    return (
      <View
        style={{ alignItems: "center", marginTop: Constants.MAIN_MARGIN * 2 }}
      >
        <Text style={fontStyles.titleBlue}>{"Bienvenue"}</Text>
        <Text style={fontStyles.titleOrange}>
          {props.user.first_name + " " + props.user.last_name}
        </Text>

        <MainButton
          onPress={() => Utils.displayModal("MissionsOfTheDay")}
          title={"Missions du jour"}
        />
        <MainButton
          onPress={() => Utils.displayModal("NewMission")}
          title={"Nouvelle mission"}
        />
        <MainButton onPress={() => Utils.showInfo("todo")} title={"Planning"} />
        {/* <MainButton
          onPress={() => Utils.displayModal("AddressView")}
          title={"geoloc"}
        /> */}
      </View>
    );
  };

  return (
    <View>
      <MainTopBar user={props.user} noBack />
      <CustomImageBackground content={renderDash()} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
