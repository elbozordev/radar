"use client"

import { useState } from "react"
import { ArrowUpRight, BellOff, ChevronDown, Plus, Radio, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel } from "@/components/ui/field"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { companies, monitorMatches, signalLabels, type Company, type Monitor, type SignalType } from "@/lib/demo-data"
import { CompanyMark, DemoFooter, IntentScore } from "./primitives"

type Props = { monitors: Monitor[]; onCreate: () => void; onChange: (id: string, enabled: boolean) => void; onDelete: (id: string) => void; onCompany: (c: Company) => void }

export function Monitoring({ monitors, onCreate, onChange, onDelete, onCompany }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return <>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2.5">Не упускайте свой момент</p><h1 className="page-heading">Мониторинг</h1><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Ваши условия. Только релевантные изменения.</p></div><Button onClick={onCreate}><Plus data-icon="inline-start" />Новый радар</Button></div>
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-primary/10 bg-sage p-4"><BellOff className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-[11px] leading-relaxed text-muted-foreground">Это демонстрация правил мониторинга. Совпадения рассчитываются по примерам компаний. Фоновая проверка и отправка уведомлений не выполняются.</p></div>
    <div className="flex flex-col gap-4">{monitors.map(m => { const matches = companies.filter(c => monitorMatches(c, m)); return <section key={m.id} className="panel overflow-hidden"><div className="p-5"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sage text-primary"><Radio className="size-5" /></span><div className="min-w-0 flex-1"><h2 className="text-sm font-semibold">{m.name}</h2><p className="mt-1 text-[10px] text-muted-foreground">{m.enabled ? "Включён в демосеансе" : "Приостановлен"} · {m.frequency}</p></div><Field className="w-auto" orientation="horizontal"><FieldLabel htmlFor={`monitor-${m.id}`} className="sr-only">{m.enabled ? "Приостановить" : "Включить"} {m.name}</FieldLabel><Switch id={`monitor-${m.id}`} checked={m.enabled} onCheckedChange={v => onChange(m.id, v)} /></Field></div><div className="mt-4 flex flex-wrap gap-2"><Badge variant="outline">{m.city}</Badge><Badge variant="outline">{m.industry}</Badge><Badge variant="secondary">{m.type === "all" ? "Все сигналы" : signalLabels[m.type as SignalType]}</Badge></div><div className="mt-3 flex items-center justify-between gap-2"><button className="quiet-link" aria-expanded={expanded === m.id} onClick={() => setExpanded(expanded === m.id ? null : m.id)}>Совпадений: {matches.length}<ChevronDown className="size-3.5" /></button><Button variant="ghost" size="icon" aria-label={`Удалить радар ${m.name}`} onClick={() => onDelete(m.id)}><Trash2 className="text-muted-foreground" /></Button></div></div>{expanded === m.id && <div className="divide-y border-t bg-background/40">{matches.length ? matches.map(c => <button key={c.id} onClick={() => onCompany(c)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-muted"><CompanyMark company={c} /><span className="flex-1"><span className="block text-xs font-semibold">{c.name}</span><span className="mt-1 block text-[10px] text-muted-foreground">{c.signal}</span></span><IntentScore score={c.score} compact /></button>) : <p className="p-5 text-xs text-muted-foreground">В демобазе пока нет подходящих сигналов.</p>}</div>}</section> })}</div>
    {!monitors.length && <Empty className="panel py-16"><EmptyHeader><EmptyMedia variant="icon"><Radio /></EmptyMedia><EmptyTitle>Соберите свой первый радар</EmptyTitle><EmptyDescription>Выберите регион, отрасль и события, которые важны для вашего бизнеса.</EmptyDescription></EmptyHeader><EmptyContent><Button onClick={onCreate}>Настроить радар<ArrowUpRight data-icon="inline-end" /></Button></EmptyContent></Empty>}
    <DemoFooter />
  </>
}
