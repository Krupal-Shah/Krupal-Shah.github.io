import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'

vi.mock('../services/googleSheets', () => ({
  fetchImages: vi.fn().mockResolvedValue({}),
  fetchProjects: vi.fn().mockResolvedValue([]),
}))

describe('Home page', () => {
  it('shows the intro content and a link to the about page', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(await screen.findByText('Welcome to my Portfolio')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /more about me/i })).toHaveAttribute(
      'href',
      '/about'
    )
  })
})
