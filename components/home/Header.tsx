import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View className="flex-row justify-between  items-center ">
      <View className="items-start  justify-start">
        <Text className="text-[1rem] font-pmedium">Welcome,</Text>
        <Text className="text-2xl font-pmedium">{user?.username}</Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        className="w-20 h-20 rounded-full"
      />
    </View>
  );
}
