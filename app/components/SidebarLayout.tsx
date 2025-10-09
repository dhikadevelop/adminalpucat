"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode
}

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9.75L12 4l9 5.75V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.75z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )},
  { href: "/verifikasi", label: "Verifikasi", icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )},
  { href: "/artikel", label: "Artikel", icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8h10M7 12h10M7 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )},
]

export default function SidebarLayout({ children }: Props) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<boolean>(false)

  // hide sidebar on login route
  const hideSidebar = pathname?.startsWith("/login")
  const router = useRouter()

  function handleLogout() {
    try {
      // clear common auth keys and app state used in demo
      localStorage.removeItem("sa_sidebar_collapsed")
      localStorage.removeItem("selanjutnya_active_advocate_v1")
      localStorage.removeItem("auth")
      localStorage.removeItem("token")
    } catch (e) {
      // ignore
    }
    router.push("/login")
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sa_sidebar_collapsed")
      if (raw) setCollapsed(raw === "true")
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("sa_sidebar_collapsed", String(collapsed))
    } catch (e) {
      // ignore
    }
  }, [collapsed])

  return (
    <div className="min-h-screen flex bg-background">
      {!hideSidebar && (
        <aside
          className={`flex flex-col transition-all duration-200 shadow-md bg-card text-primary ${collapsed ? "w-20" : "w-64"}`}
        >
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary text-white font-bold">M</div>
              {!collapsed && <div className="text-lg font-semibold select-none">myadvokat</div>}
            </div>
          </div>

          <nav className="mt-4 flex-1 px-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors ${collapsed ? "justify-center" : ""}`}
              >
                <span className={`${collapsed ? "h-6 w-6" : "h-5 w-5"} text-muted-foreground`}>
                  {n.icon(collapsed ? "h-6 w-6" : "h-5 w-5")}
                </span>
                {!collapsed && <span className="truncate">{n.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="px-3 py-4 space-y-2">
            <button
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              {collapsed ? "Buka" : "Tutup"}
            </button>

            <button
              onClick={handleLogout}
              className="w-full rounded-md bg-destructive/90 px-3 py-2 text-sm text-white"
            >
              Logout
            </button>
          </div>
        </aside>
      )}

      <div className={`flex-1 p-4 ${hideSidebar ? "max-w-3xl mx-auto" : ""}`}>
        {children}
      </div>
    </div>
  )
}

