import { Sidebar } from "@/components/layout/sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {children}
      </main>
    </div>
  )
}
