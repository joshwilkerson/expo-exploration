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
      flex: 1 / 3,
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
      marginBottom: 24,
    },
    optionsRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 32,
    },
  })
}
export const styles = createStyles(getTheme("dark"))
