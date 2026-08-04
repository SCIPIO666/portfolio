import React, { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import CurveDivider from '../components/CurveDivider'
import CallToActionButton from '../components/CallToActionButton'
import { useSectionReveal } from '../components/ScrollEffects'
import { FaGithub, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Mail, Copy, Check, Send } from 'lucide-react'

const SOCIAL_LINKS = [
  { href: 'https://github.com/SCIPIO666', icon: FaGithub, label: 'GitHub' },
  { href: 'https://x.com/scipio_NEO', icon: FaTwitter, label: 'Twitter' },
  {
    href: 'https://www.linkedin.com/in/esphoney-ondicho-859043331?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    icon: FaLinkedin,
    label: 'LinkedIn',
  },
  { href: 'https://wa.me/254115529179', icon: FaWhatsapp, label: 'WhatsApp' }, 
]

const EMAIL = 'eaphoney@gmail.com'
const PHONE_NUMBER = '254115529179' 

export default function ContactPage() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard permission denied 
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I checked out your portfolio and i would like to connect.")
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen pt-24 md:pt-32 lg:pt-32 px-4 md:px-8 pb-32"
    >
      <PageHeader text="Contact" number="04." />

      <div ref={contentRef} className="max-w-5xl mx-auto mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* left — direct contact, socials, status */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              <span className="text-sm text-muted font-mono">Available for freelance work</span>
            </div>

            <p className="text-lg text-ink/80 leading-relaxed mb-6">
              Have a project in mind, or just want to talk shop? I read every message myself —
              no forms disappearing into a void.
            </p>

            <div className="flex flex-wrap gap-3">
              <CallToActionButton
                text={
                  <span className="flex items-center gap-2">
                    <Mail size={16} /> Email me
                  </span>
                }
                callback={() => (window.location.href = `mailto:${EMAIL}`)}
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted hover:text-primary hover:border-primary transition-colors text-sm"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : EMAIL}
              </button>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-6">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp size={22} />
                <span>WhatsApp Me</span>
              </button>
              <p className="text-xs text-muted-soft mt-2">
                Direct message me on WhatsApp — I usually reply within minutes.
              </p>
            </div>
          </div>

          {/* mobile-only — SocialLinks */}
          <div className="lg:hidden flex items-center gap-5 pt-2 border-t border-border">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted hover:text-primary transition-colors mt-4"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* right — mail form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-muted tracking-wide mb-1 block">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-primary transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-muted tracking-wide mb-1 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-muted tracking-wide mb-1 block">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-ink placeholder:text-muted-soft focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="What are you building?"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 bg-primary text-primary-ink font-semibold rounded-xl px-5 py-3 hover:brightness-110 transition-all"
          >
            <Send size={16} /> Send message
          </button>

          <p className="text-xs text-muted-soft text-center">
            Opens your email client with this filled in — nothing is sent from here directly.
          </p>
        </form>
      </div>

      <CurveDivider variant="diagonal" flip height={300} />
    </section>
  )
}