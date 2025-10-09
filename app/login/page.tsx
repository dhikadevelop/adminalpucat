"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent, type ChangeEvent } from "react"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("")
      router.push("/dashboard")
      return
    }

    setError("Username atau password tidak sesuai.")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src="/logo PERADI.jpg" alt="Logo Peradi" className="h-16 w-16" />
          <h1 className="text-2xl font-semibold text-primary text-balance">Login Admin Advokat</h1>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-secondary-foreground" htmlFor="username">
                Username
              </label>
              <input
                aria-required="true"
                autoComplete="username"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
                id="username"
                name="username"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                placeholder="Masukkan username"
                type="text"
                value={username}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-secondary-foreground" htmlFor="password">
                Password
              </label>
              <input
                aria-required="true"
                autoComplete="current-password"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
                id="password"
                name="password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                type="password"
                value={password}
              />
            </div>
          </div>

          {error ? (
            <p className="text-center text-sm font-medium text-accent" role="alert">
              {error}
            </p>
          ) : null}

          <button
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
