import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  /** id of the element that names the dialog (usually its heading). */
  labelledBy: string
  children: ReactNode
}

/**
 * Accessible popup built on the native <dialog> element:
 * focus is trapped, Esc closes it, and clicking the backdrop closes it.
 */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    else if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="rw-modal"
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full text-navy hover:bg-cream"
        >
          <X aria-hidden className="size-5" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </dialog>
  )
}
