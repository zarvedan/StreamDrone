import React, { useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import Utils from "@utils";
import Fonts, { fontStyles } from "@fonts";
import Constants from "@constants";

import MainButton from "@buttons/MainButton/MainButton";
import CustomImageBackground from "@components/CustomImageBackground.js";
import UserLineInfos from "@components/UserLineInfos/UserLineInfos";
import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import Loader from "@components/Loader.js";

function Settings(props) {
  const [showLoader, setShowLoader] = useState(false);

  const renderItem = (item) => (
    <MainButton
      title={item.name}
      width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
      onPress={() => Utils.showInfo("todo")}
    />
  );

  const renserSettings = () => {
    return (
      <View
        style={{
          alignItems: "center",
          width: Constants.DEVICE_WIDTH,
        }}
      >
        <UserLineInfos {...props.user} />
        <Text style={fontStyles.titleOrange}>{"Paramètres"}</Text>
        <MainButton
          title={"Import de données télépilote"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
          onPress={() => Utils.showInfo("todo")}
        />
        <MainButton
          title={"Import de données mission"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
          onPress={() => Utils.showInfo("todo")}
        />
        <MainButton
          title={"Nettoyage du cache"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
          onPress={() => Utils.showInfo("todo est-ce utile ?")}
        />
        <MainButton
          title={"Conditions générales (CGU)"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
          onPress={() => Utils.showInfo("todo url ?")}
        />
        <MainButton
          title={"Mentions légales"}
          width={Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2}
          onPress={() => Utils.showInfo("todo url ?")}
        />
      </View>
    );
  };

  return (
    <>
      <MainTopBar
        user={props.user}
        onClose={() => Utils.closeModal(props.componentId)}
        cross
      />
      <CustomImageBackground content={renserSettings()} />
      {showLoader ? <Loader /> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Settings);
