import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Menu from "@screens/Menu/Menu";

import { expect, it, jest } from "@jest/globals";
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

it("renders Menu correctly", async () => {
  render(<Menu />);
});

it("Menu ", async () => {
  const { getByText } = render(<Menu />);
  expect(getByText("Menu")).toBeDefined();
  expect(getByText("Paramètres")).toBeDefined();
  expect(getByText("Déconnexion")).toBeDefined();
});
