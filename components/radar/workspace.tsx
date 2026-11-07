"use client"

import { useState } from "react"
import { toast } from "sonner"
import { initialLeads, initialMonitors, type Company, type Lead, type Monitor, type View } from "@/lib/demo-data"
import { AppShell } from "./app-shell"
import { Overview } from "./overview"
import { CompanyBrowser } from "./company-browser"
import { CompanyProfile } from "./company-profile"
import { Signals } from "./signals"
import { Leads } from "./leads"
import { Monitoring } from "./monitoring"
import { Settings, defaultPreferences, type Preferences } from "./settings"
import { GuideDialog, MonitorDialog } from "./dialogs"

export function RadarWorkspace() {
  const [view, setView] = useState<View>("overview")
  const [query, setQuery] = useState("")
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [monitors, setMonitors] = useState<Monitor[]>(initialMonitors)
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [selected, setSelected] = useState<Company | null>(null)
  const [monitorOpen, setMonitorOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const savedIds = leads.map(l => l.companyId)

  function navigate(next: View) { setView(next); window.scrollTo({ top: 0, behavior: "instant" }) }
  function search(q: string) { setQuery(q.trim()); navigate("companies") }
  function save(id: string) {
    const existing = leads.find(l => l.companyId === id)
    if (existing) {
      setLeads(prev => prev.filter(l => l.companyId !== id))
      toast("Компания удалена из лидов", { action: { label: "Отменить", onClick: () => setLeads(prev => prev.some(l => l.companyId === id) ? prev : [...prev, existing]) } })
    } else {
      setLeads(prev => [...prev, { companyId: id, stage: "new", note: "" }])
      toast.success("Компания добавлена в ваши лиды", { description: "Сохранено в текущем демосеансе" })
    }
  }
  function updateLead(id: string, patch: Partial<Lead>) { setLeads(prev => prev.map(l => l.companyId === id ? { ...l, ...patch } : l)) }
  function bulkSave(ids: string[]) {
    setLeads(prev => [...prev, ...ids.filter(id => !prev.some(l => l.companyId === id)).map(companyId => ({ companyId, stage: "new" as const, note: "" }))])
    toast.success("Выбранные компании добавлены в лиды")
  }
  function createMonitor(m: Omit<Monitor, "id" | "enabled">) {
    setMonitors(prev => [...prev, { ...m, id: crypto.randomUUID(), enabled: true }])
    navigate("monitoring")
    toast.success("Деморадар создан", { description: "Уведомления не отправляются" })
  }
  function resetDemo() { setLeads(initialLeads); setMonitors(initialMonitors); setPreferences(defaultPreferences) }

  return <AppShell view={view} onNavigate={navigate} leadCount={leads.length} workspaceName={preferences.workspace} onGuide={() => setGuideOpen(true)}>
    {view === "overview" && <Overview onNavigate={navigate} onSearch={search} onCompany={setSelected} savedIds={savedIds} onSave={save} onMonitor={() => setMonitorOpen(true)} preferences={preferences} />}
    {view === "companies" && <CompanyBrowser query={query} onSearch={search} onCompany={setSelected} savedIds={savedIds} onSave={save} onBulkSave={bulkSave} />}
    {view === "signals" && <Signals onCompany={setSelected} savedIds={savedIds} onSave={save} onMonitor={() => setMonitorOpen(true)} />}
    {view === "leads" && <Leads leads={leads} onCompany={setSelected} onChange={updateLead} onRemove={save} onSearch={() => search("")} />}
    {view === "monitoring" && <Monitoring monitors={monitors} onCreate={() => setMonitorOpen(true)} onChange={(id, enabled) => setMonitors(prev => prev.map(m => m.id === id ? { ...m, enabled } : m))} onDelete={id => { const item = monitors.find(m => m.id === id); setMonitors(prev => prev.filter(m => m.id !== id)); if (item) toast("Радар удалён", { action: { label: "Отменить", onClick: () => setMonitors(prev => prev.some(m => m.id === id) ? prev : [...prev, item]) } }) }} onCompany={setSelected} />}
    {view === "settings" && <Settings preferences={preferences} onSave={setPreferences} onReset={resetDemo} />}
    {selected && <CompanyProfile key={selected.id} company={selected} open onClose={() => setSelected(null)} lead={leads.find(l => l.companyId === selected.id)} onSave={save} onLeadChange={updateLead} />}
    <MonitorDialog open={monitorOpen} onClose={() => setMonitorOpen(false)} onCreate={createMonitor} />
    <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} onStart={() => { setGuideOpen(false); search("") }} />
  </AppShell>
}
