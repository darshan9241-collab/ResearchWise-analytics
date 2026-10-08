interface Props {
  label: string
  value: string
  detail?: string
  className?: string
}

/** Compact statistic readout, used in illustrative analysis visuals. */
export function StatCard({ label, value, detail, className = '' }: Props) {
  return (
    <div className={`rounded-[4px] border border-line bg-white px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgb(22_37_61/0.25)] ${className}`}>
      <p className="text-[0.6875rem] font-semibold tracking-[0.1em] text-muted uppercase">{label}</p>
      <p className="font-mono text-[1.0625rem] font-medium text-navy">{value}</p>
      {detail && <p className="font-mono text-[0.75rem] text-sage-700">{detail}</p>}
    </div>
  )
}
