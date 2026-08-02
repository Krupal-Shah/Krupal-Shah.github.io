import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import About from './About'
import Projects from './Projects'

vi.mock('../services/googleSheets', () => ({
  fetchImages: vi.fn().mockResolvedValue({}),
  fetchProjects: vi.fn().mockResolvedValue([]),
}))

describe('About page', () => {
  it('shows the bio and education sections', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
  })
})

describe('Projects page', () => {
  it('loads and shows the projects list heading', async () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })
})
