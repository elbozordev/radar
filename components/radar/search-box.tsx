"use client"

import { useState } from "react"
import { ArrowRight, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SearchBox({ onSearch, initialQuery = "", large = false }: { onSearch: (q: string) => void; initialQuery?: string; large?: boolean }) {
  const [query, setQuery] = useState(initialQuery)
  return <form onSubmit={e => { e.preventDefault(); onSearch(query) }} className={cn("search-shell flex items-center gap-2 rounded-xl border bg-card p-1.5 transition-shadow focus-within:ring-2 focus-within:ring-ring/30", large && "md:p-2")}>
    <label htmlFor={large ? "overview-search" : "company-search"} className="pl-2.5 text-sage-foreground">{large ? <Sparkles className="size-[19px]" strokeWidth={1.7} /> : <Search className="size-[18px]" />}<span className="sr-only">Поиск по демобазе компаний</span></label>
    <input id={large ? "overview-search" : "company-search"} name="query" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault() }} placeholder={large ? "Кому нужен ваш продукт?" : "Название, отрасль или потребность…"} className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-[13px]" autoComplete="off" />
    <Button type="submit" size={large ? "default" : "icon"} aria-label="Найти компании"><span className={cn(large ? "hidden sm:inline" : "hidden")}>Найти компании</span><ArrowRight data-icon="inline-end" /></Button>
  </form>
}
