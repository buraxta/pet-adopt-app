import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const user = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);

  // useEffect(() => {
  //   setMessages([
  //     //@ts-ignore
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback(async (newMessage: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    newMessage[0].createdAt = moment().format("MM-DD-YY HH:mm:ss") as any;
    await addDoc(
      collection(db, "Chats", id as string, "Messages"),
      newMessage[0]
    );
  }, []);

  const navigation = useNavigation();

  const getUserDetails = async () => {
    const docRef = doc(db, "Chats", id as string);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users.filter(
      (item: any) => item?.email !== user.user?.emailAddresses[0].emailAddress
    );
    navigation.setOptions({ title: otherUser[0]?.name });
  };

  useEffect(() => {
    getUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, "Chats", id as string, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData as IMessage[]);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      key={id as string}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user.user?.emailAddresses[0].emailAddress as string,
        name: user.user?.username as string,
        avatar: user.user?.imageUrl,
      }}
    />
  );
}
