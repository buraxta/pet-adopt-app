import PetListItem from "@/components/home/PetListItem";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

export default function Favorite() {
  const [favPets, setFavPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  if (!user) {
    return <Text>Loading user data...</Text>;
  }

  const email = user?.emailAddresses[0]?.emailAddress ?? "";

  useEffect(() => {
    getData();
  }, [email]);

  const getData = async () => {
    if (!email) return;

    // Create a real-time listener for the user document
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("email", "==", email));

    const unsubscribeUser = onSnapshot(userQuery, async (userSnapshot) => {
      if (!userSnapshot.empty) {
        userSnapshot.forEach(async (userDoc) => {
          const userData = userDoc.data();
          const favoriteIds = userData?.favorites || [];

          if (favoriteIds.length > 0) {
            // Create a real-time listener for the favorite pets
            const petsRef = collection(db, "Pets");
            const petsQuery = query(
              petsRef,
              where(documentId(), "in", favoriteIds)
            );

            const unsubscribePets = onSnapshot(petsQuery, (petsSnapshot) => {
              const pets: any[] = [];
              petsSnapshot.forEach((petDoc) => {
                pets.push({ id: petDoc.id, ...petDoc.data() });
              });

              setFavPets(pets);
              setLoading(false);
            });

            // Return the unsubscribe function for pets listener
            return () => unsubscribePets();
          } else {
            setFavPets([]);
            setLoading(false);
          }
        });
      } else {
        console.log("User with email not found!");
        setFavPets([]);
        setLoading(false);
      }
    });

    // Return the unsubscribe function for user listener
    return () => unsubscribeUser();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="pt-10  flex-1 ">
      {/* <View className="w-full h-[250px] overflow-hidden">
        <Image
          source={require("../../assets/images/favorite.webp")}
          className="w-full h-[400px] object-cover absolute top-10" // Pozisyon ayarı yapar
        />
      </View> */}
      <View className="">
        <Text className="p-5 font-pbold text-xl">Favorites</Text>
      </View>

      <FlatList
        data={favPets}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 0,
          alignItems: "center",
          rowGap: 10,
        }}
        onRefresh={getData}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <PetListItem key={item.id} item={item} />}
      />
    </View>
  );
}
