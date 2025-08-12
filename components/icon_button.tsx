import { neutral } from "@/constants/colors"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress: () => void
}

export function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={neutral[10]} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  iconButtonLabel: {
    color: neutral[10],
  },
})
