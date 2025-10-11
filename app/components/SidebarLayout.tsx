"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode
}

const NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 9.75L12 4l9 5.75V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.75z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    href: "/verifikasi",
    label: "Verifikasi",
    icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    href: "/artikel",
    label: "Artikel",
    icon: (p: string) => (
      <svg className={p} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 8h10M7 12h10M7 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

export default function SidebarLayout({ children }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [authChecked, setAuthChecked] = useState<boolean>(false)

  // read collapsed state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sa_sidebar_collapsed")
      if (raw) setCollapsed(raw === "true")
    } catch {
      // ignore
    }
  }, [])

  // persist collapsed state
  useEffect(() => {
    try {
      localStorage.setItem("sa_sidebar_collapsed", String(collapsed))
    } catch {
      // ignore
    }
  }, [collapsed])

  // helper: check cookie presence (basic)
  function hasAuthCookie() {
    try {
      return document.cookie.split(";").some(c => {
        const t = c.trim()
        return t.startsWith("auth=") || t.startsWith("token=")
      })
    } catch {
      return false
    }
  }

  // check auth presence (localStorage keys or cookie)
  function hasAuth() {
    try {
      const ls = Boolean(localStorage.getItem("auth") || localStorage.getItem("token"))
      const ck = hasAuthCookie()
      return ls || ck
    } catch {
      return false
    }
  }

  // initial auth check + listen storage changes
  useEffect(() => {
    function check() {
      setIsAuthenticated(hasAuth())
      setAuthChecked(true)
    }
    check()
    function onStorage(e: StorageEvent) {
      if (e.key === "auth" || e.key === "token") check()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  // --- debug: force-show on these routes for testing ---
  const debugForceShowOn = ["/dashboard", "/artikel", "/verifikasi"]
  const debugForceShow = debugForceShowOn.some(p => pathname?.startsWith(p))

  // debug logging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[SidebarDebug] pathname=", pathname, "isAuth=", isAuthenticated, "authChecked=", authChecked, "debugForceShow=", debugForceShow)
  }, [pathname, isAuthenticated, authChecked, debugForceShow])

  // hide sidebar on root ("/") or login, or when not authenticated (but wait until authChecked)
  const hideSidebar = (pathname === "/" || pathname?.startsWith("/login") || (!isAuthenticated && authChecked)) && !debugForceShow

  function handleLogout() {
    try {
      localStorage.removeItem("auth")
      localStorage.removeItem("token")
      localStorage.removeItem("sa_sidebar_collapsed")
      localStorage.removeItem("selanjutnya_active_advocate_v1")
      document.cookie = "auth=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie = "token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    } catch {
      // ignore
    }
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex bg-background">
      {!hideSidebar && (
        <aside
          className={`flex flex-col transition-all duration-200 shadow-lg bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 ${collapsed ? "w-20" : "w-64"}`}
          aria-label="Sidebar utama"
        >
          <div className="flex flex-col items-center gap-3 px-4 py-6 border-b">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-blue-200">
                <Image
                  src="/Logo PERADI.jpg"
                  alt="Logo Peradi"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              {!collapsed && (
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-800 select-none">Peradi</div>
                  <div className="text-xs text-blue-600 select-none">Advokat Indonesia</div>
                </div>
              )}
            </div>
          </div>

          <nav className="mt-4 flex-1 px-2" role="navigation" aria-label="Main navigation">
            {NAV.map((n) => {
              const active = pathname?.startsWith(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-blue-100 transition-colors ${collapsed ? "justify-center" : ""} ${active ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"}`}
                  title={collapsed ? n.label : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={`${collapsed ? "h-6 w-6" : "h-5 w-5"} ${active ? "text-blue-600" : "text-gray-500"}`}>
                    {n.icon(collapsed ? "h-6 w-6" : "h-5 w-5")}
                  </span>
                  {!collapsed && <span className="truncate">{n.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="px-3 py-4 space-y-2 border-t border-blue-100">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-2 text-sm text-white transition-all shadow-sm"
            >
              Logout
            </button>
          </div>
        </aside>
      )}

      <div className={`flex-1 p-4 ${hideSidebar ? "max-w-3xl mx-auto" : ""}`}>
        {/* Toggle Button - only show when sidebar is visible */}
        {!hideSidebar && (
          <div className="mb-4">
            <button
              onClick={() => setCollapsed(v => !v)}
              aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 px-4 py-2 text-sm text-blue-700 transition-colors shadow-sm"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {collapsed ? (
                  // Hamburger menu icon (3 lines)
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18h16" />
                  </>
                ) : (
                  // X/Close icon
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
