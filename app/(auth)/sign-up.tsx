import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import * as React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        return router.replace("/(tabs)/home");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@/assets/images/login-bg.png")}
        className="w-full h-full justify-center items-center"
      >
        <View className="-mt-[10rem]">
          <Text className="font-pbold text-4xl text-red-800">Welcome!</Text>
          <Text className="text-xl">
            {pendingVerification
              ? "Please enter the code sent to your email."
              : "Please enter your email and password."}
          </Text>
          <Image
            source={require("@/assets/images/catlogo.png")}
            className="w-52 object-contain h-52 mx-auto"
            resizeMode="contain"
          />
        </View>
        {!pendingVerification && (
          <>
            {/* <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          /> */}
            <Input
              variant="outline"
              size="xl"
              className="w-[90%] mb-4 bg-white rounded-full h-[4.5rem] "
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={emailAddress}
                className="ml-3"
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
            </Input>
            {/* <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> */}
            <Input
              variant="outline"
              size="xl"
              className="w-[90%] mb-4 bg-white rounded-full h-[4.5rem] "
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={password}
                placeholder="Password..."
                className="ml-3"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </Input>
            {/* <Button title="Sign Up" onPress={onSignUpPress} /> */}
            <Button
              size="md"
              variant="solid"
              action="primary"
              className="bg-yellow-500 w-[90%] mb-4 rounded-full mt-5 h-[4rem] "
              onPress={onSignUpPress}
            >
              <ButtonText className="text-white font-pbold">
                Sign up!
              </ButtonText>
            </Button>
          </>
        )}
        {pendingVerification && (
          <>
            {/* <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          /> */}
            <Input
              variant="outline"
              size="xl"
              className="w-[90%] mb-4 bg-white rounded-full h-[4.5rem] "
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={code}
                className="ml-3"
                placeholder="Code..."
                secureTextEntry={true}
                onChangeText={(code) => setCode(code)}
              />
            </Input>
            {/* <Button title="Verify Email" onPress={onPressVerify} /> */}
            <Button
              size="md"
              variant="solid"
              action="primary"
              className="bg-yellow-500 w-[90%] mb-4 rounded-full mt-5 h-[4rem] "
              onPress={onPressVerify}
            >
              <ButtonText className="text-white font-pbold">
                Verify Email
              </ButtonText>
            </Button>
          </>
        )}
        <View className="w-full justify-center flex-row gap-3 mt-2">
          <Text className="font-pbold text-slate-800">
            Already have an account
          </Text>
          <Link href="/sign-in">
            <Text className="text-blue-600 font-pbold">Sign in!</Text>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}
