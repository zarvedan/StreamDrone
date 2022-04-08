import "react-native";
import React from "react";
import { expect, it, jest } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";

import Login from "./Login";
import { configureStore } from "@redux";
const initialUserState = {};
// jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
const store = configureStore(initialUserState);

it("renders Login Screen correctly", async () => {
  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  expect(getByText("Connexion")).toBeDefined();
  expect(getByPlaceholderText("Email")).toBeDefined();
  expect(getByPlaceholderText("Mot de passe")).toBeDefined();
  expect(getByText("Se connecter")).toBeDefined();
  expect(getByText("Mot de passe oublié ?")).toBeDefined();
});
