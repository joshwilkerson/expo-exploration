import { StyleSheet } from "react-native"
import { neutral } from "./colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: neutral[10],
  },
  text: {
    fontSize: 40,
    color: "#fff",
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
})
