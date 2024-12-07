import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function UserItem({ userInfo }: { userInfo: any }) {
  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View className="flex-row gap-3 items-center">
        <Image
          source={{ uri: userInfo.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text className="text-black font-pmedium text-xl">
          {userInfo.name} asdasd
        </Text>
      </View>
    </Link>
  );
}
