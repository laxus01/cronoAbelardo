'use client'

import { useEffect, useState } from 'react'

// 7 de agosto de 2026, 3:00 p.m. (hora Colombia, UTC-5) + 90 días = 5 de noviembre de 2026
const TARGET = new Date('2026-11-05T15:00:00-05:00')

type TimeParts = {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getRemaining(target: Date, now: Date): TimeParts {
  if (now >= target) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  // Calcular meses y días calendario de forma precisa
  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth())

  const anchor = new Date(now)
  anchor.setMonth(anchor.getMonth() + months)
  if (anchor > target) {
    months -= 1
    anchor.setMonth(anchor.getMonth() - 1)
  }

  let diff = Math.floor((target.getTime() - anchor.getTime()) / 1000)

  const days = Math.floor(diff / 86400)
  diff -= days * 86400
  const hours = Math.floor(diff / 3600)
  diff -= hours * 3600
  const minutes = Math.floor(diff / 60)
  const seconds = diff - minutes * 60

  return { months, days, hours, minutes, seconds }
}

const FIELDS: { key: keyof TimeParts; label: string }[] = [
  { key: 'months', label: 'Meses' },
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
]

export function Countdown() {
  const [time, setTime] = useState<TimeParts | null>(null)

  useEffect(() => {
    const tick = () => setTime(getRemaining(TARGET, new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const finished =
    time &&
    time.months === 0 &&
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0

  return (
    <section
      aria-label="Cuenta regresiva oficial"
      className="relative overflow-hidden rounded-lg bg-navy text-white shadow-2xl"
    >
      {/* Franja tricolor superior */}
      <div className="flex h-1.5 w-full" aria-hidden="true">
        <div className="flex-1 bg-gold" />
        <div className="flex-1 bg-navy-soft" />
        <div className="flex-1 bg-flag-red" />
      </div>

      <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gold">
          Cuenta Regresiva Oficial
        </p>

        <h2 className="mt-5 font-serif text-4xl font-black leading-tight text-balance sm:text-6xl">
          Fin de las guerrillas en Colombia
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-white/85 sm:text-base">
          3 meses luego de la posesión del nuevo gobierno:{' '}
          <span className="font-semibold text-white">
            5 de noviembre de 2026 · 3:00 p.m.
          </span>
        </p>

        {finished ? (
          <p className="mt-10 font-serif text-2xl font-bold text-gold sm:text-3xl">
            El tiempo ha llegado.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            {FIELDS.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-5 backdrop-blur-sm sm:py-7"
              >
                <div className="font-serif text-4xl font-black tabular-nums sm:text-5xl">
                  {time ? String(time[key]).padStart(2, '0') : '--'}
                </div>
                <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-widest text-white/70 sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
