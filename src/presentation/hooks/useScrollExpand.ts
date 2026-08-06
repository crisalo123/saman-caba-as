import type { RefObject } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/presentation/lib/gsap'

export type UseScrollExpandParams = {
  triggerRef: RefObject<HTMLElement | null>
  mediaRef: RefObject<HTMLElement | null> // img o layer div
  scaleFrom?: number
  scaleTo?: number
  yFrom?: number
  yTo?: number
  start?: string
  end?: string
  scrub?: number
}

/**
 * Expande y desplaza un media al scrollear (scrub + ScrollTrigger).
 * El contenedor padre debe tener overflow: hidden.
 */
export function useScrollExpand({
  triggerRef,
  mediaRef,
  scaleFrom = 1,
  scaleTo = 1.14,
  yFrom = 6,
  yTo = -10,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1.15,
}: UseScrollExpandParams) {
  useGSAP(
    () => {
      const trigger = triggerRef.current
      const media = mediaRef.current
      if (!trigger || !media || prefersReducedMotion()) return

      gsap.fromTo(
        media,
        { scale: scaleFrom, yPercent: yFrom, force3D: true },
        {
          scale: scaleTo,
          yPercent: yTo,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        },
      )
    },
    {
      dependencies: [scaleFrom, scaleTo, yFrom, yTo, start, end, scrub],
      scope: triggerRef,
      revertOnUpdate: true,
    },
  )
}
