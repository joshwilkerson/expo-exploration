import { Button } from "@/components/button"
import { CircleButton } from "@/components/circle_button"
import { EmojiList } from "@/components/emoji_list"
import { EmojiPicker } from "@/components/emoji_picker"
import { EmojiSticker } from "@/components/emoji_sticker"
import { HeroImage } from "@/components/hero_image"
import { IconButton } from "@/components/icon_button"
import { useTheme } from "@/constants/hooks"
import { createStyles } from "@/constants/styles"
import domtoimage from "dom-to-image"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import { useRef, useState } from "react"
import { Platform, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { captureRef } from "react-native-view-shot"

const DefaultHeroImage = require("../../assets/images/background-image.png")

export default function Index() {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [heroImageSource, setHeroImageSource] = useState(DefaultHeroImage)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmojis, setPickedEmojis] = useState<{id: string, emoji: string}[]>([])
  const [nextEmojiId, setNextEmojiId] = useState(1)
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
    setPickedEmojis([])
    setNextEmojiId(1)
    setHeroImageSource(DefaultHeroImage)
  }

  const addEmoji = (emoji: string) => {
    const newEmoji = {
      id: `emoji-${nextEmojiId}`,
      emoji: emoji
    }
    setPickedEmojis(prev => [...prev, newEmoji])
    setNextEmojiId(prev => prev + 1)
  }

  const removeEmoji = (emojiId: string) => {
    setPickedEmojis(prev => prev.filter(emoji => emoji.id !== emojiId))
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
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
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })

        let link = document.createElement("a")
        link.download = "sticker-smash.jpeg"
        link.href = dataUrl
        link.click()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <HeroImage source={heroImageSource} />
          {pickedEmojis.map((emojiItem) => (
            <EmojiSticker 
              key={emojiItem.id} 
              id={emojiItem.id}
              fontSize={40} 
              emojiText={emojiItem.emoji}
              onRemove={removeEmoji}
            />
          ))}
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
          onSelect={(emoji) => addEmoji(emoji)}
          onCloseModal={() => setIsModalVisible(false)}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  )
}
