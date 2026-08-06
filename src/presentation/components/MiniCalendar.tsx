import { useMemo, useState } from 'react'

type MiniCalendarProps = {
  value: string | null
  onChange: (isoDate: string) => void
}

const WEEK = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

function toIso(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function MiniCalendar({ value, onChange }: MiniCalendarProps) {
  const today = startOfDay(new Date())
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )

  const cells = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const first = new Date(year, month, 1)
    // Monday-first offset
    const offset = (first.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const items: Array<{ date: Date | null }> = []

    for (let i = 0; i < offset; i++) items.push({ date: null })
    for (let d = 1; d <= daysInMonth; d++) {
      items.push({ date: new Date(year, month, d) })
    }
    return items
  }, [cursor])

  const label = cursor.toLocaleDateString('es-CO', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-sand/10 bg-mist p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          className="rounded-lg px-2 py-1 text-sand/70 hover:bg-white hover:text-leaf"
          aria-label="Mes anterior"
        >
          ←
        </button>
        <p className="font-display text-sm font-bold capitalize text-sand">{label}</p>
        <button
          type="button"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          className="rounded-lg px-2 py-1 text-sand/70 hover:bg-white hover:text-leaf"
          aria-label="Mes siguiente"
        >
          →
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-sand/40">
        {WEEK.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell.date) {
            return <span key={`e-${i}`} className="h-8" />
          }
          const iso = toIso(cell.date)
          const disabled = cell.date < today
          const selected = value === iso

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={`h-8 rounded-lg text-xs font-semibold transition ${
                selected
                  ? 'bg-leaf text-white'
                  : disabled
                    ? 'cursor-not-allowed text-sand/20'
                    : 'text-sand/80 hover:bg-leaf/20 hover:text-leaf'
              }`}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
