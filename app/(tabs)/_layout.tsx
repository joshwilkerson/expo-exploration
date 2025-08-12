import { blue, neutral } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: blue[50],
        headerStyle: {
          backgroundColor: neutral[10],
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              color={color}
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerTitle: "Tasks",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              color={color}
              name={focused ? "clipboard-sharp" : "clipboard-outline"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}
