"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Article = {
  id: string
  title: string
  author: string
  date: string
  excerpt: string
}

const STORAGE_KEY = "selanjutnya_articles_v1"

function sampleArticles(): Article[] {
  return [
    {
      id: "1",
      title: "Reformasi Kebijakan Publik untuk Akses Keadilan yang Lebih Baik",
      author: "Admin",
      date: new Date().toLocaleDateString("id-ID"),
      excerpt:
        "Akses terhadap keadilan merupakan pilar utama dalam negara hukum. Berbagai inisiatif reformasi kebijakan publik telah diupayakan...",
    },
    {
      id: "2",
      title: "Peran Teknologi dalam Memperluas Akses Hukum",
      author: "Admin",
      date: new Date().toLocaleDateString("id-ID"),
      excerpt: "Pemanfaatan teknologi dapat membantu penanganan perkara dan layanan hukum lebih cepat dengan biaya efektif...",
    },
  ]
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("Admin")
  const [excerpt, setExcerpt] = useState("")

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setArticles(JSON.parse(raw))
      } else {
        const samples = sampleArticles()
        setArticles(samples)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(samples))
      }
    } catch (e) {
      setArticles(sampleArticles())
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
    } catch (e) {
      // ignore
    }
  }, [articles])

  function addArticle(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim()) return

    const newArticle: Article = {
      id: Date.now().toString(),
      title: title.trim(),
      author: author || "Admin",
      date: new Date().toLocaleDateString("id-ID"),
      excerpt: excerpt.trim(),
    }

    setArticles((s) => [newArticle, ...s])
    setTitle("")
    setExcerpt("")
  }

  function removeArticle(id: string) {
    setArticles((s) => s.filter((a) => a.id !== id))
  }

  return (
    <main className="min-h-svh bg-background">
      <section className="container mx-auto max-w-5xl px-4 py-8 fade-in">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Manajemen Artikel</h1>
          <p className="text-gray-600">Buat dan kelola artikel hukum untuk publik</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <aside className="col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold">Buat Artikel Baru</h2>
              <form onSubmit={addArticle} className="mt-4 flex flex-col gap-3">
                <label className="text-sm">Judul</label>
                <input
                  className="rounded-md border bg-input px-3 py-2 text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul artikel"
                />

                <label className="text-sm">Penulis</label>
                <input
                  className="rounded-md border bg-input px-3 py-2 text-sm"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <label className="text-sm">Ringkasan</label>
                <textarea
                  className="rounded-md border bg-input px-3 py-2 text-sm resize-y"
                  rows={4}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Tulis ringkasan singkat artikel"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
                  >
                    Simpan Artikel
                  </button>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm"
                  >
                    Kembali
                  </Link>
                </div>
              </form>
            </div>
          </aside>

          <main className="col-span-2">
            <div className="bg-card rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Daftar Artikel</h2>
                <p className="text-sm text-muted-foreground">{articles.length} item</p>
              </div>

              <div className="mt-4">
                {/* Scrollable cards */}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {articles.map((a) => (
                    <article key={a.id} className="rounded-md border p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-md font-semibold">{a.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {a.author} • {a.date}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed">{a.excerpt}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Link
                            href="#"
                            className="text-sm text-primary underline"
                            aria-label={`Lihat ${a.title}`}
                          >
                            Lihat
                          </Link>
                          <button
                            onClick={() => removeArticle(a.id)}
                            className="text-sm text-destructive"
                            aria-label={`Hapus ${a.title}`}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </main>
  )
}
