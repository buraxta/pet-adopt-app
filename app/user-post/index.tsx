import { View, Text, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "@/components/home/PetListItem";

export default function index() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [postList, setPostList] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  const getPosts = async () => {
    setLoader(true);
    setPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("user.email", "==", user?.emailAddresses[0]?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPostList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoader(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deletePost(id),
      },
    ]);
  };

  const deletePost = async (docId: string) => {
    await deleteDoc(doc(db, "Pets", docId));
    getPosts();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Post",
    });
    user && getPosts();
  }, [user]);

  return (
    <View>
      <FlatList
        data={postList}
        numColumns={2}
        onRefresh={getPosts}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View className="p-2">
            <PetListItem key={index} item={item} />
            <Pressable
              onPress={() => handleDelete(item.id)}
              className="bg-red-400 p-2 rounded-md mt-2 mx-2 "
              //   style={{ marginHorizontal: 5 }}
            >
              <Text className="font-pregular text-center text-white">
                Delete
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center mt-10">No post found</Text>
        }
      />
    </View>
  );
}
