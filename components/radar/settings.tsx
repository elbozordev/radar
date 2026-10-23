"use client"

import { useState } from "react"
import { Info, RotateCcw, Save, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cities } from "@/lib/demo-data"
import { FilterSelect } from "./company-browser"
import { DemoFooter } from "./primitives"

export type Preferences = { workspace: string; product: string; city: string }
export const defaultPreferences: Preferences = { workspace: "Моё пространство", product: "Логистика", city: "Все регионы" }

export function Settings({ preferences, onSave, onReset }: { preferences: Preferences; onSave: (p: Preferences) => void; onReset: () => void }) {
  const [draft, setDraft] = useState(preferences)
  const [confirmReset, setConfirmReset] = useState(false)
  return <>
    <div className="mb-6"><p className="eyebrow mb-2.5">Radar под ваш бизнес</p><h1 className="page-heading">Настройки</h1><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Настройте пространство и приоритеты вашей подборки.</p></div>
    <div className="grid items-start gap-5 xl:grid-cols-[1.3fr_1fr]">
      <form className="panel p-5 md:p-6" onSubmit={e => { e.preventDefault(); const workspace = draft.workspace.trim(); if (workspace.length < 2) { toast.error("Введите название от 2 символов"); return }; onSave({ ...draft, workspace }); toast.success("Настройки применены к подборке в обзоре") }}>
        <h2 className="mb-6 text-sm font-semibold">Рабочее пространство</h2><FieldGroup>
          <Field><FieldLabel htmlFor="workspace-name">Название пространства</FieldLabel><Input id="workspace-name" required minLength={2} maxLength={40} value={draft.workspace} onChange={e => setDraft({ ...draft, workspace: e.target.value })} className="h-11" /><FieldDescription className="text-[10px]">Будет отображаться в навигации.</FieldDescription></Field>
          <FilterSelect id="settings-product" label="Что вы предлагаете клиентам?" value={draft.product} onChange={product => setDraft({ ...draft, product })} options={["Логистика", "Упаковка", "CRM", "Оборудование"].map(value => ({ value, label: value }))} />
          <FilterSelect id="settings-city" label="Приоритетный регион" value={draft.city} onChange={city => setDraft({ ...draft, city })} options={["Все регионы", ...cities].map(value => ({ value, label: value }))} />
        </FieldGroup><Separator className="my-6" /><Button type="submit" className="w-full sm:w-auto"><Save data-icon="inline-start" />Сохранить настройки</Button>
      </form>
      <div className="flex flex-col gap-5"><section className="panel p-5 md:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Данные и подключения</h2><Badge variant="secondary">Демо</Badge></div><div className="mt-5 flex items-start gap-3"><ShieldCheck className="size-5 shrink-0 text-sage-foreground" /><p className="text-xs leading-relaxed text-muted-foreground">Никаких внешних подключений. Данные не отправляются на сервер.</p></div><dl className="mt-5 divide-y text-[11px]"><div className="flex justify-between gap-2 py-3"><dt className="text-muted-foreground">База данных</dt><dd>Не подключена</dd></div><div className="flex justify-between gap-2 py-3"><dt className="text-muted-foreground">AI-аналитика</dt><dd>Готовые примеры</dd></div><div className="flex justify-between gap-2 py-3"><dt className="text-muted-foreground">Telegram / email</dt><dd>Без отправки</dd></div><div className="flex justify-between gap-2 py-3"><dt className="text-muted-foreground">Язык интерфейса</dt><dd>Русский</dd></div></dl></section><section className="panel p-5 md:p-6"><h2 className="text-sm font-semibold">Начать заново</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Вернуть исходные примеры лидов, правила мониторинга и настройки пространства.</p><Button variant="outline" className="mt-4" onClick={() => setConfirmReset(true)}><RotateCcw data-icon="inline-start" />Сбросить демосеанс</Button></section></div>
    </div>
    <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground"><Info className="mt-0.5 size-3.5 shrink-0" />Все изменения действуют до обновления страницы. Для сохранения лидов и заметок используйте CSV-экспорт.</p>
    <Dialog open={confirmReset} onOpenChange={setConfirmReset}><DialogContent><DialogHeader><DialogTitle>Вернуть исходную демоверсию?</DialogTitle><DialogDescription>Ваши изменения лидов, заметок и мониторинга в этом сеансе будут заменены исходными примерами.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setConfirmReset(false)}>Отмена</Button><Button onClick={() => { onReset(); setDraft(defaultPreferences); setConfirmReset(false); toast.success("Исходные примеры восстановлены") }}>Сбросить демосеанс</Button></DialogFooter></DialogContent></Dialog>
    <DemoFooter />
  </>
}
