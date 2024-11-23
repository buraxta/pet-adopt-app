import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const router = useRouter(); // Navigation hook'u

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/sign-in"); // Oturum açmamışsa giriş sayfasına yönlendir
    } else {
      router.replace("/(home)"); // Oturum açmışsa ana sayfaya yönlendir
    }
  }, [user]);
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
}
