"use client"

import { useState } from "react"
import { Bell, Bookmark, ChevronDown, ChevronRight, CircleHelp, Compass, LayoutDashboard, Menu, Radio, Search, Settings2, SlidersHorizontal, Sparkles, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Brand } from "./primitives"
import { type View } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

const navigation = [
  { id: "overview", label: "Обзор", mobile: "Обзор", icon: LayoutDashboard },
  { id: "companies", label: "Поиск компаний", mobile: "Поиск", icon: Search },
  { id: "leads", label: "Мои лиды", mobile: "Лиды", icon: Bookmark },
  { id: "signals", label: "Лента сигналов", mobile: "Сигналы", icon: Radio },
] as const
const titles: Record<View, string> = { overview: "Обзор", companies: "Поиск компаний", leads: "Мои лиды", signals: "Лента сигналов", monitoring: "Мониторинг", settings: "Настройки" }

type Props = { view: View; onNavigate: (view: View) => void; leadCount: number; workspaceName: string; children: React.ReactNode; onGuide: () => void }

export function AppShell({ view, onNavigate, leadCount, workspaceName, children, onGuide }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="min-h-dvh">
    <a href="#main-content" className="sr-only fixed top-3 left-3 z-50 rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only">Перейти к содержимому</a>
    <aside className="fixed inset-y-0 left-0 hidden w-[224px] flex-col border-r bg-sidebar px-4 py-7 lg:flex">
      <button className="w-fit px-2" aria-label="Radar.uz — обзор" onClick={() => onNavigate("overview")}><Brand /></button>
      <button className="mt-8 flex items-center gap-2.5 rounded-lg border bg-background/70 px-3 py-3 text-left" onClick={() => onNavigate("settings")}>
        <span className="flex size-7 items-center justify-center rounded-md border bg-card text-primary"><Compass className="size-4" /></span>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">{workspaceName}<span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">Демонстрационная версия</span></span>
        <ChevronDown className="size-3 text-muted-foreground" />
      </button>
      <p className="eyebrow mt-8 mb-3 px-3">Навигация</p>
      <nav aria-label="Главная навигация" className="flex flex-col gap-1">
        {navigation.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)} className="nav-item" data-active={view === id} aria-current={view === id ? "page" : undefined}>
          <Icon className="size-[17px]" strokeWidth={1.7} /><span className="flex-1 text-left">{label}</span>
          {id === "leads" && <span className="text-[11px] tabular-nums">{leadCount}</span>}
          {id === "signals" && <span className="flex size-5 items-center justify-center rounded bg-secondary text-[10px] text-primary">8</span>}
        </button>)}
      </nav>
      <Separator className="my-5" />
      <nav aria-label="Рабочее пространство" className="flex flex-col gap-1">
        <button onClick={() => onNavigate("monitoring")} className="nav-item" data-active={view === "monitoring"}><SlidersHorizontal className="size-[17px]" strokeWidth={1.7} />Мониторинг</button>
        <button onClick={() => onNavigate("settings")} className="nav-item" data-active={view === "settings"}><Settings2 className="size-[17px]" strokeWidth={1.7} />Настройки</button>
      </nav>
      <div className="mt-auto pt-10">
        <div className="rounded-xl bg-sage px-4 py-4">
          <Sparkles className="mb-3 size-5 text-sage-foreground" strokeWidth={1.5} />
          <p className="text-[12px] font-bold">Знакомьтесь с Radar</p>
          <p className="mt-1.5 text-[11px] leading-[1.7] text-muted-foreground">От первого сигнала до нового клиента. Всё в одном месте.</p>
          <button onClick={onGuide} className="mt-2 inline-flex min-h-10 items-center gap-1 text-[11px] font-semibold text-primary">Как это работает<ArrowUpRight className="size-3.5" /></button>
        </div>
        <button onClick={onGuide} className="nav-item mt-4 w-full"><CircleHelp className="size-[17px]" />Помощь и обратная связь</button>
        <Separator className="my-4" />
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">R</span>
          <div className="flex-1"><p className="text-[12px] font-semibold">Демо-пространство</p><p className="mt-0.5 text-[10px] text-muted-foreground">Без регистрации</p></div>
          <button aria-label="Настройки пространства" onClick={() => onNavigate("settings")} className="flex size-8 items-center justify-center rounded-md hover:bg-muted"><ChevronDown className="size-3.5 text-muted-foreground" /></button>
        </div>
      </div>
    </aside>
    <div className="lg:ml-[224px]">
      <header className="flex h-[72px] items-center justify-between gap-3 border-b bg-card px-5 md:px-8 lg:h-[76px] lg:px-9">
        <button className="lg:hidden" aria-label="Radar.uz — обзор" onClick={() => onNavigate("overview")}><Brand compact /></button>
        <div className="hidden items-center gap-2.5 text-xs lg:flex"><span className="max-w-48 truncate text-muted-foreground">{workspaceName}</span><ChevronRight className="size-3 text-muted-foreground/60" /><span className="font-medium">{titles[view]}</span></div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-1.5 text-[11px] text-muted-foreground md:flex"><span className="size-1.5 rounded-full bg-sage-foreground" />Открытые возможности. Ясный контекст.</div>
          <Badge variant="secondary">Демо</Badge>
          <span className="hidden h-5 w-px bg-border sm:block" />
          <Button variant="ghost" size="icon" aria-label="Открыть ленту сигналов" onClick={() => onNavigate("signals")}><Bell /></Button>
          <Button variant="ghost" size="icon" aria-label="Открыть меню" onClick={() => setMenuOpen(true)} className="lg:hidden"><Menu /></Button>
          <button onClick={() => onNavigate("settings")} aria-label="Настройки" className="hidden size-8 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-primary sm:flex">R</button>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-[1510px] px-5 pt-6 pb-28 outline-none md:px-8 md:pt-8 lg:px-9 lg:pb-8" tabIndex={-1}>
        {children}
      </main>
    </div>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetContent side="left" className="w-80 max-w-[90vw] bg-card"><SheetHeader className="px-5 pt-7"><SheetTitle>{workspaceName}</SheetTitle><SheetDescription>Демонстрационная версия Radar.uz</SheetDescription></SheetHeader><nav aria-label="Разделы пространства" className="flex flex-col gap-2 px-4">{navigation.map(({ id, label, icon: Icon }) => <button key={id} className="nav-item" data-active={view === id} onClick={() => { setMenuOpen(false); onNavigate(id) }}><Icon className="size-5" />{label}</button>)}<Separator className="my-2" /><button className="nav-item" onClick={() => { setMenuOpen(false); onNavigate("monitoring") }}><SlidersHorizontal className="size-5" />Мониторинг</button><button className="nav-item" onClick={() => { setMenuOpen(false); onNavigate("settings") }}><Settings2 className="size-5" />Настройки</button><button className="nav-item" onClick={() => { setMenuOpen(false); onGuide() }}><CircleHelp className="size-5" />Как работает Radar</button></nav></SheetContent></Sheet>
    <nav aria-label="Мобильная навигация" className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t bg-card/95 px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden">
      {navigation.map(({ id, mobile, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)} aria-current={view === id ? "page" : undefined} className={cn("flex min-h-[50px] min-w-16 flex-col items-center justify-center gap-1 rounded-xl px-3 text-[10px] font-medium transition-colors", view === id ? "bg-sage text-primary" : "text-muted-foreground hover:bg-muted")}><Icon className="size-5" strokeWidth={view === id ? 2 : 1.7} />{mobile}</button>)}
    </nav>
  </div>
}
