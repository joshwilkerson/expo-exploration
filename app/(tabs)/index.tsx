import { Button } from "@/components/button"
import { HeroImage } from "@/components/hero_image"
import { useTheme } from "@/constants/hooks"
import { createStyles } from "@/constants/styles"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { View } from "react-native"

const DefaultHeroImage = require("../../assets/images/background-image.png")

export default function Index() {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [heroImageSource, setHeroImageSource] = useState(DefaultHeroImage)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setHeroImageSource({ uri: result.assets[0].uri })
    } else {
      alert("You did not select any image.")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HeroImage source={heroImageSource} />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label="Choose a photo"
          theme="primary"
          iconLeft="picture-o"
          onPress={pickImageAsync}
        />
        <Button label="Use this photo" theme="secondary" />
      </View>
    </View>
  )
}
