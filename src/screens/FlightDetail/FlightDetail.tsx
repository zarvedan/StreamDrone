import React, { useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import Utils from "@utils";
import Constants from "@constants";
import Fonts, { fontStyles } from "@fonts";

import Loader from "@components/Loader.js";
import MainTopBar from "@components/topbars/MainTopBar/MainTopBar";
import CustomImageBackground from "@components/CustomImageBackground.js";
import UserLineInfos from "@components/UserLineInfos/UserLineInfos";
import MainButton from "@components/buttons/MainButton/MainButton";
import Flight from "interfaces/Flight";

function FlightDetail(props) {
  const [showLoader, setShowLoader] = useState(false);
  const [flight, setFlight] = useState<Flight>(props.flight);

  const renderLine = (title: string, text: string) => {
    return (
      <Text style={fontStyles.boldFontStyle}>
        {title + " : "} <Text style={fontStyles.normalFontStyle}>{text}</Text>
      </Text>
    );
  };

  const renderFlightDetail = () => {
    return (
      <>
        <UserLineInfos {...props.user} />

        <Text style={fontStyles.titleOrange}>{flight.name}</Text>
        <View
          style={{
            width: Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2,
            marginBottom: Constants.MAIN_MARGIN * 2,
          }}
        >
          {renderLine(
            "Plage horaire",
            flight.start_date + " - " + flight.end_date
          )}
          {renderLine("Act. part.", flight.activity_name)}
          {renderLine("Scénario opérationnel", flight.scenario_name)}
          {renderLine("Aéronef utillisé", "todo quel champ ?")}
        </View>
        <MainButton
          title={"Documents joints"}
          onPress={() => Utils.showInfo("todo comment les récupérer ?")}
          icon={"add"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
        />
        <MainButton
          title={"Contrôles avant vol"}
          onPress={() => Utils.showInfo("todo comment les récupérer ?")}
          icon={"add"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
        />
        <MainButton
          title={"Rapatrier les données de vol"}
          onPress={() => Utils.showInfo("todo")}
        />
      </>
    );
  };

  return (
    <>
      <MainTopBar
        user={props.user}
        onClose={() => Utils.closeModal(props.componentId)}
      />
      <CustomImageBackground content={renderFlightDetail()} />
      {showLoader ? <Loader /> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(FlightDetail);
