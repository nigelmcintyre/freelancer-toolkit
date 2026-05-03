'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

type Mode = 'pomodoro' | 'short' | 'long'

const DURATIONS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  short:     5 * 60,
  long:     15 * 60,
}

const MODE_LABELS: Record<Mode, string> = {
  pomodoro: 'Pomodoro',
  short:    'Short Break',
  long:     'Long Break',
}

const playChime = () => {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 440
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
  } catch {
    // AudioContext unavailable
  }
}

export default function PomodoroTimerTool() {
  const [mode,      setMode]      = useState<Mode>('pomodoro')
  const [seconds,   setSeconds]   = useState(DURATIONS.pomodoro)
  const [running,   setRunning]   = useState(false)
  const [sessions,  setSessions]  = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const onComplete = useCallback(() => {
    setRunning(false)
    playChime()
    if (Notification.permission === 'granted') {
      new Notification('Freelancer Toolkit', {
        body: mode === 'pomodoro' ? '🍅 Pomodoro complete! Time for a break.' : '⏰ Break over — back to work!',
        icon: '/favicon.ico',
      })
    }
    if (mode === 'pomodoro') {
      setSessions(prev => prev + 1)
    }
  }, [mode])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            onComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current!)
    }
    return () => clearInterval(intervalRef.current!)
  }, [running, onComplete])

  useEffect(() => {
    const label = mode === 'pomodoro' ? 'Pomodoro Timer' : MODE_LABELS[mode]
    document.title = `${fmt(seconds)} — ${label}`
    return () => { document.title = 'Freelancer Toolkit' }
  }, [seconds, mode])

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const switchMode = (m: Mode) => {
    setMode(m)
    setSeconds(DURATIONS[m])
    setRunning(false)
  }

  const reset = () => {
    setSeconds(DURATIONS[mode])
    setRunning(false)
  }

  const total = DURATIONS[mode]
  const progress = ((total - seconds) / total) * 100
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDash = circumference - (progress / 100) * circumference
  const suggestLongBreak = sessions > 0 && sessions % 4 === 0 && mode === 'pomodoro' && !running && seconds === total

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
        {/* Mode selector */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-8">
          {(Object.keys(DURATIONS) as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-pressed={mode === m}
              aria-label={`Switch to ${MODE_LABELS[m]} mode`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Circular timer */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <svg width="220" height="220" className="-rotate-90" aria-hidden="true">
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke={mode === 'pomodoro' ? '#4f46e5' : mode === 'short' ? '#10b981' : '#f59e0b'}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-5xl font-bold text-gray-900 tabular-nums" role="timer" aria-live="polite" aria-label={`${fmt(seconds)} remaining`}>
              {fmt(seconds)}
            </span>
            <p className="text-sm text-gray-400 mt-1">{MODE_LABELS[mode]}</p>
          </div>
        </div>

        {suggestLongBreak && (
          <div className="mb-4 text-sm bg-amber-50 text-amber-700 rounded-lg px-4 py-2 border border-amber-200" role="status">
            🎉 4 Pomodoros done! Consider a long break.
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setRunning(r => !r)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors shadow-md ${running ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            aria-label={running ? 'Pause timer' : 'Start timer'}
          >
            {running
              ? <Pause className="w-6 h-6" aria-hidden="true" />
              : <Play  className="w-6 h-6 ml-0.5" aria-hidden="true" />
            }
          </button>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-600" aria-label={`${sessions} sessions completed`}>{sessions}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">Sessions completed today</p>
      </div>
    </div>
  )
}
