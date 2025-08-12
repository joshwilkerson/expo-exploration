import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useState, useEffect } from "react"
import * as Haptics from "expo-haptics"
import { Pressable, StyleSheet, TouchableOpacity, Text, View } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const INITIAL_TOP_OFFSET = -350

type EmojiStickerProps = {
  id: string
  fontSize: number
  emojiText: string
  onRemove: (id: string) => void
}

export function EmojiSticker({ id, fontSize, emojiText, onRemove }: EmojiStickerProps) {
  const currentFontSize = useSharedValue(fontSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const [showRemoveMenu, setShowRemoveMenu] = useState(false)

  useEffect(() => {
    if (showRemoveMenu) {
      const timer = setTimeout(() => {
        setShowRemoveMenu(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showRemoveMenu])

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (currentFontSize.value !== fontSize * 2) {
        currentFontSize.value = currentFontSize.value * 2
      } else {
        currentFontSize.value = Math.round(currentFontSize.value / 2)
      }
    })

  const drag = Gesture.Pan()
    .minDistance(10)
    .onChange((event) => {
      translateX.value += event.changeX
      translateY.value += event.changeY
    })

  const pinch = Gesture.Pinch()
    .onStart(() => {
      scale.value = 1
    })
    .onUpdate((event) => {
      scale.value = event.scale
    })
    .onEnd(() => {
      currentFontSize.value = withSpring(Math.max(8, currentFontSize.value * scale.value))
      scale.value = withSpring(1)
    })

  const textStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(currentFontSize.value),
      transform: [{ scale: scale.value }],
    }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })

  const combinedGestures = Gesture.Exclusive(
    doubleTap,
    Gesture.Simultaneous(drag, pinch)
  )

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setShowRemoveMenu(true)
  }

  const handleRemove = () => {
    setShowRemoveMenu(false)
    onRemove(id)
  }

  const handleMenuDismiss = () => {
    setShowRemoveMenu(false)
  }

  return (
    <Animated.View style={[containerStyle, { top: INITIAL_TOP_OFFSET }]}>
      <GestureDetector gesture={combinedGestures}>
        <TouchableOpacity
          onLongPress={handleLongPress}
          delayLongPress={500}
          activeOpacity={0.8}
          style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <Animated.Text style={textStyle}>{emojiText}</Animated.Text>
          {showRemoveMenu && (
            <Animated.View style={styles.contextMenu}>
              <Pressable style={styles.menuItem} onPress={handleRemove}>
                <MaterialIcons name="delete" size={16} color="#fff" />
                <Text style={styles.menuText}>Remove</Text>
              </Pressable>
            </Animated.View>
          )}
        </TouchableOpacity>
      </GestureDetector>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  contextMenu: {
    marginLeft: 10,
    marginTop: -5,
  },
  menuItem: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
})
