'use client'
import { useState } from 'react'
import { Plus, Trash2, Printer } from 'lucide-react'

interface LineItem {
  id: number
  description: string
  quantity: string
  unitPrice: string
}

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

let itemCounter = 0

export default function InvoiceGeneratorTool() {
  const [invoiceNumber] = useState(1001)
  const [from, setFrom]           = useState({ name: '', email: '', address: '' })
  const [to, setTo]               = useState({ name: '', email: '', address: '' })
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate]     = useState('')
  const [taxRate, setTaxRate]     = useState('')
  const [notes, setNotes]         = useState('')
  const [items, setItems]         = useState<LineItem[]>([
    { id: ++itemCounter, description: '', quantity: '1', unitPrice: '' },
  ])

  const addItem = () => setItems(prev => [...prev, { id: ++itemCounter, description: '', quantity: '1', unitPrice: '' }])
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))
  const updateItem = (id: number, field: keyof LineItem, value: string) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0), 0)
  const taxAmount = subtotal * ((parseFloat(taxRate) || 0) / 100)
  const total = subtotal + taxAmount

  return (
    <div>
      {/* Print button */}
      <div className="flex justify-end mb-4" data-noprint>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
          aria-label="Print invoice as PDF"
        >
          <Printer className="w-4 h-4" aria-hidden="true" /> Print Invoice
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <section className="flex-1 space-y-6" data-noprint aria-label="Invoice form">
          {/* From */}
          <fieldset className="border border-gray-200 rounded-xl p-5">
            <legend className="text-sm font-semibold text-gray-700 px-1">Your Details</legend>
            <div className="space-y-3 mt-2">
              <div>
                <label htmlFor="from-name" className="block text-xs font-medium text-gray-600 mb-1">Name / Business Name</label>
                <input id="from-name" type="text" value={from.name} onChange={e => setFrom(p => ({ ...p, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Acme Freelance LLC" aria-label="Your name or business name" />
              </div>
              <div>
                <label htmlFor="from-email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input id="from-email" type="email" value={from.email} onChange={e => setFrom(p => ({ ...p, email: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" aria-label="Your email address" />
              </div>
              <div>
                <label htmlFor="from-address" className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                <textarea id="from-address" rows={2} value={from.address} onChange={e => setFrom(p => ({ ...p, address: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="123 Main St, City, State, ZIP" aria-label="Your address" />
              </div>
            </div>
          </fieldset>

          {/* To */}
          <fieldset className="border border-gray-200 rounded-xl p-5">
            <legend className="text-sm font-semibold text-gray-700 px-1">Client Details</legend>
            <div className="space-y-3 mt-2">
              <div>
                <label htmlFor="to-name" className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                <input id="to-name" type="text" value={to.name} onChange={e => setTo(p => ({ ...p, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Client Corp Inc." aria-label="Client name" />
              </div>
              <div>
                <label htmlFor="to-email" className="block text-xs font-medium text-gray-600 mb-1">Client Email</label>
                <input id="to-email" type="email" value={to.email} onChange={e => setTo(p => ({ ...p, email: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="billing@client.com" aria-label="Client email address" />
              </div>
              <div>
                <label htmlFor="to-address" className="block text-xs font-medium text-gray-600 mb-1">Client Address</label>
                <textarea id="to-address" rows={2} value={to.address} onChange={e => setTo(p => ({ ...p, address: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="456 Client Ave, City, State, ZIP" aria-label="Client address" />
              </div>
            </div>
          </fieldset>

          {/* Invoice Meta */}
          <fieldset className="border border-gray-200 rounded-xl p-5">
            <legend className="text-sm font-semibold text-gray-700 px-1">Invoice Details</legend>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label htmlFor="inv-num" className="block text-xs font-medium text-gray-600 mb-1">Invoice #</label>
                <input id="inv-num" type="text" value={invoiceNumber} readOnly className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm" aria-label="Invoice number" />
              </div>
              <div>
                <label htmlFor="tax-rate" className="block text-xs font-medium text-gray-600 mb-1">Tax Rate (%)</label>
                <input id="tax-rate" type="number" min="0" max="100" step="0.1" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" aria-label="Tax rate percentage" />
              </div>
              <div>
                <label htmlFor="inv-date" className="block text-xs font-medium text-gray-600 mb-1">Invoice Date</label>
                <input id="inv-date" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Invoice date" />
              </div>
              <div>
                <label htmlFor="due-date" className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
                <input id="due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Payment due date" />
              </div>
            </div>
          </fieldset>

          {/* Line Items */}
          <fieldset className="border border-gray-200 rounded-xl p-5">
            <legend className="text-sm font-semibold text-gray-700 px-1">Line Items</legend>
            <div className="mt-2 space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <label htmlFor={`desc-${item.id}`} className="sr-only">Description for item {idx + 1}</label>
                    <input id={`desc-${item.id}`} type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Description" aria-label={`Line item ${idx + 1} description`} />
                  </div>
                  <div className="w-16">
                    <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity for item {idx + 1}</label>
                    <input id={`qty-${item.id}`} type="number" min="0" step="0.5" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center" placeholder="Qty" aria-label={`Line item ${idx + 1} quantity`} />
                  </div>
                  <div className="w-24">
                    <label htmlFor={`price-${item.id}`} className="sr-only">Unit price for item {idx + 1}</label>
                    <input id={`price-${item.id}`} type="number" min="0" step="0.01" value={item.unitPrice} onChange={e => updateItem(item.id, 'unitPrice', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="$0.00" aria-label={`Line item ${idx + 1} unit price`} />
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-0.5" aria-label={`Remove line item ${idx + 1}`} disabled={items.length === 1}>
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
              <button onClick={addItem} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-2" aria-label="Add new line item">
                <Plus className="w-4 h-4" aria-hidden="true" /> Add Line Item
              </button>
            </div>
          </fieldset>

          {/* Notes */}
          <fieldset className="border border-gray-200 rounded-xl p-5">
            <legend className="text-sm font-semibold text-gray-700 px-1">Notes / Payment Terms</legend>
            <div className="mt-2">
              <label htmlFor="notes" className="sr-only">Notes and payment terms</label>
              <textarea id="notes" rows={3} value={notes} onChange={e => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Payment due within 30 days. Bank transfer preferred." aria-label="Notes and payment terms" />
            </div>
          </fieldset>
        </section>

        {/* Preview */}
        <section className="flex-1 lg:max-w-lg" aria-label="Invoice preview" id="invoice-preview">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 print:shadow-none print:border-none print:p-0">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                <p className="text-gray-500 text-sm mt-1">#{invoiceNumber}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p><strong>Date:</strong> {invoiceDate}</p>
                {dueDate && <p><strong>Due:</strong> {dueDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">From</p>
                <p className="font-semibold text-gray-900">{from.name || 'Your Name'}</p>
                {from.email && <p className="text-sm text-gray-600">{from.email}</p>}
                {from.address && <p className="text-sm text-gray-600 whitespace-pre-line">{from.address}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Bill To</p>
                <p className="font-semibold text-gray-900">{to.name || 'Client Name'}</p>
                {to.email && <p className="text-sm text-gray-600">{to.email}</p>}
                {to.address && <p className="text-sm text-gray-600 whitespace-pre-line">{to.address}</p>}
              </div>
            </div>

            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left pb-2 font-semibold text-gray-700">Description</th>
                  <th className="text-center pb-2 font-semibold text-gray-700 w-12">Qty</th>
                  <th className="text-right pb-2 font-semibold text-gray-700 w-20">Rate</th>
                  <th className="text-right pb-2 font-semibold text-gray-700 w-24">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const qty = parseFloat(item.quantity) || 0
                  const price = parseFloat(item.unitPrice) || 0
                  return (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-2 text-gray-800">{item.description || '—'}</td>
                      <td className="py-2 text-center text-gray-600">{qty}</td>
                      <td className="py-2 text-right text-gray-600">{fmt(price)}</td>
                      <td className="py-2 text-right font-medium">{fmt(qty * price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-48 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{fmt(subtotal)}</span></div>
                {taxRate && <div className="flex justify-between"><span className="text-gray-600">Tax ({taxRate}%)</span><span>{fmt(taxAmount)}</span></div>}
                <div className="flex justify-between border-t-2 border-gray-900 pt-2 mt-2 font-bold text-base"><span>Total</span><span>{fmt(total)}</span></div>
              </div>
            </div>

            {notes && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Notes / Payment Terms</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{notes}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
