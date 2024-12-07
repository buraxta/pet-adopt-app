import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function profile() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/landing");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <View className="p-5 mt-5">
      <View className="w-full  items-center mt-16">
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="mt-3 font-pbold"> {user?.username}</Text>
        <Text> {user?.emailAddresses[0].emailAddress}</Text>
      </View>
      <View className="mt-28">
        <Link
          className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
          href="/addNewPet"
          asChild
        >
          <Pressable>
            <MaterialIcons name="pets" size={24} color={"#0369a1"} />
            <Text className="text-xl font-pmedium text-sky-700">
              Add New Pet
            </Text>
          </Pressable>
        </Link>
        <Link
          className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
          href="/favorite"
          asChild
        >
          <Pressable>
            <Entypo name="heart" size={24} color="#0369a1" />
            <Text className="text-xl font-pmedium text-sky-700">Favorites</Text>
          </Pressable>
        </Link>
        <Link
          className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
          href="/user-post"
          asChild
        >
          <Pressable>
            <AntDesign name="book" size={24} color="black" />
            <Text className="text-xl font-pmedium text-sky-700">My Post</Text>
          </Pressable>
        </Link>
        <Link
          className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
          href="/inbox"
          asChild
        >
          <Pressable>
            <Entypo name="mail" size={24} color="#0369a1" />
            <Text className="text-xl font-pmedium text-sky-700">Inbox</Text>
          </Pressable>
        </Link>
        <Pressable
          className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
          onPress={handleSignOut}
        >
          <Entypo name="log-out" size={24} color="#0369a1" />
          <Text className="text-xl font-pmedium text-sky-700">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

// import { View, Text, Pressable } from "react-native";
// import React from "react";
// import { Link, router } from "expo-router";
// import { useAuth } from "@clerk/clerk-expo";

// export default function profile() {
//   const { signOut } = useAuth();

//   return (
//     <View className="p-5 mt-5">
//       <Text>profile</Text>
//       <Link href={"/(auth)/sign-in"} className="mt-5 bg-red-400 p-5">
//         Sign In
//       </Link>
//       <Pressable onPress={handleSignOut} className=" p-5 bg-gray-500 mt-5">
//         <Text>Sign Out</Text>
//       </Pressable>
//     </View>
//   );
// }
