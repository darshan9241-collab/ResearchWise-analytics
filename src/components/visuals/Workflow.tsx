import {
  BarChart3,
  ClipboardList,
  Eraser,
  FileSpreadsheet,
  FlaskConical,
  HelpCircle,
  MessageSquareText,
  Sigma,
  type LucideIcon,
} from 'lucide-react'
import { workflowSteps } from '../../data/analysis'
import { Reveal } from '../ui/Reveal'

const icons: LucideIcon[] = [HelpCircle, ClipboardList, Eraser, BarChart3, FlaskConical, Sigma, MessageSquareText, FileSpreadsheet]

/** Eight-step analysis workflow. Vertical timeline on mobile, 4×2 connected grid on desktop. */
export function Workflow({ inverted = true }: { inverted?: boolean }) {
  const line = inverted ? 'bg-white/15' : 'bg-line'
  return (
    <ol className="relative grid gap-0 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
      {workflowSteps.map((s, i) => {
        const Icon = icons[i]
        const last = i === workflowSteps.length - 1
        return (
          <li key={s.n} className="relative pb-8 pl-16 md:pb-0 md:pl-0">
            {/* mobile connector */}
            {!last && <span aria-hidden className={`absolute top-12 bottom-0 left-[23px] w-px md:hidden ${line}`} />}
            {/* desktop connector */}
            {!last && i !== 3 && <span aria-hidden className={`absolute top-6 right-[-24px] left-14 hidden h-px lg:block ${line}`} />}
            <Reveal delay={i * 70}>
              <div
                className={`absolute top-0 left-0 grid size-12 place-items-center rounded-[6px] border md:relative ${
                  inverted ? 'border-white/20 bg-navy-800 text-sage-300' : 'border-line bg-white text-sage-700'
                } ${last ? (inverted ? 'border-sage-300! bg-sage-300! text-navy!' : 'border-navy! bg-navy! text-white!') : ''}`}
              >
                <Icon aria-hidden className="size-5" strokeWidth={1.6} />
              </div>
              <p className={`mt-0 font-mono text-sm md:mt-4 ${inverted ? 'text-sage-300' : 'text-olive'}`}>{s.n}</p>
              <h3 className={`mt-1 text-lg leading-snug font-semibold ${inverted ? 'text-white' : 'text-navy'}`}>{s.title}</h3>
              <p className={`mt-1 text-[0.9375rem] ${inverted ? 'text-white/65' : 'text-muted'}`}>{s.text}</p>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}

/** Short linear pipeline, e.g. Raw Dataset → Cleaning → … */
export function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
      {steps.map((s, i) => {
        const last = i === steps.length - 1
        return (
          <li key={s} className="flex flex-col items-center lg:flex-1 lg:flex-row">
            <div
              className={`flex w-full items-center gap-3 rounded-[4px] border px-4 py-3 lg:h-full lg:flex-col lg:justify-center lg:gap-1 lg:text-center ${
                last ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy'
              }`}
            >
              <span className={`font-mono text-xs ${last ? 'text-sage-300' : 'text-olive'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[0.9375rem] leading-snug font-semibold">{s}</span>
            </div>
            {!last && (
              <span aria-hidden className="py-0.5 text-sage-700 lg:px-1.5 lg:py-0">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
