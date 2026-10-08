import { useId, type ReactNode } from 'react'

interface BaseProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
}

const inputCls =
  'mt-1.5 block w-full rounded-[4px] border bg-white px-3.5 py-3 text-base text-charcoal placeholder:text-muted/70 focus:border-navy focus:outline-2 focus:outline-offset-0 focus:outline-navy/20'

const chevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%2316253d' stroke-width='1.6'/%3E%3C/svg%3E\")] bg-[position:right_14px_center] bg-no-repeat"

function Shell({ id, label, required, error, hint, children }: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-semibold text-navy">
        {label}
        {required ? <span className="text-olive"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-[#9b2c2c]">
          {error}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)
const border = (error?: string) => (error ? 'border-[#9b2c2c]' : 'border-line')

interface TextProps extends BaseProps {
  type?: 'text' | 'email' | 'tel'
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  placeholder?: string
}

export function TextField(props: TextProps) {
  const id = useId()
  const { name, type = 'text', value, onChange, required, error, hint, autoComplete, placeholder } = props
  return (
    <Shell {...props} id={id}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputCls} ${border(error)}`}
      />
    </Shell>
  )
}

interface AreaProps extends BaseProps {
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}

export function TextArea(props: AreaProps) {
  const id = useId()
  const { name, value, onChange, required, error, hint, rows = 5, placeholder } = props
  return (
    <Shell {...props} id={id}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputCls} resize-y ${border(error)}`}
      />
    </Shell>
  )
}

interface SelectProps extends BaseProps {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
}

export function SelectField(props: SelectProps) {
  const id = useId()
  const { name, value, onChange, required, error, hint, options, placeholder = 'Select…' } = props
  return (
    <Shell {...props} id={id}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputCls} appearance-none pr-10 ${chevron} ${border(error)}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  )
}
