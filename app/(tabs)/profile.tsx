import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function profile() {
  const { signOut } = useAuth();
  return (
    <View className="p-5 mt-5">
      <Text>profile</Text>
      <Link href={"/(auth)/sign-in"} className="mt-5 bg-red-400 p-5">
        Sign In
      </Link>
      <Pressable onPress={() => signOut()} className=" p-5 bg-gray-500 mt-5">
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}
