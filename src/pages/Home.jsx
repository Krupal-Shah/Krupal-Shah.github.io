import { Link } from 'react-router-dom'
import { useImages } from '../hooks/useImages'

const DRIVE_IMAGE_URL = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

export default function Home() {
  const { images } = useImages()
  const profileImg = images['1']
  const profileSrc = profileImg ? DRIVE_IMAGE_URL(profileImg.drive_file_id) : null

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <section
        className="card hero w-full"
        style={{ maxWidth: '980px' }}
        aria-label="Intro"
      >
        <div className="hero-media">
          {profileSrc && <img src={profileSrc} alt="Krupal Shah" />}
        </div>

        <div>
          <p className="kicker">Welcome to my Portfolio</p>
          <h1 className="h1">Machine Learning.</h1>
          <h1 className="h1">Robotics. AI.</h1>
          <p className="lead">
            I'm a software engineering student focused on building real-world AI and
            robotics systems. I have a passion for creating innovative solutions that
            leverage the power of machine learning and artificial intelligence to
            solve real-world problems.
          </p>
          <Link className="btn" to="/about">More about me</Link>
        </div>
      </section>
    </div>
  )
}
