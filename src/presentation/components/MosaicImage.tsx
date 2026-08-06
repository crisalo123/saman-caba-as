import { useMemo, useRef, type RefObject } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/presentation/lib/gsap'

export type MosaicImageProps = {
  src: string
  alt: string
  cols?: number
  rows?: number
  className?: string
  /** Ref del layer animable (parallax / scale) */
  mediaRef?: RefObject<HTMLDivElement | null>
  onComplete?: () => void
}

type Tile = { id: string; col: number; row: number }

/** Imagen que se arma por pedazos con GSAP. */
export function MosaicImage({
  src,
  alt,
  cols = 8,
  rows = 5,
  className = '',
  mediaRef,
  onComplete,
}: MosaicImageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)
  const fallbackRef = useRef<HTMLImageElement>(null)

  const tiles = useMemo<Tile[]>(() => {
    const list: Tile[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        list.push({ id: `${row}-${col}`, col, row })
      }
    }
    return list
  }, [cols, rows])

  useGSAP(
    () => {
      const layer = tilesRef.current
      const fallback = fallbackRef.current
      if (!layer || !fallback) return

      if (prefersReducedMotion()) {
        gsap.set(layer, { autoAlpha: 0 })
        gsap.set(fallback, { autoAlpha: 1 })
        onComplete?.()
        return
      }

      const pieces = layer.querySelectorAll<HTMLElement>('[data-tile]')
      gsap.set(fallback, { autoAlpha: 0 })
      gsap.set(pieces, {
        autoAlpha: 0,
        scale: 0.55,
        y: () => gsap.utils.random(40, 120),
        x: () => gsap.utils.random(-40, 40),
        rotate: () => gsap.utils.random(-12, 12),
        filter: 'brightness(1.15) saturate(0.7)',
      })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(fallback, { autoAlpha: 1 })
          gsap.set(layer, { autoAlpha: 0 })
          onComplete?.()
        },
      })

      tl.to(pieces, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.85,
        stagger: {
          amount: 1.15,
          from: 'random',
          grid: [rows, cols],
        },
        ease: 'power3.out',
      })
    },
    { scope: rootRef, dependencies: [src, cols, rows] },
  )

  return (
    <div ref={rootRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={mediaRef}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        {/* Tiles de ensamblaje */}
        <div ref={tilesRef} className="absolute inset-0" aria-hidden>
          {tiles.map((tile) => (
            <div
              key={tile.id}
              data-tile
              className="absolute overflow-hidden"
              style={{
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
                left: `${(tile.col / cols) * 100}%`,
                top: `${(tile.row / rows) * 100}%`,
                backgroundImage: `url(${src})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${cols > 1 ? (tile.col / (cols - 1)) * 100 : 0}% ${rows > 1 ? (tile.row / (rows - 1)) * 100 : 0}%`,
              }}
            />
          ))}
        </div>

        {/* Imagen sólida tras el ensamblaje (mejor para parallax) */}
        <img
          ref={fallbackRef}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />
      </div>
    </div>
  )
}
