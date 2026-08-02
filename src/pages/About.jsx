export default function About() {
  return (
    <>
      {/* Bio */}
      <section className="card section" aria-label="About Me">
        <h1 className="h1" style={{ marginBottom: 10 }}>About Me</h1>
        <p className="section-text" style={{ marginBottom: 14 }}>
          I'm a Computer Science student at the University of Alberta with a strong
          interest in applied machine learning, computer vision, and intelligent
          systems. I'm especially drawn to computer vision — turning raw sensor data
          into something a system can actually reason about — and I like the
          challenge of taking an idea from a whiteboard to something running reliably
          on real hardware.
        </p>
        <p className="section-text" style={{ marginBottom: 14 }}>
          I've got real-world, hands-on experience building end-to-end systems: from
          data collection and model training through to deployment on physical
          devices. I've worked across full pipelines involving computer vision,
          LiDAR, and multi-sensor data — architecting the infrastructure, training and
          adapting the models, and getting everything running under real constraints
          in the field, not just in a notebook.
        </p>
        <p className="section-text">
          Beyond my technical experience, I'm someone who learns quickly, adapts to
          new challenges, and enjoys working in fast-paced, collaborative
          environments. I take ownership of my work, stay persistent when solving
          difficult problems, and genuinely enjoy building things that have real
          impact.
        </p>
      </section>

      {/* Education */}
      <section className="card section" aria-label="Education">
        <h2 className="section-title">Education</h2>
        <p className="section-text" style={{ marginBottom: 6 }}>
          <strong>Bachelor of Science (Honors) Computing Science — Artificial Intelligence</strong>
        </p>
        <p className="section-text">University of Alberta | 2022 – 2027 (Expected)</p>
      </section>

      {/* Work Experience */}
      <section className="card section" aria-label="Work Experience">
        <h2 className="section-title">Work Experience</h2>

        <article className="experience-item">
          <p className="content__date">May – Aug 2026</p>
          <h3 className="content__title">Machine Learning Engineer Intern</h3>
          <p className="content__subtitle">Retailogists</p>
          <p className="content__description">
            Interned on Avia, Retailogists' edge-based retail analytics platform,
            working on Avia v2, a plug-and-play in-store device that pairs POS data
            with in-store traffic and demographic insights. I worked end to end on
            the device's core computer vision pipeline — from architecture to
            deployment. On the infrastructure side, I helped design and containerize
            the pipeline with Docker and build out cloud-connected workflows on GCP.
            On the modeling side, I worked on adapting and fine-tuning vision models
            for the in-store setting. On deployment, I adapted the software to run
            within the real limits of the edge hardware, tight compute, memory, and
            privacy constraints, and validated it through stress testing and ongoing
            monitoring so it held up under real-world conditions, not just in
            development.
          </p>
        </article>

        <article className="experience-item">
          <p className="content__date">Jan – Apr 2026</p>
          <h3 className="content__title">
            Teaching Assistant — CMPUT 261 (Introduction to Artificial Intelligence)
          </h3>
          <p className="content__subtitle">University of Alberta</p>
          <p className="content__description">
            Helped students in core AI topics including search algorithms, knowledge
            representation, uncertainty, and machine learning. Conducted lab sessions,
            guided students through problem-solving techniques, and clarified key
            concepts. Contributed to course delivery by designing assignments and
            assessments, grading coursework, and providing detailed feedback to
            support student learning.
          </p>
        </article>

        <article className="experience-item">
          <p className="content__date">Sep – Dec 2025</p>
          <h3 className="content__title">
            Teaching Assistant — CMPUT 272 (Formal Systems and Logic)
          </h3>
          <p className="content__subtitle">University of Alberta</p>
          <p className="content__description">
            Supported student learning in foundational topics such as set theory,
            logic, and proofs. Led lab sessions, clarified complex concepts, and
            assisted students in reasoning about algorithms and program correctness.
            Evaluated quizzes and exams, invigilated assessments, and provided
            constructive feedback to enhance student understanding.
          </p>
        </article>

        <article className="experience-item">
          <p className="content__date">Sep. 2024 – Sep. 2025</p>
          <h3 className="content__title">Research Assistant</h3>
          <p className="content__subtitle">
            Department of Civil and Environmental Engineering — University of Alberta
          </p>
          <p className="content__description">
            During my time as a Software &amp; Machine Learning Research Assistant, I
            worked on building end-to-end ML and vision pipelines for complex
            multi-sensor systems. I designed Python-based workflows to process
            large-scale data and integrated LiDAR, IMU, and camera streams into a
            unified application for real-time capture and analysis.
          </p>
          <p className="content__description">
            I also developed and optimized high-performance simulation pipelines,
            scaling them to thousands of runs and significantly improving efficiency.
            Along the way, I validated model outputs against real-world data and
            debugged system and model-level issues in Linux environments, which taught
            me how to work with real, imperfect systems. Finally, I contributed to 2
            research publications by writing technical documentation and collaborating
            with the team to communicate our findings effectively.
          </p>
        </article>
      </section>

      {/* Extra-curriculars */}
      <section className="card section" aria-label="Extra-curriculars">
        <h2 className="section-title">Extra-curriculars</h2>

        <article className="experience-item">
          <p className="content__date">Sep. 2025 – Present</p>
          <h3 className="content__title">F1 — Software</h3>
          <p className="content__subtitle">University of Alberta Formula 1 Team</p>
          <p className="content__description">
            As part of the Formula 1 team, I worked on developing a real-time
            autonomous driving system by integrating perception, planning, and
            control. I incorporated a custom-trained YOLOv7 model into a C++/ROS2
            pipeline, synchronizing camera and LiDAR data for low-latency object
            detection. I also implemented point cloud processing techniques such as
            downsampling, noise filtering, and clustering to reliably interpret the
            environment under real-world conditions. On the planning side, I developed
            a motion module using friction-based velocity constraints to generate safe
            and feasible trajectories. All components were built within a modular ROS2
            architecture, containerized with Docker, and developed collaboratively
            using Git.
          </p>
        </article>

        <article className="experience-item">
          <p className="content__date">Sep. 2023 – Sep. 2025</p>
          <h3 className="content__title">Deputy Team Lead — Software</h3>
          <p className="content__subtitle">
            UASTARR — University of Alberta's Student Team for Alberta Rocketry Research
          </p>
          <p className="content__description">
            I developed a ground station application using Qt and C++, applying
            object-oriented design principles to track rocket flights and manage
            telemetry data end to end. The system supports real-time data collection,
            parsing, storage, and live camera streaming for in-flight monitoring. I
            followed industry-standard SDLC and Agile practices, including version
            control, unit testing, and milestone-driven development, while also
            contributing to team leadership through collaborative technical
            discussions and decision-making.
          </p>
        </article>
      </section>

      {/* Skills */}
      <section className="card section" aria-label="Skills">
        <h2 className="section-title">Skills</h2>

        <p className="section-text" style={{ marginBottom: 8 }}><strong>Languages</strong></p>
        <div className="actions" style={{ marginBottom: 20 }}>
          {['C++', 'Python', 'JavaScript', 'Java', 'SQL', 'Bash', 'RISC-V', 'ROS2'].map(s => (
            <span key={s} className="pill">{s}</span>
          ))}
        </div>

        <p className="section-text" style={{ marginBottom: 8 }}><strong>Libraries / Frameworks</strong></p>
        <div className="actions" style={{ marginBottom: 20 }}>
          {['NumPy', 'Pandas', 'TensorFlow', 'PyTorch', 'Flask', 'Django', 'Qt6', 'PyQt'].map(s => (
            <span key={s} className="pill">{s}</span>
          ))}
        </div>

        <p className="section-text" style={{ marginBottom: 8 }}><strong>Tech</strong></p>
        <div className="actions">
          {['AutoCAD Fusion', 'VS Code', 'Docker', 'Linux', 'MySQL', 'MongoDB', 'Figma', 'Git', 'Android Studio', 'Firebase'].map(s => (
            <span key={s} className="pill">{s}</span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="card section" aria-label="Certifications">
        <h2 className="section-title">Certifications</h2>

        <p className="section-text">
          <strong>Deep Learning Specialization</strong> — Coursera, DeepLearning.AI (Apr. 2024 – Jun. 2024).
          Completed a 5-course specialization in deep learning covering neural networks,
          convolutional neural networks, hyperparameter tuning, regularization, optimization,
          ML project structuring, and sequence models.
        </p>
        <p className="section-text" style={{ marginTop: 10 }}>
          Credential:{' '}
          <a
            href="https://coursera.org/share/66195f70f6992eb0db21209d6f4ee8aa"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(99,179,237,0.95)', textDecoration: 'underline' }}
          >
            coursera.org/share/66195f70f6992eb0db21209d6f4ee8aa
          </a>
        </p>

        <br />

        <p className="section-text">
          <strong>Advanced Learning Algorithms</strong> — Coursera, Stanford Online, DeepLearning.AI (May 2024).
          Built and trained neural networks with TensorFlow for multi-class classification and
          applied machine learning best practices to improve real-world model generalization.
        </p>
        <p className="section-text" style={{ marginTop: 10 }}>
          Credential:{' '}
          <a
            href="https://www.coursera.org/account/accomplishments/verify/JQUBKE46PMBJ?utm_product=course"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(99,179,237,0.95)', textDecoration: 'underline' }}
          >
            coursera.org/account/accomplishments/verify/JQUBKE46PMBJ
          </a>
        </p>
      </section>
    </>
  )
}
