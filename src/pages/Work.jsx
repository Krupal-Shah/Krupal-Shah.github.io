import { Link, useNavigate } from 'react-router-dom'
import { useWork } from '../hooks/useWork'
import { useImages } from '../hooks/useImages'
import { driveImageUrl } from '../utils/images'

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.52-1.45.11-3.03 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.74.11 3.03.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function WorkCard({ project, images }) {
  const navigate = useNavigate()
  const thumb = project.thumbnail_image_id ? images[project.thumbnail_image_id] : null
  const detailPath = `/work/${project.project_id}`

  const preview = project.abstract
    ? project.abstract.slice(0, 200) + (project.abstract.length > 200 ? '…' : '')
    : ''

  const techItems = project.tech_stack
    ? project.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    : []

  return (
    <article
      className="project-card section project-card-row"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingLeft: 26, paddingRight: 26 }}
      onClick={() => navigate(detailPath)}
    >
      {thumb && (
        <div className="project-thumb">
          <img src={driveImageUrl(thumb.drive_file_id)} alt={thumb.alt_text || project.title} />
        </div>
      )}

      <div className="project-card-body">
        <div className="project-card-header">
          <h2 className="project-title" style={{ fontSize: 22, marginBottom: 4 }}>
            {project.title}
          </h2>

          {(project.github_url || project.live_url) && (
            <div className="project-card-links">
              {project.github_url && (
                <a
                  href={project.github_url}
                  className="btn"
                  style={{ fontSize: 13, gap: 6, padding: '8px 10px' }}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  onClick={e => e.stopPropagation()}
                >
                  <GitHubIcon />
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  className="btn"
                  style={{ fontSize: 13, gap: 6, padding: '8px 10px' }}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Demo"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalIcon />
                </a>
              )}
            </div>
          )}
        </div>

        {project.subtitle && (
          <p className="project-meta">{project.subtitle}</p>
        )}

        {preview && (
          <p className="project-desc">{preview}</p>
        )}

        {techItems.length > 0 && (
          <div className="actions">
            {techItems.map(t => (
              <span key={t} className="pill" style={{ fontSize: 12, padding: '4px 10px' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <p style={{ color: 'rgba(255,255,255,0.45)' }}>Loading work…</p>
    </div>
  )
}

function ErrorState({ error }) {
  return (
    <div className="section card">
      <p style={{ color: '#fca5a5', margin: 0 }}>Failed to load work: {error}</p>
      <p className="section-text" style={{ marginTop: 8 }}>
        Check that <code>VITE_SHEETS_URL</code> is set in your <code>.env</code> file.
      </p>
    </div>
  )
}

export default function Work() {
  const { work, loading, error } = useWork()
  const { images } = useImages()

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <div>
      <section className="card section" aria-label="Work">
        <h1 className="h1" style={{ marginBottom: 4 }}>Work</h1>
        <p className="section-text">A selection of things I've worked on.</p>
      </section>

      {work.length === 0 ? (
        <section className="card section">
          <p className="section-text">No work yet — check back soon.</p>
        </section>
      ) : (
        work.map(p => <WorkCard key={p.project_id} project={p} images={images} />)
      )}
    </div>
  )
}
