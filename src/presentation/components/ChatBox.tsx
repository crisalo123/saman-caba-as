import { useMemo, useState } from 'react'
import { cabins } from '@/infrastructure/data/cabins'
import { ChatComposer } from '@/presentation/components/ChatComposer'
import { ChatMessageList } from '@/presentation/components/ChatMessageList'
import { formatDisplayDate, MiniCalendar } from '@/presentation/components/MiniCalendar'
import { PalmIcon } from '@/presentation/components/PalmIcon'
import { matchFaqs } from '@/presentation/chat/matchFaq'
import { useChatAssistant } from '@/presentation/hooks/useChatAssistant'
import { useWhatsApp } from '@/presentation/hooks/useWhatsApp'

type Mode = 'closed' | 'chat' | 'date' | 'people' | 'cabin' | 'summary' | 'done'

type ChatBoxProps = {
  forceOpen?: boolean
}

const btnClass =
  'w-full rounded-2xl border border-sand/10 bg-mist px-3 py-3 text-left transition hover:border-leaf/40 hover:bg-[#e4f1fa]'

export function ChatBox({ forceOpen = false }: ChatBoxProps) {
  const [mode, setMode] = useState<Mode>(forceOpen ? 'chat' : 'closed')
  const [date, setDate] = useState<string | null>(null)
  const [people, setPeople] = useState(2)
  const [cabinId, setCabinId] = useState<string | null>(null)
  const { openChat, sendReservation } = useWhatsApp()

  const assistant = useChatAssistant({
    onStartReservation: () => setMode('date'),
    onWhatsApp: openChat,
  })

  const matchedCabins = useMemo(
    () => cabins.filter((c) => c.available && c.capacity >= people),
    [people],
  )

  const selectedCabin = cabins.find((c) => c.id === cabinId) ?? null
  const dateLabel = date ? formatDisplayDate(date) : ''
  const inReserveFlow = mode !== 'closed' && mode !== 'chat'

  const resetReserve = () => {
    setDate(null)
    setPeople(2)
    setCabinId(null)
  }

  const close = () => {
    setMode('closed')
  }

  const backToChat = () => {
    resetReserve()
    setMode('chat')
  }

  if (mode === 'closed') {
    return (
      <button
        type="button"
        onClick={() => setMode('chat')}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2.5 rounded-full bg-leaf px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_40px_rgba(63,107,74,0.35)] transition hover:brightness-110 md:right-6 md:bottom-6"
        aria-label="Chateta con nosotros"
      >
        <PalmIcon className="h-6 w-6 shrink-0 animate-[palm-sway_2.8s_ease-in-out_infinite]" />
        Chateta con nosotros
        <span className="chat-pulse absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-sun ring-2 ring-white" />
      </button>
    )
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex h-[min(85vh,620px)] w-[min(100%-2rem,380px)] flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white shadow-[0_20px_60px_rgba(20,50,79,0.18)] md:right-6 md:bottom-6">
      <div className="relative flex shrink-0 items-center justify-between overflow-hidden border-b border-sand/8 bg-linear-to-br from-[#eef3e8] via-[#f5f8f1] to-white px-4 py-3">
        <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-leaf/10 blur-2xl" />
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <PalmIcon className="h-8 w-8 text-leaf" />
            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-leaf ring-2 ring-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-sand">Chateta Samán</p>
            <p className="text-xs text-leaf">
              {inReserveFlow ? 'Armando tu reserva…' : 'En línea · escribe lo que se te ocurra'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          className="rounded-full px-2 py-1 text-sand/50 hover:text-sand"
          aria-label="Cerrar chat"
        >
          ✕
        </button>
      </div>

      {mode === 'chat' ? (
        <>
          <ChatMessageList
            messages={assistant.messages}
            isTyping={assistant.isTyping}
            onReserve={() => setMode('date')}
            onWhatsApp={assistant.openWhatsAppFromChat}
            onMoreIdeas={assistant.showMoreIdeas}
          />
          <ChatComposer
            draft={assistant.draft}
            onDraftChange={assistant.setDraft}
            onSubmit={assistant.submitDraft}
            onAcceptGhost={assistant.acceptGhost}
            ghost={assistant.ghost}
            suggestions={assistant.suggestions}
            quickChips={assistant.quickChips}
            placeholder={assistant.rotatingPlaceholder}
            disabled={assistant.isTyping}
            onPickFaq={(faq) => assistant.askFaq(faq)}
            onChip={(chip) => {
              const [faq] = matchFaqs(chip, 1)
              if (faq) assistant.askFaq(faq, chip)
              else assistant.setDraft(chip)
            }}
          />
        </>
      ) : null}

      {inReserveFlow ? (
        <div className="space-y-3 overflow-y-auto p-4 text-sm text-sand/85">
          {mode === 'date' ? (
            <>
              <button type="button" onClick={backToChat} className="text-xs text-leaf underline">
                ← Volver al chat
              </button>
              <p className="rounded-2xl bg-mist px-3 py-2">¿Para qué día quieres venir?</p>
              <MiniCalendar value={date} onChange={setDate} />
              <button
                type="button"
                disabled={!date}
                onClick={() => setMode('people')}
                className="w-full rounded-full bg-leaf py-2.5 text-sm font-bold text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar
              </button>
            </>
          ) : null}

          {mode === 'people' ? (
            <>
              <button type="button" onClick={() => setMode('date')} className="text-xs text-leaf underline">
                ← Volver
              </button>
              <p className="rounded-2xl bg-mist px-3 py-2">¿Cuántas personas van?</p>
              <div className="flex items-center justify-center gap-4 rounded-2xl border border-sand/10 bg-mist py-4">
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/15 text-lg font-bold text-sand hover:border-leaf hover:text-leaf"
                  aria-label="Menos personas"
                >
                  −
                </button>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-leaf">{people}</p>
                  <p className="text-xs text-sand/50">personas</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.min(12, p + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/15 text-lg font-bold text-sand hover:border-leaf hover:text-leaf"
                  aria-label="Más personas"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => setMode('cabin')}
                className="w-full rounded-full bg-leaf py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Continuar
              </button>
            </>
          ) : null}

          {mode === 'cabin' ? (
            <>
              <button type="button" onClick={() => setMode('people')} className="text-xs text-leaf underline">
                ← Volver
              </button>
              <p className="rounded-2xl bg-mist px-3 py-2">
                Elige la cabaña (capacidad para {people}+):
              </p>
              {matchedCabins.length === 0 ? (
                <p className="text-xs text-sand/55">
                  No hay cabañas disponibles para ese número. Baja las personas o escríbenos por
                  WhatsApp.
                </p>
              ) : (
                <ul className="space-y-2">
                  {matchedCabins.map((cabin) => (
                    <li key={cabin.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setCabinId(cabin.id)
                          setMode('summary')
                        }}
                        className={btnClass}
                      >
                        <span className="font-semibold text-sand">{cabin.name}</span>
                        <span className="mt-0.5 block text-xs text-sand/55">
                          {cabin.beds} camas · hasta {cabin.capacity} personas
                          {cabin.priceFrom
                            ? ` · $${cabin.priceFrom.toLocaleString('es-CO')}`
                            : ''}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : null}

          {mode === 'summary' && selectedCabin ? (
            <>
              <button type="button" onClick={() => setMode('cabin')} className="text-xs text-leaf underline">
                ← Volver
              </button>
              <p className="rounded-2xl bg-mist px-3 py-2">
                Revisa tu solicitud. Al enviar, te contactamos para confirmar.
              </p>
              <div className="space-y-2 rounded-2xl border border-leaf/25 bg-mist p-3 text-xs">
                <p>
                  <span className="text-sand/45">Fecha:</span>{' '}
                  <span className="capitalize text-sand">{dateLabel}</span>
                </p>
                <p>
                  <span className="text-sand/45">Personas:</span>{' '}
                  <span className="text-sand">{people}</span>
                </p>
                <p>
                  <span className="text-sand/45">Cabaña:</span>{' '}
                  <span className="text-sand">{selectedCabin.name}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sendReservation({
                    dateLabel,
                    people,
                    cabinName: selectedCabin.name,
                  })
                  setMode('done')
                }}
                className="w-full rounded-full bg-leaf py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Enviar información →
              </button>
              <p className="text-center text-[11px] text-sand/40">
                Se abre WhatsApp con tus datos. Nosotros te respondemos.
              </p>
            </>
          ) : null}

          {mode === 'done' ? (
            <>
              <p className="rounded-2xl bg-leaf/10 px-3 py-3 text-center text-sand">
                ✅ ¡Listo! Recibimos tu solicitud.
                <span className="mt-1 block text-xs text-sand/70">
                  Te contactamos pronto para confirmar disponibilidad y valor.
                </span>
              </p>
              <button
                type="button"
                onClick={() => {
                  resetReserve()
                  setMode('date')
                }}
                className="w-full rounded-2xl border border-sand/10 py-2.5 text-sm font-semibold text-leaf"
              >
                Hacer otra reserva
              </button>
              <button
                type="button"
                onClick={backToChat}
                className="w-full text-xs text-sand/45 underline"
              >
                Volver al chat
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
