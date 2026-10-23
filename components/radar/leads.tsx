"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight, Bookmark, Download, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { companies, stageLabels, type Company, type Lead, type LeadStage } from "@/lib/demo-data"
import { exportCompanies } from "@/lib/export"
import { CompanyMark, DemoFooter, IntentScore } from "./primitives"

type Props = { leads: Lead[]; onCompany: (c: Company) => void; onChange: (id: string, patch: Partial<Lead>) => void; onRemove: (id: string) => void; onSearch: () => void }

export function Leads({ leads, onCompany, onChange, onRemove, onSearch }: Props) {
  const [search, setSearch] = useState("")
  const [stage, setStage] = useState("all")
  const items = leads.flatMap(l => { const company = companies.find(c => c.id === l.companyId); return company && company.name.toLowerCase().includes(search.toLowerCase()) && (stage === "all" || l.stage === stage) ? [{ ...l, company }] : [] })
  function doExport() { exportCompanies(items.map(l => l.company), leads); toast.success(`Экспортировано лидов: ${items.length}`) }
  return <>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2.5">От знакомства к сотрудничеству</p><h1 className="page-heading">Мои лиды <span className="text-muted-foreground/50">{leads.length}</span></h1><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Сохраняйте перспективные компании. Не теряйте контекст.</p></div><Button variant="outline" disabled={!items.length} onClick={doExport}><Download data-icon="inline-start" />Экспорт в CSV</Button></div>
    <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5">{Object.entries(stageLabels).map(([key, label]) => <button key={key} aria-pressed={stage === key} onClick={() => setStage(stage === key ? "all" : key)} className="rounded-xl border bg-card px-3 py-4 text-left transition-colors aria-pressed:border-primary/40 aria-pressed:bg-sage"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold tabular-nums">{leads.filter(l => l.stage === key).length}</p></button>)}</div>
    <div className="mb-5 flex flex-wrap items-center gap-3"><Field className="relative min-w-0 flex-1 gap-0"><FieldLabel htmlFor="lead-search" className="sr-only">Поиск в лидах</FieldLabel><Search className="pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground" /><Input id="lead-search" className="h-11 bg-card pl-9" value={search} onChange={e => setSearch(e.target.value)} placeholder="Найти в моих лидах…" /></Field><Select value={stage} onValueChange={setStage}><SelectTrigger aria-label="Фильтр по этапу сделки" className="min-h-11"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="all">Все этапы</SelectItem>{Object.entries(stageLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectGroup></SelectContent></Select></div>
    <div className="flex flex-col gap-3">{items.map(l => <article key={l.companyId} className="panel p-4 md:p-5"><div className="flex items-start gap-3"><CompanyMark company={l.company} /><button onClick={() => onCompany(l.company)} className="min-w-0 flex-1 text-left"><h2 className="text-sm font-semibold">{l.company.name}</h2><p className="mt-1 text-[11px] text-muted-foreground">{l.company.city} · {l.company.industry}</p></button><IntentScore score={l.company.score} compact /></div><div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center"><p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">{l.note || l.company.signal}</p><div className="flex items-center justify-between gap-2"><Select value={l.stage} onValueChange={v => onChange(l.companyId, { stage: v as LeadStage })}><SelectTrigger className="min-h-11 min-w-[160px]" aria-label={`Этап сделки ${l.company.name}`}><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{Object.entries(stageLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectGroup></SelectContent></Select><Button variant="ghost" size="icon" aria-label={`Удалить ${l.company.name} из лидов`} onClick={() => onRemove(l.companyId)}><Trash2 className="text-muted-foreground" /></Button></div></div><button className="quiet-link mt-1" onClick={() => onCompany(l.company)}>Профиль и заметки<ArrowUpRight className="size-3.5" /></button></article>)}</div>
    {!items.length && <Empty className="panel py-16"><EmptyHeader><EmptyMedia variant="icon"><Bookmark /></EmptyMedia><EmptyTitle>{leads.length ? "Нет лидов по этим условиям" : "Первый шаг к новой сделке"}</EmptyTitle><EmptyDescription>{leads.length ? "Измените этап или поисковый запрос." : "Найдите подходящую компанию и сохраните её — все следующие шаги будут здесь."}</EmptyDescription></EmptyHeader><EmptyContent>{leads.length ? <Button variant="outline" onClick={() => { setStage("all"); setSearch("") }}>Сбросить фильтры</Button> : <Button onClick={onSearch}>Найти компании<ArrowRight data-icon="inline-end" /></Button>}</EmptyContent></Empty>}
    <div className="mt-5 flex items-start gap-2 rounded-lg bg-secondary/70 p-4"><Bookmark className="mt-0.5 size-4 shrink-0 text-sage-foreground" /><p className="text-[11px] leading-relaxed text-muted-foreground">Демо-сеанс: лиды, этапы и заметки сбросятся после обновления страницы. Чтобы сохранить результат, скачайте CSV.</p></div>
    <DemoFooter />
  </>
}
