import { type Company, type Lead, stageLabels } from "@/lib/demo-data"

function csvCell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replaceAll('"', '""')}"`
}

export function exportCompanies(items: Company[], leads: Lead[] = []) {
  const rows = [
    ["Компания", "Город", "Отрасль", "Демо-оценка", "Сигнал (пример)", "Статус", "Заметка"],
    ...items.map(c => {
      const lead = leads.find(l => l.companyId === c.id)
      return [c.name, c.city, c.industry, String(c.score), c.signal, lead ? stageLabels[lead.stage] : "", lead?.note ?? ""]
    }),
  ]
  const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(";")).join("\r\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }))
  const link = document.createElement("a")
  link.href = url
  link.download = "radar-demo-companies.csv"
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
