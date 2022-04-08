import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import MainButton from "@buttons/MainButton/MainButton";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

import { expect, it, jest } from "@jest/globals";

it("renders MainButton correctly", async () => {
  render(<MainButton />);
});
