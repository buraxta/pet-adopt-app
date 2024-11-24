import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        // Hata durumunda Alert ile kullanıcıya bilgi ver
        Alert.alert(
          "Sign In Failed",
          "There was an issue signing you in. Please check your credentials and try again.",
          [{ text: "OK" }]
        );
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      // Hata durumunda Alert ile kullanıcıya bilgi ver
      Alert.alert("Error", err.errors[0].message, [{ text: "OK" }]);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView className="flex-1 ">
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@/assets/images/login-bg.png")}
        className="w-full h-full justify-center items-center"
      >
        <View className="-mt-[10rem]">
          <Text className="font-pbold text-4xl text-red-800">
            Welcome Again!
          </Text>
          <Text className="text-xl">Please enter your email and password.</Text>
          <Image
            source={require("@/assets/images/catlogo.png")}
            className="w-52 object-contain h-52 mx-auto"
            resizeMode="contain"
          />
        </View>

        <Input
          variant="outline"
          size="xl"
          className="w-[90%] mb-4 bg-white rounded-full h-[4.5rem] "
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            className="ml-3"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </Input>

        <Input
          variant="outline"
          size="xl"
          className="w-[90%] mb-4  bg-white rounded-full h-[4.5rem] "
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            value={password}
            className="ml-3"
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </Input>

        <Button
          size="md"
          variant="solid"
          action="primary"
          className="bg-yellow-500 w-[90%] mb-4 rounded-full mt-5 h-[4rem] "
          onPress={onSignInPress}
        >
          <ButtonText className="text-white font-pbold">Sign In!</ButtonText>
        </Button>

        <View className="w-full justify-center flex-row gap-3 mt-2">
          <Text className="font-pbold text-slate-800">
            Don't have an account?
          </Text>
          <Link href="/sign-up">
            <Text className="text-blue-600 font-pbold">Sign up!</Text>
          </Link>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
