import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import MainTopBar from "@topbars/MainTopBar/MainTopBar";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

import { expect, it, jest } from "@jest/globals";

it("renders MainTopBar correctly", async () => {
  render(<MainTopBar />);
});
