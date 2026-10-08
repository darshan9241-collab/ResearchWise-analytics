import { StatCard } from '../ui/StatCard'
import { ForestViz } from '../charts/Charts'
import { OutputTable, logisticRows } from './Windows'

/**
 * Hero composition: laptop showing statistical output, with a manuscript page,
 * a dataset fragment, a box plot and a summary statistic layered around it.
 * Purely illustrative — all numbers are synthetic.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]" aria-label="Illustration of statistical analysis output: regression table, forest plot, box plot and dataset" role="img">
      {/* Manuscript page (background) */}
      <div aria-hidden className="absolute top-0 -right-2 hidden w-[42%] rotate-[3deg] rounded-[3px] border border-line bg-white p-4 shadow-[0_20px_40px_-24px_rgb(22_37_61/0.35)] sm:block">
        <div className="h-2 w-3/4 rounded bg-navy/70" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-navy/30" />
        <div className="mt-4 space-y-1.5">
          {[100, 92, 96, 88, 94, 60].map((w, i) => (
            <div key={i} className="h-1 rounded bg-charcoal/15" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-3 text-[0.5625rem] font-semibold tracking-wider text-navy/70 uppercase">Table 2</p>
        <div className="mt-1 space-y-1 border-y border-navy/40 py-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-2">
              <div className="h-1 w-1/3 rounded bg-charcoal/20" />
              <div className="h-1 w-1/5 rounded bg-charcoal/20" />
              <div className="h-1 w-1/5 rounded bg-charcoal/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Laptop */}
      <div className="relative z-10 pt-6 sm:pt-10 sm:pr-14">
        <div className="rounded-t-[12px] border-[7px] border-b-0 border-[#1d2735] bg-[#1d2735]">
          <div className="overflow-hidden rounded-[3px] bg-white">
            <div className="flex items-center gap-1.5 border-b border-line bg-cream/80 px-3 py-1.5" aria-hidden>
              <i className="size-2 rounded-full bg-[#d9d2c3]" />
              <i className="size-2 rounded-full bg-[#d9d2c3]" />
              <i className="size-2 rounded-full bg-[#d9d2c3]" />
              <span className="ml-2 font-mono text-[0.6875rem] text-muted">Output — Binary Logistic Regression</span>
            </div>
            <div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_1fr] sm:p-4">
              <OutputTable title="Variables in the Equation" head={['', 'Exp(B)', '95% C.I.', 'Sig.']} rows={logisticRows.slice(0, 4).map((r) => [r[0], r[5], r[6], r[4]])} />
              <div className="hidden sm:block">
                <p className="mb-1 text-[0.75rem] font-semibold text-navy">Adjusted odds ratios</p>
                <ForestViz />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-[-5%] h-3.5 rounded-b-[10px] bg-gradient-to-b from-[#c9c3b5] to-[#a8a294]" aria-hidden>
          <div className="mx-auto h-1.5 w-1/5 rounded-b-[6px] bg-[#9a9488]" />
        </div>
      </div>

      {/* Box plot + summary statistic, overlapping only the laptop base */}
      <div className="relative z-20 -mt-5 hidden items-end justify-between gap-4 px-2 sm:flex">
        <div aria-hidden className="w-[46%] rounded-[6px] border border-line bg-white p-3 shadow-[0_18px_40px_-20px_rgb(22_37_61/0.45)]">
          <p className="text-[0.6875rem] font-semibold text-navy">Systematic review · PRISMA flow</p>
          <ol className="mt-2 space-y-1 font-mono text-[0.6875rem] text-charcoal">
            {[
              ['Records identified', '1,248'],
              ['Screened', '836'],
              ['Full texts assessed', '112'],
              ['Studies included', '24'],
            ].map(([k, v], i, arr) => (
              <li key={k}>
                <div className={`flex justify-between rounded-[3px] px-2 py-1 ${i === arr.length - 1 ? 'bg-navy text-white' : 'bg-cream'}`}>
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
                {i < arr.length - 1 && <div className="ml-4 h-1.5 w-px bg-sage-700" />}
              </li>
            ))}
          </ol>
        </div>
        <StatCard className="mb-4" label="Smoking · adjusted" value="OR 2.10" detail="95% CI 1.32–3.35" />
      </div>

    </div>
  )
}
