import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
// import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const user = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      //@ts-ignore
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  const navigation = useNavigation();

  const getUserDetails = async () => {
    const docRef = doc(db, "Chats", id as string);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users.filter(
      (item: any) => item?.email !== user.user?.emailAddresses[0].emailAddress
    );
    navigation.setOptions({ title: otherUser[0]?.name });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    // <GiftedChat
    //   messages={messages}
    //   onSend={(messages) => onSend(messages)}
    //   user={{
    //     _id: 1,
    //   }}
    // />
    <Text>asd</Text>
  );
}
