import { useMemo, useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/presentation/lib/gsap'

export type AssembleTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  mode?: 'chars' | 'words'
  delay?: number
  stagger?: number
  /** HTML interno opcional (ej. span con clase) — si se pasa, no usa `text` */
  html?: string
}

/** Texto que se arma pieza a pieza (letras o palabras). */
export function AssembleText({
  text,
  as: Tag = 'p',
  className = '',
  mode = 'chars',
  delay = 0,
  stagger = 0.028,
  html,
}: AssembleTextProps) {
  const rootRef = useRef<HTMLElement>(null)

  const parts = useMemo(() => {
    if (html) return null
    if (mode === 'words') {
      return text.split(/(\s+)/).map((part, i) => ({
        key: `w-${i}`,
        value: part,
        isSpace: /^\s+$/.test(part),
      }))
    }
    return text.split('').map((char, i) => ({
      key: `c-${i}`,
      value: char === ' ' ? '\u00A0' : char,
      isSpace: char === ' ',
    }))
  }, [text, mode, html])

  useGSAP(
    () => {
      const el = rootRef.current
      if (!el) return

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 })
        return
      }

      const targets = el.querySelectorAll<HTMLElement>('[data-piece]')
      if (!targets.length) {
        gsap.from(el, { y: 24, autoAlpha: 0, duration: 0.8, delay, ease: 'power3.out' })
        return
      }

      gsap.set(targets, {
        y: 28,
        autoAlpha: 0,
        rotateX: -70,
        transformOrigin: '50% 100%',
      })

      gsap.to(targets, {
        y: 0,
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.55,
        delay,
        stagger: { each: stagger, from: 'start' },
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [text, mode, delay, stagger, html] },
  )

  if (html) {
    return (
      <Tag
        ref={rootRef as never}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <Tag ref={rootRef as never} className={`${className} [perspective:600px]`}>
      {parts?.map((part) =>
        part.isSpace && mode === 'words' ? (
          <span key={part.key}>{part.value}</span>
        ) : (
          <span
            key={part.key}
            data-piece
            className="inline-block will-change-transform"
          >
            {part.value}
          </span>
        ),
      )}
    </Tag>
  )
}
