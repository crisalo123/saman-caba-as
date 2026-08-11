import { useMemo, useState } from 'react'
import { cabins } from '@/infrastructure/data/cabins'
import { faqs } from '@/infrastructure/data/faqs'
import { formatDisplayDate, MiniCalendar } from '@/presentation/components/MiniCalendar'
import { PalmIcon } from '@/presentation/components/PalmIcon'
import { useWhatsApp } from '@/presentation/hooks/useWhatsApp'

type Step = 'closed' | 'menu' | 'faq' | 'faq-answer' | 'date' | 'people' | 'cabin' | 'summary' | 'done'

type ChatBoxProps = {
  forceOpen?: boolean
}

const btnClass =
  'w-full rounded-2xl border border-sand/10 bg-mist px-3 py-3 text-left transition hover:border-leaf/40 hover:bg-[#e4f1fa]'

export function ChatBox({ forceOpen = false }: ChatBoxProps) {
  const [step, setStep] = useState<Step>(forceOpen ? 'menu' : 'closed')
  const [date, setDate] = useState<string | null>(null)
  const [people, setPeople] = useState(2)
  const [cabinId, setCabinId] = useState<string | null>(null)
  const [faqId, setFaqId] = useState<string | null>(null)
  const { openChat, sendReservation } = useWhatsApp()

  const matchedCabins = useMemo(
    () => cabins.filter((c) => c.available && c.capacity >= people),
    [people],
  )

  const selectedCabin = cabins.find((c) => c.id === cabinId) ?? null
  const selectedFaq = faqs.find((f) => f.id === faqId) ?? null
  const dateLabel = date ? formatDisplayDate(date) : ''

  const resetFlow = () => {
    setDate(null)
    setPeople(2)
    setCabinId(null)
    setFaqId(null)
    setStep('menu')
  }

  const close = () => {
    setStep('closed')
  }

  if (step === 'closed') {
    return (
      <button
        type="button"
        onClick={() => setStep('menu')}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2.5 rounded-full bg-leaf px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_40px_rgba(63,107,74,0.35)] transition hover:brightness-110 md:right-6 md:bottom-6"
        aria-label="Chateta con nosotros"
      >
        <PalmIcon className="h-6 w-6 shrink-0 animate-[palm-sway_2.8s_ease-in-out_infinite]" />
        Chateta con nosotros
      </button>
    )
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex max-h-[min(85vh,560px)] w-[min(100%-2rem,360px)] flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white shadow-[0_20px_60px_rgba(20,50,79,0.15)] md:right-6 md:bottom-6">
      <div className="flex shrink-0 items-center justify-between border-b border-sand/8 bg-[#f5f9fd] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <PalmIcon className="h-7 w-7 text-leaf" />
          <div>
            <p className="text-sm font-bold text-sand">Chateta con nosotros</p>
            <p className="text-xs text-leaf">Reserva paso a paso</p>
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

      <div className="space-y-3 overflow-y-auto p-4 text-sm text-sand/85">
        {step === 'menu' ? (
          <>
            <p className="rounded-2xl bg-mist px-3 py-2">
              ¡Hola! 🌴 ¿Quieres reservar tu cabaña?
            </p>
            <button type="button" onClick={() => setStep('date')} className={btnClass}>
              Sí, quiero reservar
            </button>
            <button type="button" onClick={() => setStep('faq')} className={btnClass}>
              Solo tengo una pregunta
            </button>
          </>
        ) : null}

        {step === 'faq' ? (
          <>
            <button type="button" onClick={() => setStep('menu')} className="text-xs text-leaf underline">
              ← Volver
            </button>
            <p className="rounded-2xl bg-mist px-3 py-2">
              Elige una pregunta frecuente:
            </p>
            <ul className="space-y-2">
              {faqs.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setFaqId(item.id)
                      setStep('faq-answer')
                    }}
                    className={btnClass}
                  >
                    {item.question}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                openChat(
                  'Hola, quiero información general de Cabañas el Samán. ¿Me ayudan?',
                )
              }
              className="w-full text-center text-xs text-leaf underline"
            >
              Preferimos escribir por WhatsApp
            </button>
          </>
        ) : null}

        {step === 'faq-answer' && selectedFaq ? (
          <>
            <button type="button" onClick={() => setStep('faq')} className="text-xs text-leaf underline">
              ← Otras preguntas
            </button>
            <p className="rounded-2xl border border-leaf/20 bg-mist px-3 py-2 text-xs font-semibold text-leaf">
              {selectedFaq.question}
            </p>
            <p className="whitespace-pre-line rounded-2xl bg-mist px-3 py-3 leading-relaxed">
              {selectedFaq.answer}
            </p>
            <button type="button" onClick={() => setStep('faq')} className={btnClass}>
              Otra pregunta
            </button>
            <button
              type="button"
              onClick={() =>
                openChat(
                  `Hola, vi en la web la pregunta "${selectedFaq.question}" y quiero más información. ¿Me ayudan?`,
                )
              }
              className={btnClass}
            >
              Escribir por WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setStep('menu')}
              className="w-full text-center text-xs text-sand/45 underline"
            >
              Volver al menú
            </button>
          </>
        ) : null}

        {step === 'date' ? (
          <>
            <button type="button" onClick={() => setStep('menu')} className="text-xs text-leaf underline">
              ← Volver
            </button>
            <p className="rounded-2xl bg-mist px-3 py-2">
              ¿Para qué día quieres venir?
            </p>
            <MiniCalendar value={date} onChange={setDate} />
            <button
              type="button"
              disabled={!date}
              onClick={() => setStep('people')}
              className="w-full rounded-full bg-leaf py-2.5 text-sm font-bold text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </>
        ) : null}

        {step === 'people' ? (
          <>
            <button type="button" onClick={() => setStep('date')} className="text-xs text-leaf underline">
              ← Volver
            </button>
            <p className="rounded-2xl bg-mist px-3 py-2">
              ¿Cuántas personas van?
            </p>
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
              onClick={() => setStep('cabin')}
              className="w-full rounded-full bg-leaf py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Continuar
            </button>
          </>
        ) : null}

        {step === 'cabin' ? (
          <>
            <button type="button" onClick={() => setStep('people')} className="text-xs text-leaf underline">
              ← Volver
            </button>
            <p className="rounded-2xl bg-mist px-3 py-2">
              Elige la cabaña (capacidad para {people}+):
            </p>
            {matchedCabins.length === 0 ? (
              <p className="text-xs text-sand/55">
                No hay cabañas disponibles para ese número. Baja las personas o
                escríbenos por WhatsApp.
              </p>
            ) : (
              <ul className="space-y-2">
                {matchedCabins.map((cabin) => (
                  <li key={cabin.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setCabinId(cabin.id)
                        setStep('summary')
                      }}
                      className={btnClass}
                    >
                      <span className="font-semibold text-sand">{cabin.name}</span>
                      <span className="mt-0.5 block text-xs text-sand/55">
                        {cabin.beds} camas · hasta {cabin.capacity} personas
                        {cabin.hasLivingRoom ? ' · Salón' : ''}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}

        {step === 'summary' && selectedCabin ? (
          <>
            <button type="button" onClick={() => setStep('cabin')} className="text-xs text-leaf underline">
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
                setStep('done')
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

        {step === 'done' ? (
          <>
            <p className="rounded-2xl bg-leaf/10 px-3 py-3 text-center text-sand">
              ✅ ¡Listo! Recibimos tu solicitud.
              <span className="mt-1 block text-xs text-sand/70">
                Te contactamos pronto para confirmar disponibilidad y valor.
              </span>
            </p>
            <button
              type="button"
              onClick={resetFlow}
              className="w-full rounded-2xl border border-sand/10 py-2.5 text-sm font-semibold text-leaf"
            >
              Hacer otra reserva
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full text-xs text-sand/45 underline"
            >
              Cerrar
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}
