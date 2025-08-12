import { styles } from "@/constants/styles"
import { Link } from "expo-router"
import { View } from "react-native"

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>
        Go back to Home screen!
      </Link>
    </View>
  )
}
