import { createStyles } from "@/constants/styles"
import { useTheme } from "@/constants/hooks"
import { Text, View } from "react-native"

export default function TasksScreen() {
  const theme = useTheme()
  const styles = createStyles(theme)
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ Tasks</Text>
    </View>
  )
}
