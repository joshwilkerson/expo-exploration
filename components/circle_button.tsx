import { blue } from "@/constants/colors"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, View } from "react-native"

export function CircleButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#fff" />
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
    backgroundColor: blue[50],
  },
})
