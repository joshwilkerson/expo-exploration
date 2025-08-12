import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

const INITIAL_TOP_OFFSET = -350

type EmojiStickerProps = {
  fontSize: number
  emojiText: string
}

export function EmojiSticker({ fontSize, emojiText }: EmojiStickerProps) {
  const currentFontSize = useSharedValue(fontSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (currentFontSize.value !== fontSize * 2) {
        currentFontSize.value = currentFontSize.value * 2
      } else {
        currentFontSize.value = Math.round(currentFontSize.value / 2)
      }
    })

  const drag = Gesture.Pan().onChange((event) => {
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

  return (
    <GestureDetector gesture={combinedGestures}>
      <Animated.View style={[containerStyle, { top: INITIAL_TOP_OFFSET }]}>
        <Animated.Text style={textStyle}>{emojiText}</Animated.Text>
      </Animated.View>
    </GestureDetector>
  )
}
