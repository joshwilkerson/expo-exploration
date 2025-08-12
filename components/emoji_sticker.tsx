import { ImageSourcePropType } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

const INITIAL_TOP_OFFSET = -350

type EmojiStickerProps = {
  imageSize: number
  stickerSource: ImageSourcePropType
}

export function EmojiSticker({ imageSize, stickerSource }: EmojiStickerProps) {
  const currentSize = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (currentSize.value !== imageSize * 2) {
        currentSize.value = currentSize.value * 2
      } else {
        currentSize.value = Math.round(currentSize.value / 2)
      }
    })

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX
    translateY.value += event.changeY
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(currentSize.value),
      height: withSpring(currentSize.value),
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

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: INITIAL_TOP_OFFSET }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={imageStyle}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}
