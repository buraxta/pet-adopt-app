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
} from "react-native";
import React, { useState } from "react";
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
      alert("Pet information saved successfully!");
    } catch (error) {
      console.error("Error saving pet information: ", error);
      alert("Failed to save pet information.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 5 }}>
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
          className=" "
        >
          <Text className="text-3xl font-pmedium">Add New Pet</Text>
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
              <Image
                source={require("@/assets/images/image.png")}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
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
              placeholder="Sex"
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
          <Button
            title="Save"
            onPress={handleSave}
            disabled={uploading}
            color={"blue"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
