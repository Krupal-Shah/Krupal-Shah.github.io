import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MarkdownRenderer from './MarkdownRenderer'

describe('MarkdownRenderer', () => {
  it('renders headings and bold text even when the source uses literal \\n instead of real newlines', () => {
    const content = '## Heading\\n\\nSome **bold** text.'

    render(<MarkdownRenderer content={content} />)

    expect(screen.getByRole('heading', { name: 'Heading', level: 2 })).toBeInTheDocument()
    expect(screen.getByText('bold', { selector: 'strong' })).toBeInTheDocument()
  })
})
