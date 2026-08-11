import { useEffect, useRef } from 'react'
import type { ChatMessage } from '@/presentation/hooks/useChatAssistant'

type ChatMessageListProps = {
  messages: ChatMessage[]
  isTyping: boolean
  onReserve: () => void
  onWhatsApp: () => void
  onMoreIdeas: () => void
}

function TypingDots() {
  return (
    <div className="chat-bubble-in flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-mist px-3 py-2.5">
      <span className="chat-dot h-1.5 w-1.5 rounded-full bg-leaf/70" />
      <span className="chat-dot chat-dot-2 h-1.5 w-1.5 rounded-full bg-leaf/70" />
      <span className="chat-dot chat-dot-3 h-1.5 w-1.5 rounded-full bg-leaf/70" />
    </div>
  )
}

export function ChatMessageList({
  messages,
  isTyping,
  onReserve,
  onWhatsApp,
  onMoreIdeas,
}: ChatMessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-3 text-sm">
      {messages.map((msg) => {
        const isUser = msg.role === 'user'
        return (
          <div
            key={msg.id}
            className={`chat-bubble-in flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] whitespace-pre-line rounded-2xl px-3 py-2.5 leading-relaxed ${
                isUser
                  ? 'rounded-br-md bg-leaf text-white'
                  : 'rounded-bl-md bg-mist text-sand/90'
              }`}
            >
              {msg.text}
            </div>
            {!isUser && msg.actions?.length ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {msg.actions.includes('reserve') ? (
                  <button
                    type="button"
                    onClick={onReserve}
                    className="rounded-full border border-leaf/30 bg-white px-2.5 py-1 text-[11px] font-semibold text-leaf transition hover:bg-leaf hover:text-white"
                  >
                    Reservar ahora
                  </button>
                ) : null}
                {msg.actions.includes('whatsapp') ? (
                  <button
                    type="button"
                    onClick={onWhatsApp}
                    className="rounded-full border border-sand/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-sand/70 transition hover:border-leaf/40 hover:text-leaf"
                  >
                    WhatsApp
                  </button>
                ) : null}
                {msg.actions.includes('more') ? (
                  <button
                    type="button"
                    onClick={onMoreIdeas}
                    className="rounded-full border border-sand/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-sand/70 transition hover:border-leaf/40 hover:text-leaf"
                  >
                    Más ideas
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        )
      })}
      {isTyping ? <TypingDots /> : null}
      <div ref={endRef} />
    </div>
  )
}
