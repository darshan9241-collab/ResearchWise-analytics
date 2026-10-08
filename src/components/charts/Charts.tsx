// Illustrative statistical charts drawn as plain SVG (no chart library).
// All data are synthetic examples, labelled as such wherever they appear.
//
// Colour: single-series marks use navy; two-group charts use a validated pair
// (blue #2f5f9e / ochre #c07a2a — passes lightness, chroma, CVD and contrast checks).

import type { ReactNode } from 'react'

export const C = {
  single: '#2a4066',
  a: '#2f5f9e',
  b: '#c07a2a',
  grid: '#e9e4d8',
  axis: '#9a978e',
  ink: '#2a2c2f',
  muted: '#5a5f66',
  band: 'rgb(47 95 158 / 0.14)',
  surface: '#ffffff',
}

const W = 320
const H = 210
const M = { t: 14, r: 14, b: 40, l: 38 }
const IW = W - M.l - M.r
const IH = H - M.t - M.b

const sx = (v: number, min: number, max: number) => M.l + ((v - min) / (max - min)) * IW
const sy = (v: number, min: number, max: number) => M.t + IH - ((v - min) / (max - min)) * IH

function Svg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </svg>
  )
}

function YGrid({ ticks, min, max, fmt = String }: { ticks: number[]; min: number; max: number; fmt?: (n: number) => string }) {
  return (
    <g>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={M.l} x2={W - M.r} y1={sy(t, min, max)} y2={sy(t, min, max)} stroke={C.grid} />
          <text x={M.l - 6} y={sy(t, min, max) + 3.5} fontSize="10" textAnchor="end" fill={C.muted}>
            {fmt(t)}
          </text>
        </g>
      ))}
    </g>
  )
}

function XTicks({ ticks, min, max, fmt = String }: { ticks: number[]; min: number; max: number; fmt?: (n: number) => string }) {
  return (
    <g>
      <line x1={M.l} x2={W - M.r} y1={M.t + IH} y2={M.t + IH} stroke={C.axis} />
      {ticks.map((t) => (
        <text key={t} x={sx(t, min, max)} y={H - 22} fontSize="10" textAnchor="middle" fill={C.muted}>
          {fmt(t)}
        </text>
      ))}
    </g>
  )
}

function AxisTitle({ x, y }: { x?: string; y?: string }) {
  return (
    <>
      {x && (
        <text x={M.l + IW / 2} y={H - 5} fontSize="9.5" textAnchor="middle" fill={C.muted}>
          {x}
        </text>
      )}
      {y && (
        <text x={10} y={M.t + IH / 2} fontSize="9.5" textAnchor="middle" fill={C.muted} transform={`rotate(-90 10 ${M.t + IH / 2})`}>
          {y}
        </text>
      )}
    </>
  )
}

/** Bar with 4px rounded top, square at baseline. */
function bar(x: number, y: number, w: number, h: number, r = 3) {
  r = Math.min(r, h, w / 2)
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`
}

// ─── Bar chart: prevalence by age group ──────────────────────────────────────
export function BarChartViz() {
  const data = [
    ['18–29', 12.4],
    ['30–39', 18.9],
    ['40–49', 27.6],
    ['50–59', 36.2],
    ['≥60', 44.8],
  ] as const
  const max = 50
  const step = IW / data.length
  const bw = step * 0.56
  return (
    <Svg label="Bar chart: illustrative prevalence of hypertension rising from 12.4% at age 18–29 to 44.8% at 60 and over">
      <YGrid ticks={[0, 10, 20, 30, 40, 50]} min={0} max={max} fmt={(n) => `${n}%`} />
      <line x1={M.l} x2={W - M.r} y1={M.t + IH} y2={M.t + IH} stroke={C.axis} />
      {data.map(([k, v], i) => {
        const x = M.l + step * i + (step - bw) / 2
        const y = sy(v, 0, max)
        return (
          <g key={k}>
            <path d={bar(x, y, bw, M.t + IH - y)} fill={C.single} />
            <text x={x + bw / 2} y={y - 4} fontSize="9.5" textAnchor="middle" fill={C.ink} fontWeight="600">
              {v}
            </text>
            <text x={x + bw / 2} y={H - 22} fontSize="10" textAnchor="middle" fill={C.muted}>
              {k}
            </text>
          </g>
        )
      })}
      <AxisTitle x="Age group (years)" />
    </Svg>
  )
}

// ─── Histogram: systolic blood pressure ──────────────────────────────────────
export function HistogramViz() {
  const counts = [3, 8, 17, 31, 46, 52, 44, 30, 19, 10, 5, 2]
  const lo = 90
  const width = 7.5
  const hi = lo + width * counts.length
  const max = 60
  return (
    <Svg label="Histogram: illustrative distribution of systolic blood pressure, approximately symmetric and peaking around 130 mmHg">
      <YGrid ticks={[0, 20, 40, 60]} min={0} max={max} />
      {counts.map((c, i) => {
        const x0 = sx(lo + i * width, lo, hi) + 1
        const x1 = sx(lo + (i + 1) * width, lo, hi) - 1
        const y = sy(c, 0, max)
        return <path key={i} d={bar(x0, y, x1 - x0, M.t + IH - y, 2)} fill={C.single} />
      })}
      <XTicks ticks={[90, 105, 120, 135, 150, 165, 180]} min={lo} max={hi} />
      <AxisTitle x="Systolic BP (mmHg)" y="Count" />
    </Svg>
  )
}

// ─── Box plot: two groups ────────────────────────────────────────────────────
export function BoxPlotViz() {
  const groups = [
    { k: 'Control', color: C.a, min: 19.2, q1: 22.4, med: 24.6, q3: 27.1, max: 33.4, out: [36.1] },
    { k: 'Intervention', color: C.b, min: 18.6, q1: 21.0, med: 22.8, q3: 25.0, max: 30.4, out: [34.2, 16.9] },
  ]
  const min = 15
  const max = 38
  return (
    <Svg label="Box plot: illustrative BMI by group; median 24.6 in control and 22.8 in intervention">
      <YGrid ticks={[15, 20, 25, 30, 35]} min={min} max={max} />
      <line x1={M.l} x2={W - M.r} y1={M.t + IH} y2={M.t + IH} stroke={C.axis} />
      {groups.map((g, i) => {
        const cx = M.l + IW * (0.28 + i * 0.44)
        const bw = 54
        const y = (v: number) => sy(v, min, max)
        return (
          <g key={g.k}>
            <line x1={cx} x2={cx} y1={y(g.max)} y2={y(g.q3)} stroke={g.color} strokeWidth="1.5" />
            <line x1={cx} x2={cx} y1={y(g.q1)} y2={y(g.min)} stroke={g.color} strokeWidth="1.5" />
            <line x1={cx - 12} x2={cx + 12} y1={y(g.max)} y2={y(g.max)} stroke={g.color} strokeWidth="1.5" />
            <line x1={cx - 12} x2={cx + 12} y1={y(g.min)} y2={y(g.min)} stroke={g.color} strokeWidth="1.5" />
            <rect x={cx - bw / 2} y={y(g.q3)} width={bw} height={y(g.q1) - y(g.q3)} rx="3" fill={g.color} fillOpacity="0.16" stroke={g.color} strokeWidth="1.5" />
            <line x1={cx - bw / 2} x2={cx + bw / 2} y1={y(g.med)} y2={y(g.med)} stroke={g.color} strokeWidth="2.5" />
            {g.out.map((o) => (
              <circle key={o} cx={cx} cy={y(o)} r="4" fill={C.surface} stroke={g.color} strokeWidth="1.5" />
            ))}
            <text x={cx} y={H - 22} fontSize="10" textAnchor="middle" fill={C.ink} fontWeight="600">
              {g.k}
            </text>
          </g>
        )
      })}
      <AxisTitle y="BMI (kg/m²)" />
    </Svg>
  )
}

// ─── Scatter with regression line + 95% CI band ─────────────────────────────
const scatterPts: [number, number][] = [
  [21, 112], [23, 118], [24, 114], [25, 121], [26, 117], [27, 126], [28, 122], [29, 129], [30, 125], [31, 133],
  [32, 128], [33, 136], [34, 131], [35, 140], [22, 120], [36, 137], [37, 144], [38, 139], [26, 124], [30, 131],
  [33, 129], [24, 123], [35, 134], [28, 128], [39, 146],
]

export function ScatterViz({ showBand = true }: { showBand?: boolean }) {
  const [x0, x1, y0, y1] = [20, 40, 105, 150]
  const line = (x: number) => 72.6 + 1.84 * x
  const band = (x: number) => 2.4 + Math.abs(x - 30) * 0.42
  const xs = [20, 25, 30, 35, 40]
  const upper = xs.map((x) => `${sx(x, x0, x1)},${sy(line(x) + band(x), y0, y1)}`)
  const lower = xs.map((x) => `${sx(x, x0, x1)},${sy(line(x) - band(x), y0, y1)}`).reverse()
  return (
    <Svg label="Scatter plot: illustrative positive linear relationship between BMI and systolic blood pressure, with fitted regression line and 95% confidence band">
      <YGrid ticks={[110, 120, 130, 140, 150]} min={y0} max={y1} />
      {showBand && <polygon points={[...upper, ...lower].join(' ')} fill={C.band} />}
      {scatterPts.map(([x, y], i) => (
        <circle key={i} cx={sx(x, x0, x1)} cy={sy(y, y0, y1)} r="4" fill={C.a} fillOpacity="0.85" stroke={C.surface} strokeWidth="1.5" />
      ))}
      <line className="draw" pathLength={1} x1={sx(x0, x0, x1)} y1={sy(line(x0), y0, y1)} x2={sx(x1, x0, x1)} y2={sy(line(x1), y0, y1)} stroke={C.single} strokeWidth="2" />
      <XTicks ticks={xs} min={x0} max={x1} />
      <AxisTitle x="BMI (kg/m²)" y="Systolic BP" />
    </Svg>
  )
}

// ─── Forest plot: adjusted odds ratios (log scale) ──────────────────────────
export function ForestViz() {
  const rows = [
    { k: 'Age ≥ 40', or: 1.96, lo: 1.24, hi: 3.1 },
    { k: 'Smoker', or: 2.1, lo: 1.32, hi: 3.35 },
    { k: 'BMI ≥ 25', or: 1.54, lo: 0.99, hi: 2.4 },
    { k: 'Physically active', or: 0.62, lo: 0.41, hi: 0.94 },
    { k: 'Urban residence', or: 1.12, lo: 0.74, hi: 1.7 },
  ]
  const L = 98
  const lx = (v: number) => L + ((Math.log(v) - Math.log(0.25)) / (Math.log(4) - Math.log(0.25))) * (W - L - M.r)
  const rowH = IH / rows.length
  return (
    <Svg label="Forest plot: illustrative adjusted odds ratios with 95% confidence intervals on a log scale; smoking and age above 40 increase odds, physical activity decreases odds">
      {[0.25, 0.5, 1, 2, 4].map((t) => (
        <g key={t}>
          <line x1={lx(t)} x2={lx(t)} y1={M.t} y2={M.t + IH} stroke={t === 1 ? C.axis : C.grid} strokeDasharray={t === 1 ? '3 3' : undefined} />
          <text x={lx(t)} y={H - 22} fontSize="10" textAnchor="middle" fill={C.muted}>
            {t}
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = M.t + rowH * i + rowH / 2
        return (
          <g key={r.k}>
            <text x={4} y={y + 3.5} fontSize="10" fill={C.ink}>
              {r.k}
            </text>
            <line x1={lx(r.lo)} x2={lx(r.hi)} y1={y} y2={y} stroke={C.single} strokeWidth="1.75" />
            <rect x={lx(r.or) - 4.5} y={y - 4.5} width="9" height="9" fill={C.single} />
          </g>
        )
      })}
      <text x={L + (W - L - M.r) / 2} y={H - 5} fontSize="9.5" textAnchor="middle" fill={C.muted}>
        Adjusted OR (95% CI), log scale
      </text>
    </Svg>
  )
}

// ─── ROC curve ───────────────────────────────────────────────────────────────
export function RocViz() {
  const pts = [
    [0, 0], [0.02, 0.18], [0.05, 0.36], [0.1, 0.55], [0.16, 0.68], [0.24, 0.78], [0.34, 0.86], [0.46, 0.92], [0.6, 0.96], [0.78, 0.985], [1, 1],
  ]
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x, 0, 1)},${sy(y, 0, 1)}`).join(' ')
  return (
    <Svg label="ROC curve: illustrative diagnostic model with area under the curve of 0.84, well above the diagonal reference line">
      <YGrid ticks={[0, 0.25, 0.5, 0.75, 1]} min={0} max={1} />
      <line x1={sx(0, 0, 1)} y1={sy(0, 0, 1)} x2={sx(1, 0, 1)} y2={sy(1, 0, 1)} stroke={C.axis} strokeDasharray="3 3" />
      <path className="draw" pathLength={1} d={d} fill="none" stroke={C.a} strokeWidth="2" strokeLinejoin="round" />
      <XTicks ticks={[0, 0.25, 0.5, 0.75, 1]} min={0} max={1} />
      <rect x={sx(0.56, 0, 1)} y={sy(0.34, 0, 1)} width="92" height="22" rx="3" fill={C.surface} stroke={C.grid} />
      <text x={sx(0.56, 0, 1) + 46} y={sy(0.34, 0, 1) + 14.5} fontSize="10" textAnchor="middle" fill={C.ink} fontWeight="600">
        AUC = 0.84
      </text>
      <AxisTitle x="1 − Specificity" y="Sensitivity" />
    </Svg>
  )
}

// ─── Kaplan-Meier: two arms ──────────────────────────────────────────────────
export function KaplanMeierViz() {
  const arms = [
    { k: 'Treatment', color: C.a, labelDy: -8, s: [[0, 1], [3, 0.96], [6, 0.92], [9, 0.88], [12, 0.85], [15, 0.82], [18, 0.8], [21, 0.78], [24, 0.76]] },
    { k: 'Standard care', color: C.b, labelDy: 15, s: [[0, 1], [2, 0.93], [5, 0.85], [8, 0.77], [11, 0.7], [14, 0.64], [17, 0.6], [20, 0.57], [24, 0.54]] },
  ]
  const step = (s: number[][]) =>
    s.map(([t, p], i) => (i === 0 ? `M${sx(t, 0, 24)},${sy(p, 0.4, 1)}` : `H${sx(t, 0, 24)} V${sy(p, 0.4, 1)}`)).join(' ')
  return (
    <Svg label="Kaplan-Meier curves: illustrative survival probability over 24 months, higher in the treatment arm (0.76) than standard care (0.54)">
      <YGrid ticks={[0.4, 0.6, 0.8, 1]} min={0.4} max={1} fmt={(n) => n.toFixed(1)} />
      {arms.map((a) => (
        <g key={a.k}>
          <path className="draw" pathLength={1} d={step(a.s)} fill="none" stroke={a.color} strokeWidth="2" />
          <text x={W - M.r - 2} y={sy(a.s[a.s.length - 1][1], 0.4, 1) + a.labelDy} fontSize="10" textAnchor="end" fill={C.ink} fontWeight="600" stroke={C.surface} strokeWidth="3" paintOrder="stroke">
            {a.k}
          </text>
        </g>
      ))}
      <XTicks ticks={[0, 6, 12, 18, 24]} min={0} max={24} />
      <AxisTitle x="Months" y="Survival probability" />
    </Svg>
  )
}

// ─── Epidemic curve ──────────────────────────────────────────────────────────
export function EpiCurveViz() {
  const cases = [1, 2, 4, 7, 12, 19, 26, 31, 28, 22, 16, 11, 7, 4, 2, 1]
  const max = 35
  const bw = IW / cases.length
  return (
    <Svg label="Epidemic curve: illustrative weekly case counts rising to a peak of 31 in week 8 and declining thereafter">
      <YGrid ticks={[0, 10, 20, 30]} min={0} max={max} />
      {cases.map((c, i) => {
        const y = sy(c, 0, max)
        return <path key={i} d={bar(M.l + i * bw + 1, y, bw - 2, M.t + IH - y, 2)} fill={C.single} />
      })}
      <line x1={M.l} x2={W - M.r} y1={M.t + IH} y2={M.t + IH} stroke={C.axis} />
      {[1, 4, 8, 12, 16].map((w) => (
        <text key={w} x={M.l + (w - 0.5) * bw} y={H - 22} fontSize="10" textAnchor="middle" fill={C.muted}>
          {w}
        </text>
      ))}
      <AxisTitle x="Epidemiological week" y="Cases" />
    </Svg>
  )
}

/** Legend row for two-group charts — identity never by colour alone. */
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  )
}
