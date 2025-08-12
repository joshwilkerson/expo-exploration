import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useTheme } from "@/constants/hooks"

export default function TabsLayout() {
  const theme = useTheme()
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.navigation.tabBarActiveText,
        tabBarInactiveTintColor: theme.navigation.tabBarInactiveText,
        tabBarStyle: {
          backgroundColor: theme.navigation.tabBarBackground,
          borderTopColor: theme.navigation.tabBarBorder,
        },
        headerStyle: {
          backgroundColor: theme.navigation.headerBackground,
        },
        headerShadowVisible: false,
        headerTintColor: theme.navigation.headerText,
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
