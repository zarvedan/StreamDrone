import Constants from "@constants";

import { create } from "apisauce";
import DefaultPreference from "react-native-default-preference";
import Reactotron from "reactotron-react-native";
import Utils from "@utils";

var userId = "";
const TIMEOUT = 20000;
//Variable api appelée pour StreamDrone
const apiStreamDrone = create({
  baseURL: Constants.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Content-Language": Constants.LOCALE,
    "Api-Version": Constants.API_VERSION,
  },
  timeout: TIMEOUT,
});
apiStreamDrone.addMonitor(Reactotron.apisauce);

const apiStreamDroneLogin = create({
  baseURL: Constants.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Content-Language": Constants.LOCALE,
    "Api-Version": Constants.API_VERSION,
  },
  timeout: TIMEOUT,
});
apiStreamDroneLogin.addMonitor(Reactotron.apisauce);

var api = {
  // setToken() {
  //   apiStreamDrone.setHeaders({
  //     "X-Auth-Token": "Token " + Utils.getToken(this.userId),
  //   });
  // },
  setToken(token) {
    apiStreamDrone.setHeaders({
      authorization: token,
    });
  },
  // setUserId(userId) {
  //   this.userId = userId;
  // },
  //****************************
  // API CALLS
  //****************************

  login(basicAuthToken, body) {
    apiStreamDroneLogin.setHeaders({
      Authorization: basicAuthToken,
    });
    return apiStreamDroneLogin.post("auth/login", body);
  },
  getMissionsOfTheDay() {
    return apiStreamDrone.get("stream-drone/flight-request/all");
  },
  getMissionDetail(flightId) {
    return apiStreamDrone.get(
      "stream-drone/flight-request/site/all/" + flightId
    );
  },
  lostPassword(body) {
    return apiStreamDrone.post("auth/recovery", body);
  },
  logout(body) {
    return apiStreamDrone.post("logout", body);
  },

  changePassword(body) {
    return apiStreamDrone.post("login/password/change", body);
  },
  editUserProfile(body) {
    return apiStreamDrone.put("user/profile", body);
  },
  editUserAvatar(body) {
    return apiStreamDrone.put("user/avatar", body);
  },

  contact(body) {
    return apiStreamDrone.post("contact", body);
  },
};

export default api;
