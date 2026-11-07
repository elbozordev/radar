"use client"

import { useState } from "react"
import { ArrowUpRight, Bookmark, Check, Plus, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { companies, signalLabels, type Company } from "@/lib/demo-data"
import { DemoFooter, IntentScore, SignalBadge, SignalIcon } from "./primitives"

type Props = { onCompany: (c: Company) => void; savedIds: string[]; onSave: (id: string) => void; onMonitor: () => void }

export function Signals({ onCompany, savedIds, onSave, onMonitor }: Props) {
  const [period, setPeriod] = useState("today")
  const [type, setType] = useState("all")
  const [onlySaved, setOnlySaved] = useState(false)
  const items = companies.filter(c => (period === "all" || c.age !== "Вчера") && (type === "all" || c.signalType === type) && (!onlySaved || savedIds.includes(c.id)))
  return <>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2.5">У каждой сделки есть свой момент</p><h1 className="page-heading">Пульс рынка</h1><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Не просто изменения. Поводы начать разговор.</p></div><Button variant="outline" onClick={onMonitor}><Plus data-icon="inline-start" />Создать мониторинг</Button></div>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><ToggleGroup type="single" value={period} onValueChange={v => { if (v) setPeriod(v) }} variant="outline" aria-label="Период сигналов"><ToggleGroupItem value="today" className="min-h-11 text-xs">Сегодня · 8</ToggleGroupItem><ToggleGroupItem value="all" className="min-h-11 text-xs">Все · 12</ToggleGroupItem></ToggleGroup><Select value={type} onValueChange={setType}><SelectTrigger className="min-h-11" aria-label="Тип коммерческого сигнала"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="all">Все типы</SelectItem>{Object.entries(signalLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectGroup></SelectContent></Select></div>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" className="text-xs text-muted-foreground">Сигналов: <span className="font-semibold text-foreground">{items.length}</span></p><Field orientation="horizontal" className="w-auto"><FieldLabel htmlFor="saved-signals" className="min-h-11 text-xs font-normal text-muted-foreground">Только мои лиды</FieldLabel><Switch id="saved-signals" checked={onlySaved} onCheckedChange={setOnlySaved} /></Field></div>
    <div className="grid gap-3 xl:grid-cols-2">{items.map(c => <article key={c.id} className="panel flex flex-col p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2.5"><SignalIcon type={c.signalType} /><div><SignalBadge type={c.signalType} /><p className="mt-1.5 text-[10px] text-muted-foreground">{c.age} · {c.source} · пример</p></div></div><Button variant={savedIds.includes(c.id) ? "secondary" : "ghost"} size="icon" onClick={() => onSave(c.id)} aria-label={`Сохранить ${c.name}`} aria-pressed={savedIds.includes(c.id)}>{savedIds.includes(c.id) ? <Check /> : <Bookmark />}</Button></div><button className="mt-4 text-left" onClick={() => onCompany(c)}><p className="text-[11px] font-medium text-sage-foreground">{c.name} · {c.city}</p><h2 className="mt-2 text-sm leading-relaxed font-semibold">{c.signal}</h2></button><p className="mt-3 text-[11px] leading-[1.8] text-muted-foreground">{c.needs[0].reason}</p><div className="mt-auto flex items-center justify-between gap-2 pt-4"><IntentScore score={c.score} compact /><button className="quiet-link" onClick={() => onCompany(c)}>Профиль компании<ArrowUpRight className="size-3.5" /></button></div></article>)}</div>
    {!items.length && <Empty className="panel py-16"><EmptyHeader><EmptyMedia variant="icon"><Radio /></EmptyMedia><EmptyTitle>Пока тихо</EmptyTitle><EmptyDescription>Для выбранных фильтров нет сигналов. Попробуйте другой тип события или покажите все компании.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline" onClick={() => { setOnlySaved(false); setType("all"); setPeriod("all") }}>Показать все сигналы</Button></EmptyContent></Empty>}
    <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">Все события иллюстративные. Мониторинг источников в демоверсии не выполняется.</p>
    <DemoFooter />
  </>
}
