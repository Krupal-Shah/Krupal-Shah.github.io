import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

const driveImageUrl = (id) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

const driveVideoUrl = (id) =>
  `https://drive.google.com/file/d/${id}/preview`

// Replace [image_id] tokens — the negative lookahead (?!\() avoids
// breaking standard markdown links like [text](url).
function processPlaceholders(content, images) {
  return content.replace(/\[([a-zA-Z0-9_-]+)\](?!\()/g, (match, imageId) => {
    const img = images[imageId]
    if (!img) return match

    if (img.type === 'video') {
      const src = driveVideoUrl(img.drive_file_id)
      return `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`
    }

    const alt = img.alt_text || imageId
    return `![${alt}](${driveImageUrl(img.drive_file_id)})`
  })
}

export default function MarkdownRenderer({ content, images = {} }) {
  const processed = useMemo(
    () => (content ? processPlaceholders(content, images) : ''),
    [content, images]
  )

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
      >
        {processed}
      </ReactMarkdown>
    </div>
  )
}
