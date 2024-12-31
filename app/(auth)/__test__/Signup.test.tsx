import * as SecureStore from "expo-secure-store";
import React from "react";
import { render } from "@testing-library/react-native";
import { ClerkProvider } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import SignUpScreen from "../sign-up";
import "jest";

jest.mock("@clerk/clerk-expo", () => ({
  ...jest.requireActual("@clerk/clerk-expo"),
  useSignUp: () => ({
    signUp: {
      create: jest.fn(),
      prepareEmailAddressVerification: jest.fn(),
      attemptEmailAddressVerification: jest.fn(),
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
      return item;
    } catch (error) {
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

describe("SignUpScreen Component", () => {
  it("renders UI elements correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <NavigationContainer>
          <SignUpScreen />
        </NavigationContainer>
      </ClerkProvider>
    );

    expect(getByText("Welcome!")).toBeTruthy();
    expect(getByPlaceholderText("Username...")).toBeTruthy();
    expect(getByPlaceholderText("Email...")).toBeTruthy();
    expect(getByPlaceholderText("Password...")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password...")).toBeTruthy();
    expect(getByText("Sign up!")).toBeTruthy();
    expect(getByText("Already have an account")).toBeTruthy();
    expect(getByText("Sign in!")).toBeTruthy();
  });

  it("renders SignUp screen with all necessary components", () => {
    const { getByText, getByPlaceholderText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <NavigationContainer>
          <SignUpScreen />
        </NavigationContainer>
      </ClerkProvider>
    );

    expect(getByText("Welcome!")).toBeTruthy();
    expect(getByPlaceholderText("Email...")).toBeTruthy();
    expect(getByPlaceholderText("Password...")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password...")).toBeTruthy();
    expect(getByText("Sign up!")).toBeTruthy();
    expect(getByText("Already have an account")).toBeTruthy();
    expect(getByText("Sign in!")).toBeTruthy();
  });
});
