import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { webApplicationSchema, faqSchema } from '@/lib/structured-data'
import AdSlot from '@/components/AdSlot'
import PomodoroTimerTool from './PomodoroTimerTool'

const path = '/pomodoro-timer'
const title = 'Pomodoro Timer Online Free — Focus & Productivity Timer'
const description = 'Free online Pomodoro timer. 25-minute focus sessions, short and long breaks, browser notifications, and audio chimes. No install, no sign-up — start focusing now.'

export const metadata: Metadata = {
  title: `${title} — ${siteName}`,
  description,
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: { title, description, url: `${siteUrl}${path}`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'What is the Pomodoro Technique?', a: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo. You work for 25 minutes (one "pomodoro"), take a 5-minute break, and after every 4 sessions take a longer 15–30 minute break.' },
  { q: 'Why 25 minutes?', a: 'Cirillo found 25 minutes to be optimal for sustained focus without fatigue. The time pressure of a ticking timer creates a sense of urgency that keeps you on task, while knowing a break is coming reduces the urge to procrastinate.' },
  { q: 'Can I change the timer duration?', a: 'This timer uses the classic 25/5/15 Pomodoro settings. Many practitioners adapt the intervals — 50/10 is popular for deep work. The standard settings work well for most people starting out.' },
  { q: 'Will the timer work with my screen off?', a: 'The JavaScript timer continues running when the tab is in the background. However, some mobile browsers throttle background tabs. For best results, keep the tab visible or use a dedicated Pomodoro app on mobile.' },
  { q: 'How many Pomodoros should I do per day?', a: 'Most practitioners aim for 8–12 Pomodoros per full workday. Track your completed sessions to understand your real capacity. Knowledge workers typically find 6–8 focused Pomodoros per day realistic when accounting for meetings and admin.' },
]

export default function PomodoroTimerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema('Pomodoro Timer Online Free', path, description)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Pomodoro Timer</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Stay focused with 25-minute work sessions. Browser notifications and audio chimes built in.</p>
      </div>

      <div className="flex justify-center my-4">
        <AdSlot variant="banner" />
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <PomodoroTimerTool />
        </div>
        <aside className="hidden lg:block">
          <AdSlot variant="sidebar" />
        </aside>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot variant="rectangle" />
      </div>

      <article data-noprint className="prose prose-slate max-w-3xl mx-auto mt-8" style={{ contentVisibility: 'auto' }}>
        <h2>Pomodoro Timer Online — Stay Focused and Get More Done</h2>
        <p>Freelancers face a unique productivity challenge: no manager, no office structure, and infinite distractions. The Pomodoro Technique is one of the most effective tools for self-directed work. By breaking your day into focused 25-minute sprints with built-in breaks, you train your brain to concentrate on demand, reduce decision fatigue, and build a clear picture of how long tasks actually take.</p>

        <h2>How to Use This Pomodoro Timer</h2>
        <p>Select your mode: <strong>Pomodoro</strong> (25 min), <strong>Short Break</strong> (5 min), or <strong>Long Break</strong> (15 min). Click Start. The timer counts down and updates the browser tab title so you can see the countdown even when the tab isn't visible. When the session ends, an audio chime plays and a browser notification fires (you'll be asked for permission the first time). After every 4 completed Pomodoros, the timer suggests a long break. Click Reset to start the current session over from scratch.</p>

        <h2>The Science Behind the Pomodoro Technique</h2>
        <p>Time-boxing — constraining yourself to a fixed period — exploits Parkinson's Law: work expands to fill the time available. A 25-minute countdown makes you hyper-aware of time, which prevents perfectionism paralysis and over-engineering. The mandatory breaks prevent the cognitive fatigue that accumulates when you try to work for hours without rest. Research on focused work consistently shows that most people can only sustain 90 minutes of deep focus before a break is needed — Pomodoros break that window into manageable chunks.</p>

        <h2>Tips for Freelancers Using Pomodoros</h2>
        <p>Before starting a Pomodoro, write down the single task you'll work on. No task-switching during the sprint. If an interruption occurs — a new email, a thought about something else — write it down quickly and return to your task. Treat your completed Pomodoro count as a daily metric. Tracking how many focused sessions you complete each day gives you real data about your productive capacity, which is invaluable for project estimating and client billing.</p>

        <h2>Common Pomodoro Mistakes to Avoid</h2>
        <p>Don't use Pomodoros for meetings, calls, or collaborative work — they're for individual deep work. Don't skip breaks thinking you're "in the zone" — the break is what makes the next session productive. Don't start a Pomodoro if you know you'll be interrupted in less than 25 minutes; wait for a clear window. Avoid multitasking during breaks — step away from screens to get the cognitive recovery benefit.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}

        <h2>Related Tools</h2>
        <p>After your focused sessions, use our <a href="/invoice-generator">invoice generator</a> to bill clients for the time you've tracked. And use our <a href="/hourly-rate-calculator">hourly rate calculator</a> to make sure each Pomodoro session is working toward your income goals.</p>
      </article>
    </div>
  )
}
