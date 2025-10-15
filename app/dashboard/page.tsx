"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Advocate = {
  id: string
  name: string
  license: string
  location: string
  email: string
  phone?: string
  avatar?: string
}

type Activity = {
  id: string
  text: string
  date: string
}

const SAMPLE_KEY = "selanjutnya_active_advocate_v1"

function sampleAdvocate(): { advocate: Advocate; activities: Activity[] } {
  const advocate: Advocate = {
    id: "adv-1",
    name: "Andi Prasetyo, S.H.",
    license: "12345-ADV",
    location: "Jakarta",
    email: "andi.prasetyo@example.com",
    phone: "0812-3456-7890",
    avatar: "/cukurukuk.jpg",
  }

  const activities: Activity[] = [
    { id: "a1", text: "Advokat terlihat online di aplikasi", date: new Date().toLocaleString() },
    { id: "a2", text: "Melihat daftar kasus", date: new Date().toLocaleString() },
    { id: "a3", text: "Memperbarui foto profil", date: new Date().toLocaleString() },
  ]

  return { advocate, activities }
}

export default function DashboardPage() {
  const [advocate, setAdvocate] = useState<Advocate | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isActive, setIsActive] = useState<boolean>(true)
  const [lastSeen, setLastSeen] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAMPLE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setAdvocate(parsed.advocate)
        setActivities(parsed.activities || [])
      } else {
        const samp = sampleAdvocate()
        setAdvocate(samp.advocate)
        setActivities(samp.activities)
        localStorage.setItem(SAMPLE_KEY, JSON.stringify(samp))
      }
    } catch (e) {
      const samp = sampleAdvocate()
      setAdvocate(samp.advocate)
      setActivities(samp.activities)
    }
  }, [])

  function clearActivities() {
    setActivities([])
    try {
      const raw = localStorage.getItem(SAMPLE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        parsed.activities = []
        localStorage.setItem(SAMPLE_KEY, JSON.stringify(parsed))
      }
    } catch (e) {
      // ignore
    }
  }

  // update last seen when active toggled on
  useEffect(() => {
    if (isActive) {
      const now = new Date().toLocaleString()
      setLastSeen(now)
    }
  }, [isActive])

  return (
    <div className="min-h-screen bg-dashboard-bg py-8">
      <main className="container mx-auto max-w-5xl px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola dan pantau aktivitas sistem Peradi</p>
        </div>

        <div className="space-y-4">
          {/* Top profile banner - only visible when advocate is active */}
          {isActive && advocate ? (
            <div className="bg-card rounded-xl p-4 shadow flex items-center gap-4">
              <Image
                src={advocate.avatar || "/avatar-placeholder.png"}
                alt="avatar"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{advocate.name}</h2>
                <p className="text-sm text-muted-foreground">Terlihat terakhir: {lastSeen}</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setIsActive(false)}
                  className="rounded-lg border px-3 py-1 text-sm"
                >
                  Advokat tidak aktif
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Tidak ada advokat aktif saat ini.</p>
              <button onClick={() => setIsActive(true)} className="rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Simulasikan Aktif</button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-card rounded-xl p-4 shadow">
                <p className="text-sm text-muted-foreground">Kasus Terkini</p>
                <p className="mt-2 text-xl font-semibold">12</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow">
                <p className="text-sm text-muted-foreground">Advokat yang terdaftar</p>
                <p className="mt-2 text-xl font-semibold">8</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow">
                <p className="text-sm text-muted-foreground">Artikel</p>
                <p className="mt-2 text-xl font-semibold">2</p>
              </div>
            </div>

            <div className="mt-4 bg-card rounded-xl p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold">Aktivitas Terakhir</h3>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-muted-foreground">{activities.length} entri</p>
                  <button onClick={clearActivities} className="rounded-lg border px-3 py-1 text-sm">Bersihkan</button>
                </div>
              </div>

              <div className="mt-3 max-h-[50vh] overflow-y-auto pr-2 space-y-3">
                {activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada aktivitas.</p>
                ) : (
                  activities.map((act) => (
                    <div key={act.id} className="rounded-md border p-3">
                      <p className="text-sm">{act.text}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{act.date}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
      </main>
    </div>
  )
}
