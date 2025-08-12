import { ColorSchemeName } from "react-native"
import { blue, neutral } from "./colors"

export const getTheme = (colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark"
  return {
    background: isDark ? neutral[0] : neutral[80],
    text: {
      primary: isDark ? neutral[100] : neutral[10],
      secondary: isDark ? neutral[70] : neutral[30],
      link: isDark ? blue[40] : blue[60],
    },
    navigation: {
      headerBackground: isDark ? neutral[0] : neutral[80],
      headerText: isDark ? neutral[100] : neutral[10],
      tabBarBackground: isDark ? neutral[10] : neutral[100],
      tabBarBorder: isDark ? neutral[20] : neutral[80],
      tabBarActiveText: isDark ? blue[50] : blue[50],
      tabBarInactiveText: isDark ? neutral[50] : neutral[30],
    },
  }
}

export type Theme = ReturnType<typeof getTheme>
