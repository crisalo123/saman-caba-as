import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FaqItem } from '@/infrastructure/data/faqs'
import { faqs, faqQuickChips } from '@/infrastructure/data/faqs'
import {
  bestAutocomplete,
  looksLikeReservation,
  matchFaqs,
} from '@/presentation/chat/matchFaq'

export type ChatRole = 'bot' | 'user' | 'system'

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  /** Acciones rápidas bajo el mensaje del bot. */
  actions?: Array<'reserve' | 'whatsapp' | 'more'>
}

type UseChatAssistantOptions = {
  onStartReservation: () => void
  onWhatsApp: (message: string) => void
}

const WELCOME =
  '¡Hola! Soy la chateta del Samán 🌴 Escribe lo que quieras saber — precios, mascotas, check-in… — y te voy sugiriendo.'

export function useChatAssistant({
  onStartReservation,
  onWhatsApp,
}: UseChatAssistantOptions) {
  const uid = useId()
  const seq = useRef(0)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const makeId = () => {
    seq.current += 1
    return `${uid}-${seq.current}`
  }

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: `${uid}-welcome`, role: 'bot', text: WELCOME, actions: ['reserve'] },
  ])
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const suggestions = draft.trim().length >= 1 ? matchFaqs(draft, 4) : []
  const ghost = bestAutocomplete(draft)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % faqQuickChips.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current)
    }
  }, [])

  const pushBot = useCallback((text: string, actions?: ChatMessage['actions']) => {
    setIsTyping(true)
    if (typingTimer.current) clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'bot', text, actions },
      ])
    }, 520 + Math.min(text.length * 4, 900))
  }, [])

  const askFaq = useCallback(
    (faq: FaqItem, spokenAs?: string) => {
      const userText = spokenAs?.trim() || faq.question
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'user', text: userText },
      ])
      setDraft('')
      pushBot(faq.answer, ['reserve', 'whatsapp', 'more'])
    },
    [pushBot],
  )

  const submitDraft = useCallback(() => {
    const text = draft.trim()
    if (!text || isTyping) return

    if (looksLikeReservation(text)) {
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'user', text },
      ])
      setDraft('')
      pushBot('¡Perfecto! Vamos a armar tu reserva paso a paso ✨')
      window.setTimeout(() => onStartReservation(), 700)
      return
    }

    const matches = matchFaqs(text, 3)
    if (matches[0]) {
      askFaq(matches[0], text)
      return
    }

    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: 'user', text },
    ])
    setDraft('')
    const tips = faqs
      .slice(0, 4)
      .map((f) => `• ${f.question}`)
      .join('\n')
    pushBot(
      `No pillé exactamente eso 🙈 Prueba con algo como "precios" o "mascotas", o escribe por WhatsApp.\n\nAlgunas ideas:\n${tips}`,
      ['whatsapp', 'reserve', 'more'],
    )
  }, [askFaq, draft, isTyping, onStartReservation, pushBot])

  const acceptGhost = useCallback(() => {
    if (!ghost) return false
    setDraft(ghost.question)
    return true
  }, [ghost])

  const resetChat = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current)
    setIsTyping(false)
    setDraft('')
    setMessages([
      {
        id: makeId(),
        role: 'bot',
        text: WELCOME,
        actions: ['reserve'],
      },
    ])
  }, [])

  const openWhatsAppFromChat = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    onWhatsApp(
      lastUser
        ? `Hola, en el chat pregunté: "${lastUser.text}". ¿Me ayudan?`
        : 'Hola, quiero información de Cabañas el Samán. ¿Me ayudan?',
    )
  }, [messages, onWhatsApp])

  const showMoreIdeas = useCallback(() => {
    const ideas = faqQuickChips.map((c) => `• ${c}`).join('\n')
    pushBot(
      `Prueba escribiendo una de estas (o tócala arriba):\n${ideas}\n\nTambién puedes decir “quiero reservar”.`,
      ['reserve', 'whatsapp'],
    )
  }, [pushBot])

  return {
    messages,
    draft,
    setDraft,
    isTyping,
    suggestions,
    ghost,
    quickChips: faqQuickChips,
    rotatingPlaceholder: `Ej: ${faqQuickChips[placeholderIndex]}…`,
    askFaq,
    submitDraft,
    acceptGhost,
    resetChat,
    openWhatsAppFromChat,
    showMoreIdeas,
    onStartReservation,
  }
}
