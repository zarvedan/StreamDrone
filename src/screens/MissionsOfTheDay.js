import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import api from "@api";
import Constants from "@constants";
import Utils from "@utils";
import Fonts, { fontStyles } from "@fonts";

import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import MainButton from "@buttons/MainButton/MainButton";
import Loader from "@components/Loader.js";
import CustomImageBackground from "@components/CustomImageBackground.js";
import UserLineInfos from "@components/UserLineInfos/UserLineInfos";

function MissionsOfTheDay(props) {
  const [showLoader, setShowLoader] = useState(true);
  const [missionsList, setMissionsList] = useState([]);

  const getMissionsOfTheDay = () => {
    api.getMissionsOfTheDay().then((response) => {
      setShowLoader(false);
      if (Utils.isApiReturnOK(response)) {
        setMissionsList(response.data);
      }
    });
  };

  const renderItem = (item) => (
    <MainButton
      key={item.id_flight_request}
      title={item.name}
      width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
      onPress={() =>
        Utils.displayModal("MissionDetail", {
          missionName: item.name,
          flightId: item.id_flight_request,
        })
      }
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
        <Text style={fontStyles.titleOrange}>{"MISSIONS DU JOUR"}</Text>
        {missionsList.map((item) => renderItem(item))}
      </View>
    );
  };

  useEffect(() => {
    console.log({ props11: props });
    console.log({ props22: props.user });
    getMissionsOfTheDay();
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

export default connect(mapStateToProps)(MissionsOfTheDay);
