import { ClerkProvider } from "@clerk/clerk-expo";
import { render } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";
import Index from "../index";
import { NavigationContainer } from "@react-navigation/native";

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

export const Link = ({ children }) => children; // Mock Link
export const router = {
  replace: jest.fn(),
};

jest.mock("expo-router", () => ({
  Link: ({ children }) => children,
  router: {
    replace: jest.fn(),
  },
}));

describe("Inbox Component", () => {
  it("should render Inbox text ", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </ClerkProvider>
    );

    expect(
      getByText("Let's adopt a pet and make lifelong companions!")
    ).toBeTruthy();
  });

  it("should No conversations found  text ", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Index />
      </ClerkProvider>
    );

    expect(getByText("Looking for a New Buddy?")).toBeTruthy();
  });

  it("should No conversations found  text ", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Index />
      </ClerkProvider>
    );

    expect(getByText("Get Started")).toBeTruthy();
  });
});
