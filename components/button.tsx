import { styles } from "@/constants/styles"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Pressable, Text, View } from "react-native"

export function Button({ label, theme }: { label: string; theme?: "primary" }) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={() => alert("You pressed a button.")}
        >
          <FontAwesome name="picture-o" size={18} color="#25292e" />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}
