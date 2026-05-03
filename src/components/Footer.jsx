function LinkedInIcon() {
  return (
    <svg viewBox="-6 -2 31 31" aria-hidden="true" focusable="false" className="icon-svg">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.11v9.74h-4v-8.64c0-2.06-.04-4.7-2.86-4.7-2.86 0-3.3 2.23-3.3 4.55v8.79h-4V7.5Z" />
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

export default function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{
        borderColor: 'rgba(255,255,255,0.10)',
        background: 'rgba(0,0,0,0.18)',
      }}
    >
      <div
        className="flex justify-between items-center gap-4 py-[18px] px-6 mx-auto"
        style={{ maxWidth: '1100px' }}
      >
        <div>
          <p className="m-0 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Get in touch
          </p>
          <a
            href="mailto:krupalshah74@gmail.com"
            className="inline-block mt-1 text-[13px] hover:text-white transition-colors"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            krupalshah74@gmail.com
          </a>
        </div>

        <p className="m-0 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          © 2026 by Krupal Shah
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Follow me
          </span>
          <a
            href="https://www.linkedin.com/in/krupalshah74"
            className="icon-link"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/Krupal-Shah"
            className="icon-link"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
