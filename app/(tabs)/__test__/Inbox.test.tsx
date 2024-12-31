import { ClerkProvider } from "@clerk/clerk-expo";
import { render } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";
import Inbox from "../inbox";
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
describe("Inbox Component", () => {
  it("should render Inbox text ", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Inbox />
      </ClerkProvider>
    );

    expect(getByText("Inbox")).toBeTruthy();
  });
  it("should No conversations found  text ", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Inbox />
      </ClerkProvider>
    );

    expect(getByText("No conversations found")).toBeTruthy();
  });
});
