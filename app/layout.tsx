import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" })

export const metadata: Metadata = {
  title: "Radar.uz — новые возможности для вашего бизнеса",
  description: "Находите компании Узбекистана, изучайте коммерческие сигналы и работайте с перспективными лидами. Интерактивная демоверсия Radar.uz.",
  robots: { index: false, follow: false },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f9f6" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  )
}
