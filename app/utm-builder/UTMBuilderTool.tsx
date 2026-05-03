'use client'
import { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'

interface HistoryEntry { url: string; ts: number }

export default function UTMBuilderTool() {
  const [baseUrl,  setBaseUrl]  = useState('')
  const [source,   setSource]   = useState('')
  const [medium,   setMedium]   = useState('')
  const [campaign, setCampaign] = useState('')
  const [term,     setTerm]     = useState('')
  const [content,  setContent]  = useState('')
  const [copied,   setCopied]   = useState(false)
  const [history,  setHistory]  = useState<HistoryEntry[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const buildUrl = () => {
    if (!baseUrl || !source || !medium || !campaign) return ''
    const params = new URLSearchParams()
    params.set('utm_source',   source)
    params.set('utm_medium',   medium)
    params.set('utm_campaign', campaign)
    if (term)    params.set('utm_term',    term)
    if (content) params.set('utm_content', content)
    const separator = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${separator}${params.toString()}`
  }

  const utmUrl = buildUrl()

  const copyMain = () => {
    if (!utmUrl) return
    navigator.clipboard.writeText(utmUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setHistory(prev => [{ url: utmUrl, ts: Date.now() }, ...prev].slice(0, 5))
    })
  }

  const copyHistoryItem = (url: string, idx: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  const clearAll = () => {
    setBaseUrl(''); setSource(''); setMedium(''); setCampaign(''); setTerm(''); setContent('')
  }

  const required = [
    { id: 'base-url', label: 'Website URL *', value: baseUrl, set: setBaseUrl, placeholder: 'https://yourwebsite.com/page' },
    { id: 'source',   label: 'Campaign Source * (e.g. google, newsletter)', value: source, set: setSource, placeholder: 'google' },
    { id: 'medium',   label: 'Campaign Medium * (e.g. cpc, email, social)', value: medium, set: setMedium, placeholder: 'email' },
    { id: 'campaign', label: 'Campaign Name * (e.g. spring-sale)', value: campaign, set: setCampaign, placeholder: 'spring-sale' },
  ]

  const optional = [
    { id: 'term',    label: 'Campaign Term (paid keywords)', value: term,    set: setTerm,    placeholder: 'running+shoes' },
    { id: 'content', label: 'Campaign Content (a/b test or ad)', value: content, set: setContent, placeholder: 'logolink' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          {required.map(({ id, label, value, set, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                id={id}
                type="text"
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={label}
              />
            </div>
          ))}

          <details className="group">
            <summary className="text-sm text-indigo-600 font-medium cursor-pointer select-none list-none flex items-center gap-1" aria-label="Show optional UTM parameters">
              <span className="group-open:rotate-90 inline-block transition-transform">›</span> Optional parameters
            </summary>
            <div className="mt-3 space-y-3">
              {optional.map(({ id, label, value, set, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={e => set(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={label}
                  />
                </div>
              ))}
            </div>
          </details>
        </div>

        {utmUrl && (
          <div className="mt-5">
            <label htmlFor="utm-output" className="block text-sm font-medium text-gray-700 mb-1">Generated URL</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 break-all font-mono" id="utm-output" role="status" aria-live="polite">
              {utmUrl}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={copyMain}
            disabled={!utmUrl}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Copy UTM URL to clipboard"
          >
            {copied ? <><Check className="w-4 h-4" aria-hidden="true" /> Copied!</> : <><Copy className="w-4 h-4" aria-hidden="true" /> Copy to Clipboard</>}
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Clear all fields"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" /> Clear All
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent URLs</h2>
          <ul className="space-y-2">
            {history.map((entry, idx) => (
              <li key={entry.ts} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
                <span className="flex-1 text-xs text-gray-600 font-mono break-all">{entry.url}</span>
                <button
                  onClick={() => copyHistoryItem(entry.url, idx)}
                  className="shrink-0 p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label={`Copy recent URL ${idx + 1}`}
                >
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-green-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
