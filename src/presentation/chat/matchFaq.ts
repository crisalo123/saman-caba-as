import type { FaqItem } from '@/infrastructure/data/faqs'
import { faqs } from '@/infrastructure/data/faqs'

/** Normaliza texto para comparar (sin tildes, minúsculas). */
export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[-_/]/g, ' ')
    .replace(/[¿?¡!.,;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreFaq(query: string, faq: FaqItem): number {
  const q = normalizeText(query)
  if (!q) return 0

  const question = normalizeText(faq.question)
  const haystack = normalizeText([faq.question, ...faq.keywords, faq.answer].join(' '))

  let score = 0

  if (question.startsWith(q) || question.includes(q)) score += 40
  if (haystack.includes(q)) score += 18

  for (const keyword of faq.keywords) {
    const k = normalizeText(keyword)
    if (!k) continue
    if (q === k) score += 50
    else if (q.includes(k) || k.includes(q)) score += 28
  }

  // Tokens sueltos del usuario
  for (const token of q.split(' ')) {
    if (token.length < 2) continue
    if (faq.keywords.some((k) => normalizeText(k).includes(token))) score += 12
    if (question.includes(token)) score += 8
  }

  return score
}

export function matchFaqs(query: string, limit = 4): FaqItem[] {
  const ranked = faqs
    .map((faq) => ({ faq, score: scoreFaq(query, faq) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)

  return ranked.slice(0, limit).map((row) => row.faq)
}

/** Mejor sugerencia para ghost-autocomplete en el input. */
export function bestAutocomplete(query: string): FaqItem | null {
  const q = query.trim()
  if (q.length < 2) return null
  const [top] = matchFaqs(q, 1)
  return top ?? null
}

export function looksLikeReservation(query: string): boolean {
  const q = normalizeText(query)
  return (
    /\b(reserv|reserva|reservar|quiero ir|quiero quedarme|book)\b/.test(q) &&
    !/\b(datos|anticipo|document)\b/.test(q)
  )
}
