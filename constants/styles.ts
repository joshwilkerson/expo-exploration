import { StyleSheet } from "react-native"
import { getTheme, Theme } from "./theme"

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    text: {
      fontSize: 40,
      color: theme.text.primary,
    },
    link: {
      fontSize: 20,
      textDecorationLine: "underline",
      color: theme.text.link,
    },
  })
}
export const styles = createStyles(getTheme("dark"))
