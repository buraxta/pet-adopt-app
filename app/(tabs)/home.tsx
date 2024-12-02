import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import Slider from "@/components/home/slider";
import ListByCategory from "@/components/home/ListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { db } from "@/config/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function home() {
  const user = useUser();
  const [first, setFirst] = useState("");
  if (user.isSignedIn === false) {
    return <Redirect href="/sign-in" />;
  }

  useEffect(() => {
    const fetchPetDetails = async () => {
      const q = query(collection(db, "Users"), where("email", "==", "b@g.com"));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {});
    };
    fetchPetDetails();
  }, []);

  return (
    <View className="mt-10 p-5">
      <Header />
      <Slider />
      <ListByCategory />
      <TouchableOpacity className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center">
        <MaterialIcons name="pets" size={24} color={"#0369a1"} />
        <Link href="/addNewPet" asChild>
          <Pressable>
            <Text className="text-xl font-pmedium text-sky-700">
              Add New Pet
            </Text>
          </Pressable>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
