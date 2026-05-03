'use client'
import { useState } from 'react'

function calcStripe(amount: number, mode: 'receive' | 'charge') {
  if (mode === 'receive') {
    const fee = amount * 0.029 + 0.30
    return { net: amount - fee, fee, charge: amount }
  }
  const charge = (amount + 0.30) / (1 - 0.029)
  const fee = charge - amount
  return { net: amount, fee, charge }
}

function calcPaypal(amount: number, mode: 'receive' | 'charge') {
  if (mode === 'receive') {
    const fee = amount * 0.0349 + 0.49
    return { net: amount - fee, fee, charge: amount }
  }
  const charge = (amount + 0.49) / (1 - 0.0349)
  const fee = charge - amount
  return { net: amount, fee, charge }
}

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function StripePaypalCalculatorTool() {
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'receive' | 'charge'>('receive')

  const value = parseFloat(amount) || 0
  const stripe = calcStripe(value, mode)
  const paypal = calcPaypal(value, mode)
  const diff = Math.abs(stripe.charge - paypal.charge)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-xl mx-auto shadow-sm">
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'receive' ? 'Invoice / Charge Amount ($)' : 'Amount You Want to Receive ($)'}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Enter dollar amount"
          />
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className="text-sm font-medium text-gray-700 mb-2">Mode</legend>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {(['receive', 'charge'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              aria-pressed={mode === m}
              aria-label={m === 'receive' ? "Calculate what I'll receive" : 'Calculate what to charge'}
            >
              {m === 'receive' ? "What I'll Receive" : 'What to Charge'}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: 'Stripe', color: 'indigo', data: stripe },
          { label: 'PayPal', color: 'blue',   data: paypal },
        ].map(({ label, color, data }) => (
          <div key={label} className={`rounded-lg border-2 ${color === 'indigo' ? 'border-indigo-200 bg-indigo-50' : 'border-blue-200 bg-blue-50'} p-4`}>
            <p className={`font-semibold ${color === 'indigo' ? 'text-indigo-700' : 'text-blue-700'} mb-3`}>{label}</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Charge client</span><span className="font-medium">{fmt(data.charge)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Fee</span><span className="text-red-600">{fmt(data.fee)}</span></div>
              <div className="flex justify-between border-t border-current pt-1 mt-1"><span className="font-medium">You receive</span><span className="font-bold text-green-700">{fmt(data.net)}</span></div>
            </div>
          </div>
        ))}
      </div>

      {value > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-center text-gray-600">
          Stripe saves you <strong className="text-green-700">{fmt(diff)}</strong> compared to PayPal on this transaction.
        </div>
      )}
    </div>
  )
}
