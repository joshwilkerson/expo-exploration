import { styles } from "@/constants/styles"
import { Image } from "expo-image"
import { ImageSourcePropType } from "react-native"

export function ImageViewer({ src }: { src: ImageSourcePropType }) {
  return <Image source={src} style={styles.heroImage} />
}
