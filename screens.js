const { Navigation } = require("react-native-navigation");

import React from "react";
//Screens
import Dashboard from "@screens/Dashboard/Dashboard";
import Login from "@screens/Login/Login";
import Cgu from "@screens/Cgu";
import LostPassword from "@screens/LostPassword";
import AddressView from "@screens/AddressView";
import ChangePassword from "@screens/ChangePassword";
import SuperModal from "@screens/SuperModal";
import EditUserView from "@screens/EditUserView";
import PdfView from "@screens/PdfView";
import MissionsOfTheDay from "@screens/MissionsOfTheDay";
import NewMission from "@screens/NewMission";
import MissionDetail from "@screens/MissionDetail";
import Settings from "@screens/Settings";
import Menu from "@screens/Menu/Menu";
import FlightDetail from "@screens/FlightDetail/FlightDetail";

//Alerts
import SimpleAlert from "@screens/alerts/SimpleAlert";
//Components
import MainTopBar from "@topbars/MainTopBar/MainTopBar";
import MainButton from "@buttons/MainButton/MainButton";
import InAppNotif from "@components/InAppNotif";

//Reactotron
import "./src/ReactotronConfig";
//Redux
import { Provider } from "react-redux";
import { store } from "@redux";

//*****************
//Register screens
//*****************

//VIEWS
function registerScreens() {
  Navigation.registerComponent(
    `Dashboard`,
    () => (props) =>
      (
        <Provider store={store}>
          <Dashboard {...props} />
        </Provider>
      ),
    () => Dashboard
  );
  Navigation.registerComponent(
    `Login`,
    () => (props) =>
      (
        <Provider store={store}>
          <Login {...props} />
        </Provider>
      ),
    () => Login
  );
  Navigation.registerComponent("Cgu", () => Cgu);
  Navigation.registerComponent(
    `EditUserView`,
    () => (props) =>
      (
        <Provider store={store}>
          <EditUserView {...props} />
        </Provider>
      ),
    () => EditUserView
  );
  Navigation.registerComponent(
    `AddressView`,
    () => (props) =>
      (
        <Provider store={store}>
          <AddressView {...props} />
        </Provider>
      ),
    () => AddressView
  );
  Navigation.registerComponent(
    `ChangePassword`,
    () => (props) =>
      (
        <Provider store={store}>
          <ChangePassword {...props} />
        </Provider>
      ),
    () => ChangePassword
  );
  Navigation.registerComponent(
    `InAppNotif`,
    () => (props) =>
      (
        <Provider store={store}>
          <InAppNotif {...props} />
        </Provider>
      ),
    () => InAppNotif
  );
  Navigation.registerComponent(
    `LostPassword`,
    () => (props) =>
      (
        <Provider store={store}>
          <LostPassword {...props} />
        </Provider>
      ),
    () => LostPassword
  );
  Navigation.registerComponent(
    `Superview`,
    () => (props) =>
      (
        <Provider store={store}>
          <Superview {...props} />
        </Provider>
      ),
    () => Superview
  );
  Navigation.registerComponent("SuperModal", () => SuperModal);
  Navigation.registerComponent(`MainButton`, () => MainButton);
  Navigation.registerComponent(
    `PdfView`,
    () => (props) =>
      (
        <Provider store={store}>
          <PdfView {...props} />
        </Provider>
      ),
    () => PdfView
  );
  Navigation.registerComponent(
    `MissionsOfTheDay`,
    () => (props) =>
      (
        <Provider store={store}>
          <MissionsOfTheDay {...props} />
        </Provider>
      ),
    () => MissionsOfTheDay
  );
  Navigation.registerComponent(
    `NewMission`,
    () => (props) =>
      (
        <Provider store={store}>
          <NewMission {...props} />
        </Provider>
      ),
    () => NewMission
  );
  Navigation.registerComponent(
    `MainTopBar`,
    () => (props) =>
      (
        <Provider store={store}>
          <MainTopBar {...props} />
        </Provider>
      ),
    () => MainTopBar
  );
  Navigation.registerComponent(
    `Settings`,
    () => (props) =>
      (
        <Provider store={store}>
          <Settings {...props} />
        </Provider>
      ),
    () => Settings
  );
  Navigation.registerComponent(
    `MissionDetail`,
    () => (props) =>
      (
        <Provider store={store}>
          <MissionDetail {...props} />
        </Provider>
      ),
    () => MissionDetail
  );

  Navigation.registerComponent("Menu", () => Menu);
  Navigation.registerComponent(
    `FlightDetail`,
    () => (props) =>
      (
        <Provider store={store}>
          <FlightDetail {...props} />
        </Provider>
      ),
    () => FlightDetail
  );
}

//ALERTS
Navigation.registerComponent(
  `SimpleAlert`,
  () => (props) =>
    (
      <Provider store={store}>
        <SimpleAlert {...props} />
      </Provider>
    ),
  () => SimpleAlert
);

module.exports = {
  registerScreens,
};
