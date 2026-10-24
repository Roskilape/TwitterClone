import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";

const AuthRoutesLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default AuthRoutesLayout;
