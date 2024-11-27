import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/home/Header";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import Slider from "@/components/home/slider";
import ListByCategory from "@/components/home/ListByCategory";

export default function home() {
  const user = useUser();

  if (user.isSignedIn === false) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <View className="mt-10 p-5">
      <Header />
      <Slider />
      <ListByCategory />
    </View>
  );
}
