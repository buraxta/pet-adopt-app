import { ClerkProvider } from "@clerk/clerk-expo";
import { render } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";
import Index from "../index";
const publishableKey =
  "pk_test_dW5pdGVkLWNvbmRvci02OC5jbGVyay5hY2NvdW50cy5kZXYk";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        return item;
      } else {
        console.log("No values stored under key: " + key);
        return null;
      }
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
      console.error("Error saving token: ", err);
    }
  },
};

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  useFonts: jest.fn().mockReturnValue([true]),
}));

describe("Index Component", () => {
  it("should render 'Add New Pet' link", () => {
    const { getByTestId } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Index />
      </ClerkProvider>
    );

    expect(getByTestId("add-new-pet")).toBeTruthy();
  });
});
