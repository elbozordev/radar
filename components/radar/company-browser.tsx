"use client"

import { useState } from "react"
import { ArrowDownUp, ArrowUpRight, Bookmark, Check, ChevronLeft, ChevronRight, Download, Filter, MapPin, Search, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { companies, cities, industries, matchesQuery, signalLabels, type Company } from "@/lib/demo-data"
import { exportCompanies } from "@/lib/export"
import { CompanyMark, DemoFooter, IntentScore, SignalBadge } from "./primitives"
import { SearchBox } from "./search-box"

type Props = { query: string; onSearch: (q: string) => void; onCompany: (c: Company) => void; savedIds: string[]; onSave: (id: string) => void; onBulkSave: (ids: string[]) => void }

export function FilterSelect({ label, value, onChange, options, id }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; id: string }) {
  return <Field><FieldLabel htmlFor={id}>{label}</FieldLabel><Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="min-h-11 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
}

export function CompanyBrowser({ query, onSearch, onCompany, savedIds, onSave, onBulkSave }: Props) {
  const [city, setCity] = useState("all")
  const [industry, setIndustry] = useState("all")
  const [signal, setSignal] = useState("all")
  const [minScore, setMinScore] = useState("0")
  const [sort, setSort] = useState("score")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const results = companies.filter(c => matchesQuery(c, query) && (city === "all" || c.city === city) && (industry === "all" || c.industry === industry) && (signal === "all" || c.signalType === signal) && c.score >= Number(minScore)).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : b.score - a.score)
  const pageCount = Math.max(1, Math.ceil(results.length / 6))
  const safePage = Math.min(page, pageCount - 1)
  const visible = results.slice(safePage * 6, safePage * 6 + 6)
  const filterCount = Number(city !== "all") + Number(industry !== "all") + Number(signal !== "all") + Number(minScore !== "0")
  const allSelected = visible.length > 0 && visible.every(c => selected.includes(c.id))
  function reset() { setCity("all"); setIndustry("all"); setSignal("all"); setMinScore("0"); setSelected([]); setPage(0) }
  function update(fn: (v: string) => void) { return (v: string) => { fn(v); setPage(0); setSelected([]) } }
  function toggleSelection(id: string) { setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]) }
  function doExport() { const items = selected.length ? companies.filter(c => selected.includes(c.id)) : results; exportCompanies(items); toast.success(`Экспортировано компаний: ${items.length}`) }
  return <>
    <div className="mb-6"><p className="eyebrow mb-2.5">Правильные компании. Понятные причины.</p><h1 className="page-heading">Поиск компаний</h1><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Найдите следующий контакт с хорошим поводом для разговора.</p></div>
    <SearchBox key={query} initialQuery={query} onSearch={q => { setPage(0); setSelected([]); onSearch(q) }} />
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2"><Button variant="outline" onClick={() => setFilterOpen(true)}><Filter data-icon="inline-start" />Фильтры{filterCount > 0 && <Badge variant="secondary">{filterCount}</Badge>}</Button>{filterCount > 0 && <Button variant="ghost" size="icon" aria-label="Сбросить фильтры" onClick={reset}><X /></Button>}</div>
      <Select value={sort} onValueChange={setSort}><SelectTrigger aria-label="Сортировка компаний" className="min-h-11"><ArrowDownUp /><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="score">По потенциалу</SelectItem><SelectItem value="name">По названию</SelectItem></SelectGroup></SelectContent></Select>
    </div>
    {query && <div className="mt-4 flex items-center gap-2 text-xs"><span className="text-muted-foreground">Запрос:</span><Badge variant="secondary">{query}</Badge><button aria-label="Очистить запрос" className="flex size-9 items-center justify-center" onClick={() => { onSearch(""); setSelected([]); setPage(0) }}><X className="size-3.5" /></button></div>}
    <div className="mt-5 flex min-h-11 items-center justify-between gap-2"><p aria-live="polite" className="text-[12px] text-muted-foreground">Найдено компаний: <span className="font-semibold text-foreground">{results.length}</span></p><Button size="sm" variant="ghost" disabled={!results.length} onClick={doExport}><Download data-icon="inline-start" />CSV</Button></div>
    {selected.length > 0 && <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-primary/15 bg-sage p-3"><span className="mr-auto text-xs">Выбрано: {selected.length}</span><Button size="sm" onClick={() => { onBulkSave(selected); setSelected([]) }}><Bookmark data-icon="inline-start" />В лиды</Button><Button size="sm" variant="outline" onClick={doExport}>Экспорт</Button></div>}
    <section className="panel overflow-hidden" aria-label="Результаты поиска">
      {results.length === 0 ? <Empty className="py-16"><EmptyHeader><EmptyMedia variant="icon"><Search /></EmptyMedia><EmptyTitle>Пока ничего не нашлось</EmptyTitle><EmptyDescription>В демобазе 12 компаний. Попробуйте «мебель», «логистика» или уберите часть фильтров.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline" onClick={() => { reset(); onSearch("") }}>Показать все компании</Button></EmptyContent></Empty> : <>
        <div className="hidden overflow-x-auto md:block"><table className="w-full border-collapse text-left"><caption className="sr-only">Демонстрационные компании и оценки потенциала</caption><thead className="bg-background text-[10px] font-normal text-muted-foreground"><tr><th className="w-12 pl-3"><label className="flex min-h-11 min-w-8 items-center justify-center"><Checkbox aria-label="Выбрать компании на странице" checked={allSelected ? true : visible.some(c => selected.includes(c.id)) ? "indeterminate" : false} onCheckedChange={() => setSelected(prev => allSelected ? prev.filter(id => !visible.some(c => c.id === id)) : [...new Set([...prev, ...visible.map(c => c.id)])])} /></label></th><th className="py-4 font-medium">Компания</th><th className="px-3 font-medium">Регион</th><th className="px-3 font-medium">Последний сигнал</th><th className="px-3 font-medium">Потенциал</th><th className="w-12"><span className="sr-only">Сохранить</span></th></tr></thead><tbody className="divide-y">{visible.map(c => <tr key={c.id} className="transition-colors hover:bg-background/70"><td className="pl-3"><label className="flex min-h-16 min-w-8 items-center justify-center"><Checkbox aria-label={`Выбрать ${c.name}`} checked={selected.includes(c.id)} onCheckedChange={() => toggleSelection(c.id)} /></label></td><td className="py-4"><button onClick={() => onCompany(c)} className="flex items-center gap-3 text-left"><CompanyMark company={c} /><span><span className="block text-xs font-semibold">{c.name}</span><span className="mt-1 block text-[10px] text-muted-foreground">{c.industry} · {c.role}</span></span></button></td><td className="px-3 text-[11px] text-muted-foreground">{c.city}</td><td className="max-w-[210px] px-3"><SignalBadge type={c.signalType} /><p className="mt-1 max-w-48 text-[10px] leading-relaxed text-muted-foreground">{c.signal}</p></td><td className="px-3"><IntentScore score={c.score} compact /></td><td className="pr-2"><Button variant={savedIds.includes(c.id) ? "secondary" : "ghost"} size="icon" aria-label={`Сохранить ${c.name}`} aria-pressed={savedIds.includes(c.id)} onClick={() => onSave(c.id)}>{savedIds.includes(c.id) ? <Check /> : <Bookmark />}</Button></td></tr>)}</tbody></table></div>
        <div className="divide-y md:hidden">{visible.map(c => <article key={c.id} className="p-4"><div className="flex items-start gap-3"><CompanyMark company={c} /><button onClick={() => onCompany(c)} className="min-w-0 flex-1 text-left"><h2 className="text-sm font-semibold">{c.name}</h2><p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="size-3" />{c.city} · {c.industry}</p></button><IntentScore score={c.score} compact /></div><div className="mt-3 flex items-start gap-2"><SignalBadge type={c.signalType} /><p className="text-[11px] leading-relaxed text-muted-foreground">{c.signal}</p></div><div className="mt-2 flex items-center justify-between"><button onClick={() => onCompany(c)} className="quiet-link">Профиль<ArrowUpRight className="size-3.5" /></button><Button variant={savedIds.includes(c.id) ? "secondary" : "ghost"} size="icon" aria-label={`Сохранить ${c.name}`} aria-pressed={savedIds.includes(c.id)} onClick={() => onSave(c.id)}>{savedIds.includes(c.id) ? <Check /> : <Bookmark />}</Button></div></article>)}</div>
      </>}
      {results.length > 0 && <div className="flex items-center justify-between gap-2 border-t px-4 py-3"><span className="text-[10px] text-muted-foreground">{safePage * 6 + 1}–{Math.min((safePage + 1) * 6, results.length)} из {results.length}</span><div className="flex items-center gap-1"><Button variant="ghost" size="icon" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} aria-label="Предыдущая страница"><ChevronLeft /></Button><span className="px-2 text-xs tabular-nums">{safePage + 1} / {pageCount}</span><Button variant="ghost" size="icon" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)} aria-label="Следующая страница"><ChevronRight /></Button></div></div>}
    </section>
    <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">Демо-поиск по ключевым словам и категориям. AI и реальные источники не подключены.</p>
    <Sheet open={filterOpen} onOpenChange={setFilterOpen}><SheetContent className="w-full gap-5 overflow-y-auto sm:max-w-[400px]"><SheetHeader className="px-6 pt-7"><SheetTitle>Уточним поиск</SheetTitle><SheetDescription>Оставьте только подходящие компании.</SheetDescription></SheetHeader><FieldGroup className="px-6"><FilterSelect id="filter-city" label="Регион" value={city} onChange={update(setCity)} options={[{ value: "all", label: "Все регионы" }, ...cities.map(c => ({ value: c, label: c }))]} /><FilterSelect id="filter-industry" label="Отрасль" value={industry} onChange={update(setIndustry)} options={[{ value: "all", label: "Все отрасли" }, ...industries.map(c => ({ value: c, label: c }))]} /><FilterSelect id="filter-signal" label="Тип сигнала" value={signal} onChange={update(setSignal)} options={[{ value: "all", label: "Все сигналы" }, ...Object.entries(signalLabels).map(([value, label]) => ({ value, label }))]} /><FilterSelect id="filter-score" label="Минимальный потенциал" value={minScore} onChange={update(setMinScore)} options={[{ value: "0", label: "Любой" }, { value: "70", label: "От 70/100" }, { value: "80", label: "От 80/100" }, { value: "90", label: "От 90/100" }]} /></FieldGroup><div className="mt-auto flex flex-col gap-2 p-6"><Button onClick={() => setFilterOpen(false)}>Показать компании: {results.length}</Button><Button variant="ghost" onClick={reset}>Сбросить фильтры</Button></div></SheetContent></Sheet>
    <DemoFooter />
  </>
}
