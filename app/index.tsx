import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function IndexScreen() {
  const { isLoaded, userId, sessionId, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-pmedium">IndexScreenss</Text>
      <Link href="/landing" className="text-blue-500">
        <Text>Login Screen</Text>
      </Link>
      <Link href="/(home)" className="text-blue-500">
        <Text>Clerk Screen</Text>
      </Link>
      <Pressable onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
      <Text> {userId ? `Hello ${userId}` : "please login first"}</Text>
    </View>
  );
}
