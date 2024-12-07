import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "@/components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any[]>([]);
  const [otherUserList, setOtherUserList] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  const getUserList = async () => {
    setUserList([]);
    try {
      setLoader(true);
      const q = query(
        collection(db, "Chats"),
        where("userIds", "array-contains", user?.emailAddresses[0].emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const chats: any[] = [];

      querySnapshot.forEach((doc) => {
        chats.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserList(chats);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const getOtherUserList = () => {
    const otherUsers = userList
      .map((record) => {
        // Eğer 2 kullanıcı varsa
        if (record.users && record.users.length === 2) {
          // Mevcut kullanıcının email'i dışındaki kullanıcıyı bulun
          const otherUser = record.users.find(
            (u) => u.email !== user?.emailAddresses[0].emailAddress
          );

          return otherUser
            ? {
                docId: record.id,
                ...otherUser,
              }
            : null;
        }
        return null;
      })
      .filter(Boolean); // null olanları filtrele

    setOtherUserList(otherUsers);
  };

  useEffect(() => {
    getUserList();
  }, [user?.emailAddresses[0].emailAddress]);

  useEffect(() => {
    if (userList.length > 0) {
      getOtherUserList();
    }
  }, [userList]);

  return (
    <View className="p-5 mt-5">
      <Text className="font-pmedium text-xl">Inbox</Text>
      <FlatList
        refreshing={loader}
        onRefresh={getUserList}
        className="mt-5"
        data={otherUserList}
        renderItem={({ item }) => <UserItem userInfo={item} key={item.docId} />}
        keyExtractor={(item) => item.docId}
        ListEmptyComponent={
          <Text className="text-center mt-10">No conversations found</Text>
        }
      />
    </View>
  );
}
