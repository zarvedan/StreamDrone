import { applyMiddleware, combineReducers, createStore } from "redux";
import Constants from "@constants";
import DefaultPreference from "react-native-default-preference";

// actions
const USER_UPDATE = "USER_UPDATE";

export function updateUser(newUser) {
  // console.log({ reduxupdateUser: newUser });
  DefaultPreference.set(
    Constants.USER_STORED_KEY,
    JSON.stringify(newUser)
  ).then();
  return { type: USER_UPDATE, newUser };
}

// reducer with initial state
const initialUserState = {};

// reducers
export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        user: action.newUser,
      };
      break;

    default:
      return state;
      break;
  }
};

export const reducers = combineReducers({
  userReducer,
});

// store
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
