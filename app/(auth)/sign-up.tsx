import * as React from "react";
import { TextInput, View, SafeAreaView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

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
        router.replace("/");
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
    <SafeAreaView className="flex-1 justify-center items-center">
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
            className="w-[90%] mb-4"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              value={emailAddress}
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
          {/* <Button title="Sign Up" onPress={onSignUpPress} /> */}
          <Button
            size="md"
            variant="solid"
            action="primary"
            className="bg-black w-[90%] mb-4 "
            onPress={onSignUpPress}
          >
            <ButtonText className="text-white">Sign Up!</ButtonText>
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
            className="w-[90%] mb-4"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              value={code}
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
            className="bg-black w-[90%] mb-4 "
            onPress={onPressVerify}
          >
            <ButtonText className="text-white">Verify Email</ButtonText>
          </Button>
        </>
      )}
    </SafeAreaView>
  );
}
