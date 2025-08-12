import { EmojiKeyboard } from "rn-emoji-keyboard"

type Props = {
  onSelect: (emoji: string) => void
  onCloseModal: () => void
}

export function EmojiList({ onSelect, onCloseModal }: Props) {
  return (
    <EmojiKeyboard
      onEmojiSelected={(selectedEmoji) => {
        onSelect(selectedEmoji.emoji)
        onCloseModal()
      }}
    />
  )
}
