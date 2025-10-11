"use client"

import { useState } from "react"

interface PendaftarData {
  id: number
  nama: string
  email: string
  Nia: string
  status: "pending" | "diterima" | "ditolak"
}

export default function VerifikasiPage() {
  const [dataPendaftar, setDataPendaftar] = useState<PendaftarData[]>([
    {
      id: 1,
      nama: "Ahmad Rizki",
      email: "ahmad.rizki@email.com",
      Nia: "20240115",
      status: "pending",
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      Nia: "20240116",
      status: "pending",
    },
    {
      id: 3,
      nama: "Budi Santoso",
      email: "budi.santoso@email.com",
      Nia: "20240117",
      status: "pending",
    },
    {
      id: 4,
      nama: "Dewi Lestari",
      email: "dewi.lestari@email.com",
      Nia: "20240118",
      status: "pending",
    },
  ])

  const handleVerifikasi = (id: number, status: "diterima" | "ditolak") => {
    setDataPendaftar((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-foreground/10 text-foreground">Menunggu</span>
        )
      case "diterima":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent text-accent-foreground">Diterima</span>
        )
      case "ditolak":
        return (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-destructive/10 text-destructive">Ditolak</span>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Verifikasi Pendaftaran</h1>
          <p className="text-gray-600">Kelola dan verifikasi pendaftaran advokat baru</p>
        </div>

        {/* Table Card */}
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">NIA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dataPendaftar.map((item, index) => (
                  <tr key={item.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-card-foreground">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">{item.email}</td>
                    <td className="px-6 py-4 text-sm text-card-foreground">
                      {new Date(item.Nia).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleVerifikasi(item.id, "diterima")}
                          disabled={item.status !== "pending"}
                          className="px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleVerifikasi(item.id, "ditolak")}
                          disabled={item.status !== "pending"}
                          className="px-4 py-2 text-sm font-medium rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {dataPendaftar.map((item, index) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-foreground mb-1">#{index + 1}</p>
                    <h3 className="font-semibold text-card-foreground">{item.nama}</h3>
                    <p className="text-sm text-foreground">{item.email}</p>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                <p className="text-sm text-foreground">
                  Tanggal: {new Date(item.Nia).toLocaleDateString("id-ID")}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleVerifikasi(item.id, "diterima")}
                    disabled={item.status !== "pending"}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Terima
                  </button>
                  <button
                    onClick={() => handleVerifikasi(item.id, "ditolak")}
                    disabled={item.status !== "pending"}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-foreground mb-1">Total Pendaftar</p>
            <p className="text-2xl font-bold text-primary">{dataPendaftar.length}</p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-foreground mb-1">Menunggu Verifikasi</p>
            <p className="text-2xl font-bold text-foreground">
              {dataPendaftar.filter((d) => d.status === "pending").length}
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <p className="text-sm text-foreground mb-1">Diterima</p>
            <p className="text-2xl font-bold text-accent">
              {dataPendaftar.filter((d) => d.status === "diterima").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
