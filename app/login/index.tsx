import { Stack } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView className=" h-full">
      <Stack.Screen options={{ headerShown: false }} />

      <Image
        source={require("@/assets/images/login.png")}
        className="w-full h-1/2 object-cover "
      />
      <View className="items-center mt-5">
        <Text className="text-[2.5rem] font-outfit-medium text-center w-[90%] font-pmedium">
          Looking for a New Buddy?
        </Text>

        <Text className="mt-5 font-outfit text-[1.5rem] text-center  font-pregular w-full  ">
          Let's adopt a pet and make lifelong companions!
        </Text>
      </View>
      <Pressable className="bg-green-900 w-[80%] h-[50px] rounded-full mt-10 mx-auto items-center justify-center">
        <Text className="text-white text-[1.5rem] font-outfit-bold font-pbold">
          Get Started
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
