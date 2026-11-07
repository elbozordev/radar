import { ArrowUpRight, BriefcaseBusiness, Building2, PackagePlus, Radar, Sparkles, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Company, type SignalType, signalLabels } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-lime"><Radar className="size-[23px]" strokeWidth={1.7} /></span>
      <span className={cn("font-extrabold tracking-[-1.3px]", compact ? "text-[23px]" : "text-[25px]")}>radar<span className="text-muted-foreground">.uz</span></span>
    </span>
  )
}

export function CompanyMark({ company, large = false }: { company: Company; large?: boolean }) {
  return <span aria-hidden="true" className={cn("company-mark", large ? "size-14 text-xl" : "size-10", {
    "bg-sage text-sage-foreground": company.color === "sage",
    "bg-violet text-violet-foreground": company.color === "violet",
    "bg-amber text-amber-foreground": company.color === "amber",
    "bg-muted text-muted-foreground": company.color === "neutral",
  })}>{company.initials}<span className="text-[10px]">.</span></span>
}

const signalIcons = { expansion: Building2, hiring: BriefcaseBusiness, tender: TrendingUp, product: PackagePlus }
export function SignalIcon({ type }: { type: SignalType }) {
  const Icon = signalIcons[type]
  return <span className="signal-icon" data-type={type}><Icon className="size-4" strokeWidth={1.65} /></span>
}

export function SignalBadge({ type }: { type: SignalType }) {
  const variants = { expansion: "sage", hiring: "violet", tender: "amber", product: "secondary" } as const
  return <Badge variant={variants[type]}>{signalLabels[type]}</Badge>
}

export function IntentScore({ score, compact = false }: { score: number; compact?: boolean }) {
  return <span className={cn("inline-flex shrink-0 items-center gap-1 font-semibold tabular-nums text-primary", compact ? "text-xs" : "text-sm")} title="Иллюстративная оценка интереса, не прогноз реальной покупки"><span className="size-1.5 rounded-full bg-primary" />{score}<span className="font-normal text-muted-foreground">/100</span></span>
}

export function RadarVisual() {
  return <div className="radar-visual relative size-56 shrink-0 rounded-full" aria-hidden="true">
    <div className="radar-sweep absolute inset-0 rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center"><span className="flex size-10 items-center justify-center rounded-full border border-primary/15 bg-primary text-lime"><Radar className="size-5" /></span></div>
    <span className="absolute top-[49px] right-[48px] size-3 rounded-full border-[3px] border-sage bg-primary shadow-[0_0_0_5px_#b7d18b33]" />
    <span className="absolute bottom-[54px] left-[38px] size-2.5 rounded-full bg-primary/40" />
    <span className="absolute top-[66px] left-[49px] size-2 rounded-full bg-primary/30" />
    <span className="absolute right-[54px] bottom-[45px] size-2 rounded-full bg-primary/20" />
  </div>
}

export function DemoFooter() {
  return <footer className="mt-8 flex flex-col gap-2 border-t pt-5 text-[10px] leading-relaxed text-muted-foreground sm:flex-row sm:justify-between">
    <p>© 2026 Radar.uz · Бизнес становится ближе.</p>
    <p className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-sage-foreground" />Демо: вымышленные компании и сигналы</p>
  </footer>
}

export function SectionLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button className="quiet-link" onClick={onClick}>{children}<ArrowUpRight className="size-3.5" /></button>
}

export function InsightLabel() {
  return <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-sage-foreground"><Sparkles className="size-3" />Пример AI-аналитики</span>
}
