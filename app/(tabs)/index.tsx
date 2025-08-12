import { Button } from "@/components/button"
import { ImageViewer } from "@/components/image_viewer"
import { useTheme } from "@/constants/hooks"
import { createStyles } from "@/constants/styles"
import { View } from "react-native"

const PlaceholderImage = require("../../assets/images/background-image.png")

export default function Index() {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer src={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" />
        <Button label="Use this photo" />
      </View>
    </View>
  )
}
