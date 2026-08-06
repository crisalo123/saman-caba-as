import { useRef } from 'react'
import { useScrollExpand } from '@/presentation/hooks/useScrollExpand'

export type ParallaxMediaProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  scaleFrom?: number
  scaleTo?: number
  yFrom?: number
  yTo?: number
  loading?: 'lazy' | 'eager'
}

/** Imagen con expansión parallax al scroll (GSAP ScrollTrigger). */
export function ParallaxMedia({
  src,
  alt,
  className = '',
  imgClassName = '',
  scaleFrom = 1.05,
  scaleTo = 1.18,
  yFrom = 8,
  yTo = -12,
  loading = 'lazy',
}: ParallaxMediaProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLImageElement>(null)

  useScrollExpand({
    triggerRef,
    mediaRef,
    scaleFrom,
    scaleTo,
    yFrom,
    yTo,
  })

  return (
    <div ref={triggerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={mediaRef}
        src={src}
        alt={alt}
        loading={loading}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}
