import { View, Text, Image, Pressable } from "react-native";

import { Link } from "expo-router";
import FavoriteHeart from "../FavoriteHeart";

export default function PetListItem({ item }: { item: any }) {
  return (
    <Link href={`/petdetails/${item.id}`} asChild>
      <Pressable
        className="bg-white  rounded-xl mr-3 relative "
        style={{ padding: 10 }}
      >
        <FavoriteHeart
          id={item.id}
          className="absolute z-10 w-10 right-0 top-[8px]"
          color="red"
        />
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
      </Pressable>
    </Link>
  );
}
