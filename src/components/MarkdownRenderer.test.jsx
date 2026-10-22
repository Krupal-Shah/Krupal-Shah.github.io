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

  it('renders inline and display math with the shared patched KaTeX version', () => {
    const { container } = render(
      <MarkdownRenderer content={'Inline $x^2$\n\n$$\n\\frac{1}{2}\n$$'} />
    )

    expect(container.querySelectorAll('.katex')).toHaveLength(2)
    expect(container.querySelector('.katex-display .katex')).toBeInTheDocument()
    expect(container.querySelectorAll('math')).toHaveLength(2)
    expect(container.querySelector('.katex-error')).not.toBeInTheDocument()
  })

  it('keeps untrusted math commands from creating links', () => {
    render(<MarkdownRenderer content={'$\\href{https://example.com}{click}$'} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
