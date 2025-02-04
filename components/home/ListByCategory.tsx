import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function ListByCategory() {
  const [petList, setPetList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPetList = async (category: string) => {
    setIsLoading(true);
    setPetList([]);
    const q = query(
      collection(db, "Pets"),
      where("category", "==", category ?? "Cats")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, { id: doc.id, ...doc.data() }]);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getPetList("Cats");
  }, []);

  return (
    <View>
      <Category category={getPetList} />
      <FlatList
        horizontal
        refreshing={isLoading}
        onRefresh={() => getPetList("Dogs")}
        className="mt-4"
        showsHorizontalScrollIndicator={false}
        data={petList}
        renderItem={({ item, index }) => (
          <PetListItem key={index} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
