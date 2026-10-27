import type { Metadata } from "next"
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"

import { themeInitScript } from "@/lib/theme"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Shipyard Lite",
    template: "%s · Shipyard Lite",
  },
  description: "A small issue tracker with a realtime kanban board.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The init script toggles the "dark" class before hydration, so React
    // would otherwise warn about the className mismatch.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
