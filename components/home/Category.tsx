import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function Category({
  category,
}: {
  category: (category: string) => void;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategories((categories) => [...categories, doc.data()]);
    });
  };

  return (
    <View className="mt-5  ">
      <Text className="font-pmedium text-2xl">Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.imageUrl}
        numColumns={4}
        renderItem={({ item, index }) => (
          <Pressable
            className="flex-1 "
            onPress={() => {
              category(item.name);
              setSelectedCategory(item.name);
            }}
          >
            <View
              key={index}
              className={`bg-sky-200 p-4 items-center border  rounded-2xl border-gray-600 m-1 ${
                selectedCategory === item.name ? "bg-pink-400" : ""
              }`}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text className="text-center font-pregular">{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
