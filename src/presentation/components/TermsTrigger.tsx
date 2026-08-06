import { useState, type ReactNode } from 'react'
import { TermsModal } from '@/presentation/components/TermsModal'

type TermsTriggerProps = {
  className?: string
  children?: ReactNode
}

/** Abre el panel de términos (sin enlace a otra página). */
export function TermsTrigger({
  className = 'underline transition hover:text-leaf',
  children = 'Ver términos y condiciones',
}: TermsTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <TermsModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
