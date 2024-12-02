import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { toggleFavorite } from "@/libs/addFav";
import { checkFavorite } from "@/libs/favChecker";

export default function FavoriteHeart({
  id,
  className,
  color = "black",
}: {
  id: string;
  className?: string;
  color?: string;
}) {
  const [isFav, setIsFav] = useState<boolean | null>(null);
  const user = useUser();
  const email = user.user?.emailAddresses[0]?.emailAddress;

  const handleFavorite = async () => {
    if (email) {
      await toggleFavorite(email, id as string);
      setIsFav((isFav) => !isFav);
    } else {
      console.error("User email is undefined");
    }
  };

  useEffect(() => {
    const checkFav = async () => {
      const fav = await checkFavorite(email as string, id as string);
      setIsFav(fav);
    };
    checkFav();
  }, [id]);

  return (
    <View className={className}>
      {isFav ? (
        <Pressable onPress={handleFavorite}>
          <AntDesign name="heart" size={25} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={handleFavorite}>
          <AntDesign name="hearto" size={25} color={color} />
        </Pressable>
      )}
    </View>
  );
}
