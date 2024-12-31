import { ClerkProvider } from "@clerk/clerk-expo";
import { render } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";
import "jest";

import Profile from "../profile";
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

describe("Profile Component", () => {
  it("should render user's image", () => {
    const { getByTestId } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    const userImage = getByTestId("user-image");
    expect(userImage).toBeTruthy();
  });

  it("should render 'Add New Pet' link", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    expect(getByText("Add New Pet")).toBeTruthy();
  });

  it("should render 'Favorites' link", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    expect(getByText("Favorites")).toBeTruthy();
  });

  it("should render 'My Post' link", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    expect(getByText("My Post")).toBeTruthy();
  });

  it("should render 'Inbox' link", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    expect(getByText("Inbox")).toBeTruthy();
  });

  it("should render 'Logout' button", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    expect(getByText("Logout")).toBeTruthy();
  });

  it("should trigger sign-out when 'Logout' is pressed", () => {
    const { getByText } = render(
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Profile />
      </ClerkProvider>
    );

    const logoutButton = getByText("Logout");
  });
});
