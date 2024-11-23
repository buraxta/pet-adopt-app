import { SignedOut, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, View, SafeAreaView } from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

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
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {/* <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      /> */}
      <Input
        variant="outline"
        size="xl"
        className="w-[90%] mb-4"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </Input>

      <Input
        variant="outline"
        size="xl"
        className="w-[90%] mb-4"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </Input>

      <Button
        size="md"
        variant="solid"
        action="primary"
        className="bg-black w-[90%] mb-4 "
        onPress={onSignInPress}
      >
        <ButtonText className="text-white">Sign In!</ButtonText>
      </Button>

      <View className="w-full justify-center flex-row gap-3">
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-blue-600">Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
