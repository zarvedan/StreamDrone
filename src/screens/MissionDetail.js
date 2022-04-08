import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import Utils from "@utils";
import Constants from "@constants";
import api from "@api";
import Fonts, { fontStyles } from "@fonts";

import Loader from "@components/Loader.js";
import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import CustomImageBackground from "@components/CustomImageBackground.js";
import UserLineInfos from "@components/UserLineInfos/UserLineInfos";
import MainButton from "@buttons/MainButton/MainButton";

function MissionDetail(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [flightsList, setFlightsList] = useState([]);

  const getMissionDetail = (flightId) => {
    if (flightId) {
      api.getMissionDetail(flightId).then((response) => {
        setShowLoader(false);
        if (Utils.isApiReturnOK(response)) {
          setFlightsList(response.data);
        }
      });
    }
  };

  const renderItem = (item) => (
    <MainButton
      title={item.name}
      width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
      onPress={() => Utils.displayModal("FlightDetail", { flight: item })}
      icon={"search"}
    />
  );

  const renderMissions = () => {
    return (
      <View
        style={{
          alignItems: "center",
          width: Constants.DEVICE_WIDTH,
        }}
      >
        <UserLineInfos {...props.user} />
        <Text style={fontStyles.titleBlue}>{props.missionName}</Text>
        <Text style={fontStyles.titleOrange}>{"VOLS DU JOUR"}</Text>
        {flightsList.map((item) => renderItem(item))}
      </View>
    );
  };

  useEffect(() => {
    getMissionDetail(props.flightId);
  }, []);

  return (
    <>
      <MainTopBar
        user={props.user}
        onClose={() => Utils.closeModal(props.componentId)}
      />
      <CustomImageBackground content={renderMissions()} />
      {showLoader ? <Loader /> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(MissionDetail);
