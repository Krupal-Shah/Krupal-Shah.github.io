import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Projects from './Projects'
import ProjectDetail from './ProjectDetail'

const { mockProject } = vi.hoisted(() => ({
  mockProject: {
    project_id: 'p1',
    title: 'Test Project',
    subtitle: 'A project for testing',
    abstract: 'Short abstract.',
    tech_stack: 'React, Vite',
    main_content: '# Heading\n\nSome **bold** text.',
  },
}))

vi.mock('../services/googleSheets', () => ({
  fetchImages: vi.fn().mockResolvedValue({}),
  fetchProjects: vi.fn().mockResolvedValue([mockProject]),
}))

describe('Project detail navigation', () => {
  it('renders the clicked project markdown content correctly', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/projects']}>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    )

    const cardLink = await screen.findByRole('link', { name: /test project/i })
    await user.click(cardLink)

    expect(await screen.findByRole('heading', { name: 'Test Project' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Heading', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('bold', { selector: 'strong' })).toBeInTheDocument()
  })
})
