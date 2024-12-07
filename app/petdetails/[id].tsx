import FavoriteHeart from "@/components/FavoriteHeart";
import { db } from "@/config/FirebaseConfig";
import { toggleFavorite } from "@/libs/addFav";
import { checkFavorite } from "@/libs/favChecker";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PetDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [readMore, setReadMore] = useState(true);
  const [petDetails, setPetDetails] = useState<any>(null);
  // const [isFav, setIsFav] = useState<boolean | null>(null);
  const user = useUser();

  useEffect(() => {
    const fetchPetDetails = async () => {
      const petDoc = doc(db, "Pets", Array.isArray(id) ? id[0] : id);
      const petSnapshot = await getDoc(petDoc);
      if (petSnapshot.exists()) {
        setPetDetails(petSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchPetDetails();
  }, [id]);

  const initiateChat = async () => {
    const docId1 =
      user?.user?.emailAddresses[0].emailAddress +
      "_" +
      petDetails?.user?.email;
    const docId2 =
      petDetails?.user?.email +
      "_" +
      user?.user?.emailAddresses[0].emailAddress;

    const q = query(
      collection(db, "Chats"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });

    if (querySnapshot.empty) {
      await setDoc(doc(db, "Chats", docId1), {
        id: docId1,
        users: [
          {
            email: user?.user?.emailAddresses[0].emailAddress,
            imageUrl: user?.user?.imageUrl,
            name: user?.user?.fullName,
          },
          {
            email: petDetails?.user?.email,
            imageUrl: petDetails?.user?.imageUrl,
            name: petDetails?.user?.name,
          },
        ],
        userIds: [
          user?.user?.emailAddresses[0].emailAddress,
          petDetails?.user?.email,
        ],
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <ScrollView className="flex-1 mb-20  ">
        <Image
          src={petDetails?.imageUrl}
          style={{ width: Dimensions.get("window").width, height: 300 }}
          className="rounded-br-lg"
        />
        <View className="p-5">
          <View className="flex-row justify-between">
            <Text className="text-2xl font-pbold">{petDetails?.name}</Text>
            {/* {isFav ? (
              <Pressable onPress={handleFavorite}>
                <AntDesign name="heart" size={30} color="red" />
              </Pressable>
            ) : (
              <Pressable onPress={handleFavorite}>
                <AntDesign name="hearto" size={30} color="black" />
              </Pressable>
            )} */}
            <FavoriteHeart id={id as string} />
          </View>
          <Text>{petDetails?.address}</Text>
        </View>
        <View className="mx-3 p-5 gap-3">
          <View className="flex-row gap-3">
            <FeatureCard title="Age" value={petDetails?.age + " Years"} />
            <FeatureCard title="Breed" value={petDetails?.breed} />
          </View>
          <View className="flex-row gap-3">
            <FeatureCard title="Sex" value={petDetails?.sex} />
            <FeatureCard title="Color" value="Brown" />
          </View>
        </View>

        <View>
          <Text className="mx-7 mb-2 text-xl font-pmedium">
            About {petDetails?.name}
          </Text>
          <View className=" mx-7 pb-2 ">
            <Text numberOfLines={readMore ? 3 : 20} className="font-pregular">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
              totam rem maxime? Blanditiis vel suscipit facilis itaque omnis
              doloremque, molestias ea enim quia aspernatur eos. Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Sapiente totam rem
              maxime? Blanditiis vel suscipit facilis itaque omnis doloremque,
              molestias ea enim quia aspernatur eos. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Sapiente totam rem maxime?
              Blanditiis vel suscipit facilis itaque omnis doloremque, molestias
              ea enim quia aspernatur eos. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Sapiente totam rem maxime?
              Blanditiis vel suscipit facilis itaque omnis doloremque, molestias
              ea enim quia aspernatur eos.
            </Text>
            {readMore ? (
              <Pressable onPress={() => setReadMore(false)}>
                <Text className="text-blue-600 font-pmedium text-right">
                  Read More...
                </Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setReadMore(true)}>
                <Text className="text-slate-900 font-pmedium text-right">
                  Read Less
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View className="mt-8 pb-5">
          <View className="mx-7 p-2 shadow-md rounded-xl bg-white flex-row gap-5 justify-between items-center">
            <View className="flex-row gap-5 items-center">
              <View className="rounded-full w-14 h-14 border">
                <Image
                  source={{ uri: petDetails?.user?.imageUrl }}
                  className="w-full h-full rounded-full"
                />
              </View>
              <View>
                <Text>Owner Name</Text>
                <Text>Pet Owner</Text>
              </View>
            </View>
            <Feather name="send" size={24} color="#ec499e" className="mr-3" />
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full">
        <TouchableOpacity
          onPress={initiateChat}
          className="w-full h-20 bg-sky-300 items-center justify-center "
        >
          <Text className="text-center w-full font-pbold text-xl">
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const FeatureCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-row gap-5 bg-white w-48 items-center rounded-xl shadow-md p-2">
      <View>
        <Fontisto name="date" size={24} color="black" />
      </View>
      <View>
        <Text className="text-xl font-pmedium">{title}</Text>
        <Text className="text-lg">{value}</Text>
      </View>
    </View>
  );
};
