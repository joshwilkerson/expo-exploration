import { styles } from "@/constants/styles"
import { Image } from "expo-image"
import { ImageSourcePropType } from "react-native"

type HeroImageProps = {
  src: ImageSourcePropType
  selectedImage?: string
}
export function HeroImage({ src, selectedImage }: HeroImageProps) {
  const imageSource = selectedImage ? { uri: selectedImage } : src

  return <Image source={imageSource} style={styles.heroImage} />
}
