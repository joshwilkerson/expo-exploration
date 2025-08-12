import { Stack } from "expo-router"
import { StatusBar } from "react-native"

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
