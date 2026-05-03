'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

interface Props {
  faqs: { q: string; a: string }[]
}

function HourlyRateInner() {
  const router = useRouter()
  const params = useSearchParams()

  const [salary,    setSalary]    = useState(params.get('salary')    ?? '80000')
  const [expenses,  setExpenses]  = useState(params.get('expenses')  ?? '500')
  const [weeksOff,  setWeeksOff]  = useState(params.get('weeksOff')  ?? '4')
  const [hoursWeek, setHoursWeek] = useState(params.get('hoursWeek') ?? '30')
  const [buffer,    setBuffer]    = useState(params.get('buffer')    === 'true')
  const [copied,    setCopied]    = useState(false)

  useEffect(() => {
    const q = new URLSearchParams({ salary, expenses, weeksOff, hoursWeek, buffer: String(buffer) })
    router.replace(`?${q.toString()}`, { scroll: false })
  }, [salary, expenses, weeksOff, hoursWeek, buffer, router])

  const annualSalary   = parseFloat(salary)    || 0
  const annualExpenses = (parseFloat(expenses) || 0) * 12
  const weeksWorking   = 52 - (parseFloat(weeksOff) || 0)
  const totalHours     = weeksWorking * (parseFloat(hoursWeek) || 1)
  const totalCost      = annualSalary + annualExpenses
  const baseRate       = totalCost / totalHours
  const bufferedRate   = baseRate * 1.2
  const displayRate    = buffer ? bufferedRate : baseRate

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const fields = [
    { id: 'salary',    label: 'Target Annual Salary ($)', value: salary,    set: setSalary,    prefix: '$', placeholder: '80000' },
    { id: 'expenses',  label: 'Monthly Business Expenses ($)', value: expenses,  set: setExpenses,  prefix: '$', placeholder: '500' },
  ]

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
        {fields.map(({ id, label, value, set, prefix, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{prefix}</span>
              <input
                id={id}
                type="number"
                min="0"
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={label}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="weeksOff" className="block text-sm font-medium text-gray-700 mb-1">Weeks Off Per Year</label>
            <input id="weeksOff" type="number" min="0" max="51" value={weeksOff} onChange={e => setWeeksOff(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Weeks off per year" />
          </div>
          <div>
            <label htmlFor="hoursWeek" className="block text-sm font-medium text-gray-700 mb-1">Billable Hours / Week</label>
            <input id="hoursWeek" type="number" min="1" max="80" value={hoursWeek} onChange={e => setHoursWeek(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Billable hours per week" />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" checked={buffer} onChange={e => setBuffer(e.target.checked)} className="sr-only" aria-label="Add 20% safety buffer to rate" />
            <div className={`w-10 h-6 rounded-full transition-colors ${buffer ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${buffer ? 'translate-x-4' : ''}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">Add 20% buffer for slow periods</span>
        </label>
      </div>

      {/* Results */}
      <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <p className="text-sm text-indigo-600 font-medium mb-1">Your minimum hourly rate</p>
        <p className="text-5xl font-bold text-indigo-700 mb-4">{fmt(displayRate)}<span className="text-xl font-medium">/hr</span></p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Annual need</p>
            <p className="font-semibold text-gray-900">{fmt(totalCost)}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Billable hours / yr</p>
            <p className="font-semibold text-gray-900">{Math.round(totalHours).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Base rate</p>
            <p className="font-semibold text-gray-900">{fmt(baseRate)}/hr</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">With 20% buffer</p>
            <p className="font-semibold text-gray-900">{fmt(bufferedRate)}/hr</p>
          </div>
        </div>

        <button
          onClick={copyUrl}
          className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          aria-label="Copy shareable URL with your inputs"
        >
          {copied ? '✓ Link Copied!' : 'Copy Shareable URL'}
        </button>
      </div>
    </div>
  )
}

export default function HourlyRateTool(_props: Props) {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading calculator…</div>}>
      <HourlyRateInner />
    </Suspense>
  )
}
