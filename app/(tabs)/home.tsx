import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Header from "@/components/home/Header";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import Slider from "@/components/home/slider";
import ListByCategory from "@/components/home/ListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      <TouchableOpacity className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-500 rounded-lg justify-center">
        <MaterialIcons name="pets" size={24} color={"#0369a1"} />
        <Text className="text-xl font-pmedium text-sky-700">Add New Pet</Text>
      </TouchableOpacity>
    </View>
  );
}
