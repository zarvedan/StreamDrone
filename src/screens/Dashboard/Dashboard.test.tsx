import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Dashboard from "@screens/Dashboard/Dashboard";

import { expect, it, jest } from "@jest/globals";
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

it("renders Dashboard correctly", async () => {
  render(<Dashboard />);
});

it("Dashboard buttons are defined", async () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText("Missions")).toBeDefined();
});
