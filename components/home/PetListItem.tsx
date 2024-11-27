import { View, Text, Image } from "react-native";
import React from "react";

export default function PetListItem({ item }: { item: any }) {
  return (
    <View className="mr-5 bg-white rounded-sm p-2">
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 150, height: 150 }}
        className="object-cover rounded-sm"
      />
      <Text className="font-pmedium text-lg">{item.name}</Text>
      <View className="flex-row justify-between">
        <Text className="font-pregular text-sm text-gray-500">
          {item.breed}
        </Text>
        <Text className="font-pregular text-sm ">{item.age} years old</Text>
      </View>
    </View>
  );
}
