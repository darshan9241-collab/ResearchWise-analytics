// Original, illustrative software-window mock-ups (no product screenshots or logos).
import type { ReactNode } from 'react'
import { BoxPlotViz, C, ScatterViz } from '../charts/Charts'

function WindowChrome({ title, children, dark = false, className = '' }: { title: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[6px] border ${dark ? 'border-navy-700 bg-[#1b2433]' : 'border-line bg-white'} ${className}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? 'border-white/10 bg-[#151c28]' : 'border-line bg-cream/70'}`}>
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#d9d2c3]" />
          <i className="size-2.5 rounded-full bg-[#d9d2c3]" />
          <i className="size-2.5 rounded-full bg-[#d9d2c3]" />
        </span>
        <span className={`truncate font-mono text-[0.6875rem] ${dark ? 'text-white/60' : 'text-muted'}`}>{title}</span>
      </div>
      {children}
    </div>
  )
}

/** Statistical output table in the style of a stats package viewer. */
export function OutputTable({ title, head, rows, note }: { title: string; head: string[]; rows: (string | number)[][]; note?: string }) {
  return (
    <div>
      <p className="mb-1.5 text-[0.75rem] font-semibold text-navy">{title}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[0.6875rem] whitespace-nowrap text-charcoal tabular-nums">
          <thead>
            <tr className="border-y border-navy/60">
              {head.map((h, i) => (
                <th key={i} className={`px-2 py-1 font-semibold ${i === 0 ? 'text-left' : 'text-right'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i === rows.length - 1 ? 'border-b border-navy/60' : 'border-b border-line/70'}>
                {r.map((c, j) => (
                  <td key={j} className={`px-2 py-1 ${j === 0 ? 'text-left font-sans text-[0.71875rem]' : 'text-right'}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-1 text-[0.6875rem] text-muted">{note}</p>}
    </div>
  )
}

export const logisticRows = [
  ['Age ≥ 40', '0.673', '0.234', '8.27', '.004', '1.96', '1.24–3.10'],
  ['Smoker', '0.742', '0.237', '9.80', '.002', '2.10', '1.32–3.35'],
  ['BMI ≥ 25', '0.432', '0.226', '3.65', '.056', '1.54', '0.99–2.40'],
  ['Active', '−0.478', '0.211', '5.13', '.024', '0.62', '0.41–0.94'],
  ['Constant', '−1.904', '0.281', '45.9', '<.001', '0.15', ''],
]

/** SPSS-style output viewer. */
export function SpssWindow({ className = '' }: { className?: string }) {
  return (
    <WindowChrome title="Output — hypertension_analysis" className={className}>
      <div className="grid grid-cols-[110px_1fr] max-sm:grid-cols-1">
        <aside className="border-r border-line bg-cream/40 p-2.5 text-[0.6875rem] text-muted max-sm:hidden" aria-hidden>
          <p className="font-semibold text-navy">Output</p>
          <ul className="mt-1.5 space-y-1 pl-2">
            <li>Frequencies</li>
            <li>Descriptives</li>
            <li>Crosstabs</li>
            <li className="rounded-[2px] bg-sage-100 px-1 text-navy">Logistic Regression</li>
          </ul>
        </aside>
        <div className="space-y-4 p-3.5">
          <OutputTable
            title="Variables in the Equation"
            head={['', 'B', 'S.E.', 'Wald', 'Sig.', 'Exp(B)', '95% C.I.']}
            rows={logisticRows}
            note="Illustrative output. Dependent variable: hypertension (1 = yes)."
          />
          <OutputTable
            title="Chi-Square Tests"
            head={['', 'Value', 'df', 'Sig. (2-sided)']}
            rows={[
              ['Pearson Chi-Square', '12.84', '1', '<.001'],
              ['Fisher’s Exact Test', '', '', '<.001'],
              ['N of Valid Cases', '412', '', ''],
            ]}
          />
        </div>
      </div>
    </WindowChrome>
  )
}

/** RStudio-style four-pane IDE. */
export function RStudioWindow({ className = '' }: { className?: string }) {
  return (
    <WindowChrome title="analysis.R — R project" className={className}>
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-line md:border-r md:border-b-0">
          <PaneLabel>analysis.R</PaneLabel>
          <pre className="overflow-x-auto p-3 font-mono text-[0.6875rem] leading-[1.7] text-charcoal">
            <code>
              <Ln n={1}><Cm># Logistic regression: hypertension</Cm></Ln>
              <Ln n={2}>model {'<-'} <Fn>glm</Fn>(htn ~ age40 + smoker +</Ln>
              <Ln n={3}>{'             '}bmi25 + active,</Ln>
              <Ln n={4}>{'             '}family = <Fn>binomial</Fn>, data = df)</Ln>
              <Ln n={5}> </Ln>
              <Ln n={6}><Cm># Odds ratios with 95% CI</Cm></Ln>
              <Ln n={7}><Fn>exp</Fn>(<Fn>cbind</Fn>(OR = <Fn>coef</Fn>(model),</Ln>
              <Ln n={8}>{'          '}<Fn>confint</Fn>(model)))</Ln>
              <Ln n={9}> </Ln>
              <Ln n={10}><Fn>ggplot</Fn>(df, <Fn>aes</Fn>(bmi, sbp)) +</Ln>
              <Ln n={11}>{'  '}<Fn>geom_point</Fn>() +</Ln>
              <Ln n={12}>{'  '}<Fn>geom_smooth</Fn>(method = <St>"lm"</St>)</Ln>
            </code>
          </pre>
          <PaneLabel>Console</PaneLabel>
          <pre className="overflow-x-auto p-3 font-mono text-[0.6875rem] leading-[1.6] text-charcoal tabular-nums">
            <code>
              <span className="text-sage-700">{'>'} exp(cbind(OR = coef(model), confint(model)))</span>
              {'\n'}
              {'            OR  2.5 % 97.5 %\n'}
              {'age40     1.96   1.24   3.10\n'}
              {'smoker    2.10   1.32   3.35\n'}
              {'bmi25     1.54   0.99   2.40\n'}
              {'active    0.62   0.41   0.94'}
            </code>
          </pre>
        </div>
        <div>
          <PaneLabel>Plots</PaneLabel>
          <div className="p-3">
            <ScatterViz />
          </div>
          <PaneLabel>Environment</PaneLabel>
          <ul className="space-y-1 p-3 font-mono text-[0.6875rem] text-muted">
            <li>
              <span className="text-navy">df</span> 412 obs. of 14 variables
            </li>
            <li>
              <span className="text-navy">model</span> List of 30 (glm)
            </li>
          </ul>
        </div>
      </div>
    </WindowChrome>
  )
}

const PaneLabel = ({ children }: { children: ReactNode }) => (
  <div className="border-b border-line bg-cream/50 px-3 py-1 text-[0.6875rem] font-semibold text-muted">{children}</div>
)
const Ln = ({ n, children }: { n: number; children: ReactNode }) => (
  <span className="block">
    <span className="mr-3 inline-block w-4 text-right text-muted/60 select-none">{n}</span>
    {children}
  </span>
)
const Cm = ({ children }: { children: ReactNode }) => <span className="text-sage-700 italic">{children}</span>
const Fn = ({ children }: { children: ReactNode }) => <span style={{ color: C.a }}>{children}</span>
const St = ({ children }: { children: ReactNode }) => <span style={{ color: C.b }}>{children}</span>

/** Small spreadsheet fragment. `messy` highlights problem cells. */
export function DatasetGrid({ messy = false, className = '' }: { messy?: boolean; className?: string }) {
  const head = ['id', 'age', 'sex', 'sbp', 'smoker', 'bmi']
  const clean = [
    ['001', '34', '1', '118', '0', '23.4'],
    ['002', '52', '2', '142', '1', '27.9'],
    ['003', '47', '1', '131', '1', '25.2'],
    ['004', '29', '2', '112', '0', '21.8'],
    ['005', '61', '1', '150', '0', '29.1'],
  ]
  const dirty = [
    ['001', '34', 'M', '118', 'no', '23.4'],
    ['002', '52', 'female', '142', 'Yes', '27.9'],
    ['002', '52', 'female', '142', 'Yes', '27.9'],
    ['004', '290', 'F', '', '0', '21.8'],
    ['005', '61', 'm', '150', '99', '291'],
  ]
  const flags = new Set(['0-2', '1-2', '2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '4-2', '4-4', '4-5', '1-4', '0-4'])
  const rows = messy ? dirty : clean
  return (
    <div className={`overflow-hidden rounded-[4px] border border-line bg-white ${className}`}>
      <table className="w-full border-collapse font-mono text-[0.6875rem] tabular-nums">
        <thead>
          <tr className="bg-cream">
            {head.map((h) => (
              <th key={h} className="border-r border-b border-line px-2 py-1 text-left font-semibold text-navy last:border-r-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => {
                const bad = messy && flags.has(`${i}-${j}`)
                return (
                  <td
                    key={j}
                    className={`border-r border-b border-line px-2 py-1 last:border-r-0 ${bad ? 'bg-[#f6e6cf] text-[#8a4b0f]' : 'text-charcoal'}`}
                  >
                    {c === '' ? <span className="text-muted/60">·</span> : c}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MiniBoxCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-[6px] border border-line bg-white p-2.5 ${className}`}>
      <BoxPlotViz />
    </div>
  )
}
