"use client"

import { useState } from "react"
import { ArrowRight, Bookmark, Radio, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cities, industries, signalLabels, type Monitor } from "@/lib/demo-data"
import { FilterSelect } from "./company-browser"
import { Brand } from "./primitives"

export function MonitorDialog({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (m: Omit<Monitor, "id" | "enabled">) => void }) {
  const [name, setName] = useState("")
  const [city, setCity] = useState("Все регионы")
  const [industry, setIndustry] = useState("Все отрасли")
  const [type, setType] = useState("expansion")
  const [frequency, setFrequency] = useState("Ежедневно")
  return <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}><DialogContent className="max-h-[90dvh] overflow-y-auto bg-card"><DialogHeader className="text-left"><DialogTitle>Соберите свой радар</DialogTitle><DialogDescription>Выберите, какие компании и события вам интересны. Это настройка демоправила, без отправки уведомлений.</DialogDescription></DialogHeader><form onSubmit={e => { e.preventDefault(); if (!name.trim()) return; onCreate({ name: name.trim(), city, industry, type, frequency }); setName(""); onClose() }}><FieldGroup className="gap-5"><Field><FieldLabel htmlFor="monitor-name">Название радара</FieldLabel><Input id="monitor-name" placeholder="Например, мебельные компании Ташкента" value={name} onChange={e => setName(e.target.value)} required maxLength={80} className="h-11" /></Field><FilterSelect id="monitor-city" label="Регион" value={city} onChange={setCity} options={["Все регионы", ...cities].map(value => ({ value, label: value }))} /><FilterSelect id="monitor-industry" label="Отрасль" value={industry} onChange={setIndustry} options={["Все отрасли", ...industries].map(value => ({ value, label: value }))} /><FilterSelect id="monitor-type" label="Что отслеживать" value={type} onChange={setType} options={[{ value: "all", label: "Все сигналы" }, ...Object.entries(signalLabels).map(([value, label]) => ({ value, label }))]} /><FilterSelect id="monitor-frequency" label="Частота · пример" value={frequency} onChange={setFrequency} options={["Ежедневно", "Еженедельно"].map(value => ({ value, label: value }))} /></FieldGroup><DialogFooter className="mt-6"><Button variant="outline" type="button" onClick={onClose}>Отмена</Button><Button type="submit"><Radio data-icon="inline-start" />Создать деморадар</Button></DialogFooter></form></DialogContent></Dialog>
}

export function GuideDialog({ open, onClose, onStart }: { open: boolean; onClose: () => void; onStart: () => void }) {
  const steps = [
    { icon: Search, title: "Найдите свою компанию", text: "Ищите по названию, региону или потребности. Например: «Нужна упаковка»." },
    { icon: Radio, title: "Узнайте, почему сейчас", text: "Открытие цеха, новый контракт или найм — хороший повод для первого контакта." },
    { icon: Bookmark, title: "Превратите контакт в лид", text: "Сохраните компанию, добавьте заметку, измените этап и скачайте список в CSV." },
  ]
  return <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}><DialogContent className="max-h-[90dvh] overflow-y-auto bg-card"><DialogHeader className="text-left"><div className="mb-4"><Brand /></div><DialogTitle className="text-xl leading-snug tracking-tight">Меньше поиска.<br />Больше хороших разговоров.</DialogTitle><DialogDescription>Добро пожаловать в интерактивную демоверсию платформы коммерческой разведки.</DialogDescription></DialogHeader><ol className="my-3 flex flex-col gap-5">{steps.map(({ icon: Icon, title, text }) => <li key={title} className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sage text-primary"><Icon className="size-4" /></span><div><h2 className="text-xs font-semibold">{title}</h2><p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{text}</p></div></li>)}</ol><p className="rounded-lg bg-background p-3 text-[10px] leading-relaxed text-muted-foreground">12 вымышленных компаний. Без регистрации, подключения сервисов и реального AI. Изменения хранятся только в текущем сеансе.</p><DialogFooter><Button onClick={onStart} className="w-full">Попробовать поиск<ArrowRight data-icon="inline-end" /></Button></DialogFooter></DialogContent></Dialog>
}
