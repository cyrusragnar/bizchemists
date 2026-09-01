import { useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { CONTACT } from './content.js'

/* Overridable at build time: VITE_CONTACT_ENDPOINT=https://your-php-host/api/contact.php */
const ENDPOINT = import.meta.env?.VITE_CONTACT_ENDPOINT || '/api/contact.php'

const FIELD =
  'w-full rounded-xl border border-white/45 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/55 transition-colors duration-200 focus:border-accent focus:outline-none'

/** Prefilled mail link, used whenever the backend cannot be reached. */
function mailtoFor({ name, email, company, service, message }) {
  const subject = service ? `${service} — enquiry from ${name || 'the website'}` : 'Website enquiry'
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    service ? `Service: ${service}` : null,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm({ service = '', compact = false }) {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '', website: '' })
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    setError('')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          service,
          elapsed: (Date.now() - startedAt.current) / 1000,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'That did not go through.')
      setState('sent')
    } catch (err) {
      // No PHP host (static preview, or the endpoint is down) — offer the mail route.
      setState('error')
      setError(err.message === 'Failed to fetch' ? '' : err.message)
    }
  }

  if (state === 'sent') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-5">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Message sent</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Thanks {values.name.split(' ')[0] || 'for reaching out'} — we read every enquiry and usually reply
            within one working day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className={compact ? 'flex flex-col gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">Name</span>
          <input required value={values.name} onChange={set('name')} className={FIELD} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">Email</span>
          <input
            required
            type="email"
            value={values.email}
            onChange={set('email')}
            className={FIELD}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">
          Brand or company <span className="normal-case tracking-normal text-white/55">(optional)</span>
        </span>
        <input value={values.company} onChange={set('company')} className={FIELD} placeholder="What you're building" />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">
          What do you need?
        </span>
        <textarea
          required
          rows={compact ? 4 : 5}
          value={values.message}
          onChange={set('message')}
          className={`${FIELD} resize-y`}
          placeholder={service ? `Tell us about the ${service.toLowerCase()} work you have in mind.` : 'A sentence or two is plenty to start.'}
        />
      </label>

      {/* honeypot — never shown, never announced */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={set('website')}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      {state === 'error' && (
        <div className="rounded-xl border border-white/45 bg-white/[0.03] p-4">
          <p className="text-sm leading-relaxed text-white/70">
            {error || "We couldn't reach the server from here."} You can send the same details straight to your
            mail app instead — everything you typed is carried across.
          </p>
          <a
            href={mailtoFor({ ...values, service })}
            className="press mt-3 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Send as email
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="press group inline-flex w-fit items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Get my project scoped'}
        {state !== 'sending' && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </button>

      <p className="text-xs leading-relaxed text-white/55">
        No pitch deck, no obligation. We reply within one working day.
      </p>
    </form>
  )
}
