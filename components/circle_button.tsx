import { useTheme } from "@/constants/hooks"
import FontAwesome from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, View } from "react-native"

export function CircleButton({ onPress }: { onPress: () => void }) {
  const theme = useTheme()

  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        style={[
          styles.circleButton,
          { backgroundColor: theme.button.backgroundColor },
        ]}
        onPress={onPress}
      >
        <FontAwesome name="add" size={38} color={theme.button.color} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 40,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
  },
})
