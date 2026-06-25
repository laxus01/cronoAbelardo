import { Countdown } from '@/components/countdown'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Línea superior estilo periódico */}
      <div className="h-1 w-full bg-navy" aria-hidden="true" />

      {/* Cabecera / Masthead */}
      <header className="border-b-2 border-foreground/90">
        <div className="mx-auto max-w-5xl px-6 py-10 text-center">
          <h1 className="font-serif text-5xl font-black tracking-tight sm:text-7xl">
            El <span className="text-flag-red">Crono</span>Abelardo
          </h1>
          <p className="mt-3 font-serif text-base italic text-muted-foreground sm:text-xl">
            Porque las promesas de un candidato son su obligación
          </p>
        </div>
      </header>

      {/* Contador */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Countdown />
      </div>
    </main>
  )
}
