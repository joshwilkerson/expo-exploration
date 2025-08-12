import { Button } from "@/components/button"
import { CircleButton } from "@/components/circle_button"
import { EmojiList } from "@/components/emoji_list"
import { EmojiPicker } from "@/components/emoji_picker"
import { EmojiSticker } from "@/components/emoji_sticker"
import { HeroImage } from "@/components/hero_image"
import { IconButton } from "@/components/icon_button"
import { useTheme } from "@/constants/hooks"
import { createStyles } from "@/constants/styles"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import { useRef, useState } from "react"
import { ImageSourcePropType, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { captureRef } from "react-native-view-shot"

const DefaultHeroImage = require("../../assets/images/background-image.png")

export default function Index() {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [heroImageSource, setHeroImageSource] = useState(DefaultHeroImage)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined)
  const [status, requestPermission] = MediaLibrary.usePermissions()

  const imageRef = useRef<View>(null)

  if (status === null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setHeroImageSource({ uri: result.assets[0].uri })
      setShowAppOptions(true)
    } else {
      alert("You did not select any image.")
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
    setPickedEmoji(undefined)
    setHeroImageSource(DefaultHeroImage)
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      })

      await MediaLibrary.saveToLibraryAsync(localUri)
      if (localUri) {
        alert("Saved!")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <HeroImage source={heroImageSource} />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={() => setIsModalVisible(true)} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            iconLeft="picture-o"
            onPress={pickImageAsync}
          />

          <Button
            label="Use this photo"
            theme="secondary"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <EmojiList
          onSelect={(item) => setPickedEmoji(item)}
          onCloseModal={() => setIsModalVisible(false)}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  )
}
