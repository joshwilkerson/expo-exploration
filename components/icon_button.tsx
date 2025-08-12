import { useTheme } from "@/constants/hooks"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, Text } from "react-native"

type IconButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress: () => void
}

export function IconButton({ icon, label, onPress }: IconButtonProps) {
  const theme = useTheme()

  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={theme.text.primary} />
      <Text style={{ color: theme.text.primary }}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
})
