import {
  View,
  Text,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Input, InputField } from "@/components/ui/input";
import { upload } from "cloudinary-react-native";
import { cld } from "@/libs/cloudinary";
import RNPickerSelect from "react-native-picker-select";
import { useUser } from "@clerk/clerk-expo";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function index() {
  // const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { user } = useUser();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [about, setAbout] = useState("");
  const router = useRouter();

  // const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "100%", "100%"], []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    try {
      await upload(cld, {
        file: image,
        callback: (error: any, response: any) => {
          console.log("response", response.url);
          setImageUrl(response.url);
        },
      });
      // const response = await axios.post(
      //   "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      //   formData
      // );
      Alert.alert("Başarılı!", `Resim yüklendi: `);
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Resim yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const petData = {
      category,
      name,
      age,
      breed,
      sex,
      address,
      imageUrl,
      about,
      user: {
        email: user?.emailAddresses[0].emailAddress,
        name: user?.fullName,
        imageUrl: user?.imageUrl,
      },
    };

    try {
      await upload(cld, {
        file: image,
        callback: async (error: any, response: any) => {
          console.log("response", response.url);
          await addDoc(collection(db, "Pets"), {
            ...petData,
            imageUrl: response.url,
          });

          setImageUrl(response.url);
          if (error) {
            console.error("Error uploading image: ", error);
            alert("Failed to upload image.");
          }
        },
      });
      Alert.alert("Pet information saved successfully!", "", [
        { text: "OK", onPress: () => router.replace("/(tabs)/home") },
      ]);
    } catch (error) {
      console.error("Error saving pet information: ", error);
      alert("Failed to save pet information.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 5 }}>
        {/* <GestureHandlerRootView className="flex-1 bg-transparent"> */}
        {/* <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
            <BottomSheetView className="flex-1 "> */}
        <KeyboardAvoidingView
          className=" flex-1 "
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              columnGap: 10,
              padding: 5,
              paddingTop: 20,
              gap: 10,
            }}
          >
            <Text className="text-3xl font-pmedium mt-10">Add New Pet</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="w-full flex justify-center items-center"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
              ) : (
                <View className="relative">
                  <Image
                    source={require("@/assets/images/image.png")}
                    style={{ width: 150, height: 150, borderRadius: 10 }}
                  />
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="black"
                    className="absolute right-2 top-3"
                  />
                </View>
              )}
            </TouchableOpacity>
            <Input
              variant="rounded"
              size="xl"
              className="mt-5 "
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                className="bg-white "
                placeholder="Name"
                onChange={(e) => setName(e.nativeEvent.text)}
              />
            </Input>
            <Input
              variant="rounded"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                className="bg-white pl-5"
                placeholder="Age"
                inputMode="numeric"
                keyboardType="numeric"
                onChange={(e) => setAge(e.nativeEvent.text)}
              />
            </Input>
            <Input
              variant="rounded"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                className="bg-white pl-5"
                placeholder="Gender (Male | Female)"
                onChange={(e) => setSex(e.nativeEvent.text)}
              />
            </Input>
            <Input
              variant="rounded"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                className="bg-white pl-5"
                placeholder="Breed"
                onChange={(e) => setBreed(e.nativeEvent.text)}
              />
            </Input>

            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: "Dog", value: "Dogs" },
                { label: "Cat", value: "Cats" },
                { label: "Bird", value: "Birds" },
                { label: "Fish", value: "Fishes" },
              ]}
              placeholder={{
                label: "Select a category",
              }}
              style={{
                viewContainer: {
                  backgroundColor: "white",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "gray",
                },
              }}
            />
            <TextInput
              multiline
              numberOfLines={2}
              placeholder="About your pet"
              onChange={(e) => setAbout(e.nativeEvent.text)}
              style={{
                height: 100,
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                textAlignVertical: "top", // Aligns text to the top
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
            {/* <Button
            title="Save"
            onPress={handleSave}
            disabled={uploading}
            color={"blue"}
          /> */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={uploading}
              className="flex-row mt-5 bg-sky-200 p-5 gap-3 items-center border border-dashed border-sky-600 rounded-lg justify-center"
            >
              <Text className="text-xl font-pmedium text-sky-700">
                Add New Pet
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* </BottomSheetView>
          </BottomSheet> */}
        {/* </GestureHandlerRootView> */}
      </SafeAreaView>
    </ImageBackground>
  );
}
