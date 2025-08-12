import { Stack } from "expo-router"
import { StatusBar, useColorScheme } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  
  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
