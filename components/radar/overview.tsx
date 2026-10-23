"use client"

import { ArrowRight, ArrowUpRight, Bookmark, Building2, Check, ChevronRight, MapPin, Radio, SlidersHorizontal, Sparkles, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { companies, type Company, type View } from "@/lib/demo-data"
import { CompanyMark, DemoFooter, IntentScore, RadarVisual, SectionLink, SignalIcon } from "./primitives"
import { SearchBox } from "./search-box"
import type { Preferences } from "./settings"

type Props = { onNavigate: (view: View) => void; onSearch: (query: string) => void; onCompany: (company: Company) => void; savedIds: string[]; onSave: (id: string) => void; onMonitor: () => void; preferences: Preferences }

function OpportunityCard({ company, onOpen, saved, onSave }: { company: Company; onOpen: () => void; saved: boolean; onSave: () => void }) {
  return <Card className="gap-4 py-5 shadow-none">
    <CardHeader className="gap-3 px-5">
      <div className="flex items-center justify-between gap-2"><CompanyMark company={company} /><IntentScore score={company.score} /></div>
      <div><CardTitle><button className="text-left text-[15px] leading-normal hover:text-primary" onClick={onOpen}>{company.name}</button></CardTitle><CardDescription className="mt-1 flex items-center gap-1 text-[11px]"><MapPin className="size-3" />{company.city}<span className="mx-1">·</span>{company.industry}</CardDescription></div>
    </CardHeader>
    <CardContent className="px-5">
      <div className="flex min-h-[67px] items-start gap-2 rounded-lg bg-background p-3"><span className="mt-0.5 text-sage-foreground"><TrendingUp className="size-3.5" /></span><div><p className="text-[10px] font-semibold text-muted-foreground">Почему сейчас</p><p className="mt-1 text-[11px] font-medium leading-relaxed">{company.signal}</p></div></div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5"><span className="text-[10px] text-muted-foreground">Интерес:</span>{company.needs.slice(0, 2).map(n => <Badge key={n.name} variant="secondary">{n.name}</Badge>)}</div>
    </CardContent>
    <CardFooter className="justify-between px-5"><button className="quiet-link" onClick={onOpen}>Профиль компании<ArrowUpRight className="size-3.5" /></button><Button variant={saved ? "secondary" : "ghost"} size="icon" onClick={onSave} aria-label={saved ? `Удалить ${company.name} из лидов` : `Сохранить ${company.name}`} aria-pressed={saved}>{saved ? <Check /> : <Bookmark />}</Button></CardFooter>
  </Card>
}

export function Overview({ onNavigate, onSearch, onCompany, savedIds, onSave, onMonitor, preferences }: Props) {
  const recommendations = companies.filter(c => (preferences.city === "Все регионы" || c.city === preferences.city) && c.needs.some(n => n.name.toLowerCase().includes(preferences.product.toLowerCase()))).sort((a, b) => (b.needs.find(n => n.name.toLowerCase().includes(preferences.product.toLowerCase()))?.score ?? 0) - (a.needs.find(n => n.name.toLowerCase().includes(preferences.product.toLowerCase()))?.score ?? 0)).slice(0, 3)
  const stats = [
    { label: "Компаний в демобазе", value: companies.length, note: "6 отраслей бизнеса", icon: Building2 },
    { label: "Сигналов за сегодня", value: 8, note: "Есть повод для контакта", icon: Radio },
    { label: "Перспективных лидов", value: companies.filter(c => c.score >= 85).length, note: "С оценкой от 85/100", icon: Target },
    { label: "В вашем списке", value: savedIds.length, note: "Готовы к следующему шагу", icon: Bookmark },
  ]
  return <>
    <div className="mb-6 flex items-start justify-between gap-3">
      <div><p className="eyebrow mb-2.5">Больше контекста. Ближе к сделке.</p><h1 className="page-heading">Ваш радар возможностей</h1><p className="mt-2 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">Находите клиентов не случайно, а вовремя.</p></div>
      <Button variant="outline" onClick={onMonitor} className="hidden md:inline-flex"><SlidersHorizontal data-icon="inline-start" />Настроить радар</Button>
      <Button variant="outline" size="icon" onClick={onMonitor} className="md:hidden" aria-label="Настроить радар"><SlidersHorizontal /></Button>
    </div>
    <section aria-labelledby="search-title" className="relative overflow-hidden rounded-2xl border border-primary/5 bg-sage px-5 py-6 md:px-7 md:py-6">
      <div className="relative z-10 lg:max-w-[72%]">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-sage-foreground"><Sparkles className="size-3.5" />ПОИСК С КОНТЕКСТОМ · ДЕМО</div>
        <h2 id="search-title" className="text-[21px] font-semibold tracking-[-0.7px] md:text-[23px]">Кого найдём сегодня?</h2>
        <p className="mt-1.5 mb-4 max-w-lg text-[11px] leading-relaxed text-muted-foreground md:text-[12px]">Опишите вашего клиента — или начните с названия компании.</p>
        <SearchBox onSearch={onSearch} large />
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1"><span className="hidden text-[10px] text-muted-foreground sm:inline">Например:</span>{["Нужна логистика", "Мебель в Ташкенте", "Открывают филиалы"].map(q => <button key={q} onClick={() => onSearch(q)} className="inline-flex min-h-9 items-center gap-1 text-[10px] font-medium text-sage-foreground underline decoration-sage-foreground/30 underline-offset-4 hover:decoration-sage-foreground">{q}<ArrowUpRight className="size-3" /></button>)}</div>
      </div>
      <div className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 lg:block"><RadarVisual /></div>
    </section>
    <section aria-label="Ключевые показатели демобазы" className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border bg-card md:grid-cols-4">
      {stats.map(({ label, value, note, icon: Icon }, i) => <div key={label} className="relative px-4 py-4 md:px-5 md:py-5">
        <div className="flex items-center justify-between gap-2"><p className="text-[10px] font-medium text-muted-foreground md:text-[11px]">{label}</p><Icon className="size-3.5 shrink-0 text-muted-foreground/70" strokeWidth={1.6} /></div>
        <p className="mt-1.5 text-[27px] leading-tight font-semibold tracking-[-1px] tabular-nums">{String(value).padStart(2, "0")}</p><p className="mt-1.5 hidden text-[10px] text-muted-foreground md:block">{note}</p>
        {i % 2 === 0 && <span className="absolute inset-y-4 right-0 w-px bg-border" />}{i === 1 && <span className="absolute inset-y-4 right-0 hidden w-px bg-border md:block" />}
        {i < 2 && <span className="absolute inset-x-4 bottom-0 h-px bg-border md:hidden" />}
      </div>)}
    </section>
    <section className="mt-6" aria-labelledby="focus-title">
      <div className="mb-3 flex items-center justify-between gap-2"><div className="flex items-center gap-2"><h2 id="focus-title" className="section-title">В фокусе сегодня</h2><Badge variant="sage">Топ-{recommendations.length}</Badge></div><SectionLink onClick={() => onSearch("")}>Все компании</SectionLink></div>
      <p className="-mt-1 mb-4 text-[11px] leading-relaxed text-muted-foreground">Для направления «{preferences.product}» · {preferences.city.toLowerCase()}</p>
      {recommendations.length === 0 && <div className="panel p-5 text-xs text-muted-foreground">Пока нет примеров для этих условий. Измените регион или направление в настройках.</div>}
      <div className="grid gap-3 md:grid-cols-3">{recommendations.map(c => <OpportunityCard key={c.id} company={c} onOpen={() => onCompany(c)} saved={savedIds.includes(c.id)} onSave={() => onSave(c.id)} />)}</div>
    </section>
    <div className="mt-6 grid items-start gap-5 xl:grid-cols-[1.65fr_1fr]">
      <section className="panel overflow-hidden" aria-labelledby="companies-title">
        <div className="flex items-center justify-between gap-2 px-5 pt-4 pb-2"><h2 id="companies-title" className="section-title">Компании на радаре</h2><SectionLink onClick={() => onSearch("")}>Все</SectionLink></div>
        <div className="hidden grid-cols-[1fr_100px_75px] gap-3 bg-background/70 px-5 py-2.5 text-[10px] text-muted-foreground sm:grid"><span>Компания</span><span>Регион</span><span>Потенциал</span></div>
        <div className="divide-y">{companies.slice(3, 8).map(c => <button key={c.id} onClick={() => onCompany(c)} className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted/60 sm:grid sm:grid-cols-[1fr_100px_75px]">
          <span className="flex min-w-0 flex-1 items-center gap-2.5"><CompanyMark company={c} /><span className="min-w-0"><span className="block truncate text-xs font-semibold">{c.name}</span><span className="mt-1 block text-[10px] text-muted-foreground">{c.industry}<span className="sm:hidden"> · {c.city}</span></span></span></span>
          <span className="hidden text-[11px] text-muted-foreground sm:block">{c.city}</span><IntentScore score={c.score} compact />
        </button>)}</div>
        <Separator /><button onClick={() => onSearch("")} className="flex min-h-12 w-full items-center justify-center gap-2 text-[11px] font-medium text-primary hover:bg-muted">Перейти к поиску компаний<ArrowRight className="size-3.5" /></button>
      </section>
      <section className="panel" aria-labelledby="signals-title">
        <div className="flex items-center justify-between gap-2 px-5 pt-4 pb-2"><h2 id="signals-title" className="section-title">Пульс рынка</h2><span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="size-1.5 rounded-full bg-sage-foreground" />Сегодня</span></div>
        <div className="flex flex-col gap-4 px-5 py-3">{companies.slice(0, 4).map(c => <button key={c.id} onClick={() => onCompany(c)} className="group flex items-start gap-3 text-left"><SignalIcon type={c.signalType} /><span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold">{c.name}</span><span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{c.signal}</span><span className="mt-1.5 block text-[9px] text-muted-foreground/80">{c.source} · {c.age} · пример</span></span><ChevronRight className="mt-2 size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-primary" /></button>)}</div>
        <Separator /><button onClick={() => onNavigate("signals")} className="flex min-h-12 w-full items-center justify-center gap-2 text-[11px] font-medium text-primary hover:bg-muted">Все коммерческие сигналы<ArrowRight className="size-3.5" /></button>
      </section>
    </div>
    <section className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-primary/10 bg-secondary/50 px-5 py-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/15 text-primary"><Radio className="size-5" strokeWidth={1.5} /></span><div><h2 className="text-[13px] font-semibold">Хорошие возможности не должны проходить мимо</h2><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Соберите свой радар по регионам, отраслям и типам событий.</p></div></div><Button variant="outline" onClick={onMonitor}>Настроить мониторинг<ArrowUpRight data-icon="inline-end" /></Button>
    </section>
    <DemoFooter />
  </>
}
