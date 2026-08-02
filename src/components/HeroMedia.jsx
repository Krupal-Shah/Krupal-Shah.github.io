import { driveImageUrl, resolveVideoSource } from '../utils/images'

export default function HeroMedia({ media, alt }) {
  if (!media) return null

  if (media.type === 'video') {
    const { kind, src } = resolveVideoSource(media.drive_file_id)

    return (
      <div className="project-hero">
        {kind === 'direct' ? (
          <video src={src} autoPlay loop playsInline />
        ) : (
          // Drive/YouTube iframes: no reliable cross-origin mute/loop control
          // for Drive, YouTube honors the autoplay/mute/loop URL params.
          <iframe src={src} allow="autoplay" allowFullScreen frameBorder="0" />
        )}
      </div>
    )
  }

  return (
    <div className="project-hero">
      <img src={driveImageUrl(media.drive_file_id, 'w1600')} alt={alt} />
    </div>
  )
}
