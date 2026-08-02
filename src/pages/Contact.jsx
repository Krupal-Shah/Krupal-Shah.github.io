import { useRef, useState } from 'react'
import emailjs, { init } from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

if (EMAILJS_PUBLIC_KEY) {
  init(EMAILJS_PUBLIC_KEY)
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="icon-svg">
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.24l9 5.4 9-5.4V7l-9 5.4L3 7Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="icon-svg">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.52-1.45.11-3.03 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="-6 -2 31 31" aria-hidden="true" focusable="false" className="icon-svg">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.11v9.74h-4v-8.64c0-2.06-.04-4.7-2.86-4.7-2.86 0-3.3 2.23-3.3 4.55v8.79h-4V7.5Z" />
    </svg>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('Email service is not configured.')
      return
    }
    setSending(true)
    setStatus('')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      )
      setStatus("Message sent! I'll get back to you soon.")
      formRef.current.reset()
    } catch {
      setStatus('Failed to send. Please email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex items-start md:items-center justify-center md:min-h-[calc(100vh-120px)]">
      <section
        className="card section contact-shell"
        aria-label="Contact"
      >
        {/* Left */}
        <div>
          <h1 className="h1" style={{ marginBottom: 10 }}>Contact</h1>
          <p className="section-text contact-copy">
            Feel free to get in touch with me. I am always open to discussing new
            projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="contact-links">
            <a className="icon-link" href="mailto:krupalshah74@gmail.com" aria-label="Email">
              <EmailIcon />
              <span>krupalshah74@gmail.com</span>
            </a>
            <a
              className="icon-link"
              href="https://github.com/Krupal-Shah"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              <span>github.com/Krupal-Shah</span>
            </a>
            <a
              className="icon-link"
              href="https://www.linkedin.com/in/krupalshah74"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
              <span>linkedin.com/in/krupalshah74</span>
            </a>
          </div>
        </div>

        {/* Right */}
        <div>
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={6} required />

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>

            {status && (
              <p
                aria-live="polite"
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: status.startsWith('Failed') ? '#fca5a5' : 'rgba(129,230,217,0.9)',
                }}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
