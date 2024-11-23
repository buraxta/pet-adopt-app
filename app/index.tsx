import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function IndexScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-pmedium">IndexScreenss</Text>
      <Link href="/login" className="text-blue-500">
        <Text>Login Screen</Text>
      </Link>
    </View>
  );
}
