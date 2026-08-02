// lh3.googleusercontent.com directly — drive.google.com/thumbnail?id= is where
// that URL ultimately redirects, but the redirect URL itself matches common
// ad/privacy-blocker filter lists and gets silently dropped in some browsers.
export const driveImageUrl = (id, size = 'w1200') =>
  `https://lh3.googleusercontent.com/d/${id}=${size}`

function youtubeId(url) {
  const short = url.match(/youtu\.be\/([\w-]+)/)
  if (short) return short[1]
  const long = url.match(/[?&]v=([\w-]+)/)
  if (long) return long[1]
  const embed = url.match(/youtube\.com\/embed\/([\w-]+)/)
  if (embed) return embed[1]
  return null
}

// Video rows' drive_file_id column accepts three shapes:
//  - a bare Drive file id            -> Drive's /preview iframe player
//  - a full GitHub attachment/CDN URL -> real video/mp4, plays in a <video> tag
//  - a YouTube watch/share/embed URL  -> YouTube's embed iframe, loop-capable
export function resolveVideoSource(value) {
  if (/youtu\.be|youtube\.com/.test(value)) {
    const id = youtubeId(value)
    return {
      kind: 'youtube',
      src: `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&playsinline=1&controls=0`,
    }
  }

  if (/^https?:\/\//.test(value)) {
    return { kind: 'direct', src: value }
  }

  // Bare Drive file id
  return { kind: 'drive', src: `https://drive.google.com/file/d/${value}/preview?autoplay=1` }
}
