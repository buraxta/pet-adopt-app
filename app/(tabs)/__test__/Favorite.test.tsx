import { render, waitFor } from "@testing-library/react-native";
import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Favorite from "../favorite";
import "jest";

const publishableKey =
  "pk_test_dW5pdGVkLWNvbmRvci02OC5jbGVyay5hY2NvdW50cy5kZXYk";
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
describe("Favorite Component", () => {
  let mockOnSnapshot: jest.Mock;

  it("should render loading text when data is loading", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Favorite />
      </ClerkProvider>
    );

    expect(getByText("Loading user data...")).toBeTruthy();
  });
});
