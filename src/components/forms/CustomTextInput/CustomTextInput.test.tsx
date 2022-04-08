import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import CustomTextInput from "@components/forms/CustomTextInput/CustomTextInput";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

import { expect, it, jest } from "@jest/globals";

it("renders CustomTextInput correctly", async () => {
  render(<CustomTextInput />);
});
