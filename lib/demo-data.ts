export type View = "overview" | "companies" | "leads" | "signals" | "monitoring" | "settings"
export type SignalType = "expansion" | "hiring" | "tender" | "product"
export type LeadStage = "new" | "contacted" | "qualified" | "proposal" | "closed"
export type Company = {
  id: string
  name: string
  initials: string
  color: "sage" | "violet" | "amber" | "neutral"
  city: string
  industry: string
  role: string
  score: number
  employees: string
  description: string
  products: string[]
  needs: { name: string; score: number; reason: string }[]
  signal: string
  signalType: SignalType
  source: string
  age: string
  email: string
}
export type Lead = { companyId: string; stage: LeadStage; note: string }
export type Monitor = { id: string; name: string; city: string; industry: string; type: string; frequency: string; enabled: boolean }

export const stageLabels: Record<LeadStage, string> = {
  new: "Новый", contacted: "Связались", qualified: "Квалифицирован", proposal: "КП отправлено", closed: "Сделка закрыта",
}

export const signalLabels: Record<SignalType, string> = {
  expansion: "Расширение", hiring: "Найм сотрудников", tender: "Тендер", product: "Новый продукт",
}
export const cities = ["Ташкент", "Самарканд", "Андижан"]
export const industries = ["Мебель", "Текстиль", "Стройматериалы", "Производство", "Дистрибуция", "Логистика"]

export const companies: Company[] = [
  {
    id: "orient", name: "Orient Mebel", initials: "om", color: "sage", city: "Ташкент", industry: "Мебель", role: "Производитель", score: 94, employees: "50–100",
    description: "Производитель корпусной и офисной мебели. Работает с девелоперами, офисами и розничными покупателями. Расширяет производство и развивает доставку по регионам.",
    products: ["Корпусная мебель", "Офисная мебель", "Кухни"],
    needs: [{ name: "Логистика", score: 94, reason: "Новый производственный цех и выход в регионы увеличивают потребность в доставке." }, { name: "Упаковка", score: 88, reason: "Рост объёмов производства создаёт потребность в защитной упаковке." }, { name: "Оборудование", score: 76, reason: "Для нового цеха может понадобиться дополнительная производственная линия." }],
    signal: "Открывает новый производственный цех", signalType: "expansion", source: "Сайт компании", age: "1 ч назад", email: "sales@orient-mebel.example",
  },
  {
    id: "silk", name: "Silk Road Textile", initials: "sr", color: "violet", city: "Ташкент", industry: "Текстиль", role: "Производитель", score: 91, employees: "100–250",
    description: "Текстильное предприятие полного цикла: от хлопковой пряжи до готовой продукции. Развивает экспортное направление и усиливает отдел продаж.", products: ["Хлопковая ткань", "Домашний текстиль", "Пряжа"],
    needs: [{ name: "Логистика", score: 91, reason: "Расширение экспортного отдела указывает на рост международных перевозок." }, { name: "CRM", score: 83, reason: "Найм менеджеров по продажам повышает потребность в единой клиентской базе." }],
    signal: "Нанимает 4 менеджеров по экспорту", signalType: "hiring", source: "hh.uz", age: "2 ч назад", email: "export@silk-road.example",
  },
  {
    id: "nova", name: "Nova Build", initials: "nb", color: "amber", city: "Самарканд", industry: "Стройматериалы", role: "Дистрибьютор", score: 89, employees: "25–50",
    description: "Поставщик строительных и отделочных материалов для жилых и коммерческих объектов Самаркандской области. Участвует в государственных закупках.", products: ["Сухие смеси", "Отделочные материалы", "Крепёж"],
    needs: [{ name: "Логистика", score: 89, reason: "Новый контракт требует регулярных поставок материалов на объект." }, { name: "Банковские услуги", score: 78, reason: "Тендерный контракт может потребовать оборотного финансирования." }],
    signal: "Выиграла тендер на поставку материалов", signalType: "tender", source: "etender.uzex.uz", age: "3 ч назад", email: "info@nova-build.example",
  },
  {
    id: "tashpack", name: "TashPack", initials: "tp", color: "sage", city: "Ташкент", industry: "Производство", role: "Производитель", score: 87, employees: "50–100",
    description: "Производит гофрокартон и упаковку для пищевой промышленности, текстиля и электронной торговли. Запускает линию экологичной упаковки.", products: ["Гофрокартон", "Картонные коробки", "Экоупаковка"],
    needs: [{ name: "Оборудование", score: 87, reason: "Новая продуктовая линия потребует производственного оснащения." }, { name: "Логистика", score: 82, reason: "Новые клиенты и ассортимент увеличивают объём доставки." }],
    signal: "Запускает линию экологичной упаковки", signalType: "product", source: "Сайт компании", age: "4 ч назад", email: "info@tashpack.example",
  },
  {
    id: "atlas", name: "Atlas Distribution", initials: "ad", color: "neutral", city: "Андижан", industry: "Дистрибуция", role: "Дистрибьютор", score: 85, employees: "50–100",
    description: "Региональный дистрибьютор товаров повседневного спроса. Открывает дополнительный склад для развития сети в Ферганской долине.", products: ["Продукты питания", "Бытовая химия"],
    needs: [{ name: "Складское оборудование", score: 85, reason: "Открытие нового склада создаёт спрос на стеллажи и погрузчики." }, { name: "Логистика", score: 81, reason: "Увеличение складской сети потребует новых маршрутов доставки." }],
    signal: "Открывает склад площадью 1 200 м²", signalType: "expansion", source: "2GIS", age: "5 ч назад", email: "sales@atlas-dist.example",
  },
  {
    id: "grand", name: "Grand Plast", initials: "gp", color: "violet", city: "Ташкент", industry: "Производство", role: "Производитель", score: 82, employees: "100–250",
    description: "Производитель полимерных изделий для строительства. Наращивает производственную команду и развивает оптовые продажи.", products: ["Пластиковые трубы", "Фитинги", "Профили"],
    needs: [{ name: "Упаковка", score: 82, reason: "Расширение команды отражает ожидаемый рост объёмов выпуска." }, { name: "CRM", score: 74, reason: "Развитие оптового направления требует систематизации продаж." }],
    signal: "Разместила 6 производственных вакансий", signalType: "hiring", source: "hh.uz", age: "6 ч назад", email: "info@grand-plast.example",
  },
  {
    id: "samwood", name: "Samarkand Wood", initials: "sw", color: "amber", city: "Самарканд", industry: "Мебель", role: "Производитель", score: 80, employees: "25–50",
    description: "Производит мебель из массива и деревянные интерьерные панели. Расширяет ассортимент для гостиниц и ресторанов.", products: ["Мебель из массива", "Деревянные панели"],
    needs: [{ name: "Упаковка", score: 80, reason: "Расширение ассортимента требует упаковки новых форматов." }, { name: "Логистика", score: 77, reason: "Поставки гостиницам часто требуют бережной доставки." }],
    signal: "Представила коллекцию мебели для отелей", signalType: "product", source: "Сайт компании", age: "7 ч назад", email: "hello@samwood.example",
  },
  {
    id: "andtex", name: "Andijan Tex", initials: "at", color: "sage", city: "Андижан", industry: "Текстиль", role: "Производитель", score: 78, employees: "100–250",
    description: "Производит трикотаж и корпоративную одежду для локального рынка. Планирует увеличить выпуск после получения нового контракта.", products: ["Трикотаж", "Спецодежда"],
    needs: [{ name: "Оборудование", score: 78, reason: "Новый контракт может потребовать увеличения мощности швейного цеха." }, { name: "Упаковка", score: 75, reason: "Рост выпуска увеличивает потребность в упаковочных материалах." }],
    signal: "Получила контракт на пошив спецодежды", signalType: "tender", source: "etender.uzex.uz", age: "8 ч назад", email: "info@andijan-tex.example",
  },
  {
    id: "valley", name: "Green Valley Foods", initials: "gv", color: "sage", city: "Ташкент", industry: "Производство", role: "Производитель", score: 76, employees: "50–100",
    description: "Перерабатывает фрукты и овощи, поставляет готовую продукцию в розничные сети. Выходит в новый регион.", products: ["Сухофрукты", "Консервы"],
    needs: [{ name: "Упаковка", score: 76, reason: "Поставки в розничные сети требуют обновления потребительской упаковки." }],
    signal: "Открывает филиал в Самарканде", signalType: "expansion", source: "2GIS", age: "Вчера", email: "sales@greenvalley.example",
  },
  {
    id: "urban", name: "Urban Trade", initials: "ut", color: "neutral", city: "Ташкент", industry: "Стройматериалы", role: "Импортёр", score: 73, employees: "10–25",
    description: "Импортёр керамики и отделочных материалов. Развивает дилерскую сеть и оптовые продажи в регионах.", products: ["Керамическая плитка", "Сантехника"],
    needs: [{ name: "Логистика", score: 73, reason: "Импорт и дилерская сеть требуют междугородних перевозок." }],
    signal: "Ищет регионального менеджера по продажам", signalType: "hiring", source: "hh.uz", age: "Вчера", email: "hello@urbantrade.example",
  },
  {
    id: "craft", name: "Craft Home", initials: "ch", color: "amber", city: "Ташкент", industry: "Мебель", role: "Производитель", score: 71, employees: "10–25",
    description: "Мастерская мебели на заказ. Работает с дизайнерами интерьеров и частными клиентами, развивает серийную коллекцию.", products: ["Мебель на заказ", "Интерьерный декор"],
    needs: [{ name: "Упаковка", score: 71, reason: "Переход к серийному производству требует стандартной упаковки." }],
    signal: "Добавила серийную коллекцию в каталог", signalType: "product", source: "Сайт компании", age: "Вчера", email: "studio@crafthome.example",
  },
  {
    id: "eastline", name: "Eastline Logistics", initials: "el", color: "violet", city: "Самарканд", industry: "Логистика", role: "Сервисная компания", score: 68, employees: "25–50",
    description: "Транспортно-логистическая компания. Организует сборные грузы и доставку по Узбекистану. Участвует в тендерах.", products: ["Грузоперевозки", "Складские услуги"],
    needs: [{ name: "CRM", score: 68, reason: "Новые контракты увеличивают число клиентов и потребность в учёте." }],
    signal: "Заключила контракт на региональную доставку", signalType: "tender", source: "etender.uzex.uz", age: "Вчера", email: "info@eastline.example",
  },
]

export const initialLeads: Lead[] = [
  { companyId: "tashpack", stage: "new", note: "Уточнить потребности для новой линии." },
  { companyId: "atlas", stage: "contacted", note: "Обсудили открытие склада. Подготовить предложение." },
  { companyId: "samwood", stage: "proposal", note: "Отправлено предложение по упаковке." },
]

export const initialMonitors: Monitor[] = [
  { id: "m1", name: "Компании, которые растут", city: "Все регионы", industry: "Все отрасли", type: "expansion", frequency: "Ежедневно", enabled: true },
  { id: "m2", name: "Новые тендеры в Ташкенте", city: "Ташкент", industry: "Все отрасли", type: "tender", frequency: "Еженедельно", enabled: true },
]

export function matchesQuery(company: Company, query: string): boolean {
  const q = query.toLocaleLowerCase().trim()
  if (!q) return true
  const content = [company.name, company.city, company.industry, company.role, company.description, company.signal, ...company.products, ...company.needs.map(n => n.name)].join(" ").toLocaleLowerCase()
  const rules: [RegExp, (c: Company) => boolean][] = [
    [/ташкент|toshkent|tashkent/, c => c.city === "Ташкент"],
    [/самарканд|samarqand|samarkand/, c => c.city === "Самарканд"],
    [/андижан|andijon|andijan/, c => c.city === "Андижан"],
    [/мебел|mebel|furniture/, c => c.industry === "Мебель"],
    [/строймат|строител|qurilish/, c => c.industry === "Стройматериалы"],
    [/текстил|textile|to.qimach/, c => c.industry === "Текстиль"],
    [/упаков|qadoq/, c => c.needs.some(n => n.name === "Упаковка")],
    [/логист|logisti|перевоз|достав/, c => c.needs.some(n => n.name === "Логистика") || c.industry === "Логистика"],
    [/филиал|расширя|растут|filial/, c => c.signalType === "expansion"],
    [/нанима|ваканси|найм/, c => c.signalType === "hiring"],
    [/тендер|tender/, c => c.signalType === "tender"],
    [/производител|производств|ishlab/, c => c.role === "Производитель"],
    [/импорт|import/, c => c.role === "Импортёр"],
    [/crm|срм/, c => c.needs.some(n => n.name === "CRM")],
  ]
  const matched = rules.filter(([pattern]) => pattern.test(q))
  if (matched.length) return matched.every(([, test]) => test(company))
  return q.split(/\s+/).filter(t => t.length > 1).every(t => content.includes(t))
}

export function monitorMatches(company: Company, monitor: Monitor) {
  return (monitor.city === "Все регионы" || monitor.city === company.city)
    && (monitor.industry === "Все отрасли" || monitor.industry === company.industry)
    && (monitor.type === "all" || monitor.type === company.signalType)
}
