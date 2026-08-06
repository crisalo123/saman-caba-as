export function PalmDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute -left-16 bottom-0 h-[85%] w-auto opacity-[0.14] text-leaf"
        viewBox="0 0 200 400"
        fill="currentColor"
      >
        <path d="M100 400 V180" stroke="currentColor" strokeWidth="8" fill="none" />
        <path d="M100 200 C40 160 10 90 30 40 C70 90 95 140 100 200 Z" />
        <path d="M100 200 C160 160 190 90 170 40 C130 90 105 140 100 200 Z" />
        <path d="M100 190 C50 130 45 60 70 20 C90 70 100 120 100 190 Z" />
        <path d="M100 190 C150 130 155 60 130 20 C110 70 100 120 100 190 Z" />
        <path d="M100 210 C20 200 -10 140 15 90 C55 140 85 180 100 210 Z" />
        <path d="M100 210 C180 200 210 140 185 90 C145 140 115 180 100 210 Z" />
      </svg>

      <svg
        className="absolute -right-20 top-10 h-[70%] w-auto opacity-[0.1] text-wood"
        viewBox="0 0 200 400"
        fill="currentColor"
      >
        <path d="M110 400 V160" stroke="currentColor" strokeWidth="7" fill="none" />
        <path d="M110 180 C50 150 20 80 45 25 C80 80 100 130 110 180 Z" />
        <path d="M110 180 C170 145 195 75 175 25 C140 80 115 130 110 180 Z" />
        <path d="M110 170 C60 110 55 50 85 10 C100 60 110 110 110 170 Z" />
        <path d="M110 170 C160 110 165 50 135 10 C120 60 110 110 110 170 Z" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(126,200,255,0.2),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(36,74,112,0.35),transparent_40%)]" />
    </div>
  )
}
