import React from "react";
import { render } from "@testing-library/react-native";
import { ClerkProvider } from "@clerk/clerk-expo";
import Page from "../sign-in";
import * as SecureStore from "expo-secure-store";
import "jest";

jest.mock("@clerk/clerk-expo", () => ({
  ...jest.requireActual("@clerk/clerk-expo"),
  useSignIn: () => ({
    signIn: {
      create: jest.fn(),
    },
    setActive: jest.fn(),
    isLoaded: true,
  }),
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

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

describe("Page Component", () => {
  it("renders the UI elements correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Page />
      </ClerkProvider>
    );

    expect(getByText("Welcome Again!")).toBeTruthy();

    expect(getByPlaceholderText("Email...")).toBeTruthy();
    expect(getByPlaceholderText("Password...")).toBeTruthy();

    expect(getByText("Sign In!")).toBeTruthy();
  });

  it("renders input fields with correct placeholders", () => {
    const { getByPlaceholderText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Page />
      </ClerkProvider>
    );

    expect(getByPlaceholderText("Email...")).toBeTruthy();
    expect(getByPlaceholderText("Password...")).toBeTruthy();
  });

  it("renders the Sign In button", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Page />
      </ClerkProvider>
    );

    expect(getByText("Sign In!")).toBeTruthy();
  });
});
