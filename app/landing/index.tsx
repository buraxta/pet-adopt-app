import { Link, Stack } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView className=" h-full flex-1 ">
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        className="w-full h-full"
      >
        <Stack.Screen options={{ headerShown: false }} />

        <Image
          source={require("@/assets/images/login.jpg")}
          className="w-full h-1/2 object-cover  "
        />
        <View className="items-center mt-2">
          <Text className="text-[2.5rem] text-sky-950 font-outfit-medium text-center w-[90%] font-pbold mt-10 shadow-2xl">
            Looking for a New Buddy?
          </Text>

          <Text className="mt-2 font-outfit text-[1.5rem] text-center  font-pregular w-full  ">
            Let's adopt a pet and make lifelong companions!
          </Text>
        </View>
        <Link
          href={"/(tabs)/home"}
          className="bg-yellow-500 w-[80%] h-[50px] rounded-full mt-10 mx-auto pt-2 border-[1px] border-black"
        >
          <Text className="text-white text-[1.5rem] font-outfit-bold font-pbold text-center ">
            Get Started
          </Text>
        </Link>
      </ImageBackground>
    </SafeAreaView>
  );
}
