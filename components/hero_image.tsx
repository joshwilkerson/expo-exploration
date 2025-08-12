import { styles } from "@/constants/styles"
import { Image } from "expo-image"
import { ImageSourcePropType } from "react-native"

export function HeroImage({ source }: { source: ImageSourcePropType }) {
  return <Image source={source} style={styles.heroImage} />
}
