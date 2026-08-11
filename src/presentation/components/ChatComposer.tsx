import type { FaqItem } from '@/infrastructure/data/faqs'

type ChatComposerProps = {
  draft: string
  onDraftChange: (value: string) => void
  onSubmit: () => void
  onAcceptGhost: () => boolean
  ghost: FaqItem | null
  suggestions: FaqItem[]
  quickChips: readonly string[]
  placeholder: string
  disabled?: boolean
  onPickFaq: (faq: FaqItem) => void
  onChip: (chip: string) => void
}

export function ChatComposer({
  draft,
  onDraftChange,
  onSubmit,
  onAcceptGhost,
  ghost,
  suggestions,
  quickChips,
  placeholder,
  disabled,
  onPickFaq,
  onChip,
}: ChatComposerProps) {
  const ghostHint =
    ghost && draft.trim().length >= 2 ? ghost.question : null

  return (
    <div className="shrink-0 border-t border-sand/8 bg-[#f7f9f4] px-3 pt-2 pb-3">
      {draft.trim().length === 0 ? (
        <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={disabled}
              onClick={() => onChip(chip)}
              className="chat-chip shrink-0 rounded-full border border-leaf/25 bg-white px-2.5 py-1 text-[11px] font-semibold text-leaf transition hover:bg-leaf hover:text-white disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="mb-2 max-h-28 space-y-1 overflow-y-auto">
          {suggestions.map((faq) => (
            <li key={faq.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPickFaq(faq)}
                className="w-full rounded-xl border border-sand/10 bg-white px-2.5 py-1.5 text-left text-[12px] text-sand/80 transition hover:border-leaf/40 hover:bg-mist disabled:opacity-50"
              >
                <span className="font-semibold text-leaf">↗ </span>
                {faq.question}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <form
        className="relative flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className="relative min-w-0 flex-1">
          {ghostHint ? (
            <p className="pointer-events-none absolute inset-x-3 top-2 truncate text-[12px] text-sand/25">
              Tab → {ghostHint}
            </p>
          ) : null}
          <input
            type="text"
            value={draft}
            disabled={disabled}
            placeholder={placeholder}
            aria-label="Escribe tu pregunta"
            autoComplete="off"
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && ghost) {
                e.preventDefault()
                onAcceptGhost()
              }
              if (e.key === 'ArrowRight' && ghost && e.currentTarget.selectionStart === draft.length) {
                e.preventDefault()
                onAcceptGhost()
              }
            }}
            className="w-full rounded-2xl border border-sand/15 bg-white px-3 py-2.5 text-sm text-sand outline-none transition placeholder:text-sand/35 focus:border-leaf/45 focus:ring-2 focus:ring-leaf/15 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-white transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Enviar"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M3.4 20.6 21 12 3.4 3.4 3 10l11 2-11 2z" />
          </svg>
        </button>
      </form>
      <p className="mt-1.5 text-center text-[10px] text-sand/35">
        Escribe libre · Tab completa · Enter envía
      </p>
    </div>
  )
}
