import { useTheme } from "@/constants/hooks"
import { Theme } from "@/constants/theme"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { ComponentProps } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

type ButttonProps = {
  label: string
  theme?: "primary" | "secondary"
  iconLeft?: ComponentProps<typeof FontAwesome>["name"]
  iconRight?: ComponentProps<typeof FontAwesome>["name"]
  onPress?: () => void
}

const createStyles = (theme: Theme, buttonTheme?: "primary" | "secondary") => {
  return StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },
    button: {
      borderRadius: 10,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      backgroundColor:
        buttonTheme === "secondary"
          ? "transparent"
          : theme.button.backgroundColor,
    },
    buttonLabel: {
      fontSize: 16,
      color:
        buttonTheme === "secondary" ? theme.text.primary : theme.button.color,
    },
  })
}

export function Button({
  label,
  theme,
  iconLeft,
  iconRight,
  onPress,
}: ButttonProps) {
  const currentTheme = useTheme()
  const styles = createStyles(currentTheme, theme)

  const Icon = ({
    name,
  }: {
    name: ComponentProps<typeof FontAwesome>["name"]
  }) => (
    <FontAwesome
      name={name}
      size={16}
      color={
        theme === "secondary"
          ? currentTheme.text.primary
          : currentTheme.button.color
      }
    />
  )

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        {iconLeft && <Icon name={iconLeft} />}
        <Text style={styles.buttonLabel}>{label}</Text>
        {iconRight && <Icon name={iconRight} />}
      </Pressable>
    </View>
  )
}
