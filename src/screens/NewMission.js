import React from "react";
import { View, Text, ScrollView, Keyboard } from "react-native";
import { connect } from "react-redux";

import Constants from "@constants";
import Fonts, { fontStyles } from "@fonts";
import Utils from "@utils";

import SuperView from "./SuperView.js";
import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";
import MainButton from "@buttons/MainButton/MainButton";
import Loader from "@components/Loader.js";
import UserLineInfos from "@components/UserLineInfos/UserLineInfos";
import CustomImageBackground from "@components/CustomImageBackground.js";

class NewMission extends SuperView {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      missionName: "",
      siteName: "",
      activity: "",
      aeronef: "",
      maxHeight: "",
      maxHorizontal: "",
      maxSpeed: "",
    };
  }

  renderNewMissionForm() {
    let customWidth = Constants.DEVICE_WIDTH - Constants.MAIN_MARGIN * 2;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: Constants.MAIN_MARGIN * 4,
        }}
      >
        <UserLineInfos {...this.props.user} />
        <Text style={fontStyles.titleOrange}>{"NOUVELLE MISSION"}</Text>

        <CustomTextInput
          title={"Nom de la mission"}
          ref={"missionNameRef"}
          value={this.state.missionName}
          placeholder={"Objectif de la mission"}
          onChangeText={(missionName) => this.setState({ missionName })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("siteNameRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />

        <CustomTextInput
          mandatory
          title={"Nom du site de vol"}
          ref={"siteNameRef"}
          value={this.state.siteName}
          placeholder={"Lieu du vol"}
          onChangeText={(siteName) => this.setState({ siteName })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("activityRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />

        <CustomTextInput
          mandatory
          title={"Activité particulière"}
          ref={"activityRef"}
          value={this.state.activity}
          placeholder={"Choisir une activité particulière"}
          onChangeText={(activity) => this.setState({ activity })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("aeronefRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />
        <CustomTextInput
          mandatory
          title={"Aéronef utilisé"}
          ref={"aeronefRef"}
          value={this.state.aeronef}
          placeholder={"Choisir l'aéronef utilisé"}
          onChangeText={(aeronef) => this.setState({ aeronef })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("maxHeightRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />
        <CustomTextInput
          mandatory
          title={"Hauteur maximale"}
          ref={"maxHeightRef"}
          value={this.state.maxHeight}
          placeholder={"120 m"}
          onChangeText={(maxHeight) => this.setState({ maxHeight })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("maxHorizontalRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />
        <CustomTextInput
          mandatory
          title={"Distance horizontale maximale"}
          ref={"maxHorizontalRef"}
          value={this.state.maxHorizontal}
          placeholder={"200 m"}
          onChangeText={(maxHorizontal) => this.setState({ maxHorizontal })}
          onSubmitEditing={(event) => {
            this.gotoNextInput("maxSpeedRef");
          }}
          returnKeyType={"next"}
          customWidth={customWidth}
        />
        <CustomTextInput
          mandatory
          title={"Vitesse maximale"}
          ref={"maxSpeedRef"}
          value={this.state.maxSpeed}
          placeholder={"Vitesse maximale d'évolution du drone"}
          onChangeText={(maxSpeed) => this.setState({ maxSpeed })}
          onSubmitEditing={(event) => {
            Keyboard.dismiss();
          }}
          returnKeyType={"done"}
          customWidth={customWidth}
        />
        <View style={{ height: Constants.MAIN_MARGIN }} />
        <MainButton
          onPress={() => Utils.showInfo("todo create mission")}
          title={"Rapatrier les données de vol"}
        />
      </ScrollView>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: Constants.SCREEN_HEIGHT,
          alignItems: "center",
        }}
      >
        <MainTopBar onClose={() => Utils.closeModal(this.props.componentId)} />
        <CustomImageBackground content={this.renderNewMissionForm()} />
        {this.state.showLoader ? <Loader /> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(NewMission);
