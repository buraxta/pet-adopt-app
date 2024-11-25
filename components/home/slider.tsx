import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState<any[]>([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      setSliderList((sliterList) => [...sliterList, doc.data()]);
    });
  };

  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={{
                width: Dimensions.get("screen").width * 0.9,
                height: 180,
                borderRadius: 16,
                marginRight: 15,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
