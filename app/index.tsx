import { View, Text } from "react-native";
import React from "react";
import { useRootNavigationState, Redirect } from "expo-router";

export default function IndexPage() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={"/landing"} />;
}
