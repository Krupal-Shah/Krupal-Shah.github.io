import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useImages } from '../hooks/useImages'
import MarkdownRenderer from '../components/MarkdownRenderer'

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <p style={{ color: 'rgba(255,255,255,0.45)' }}>Loading…</p>
    </div>
  )
}

function NotFound() {
  return (
    <section className="card section">
      <h1 className="h1">Project not found</h1>
      <Link to="/projects" className="btn" style={{ marginTop: 16, display: 'inline-flex' }}>
        ← Back to Projects
      </Link>
    </section>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { projects, loading: pLoading } = useProjects()
  const { images, loading: iLoading } = useImages()

  if (pLoading || iLoading) return <LoadingState />

  const project = projects.find(p => p.project_id === id)
  if (!project) return <NotFound />

  const techItems = project.tech_stack
    ? project.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    : []

  return (
    <article>
      <div style={{ marginBottom: 24 }}>
        <Link to="/projects" className="btn" style={{ display: 'inline-flex' }}>
          ← Back to Projects
        </Link>
      </div>

      <section className="card section" aria-label={project.title}>
        <h1 className="h1" style={{ marginBottom: 6 }}>{project.title}</h1>

        {project.subtitle && (
          <p className="project-meta" style={{ fontSize: 15, marginBottom: 10 }}>
            {project.subtitle}
          </p>
        )}

        {project.abstract && (
          <p className="section-text" style={{ marginBottom: 20 }}>{project.abstract}</p>
        )}

        {techItems.length > 0 && (
          <div className="actions" style={{ marginBottom: 20 }}>
            {techItems.map(t => (
              <span key={t} className="pill" style={{ fontSize: 12, padding: '4px 10px' }}>{t}</span>
            ))}
          </div>
        )}

        <div className="actions" style={{ marginBottom: 28 }}>
          {project.github_url && (
            <a href={project.github_url} className="btn" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} className="btn" target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>

        {project.main_content && (
          <MarkdownRenderer content={project.main_content} images={images} />
        )}
      </section>
    </article>
  )
}
