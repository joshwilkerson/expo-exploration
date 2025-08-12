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
    imageContainer: {
      flex: 1,
      paddingTop: 28,
    },
    footerContainer: {
      alignItems: "center",
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
    heroImage: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
    optionsContainer: {
      paddingBottom: 40,
    },
    optionsRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 40,
    },
  })
}
export const styles = createStyles(getTheme("dark"))
