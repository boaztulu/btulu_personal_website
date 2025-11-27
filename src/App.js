import React, { useState, useRef } from "react";
import "./App.css";
import Lottie from "lottie-react";
import droneAnimation from "./Drone.json"; // put Drone.json in src/

// Simple multi-drone field that reacts to mouse movement
function DroneField() {
  const [drones, setDrones] = useState([
    { id: 1, x: 20, y: 30 },
    { id: 2, x: 60, y: 20 },
    { id: 3, x: 40, y: 60 },
    { id: 4, x: 80, y: 50 },
  ]);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;

    setDrones((prev) =>
      prev.map((d) => {
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const pushRadius = 20;

        let nx = d.x;
        let ny = d.y;

        if (dist < pushRadius) {
          // move away from the mouse
          const factor = ((pushRadius - dist) / pushRadius) * 0.6;
          nx = d.x - dx * factor;
          ny = d.y - dy * factor;
        } else {
          // gently drift toward the mouse
          const factor = 0.03;
          nx = d.x + dx * factor;
          ny = d.y + dy * factor;
        }

        // clamp so they don't cover text too much
        nx = Math.min(95, Math.max(5, nx));
        ny = Math.min(90, Math.max(10, ny));

        return { ...d, x: nx, y: ny };
      })
    );
  };

  return (
    <div
      className="bt-drone-field"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {drones.map((d) => (
        <div
          key={d.id}
          className="bt-drone-sprite"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
        >
          <Lottie animationData={droneAnimation} loop={true} />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [cvOpen, setCvOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [connectTab, setConnectTab] = useState("linkedin");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="App">
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="bt-header">
        <div className="bt-header-inner">
          <div className="bt-logo" onClick={() => scrollToSection("hero")}>
            <div className="bt-logo-mark">BT</div>
            <div className="bt-logo-text">
              <span className="bt-name">Boaz Tulu</span>
              <span className="bt-tagline-1">
                PhD Candidate · University of Florida · ABE
              </span>
              <span className="bt-tagline-2">
                Generative AI · Remote sensing · Precision agriculture
              </span>
            </div>
          </div>

          <nav className="bt-nav">
            {[
              ["hero", "Home"],
              ["publications", "Publications"],
              ["research", "Research"],
              ["projects", "Tools & Software"],
              ["awards", "Awards"],
              ["certificates", "Certificates"],
              ["teaching", "Teaching"],
              ["cv", "CV"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="bt-nav-link"
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== MAIN ONE-PAGE LAYOUT ===== */}
      <main className="bt-main">
        {/* HERO SECTION */}
        <section id="hero" className="bt-section bt-hero">
          <div className="bt-hero-left">
            <p className="bt-eyebrow">AI · Remote Sensing · Water & Crops</p>
            <h1 className="bt-hero-title">
              I build AI and drone-based sensing tools{" "}
              <span className="bt-gradient-text">for smarter agriculture.</span>
            </h1>
            <p className="bt-hero-subtitle">
              I combine UAV and satellite remote sensing, computer vision, and
              generative AI to turn field data into decisions for irrigation,
              crop health, and resource management in real-world farming
              systems.
            </p>

            <div className="bt-hero-actions">
              <button
                className="bt-btn bt-btn-primary"
                onClick={() => scrollToSection("publications")}
              >
                View publications
              </button>
              <button
                className="bt-btn bt-btn-ghost bt-btn-cv"
                onClick={() => setCvOpen(true)}
              >
                <span className="bt-cv-emoji">📘</span>
                Take a look at my CV
              </button>
            </div>

            <div className="bt-hero-micro">
              <div className="bt-micro-pill">
                <span className="bt-dot bt-dot-green" />
                Precision irrigation
              </div>
              <div className="bt-micro-pill">
                <span className="bt-dot bt-dot-orange" />
                UAV & thermal mapping
              </div>
              <div className="bt-micro-pill">
                <span className="bt-dot bt-dot-blue" />
                Generative AI for remote sensing
              </div>
            </div>

            {/* Social icons (front) */}
            <div className="bt-socials">
              <a
                href="https://www.linkedin.com/in/boaz-berhanu-tulu-9405771a5"
                target="_blank"
                rel="noreferrer"
                className="bt-social-link bt-social-linkedin"
              >
                in
              </a>
              <a
                href="https://www.facebook.com/boaz.tulu/"
                target="_blank"
                rel="noreferrer"
                className="bt-social-link bt-social-facebook"
              >
                f
              </a>
              <a
                href="https://x.com/boazberhanu"
                target="_blank"
                rel="noreferrer"
                className="bt-social-link bt-social-twitter"
              >
                x
              </a>
            </div>
          </div>

          {/* ORBIT: portrait + themes + logos (no mouse effect, free floating) */}
          <div className="bt-hero-right">
            <div className="bt-orbit">
              {/* central portrait */}
              <div className="bt-orbit-core">
                <img
                  src="/images/boaz-portrait.jpg"
                  alt="Boaz Berhanu Tulu"
                  className="bt-portrait"
                />
              </div>

              {/* rotating rings */}
              <div className="bt-orbit-ring bt-orbit-ring-1" />
              <div className="bt-orbit-ring bt-orbit-ring-2" />

              {/* thematic badges */}
              <div className="bt-orbit-badge-theme bt-orbit-theme-1">
                <span>🧠</span>
                <small>Deep learning</small>
              </div>
              <div className="bt-orbit-badge-theme bt-orbit-theme-2">
                <span>📊</span>
                <small>Decision support</small>
              </div>
              <div className="bt-orbit-badge-theme bt-orbit-theme-3">
                <span>🚀</span>
                <small>Entrepreneurship</small>
              </div>

              {/* orbiting affiliation badges (bigger icons) */}
              <div className="bt-orbit-badge bt-orbit-badge-uf">
                <img
                  src="/images/logos/uf-logo.png"
                  alt="University of Florida"
                />
              </div>
              <div className="bt-orbit-badge bt-orbit-badge-purdue">
                <img
                  src="/images/logos/purdue-logo.png"
                  alt="Purdue University"
                />
              </div>
              <div className="bt-orbit-badge bt-orbit-badge-mwf">
                <img
                  src="/images/logos/mwf-logo.png"
                  alt="Mandela Washington Fellowship"
                />
              </div>

              <div className="bt-orbit-caption">
                UAV flights → generative AI → plot metrics → irrigation and crop
                decisions.
              </div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH COLLAB STRIP (no plane, bolder text) */}
        <section className="bt-collab-strip-wrapper">
          <div className="bt-collab-strip">
            <p>
              <strong>I&apos;m open to</strong>{" "}
              <span>
                collaborations, postdoctoral positions, and R&amp;D roles
              </span>{" "}
              <strong>
                at the intersection of AI, remote sensing, and agriculture.
              </strong>
            </p>
            <button
              className="bt-btn bt-btn-ghost bt-collab-btn"
              onClick={() => setConnectOpen(true)}
            >
              Let&apos;s connect
            </button>
          </div>
        </section>

        {/* DRONE FIELD (ABOVE PUBLICATIONS/RESEARCH) */}
        <DroneField />

        {/* PUBLICATIONS – GOOGLE SCHOLAR STYLE (NOW ABOVE RESEARCH) */}
        <section id="publications" className="bt-section">
          <h2>Selected publications</h2>
          <p className="bt-section-intro">
            A few representative works. Citation counts and details follow a
            Google Scholar–style layout and may change over time.
          </p>

          <div className="bt-pubs-grid">
            {/* AgriSenAI */}
            <article className="bt-pub-card">
              <div className="bt-pub-thumb">
                <img
                  src="/images/pubs/agrisenai-fig.png"
                  alt="AgriSenAI figure"
                />
              </div>
              <div className="bt-pub-body">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S2352711025000500"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-pub-title"
                >
                  AgriSenAI: Automating UAV thermal and multispectral image
                  processing for precision agriculture
                </a>
                <div className="bt-pub-meta">
                  Tulu, B.B.; Teshome, F.T.; Ampatzidis, Y.; Hailegnaw, N.S.;
                  Bayabil, H.K. · SoftwareX 30, 102083 · 2025
                </div>
                <div className="bt-pub-cites">
                  Cited by 4 · Precision agriculture · UAV thermal & MSI
                </div>
                <p className="bt-pub-summary">
                  Python-based desktop application that automates stitching,
                  calibration, plot extraction, and plot-level metrics from
                  three years of UAV imagery over green beans and sweet corn.
                </p>
              </div>
            </article>

            {/* LAI paper */}
            <article className="bt-pub-card">
              <div className="bt-pub-thumb">
                <img src="/images/pubs/lai-fig.png" alt="LAI paper figure" />
              </div>
              <div className="bt-pub-body">
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S116103012500053X"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-pub-title"
                >
                  Leaf area index (LAI) prediction using machine learning and UAV
                  based vegetation indices
                </a>
                <div className="bt-pub-meta">
                  Hussain, S.; Teshome, F.T.; Tulu, B.B.; Awoke, G.W.;
                  Hailegnaw, N.S.; Bayabil, H.K. · European Journal of Agronomy
                  168, 127557 · 2025
                </div>
                <div className="bt-pub-cites">
                  Cited by 10 · LAI modeling · Ensemble ML
                </div>
                <p className="bt-pub-summary">
                  Ensemble ML framework to estimate LAI from UAV multispectral
                  imagery under different irrigation and nutrient regimes,
                  achieving high accuracy and sensitivity to water and
                  fertilizer stress.
                </p>
              </div>
            </article>

            {/* IET Image Processing paper */}
            <article className="bt-pub-card">
              <div className="bt-pub-thumb">
                <img
                  src="/images/pubs/iet.jpg"
                  alt="AI-powered human activity detection paper figure"
                />
              </div>
              <div className="bt-pub-body">
                <a
                  href="https://ietresearch.onlinelibrary.wiley.com/doi/full/10.1049/ipr2.70227"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-pub-title"
                >
                  AI-powered human activity detection and tracking in dense
                  crowds using YOLOv8–DeepSORT
                </a>
                <div className="bt-pub-meta">
                  Adege, A.B.; Admas, M.F.; Tehone, Y.; Tulu, B.B.; Endalamaw,
                  E.T. · IET Image Processing 19(1) · 2025
                </div>
                <div className="bt-pub-cites bt-pub-cites-muted">
                  Citations not yet indexed · Crowd analysis
                </div>
                <p className="bt-pub-summary">
                  Applies YOLOv8 and DeepSORT for robust detection and tracking
                  of people in dense crowd scenes, with applications to safety,
                  surveillance, and public-space analytics.
                </p>
              </div>
            </article>
          </div>

          <div className="bt-section-cta">
            <a
              href="https://scholar.google.com/citations?user=Bg0jkpgAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
              className="bt-text-link"
            >
              View full Google Scholar profile →
            </a>
          </div>
        </section>

        {/* RESEARCH SECTION – PIPELINE STYLE */}
        <section id="research" className="bt-section">
          <h2>Research</h2>
          <p className="bt-section-intro">
            My work follows a full pipeline from field sensing to actionable
            decisions, grounded in long-term experiments and collaborations
            across Ethiopia and the United States.
          </p>

          <div className="bt-research-pipeline">
            <div className="bt-research-step">
              <div className="bt-research-icon">🚁</div>
              <h3>Field sensing</h3>
              <p>
                UAV thermal, RGB, and multispectral flights over irrigated
                plots, combined with soil and plant measurements.
              </p>
              <span className="bt-research-tag">
                Green beans · Sweet corn · Coffee
              </span>
            </div>

            <div className="bt-research-step">
              <div className="bt-research-icon">🖥️</div>
              <h3>Processing & modeling</h3>
              <p>
                Stitching, calibration, plot extraction, and machine learning
                models for LAI, stress, and disease detection.
              </p>
              <span className="bt-research-tag">
                AgriSenAI · ML & ensemble models
              </span>
            </div>

            <div className="bt-research-step">
              <div className="bt-research-icon">🌡️</div>
              <h3>Generative & embedded AI</h3>
              <p>
                RGB→thermal prediction, image enhancement, and TinyML for field
                and device-level deployment.
              </p>
              <span className="bt-research-tag">
                GANs · Diffusion · TinyML
              </span>
            </div>

            <div className="bt-research-step">
              <div className="bt-research-icon">📈</div>
              <h3>Decision tools</h3>
              <p>
                Irrigation scheduling, crop recommendations, and mobile tools
                that close the loop with farmers and researchers.
              </p>
              <span className="bt-research-tag">
                DSS · Extension · Farmer-facing apps
              </span>
            </div>
          </div>
        </section>

        {/* TOOLS & SOFTWARE – REDESIGNED GRID */}
        <section id="projects" className="bt-section">
          <h2>Tools & software</h2>
          <p className="bt-section-intro">
            From desktop platforms to mobile apps and hardware, I build tools
            that make research usable on the ground.
          </p>

          <div className="bt-tools-grid">
            <div className="bt-tool-card bt-tool-card-main">
              <div className="bt-tool-header">
                <div className="bt-tool-icon">🛰️</div>
                <div>
                  <h3>AgriSenAI</h3>
                  <p className="bt-tool-subtitle">
                    Desktop platform · SoftwareX 2025
                  </p>
                </div>
              </div>
              <p>
                Python-based UAV image processing platform that automates
                stitching, thermal calibration, plot segmentation, and metric
                extraction from multi-year irrigation experiments.
              </p>
              <a
                href="https://www.sciencedirect.com/science/article/pii/S2352711025000500"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                AgriSenAI paper →
              </a>
            </div>

            <div className="bt-tool-card">
              <div className="bt-tool-header">
                <div className="bt-tool-icon">📱</div>
                <div>
                  <h3>Debo Buna coffee disease app</h3>
                  <p className="bt-tool-subtitle">Android app</p>
                </div>
              </div>
              <p>
                Smartphone app that detects coffee leaf diseases and connects
                farmers with early diagnosis and management advice.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.eyosisecond.debobuna"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                View on Google Play →
              </a>
            </div>

            <div className="bt-tool-card">
              <div className="bt-tool-header">
                <div className="bt-tool-icon">🧪</div>
                <div>
                  <h3>Soil tester & crop recommender</h3>
                  <p className="bt-tool-subtitle">Omishtu Joy · Hardware + AI</p>
                </div>
              </div>
              <p>
                Device that measures soil properties and uses AI to match crops
                to farmlands and recommend management options, recognized in a
                World Bank–supported agritech initiative.
              </p>
              <a
                href="https://www.foodbusinessmea.com/world-bank-supported-initiative-awards-african-agritech-startups-driving-innovation-in-agriculture-sector/"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                Read about Omishtu Joy →
              </a>
              <br />
              <a
                href="https://omishtujoy.com/"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                Omishtu Joy website →
              </a>
            </div>

            <div className="bt-tool-card">
              <div className="bt-tool-header">
                <div className="bt-tool-icon">☕</div>
                <div>
                  <h3>Coffee grading device</h3>
                  <p className="bt-tool-subtitle">Hardware system</p>
                </div>
              </div>
              <p>
                Automated grading device for coffee beans, helping producers
                assess quality and access better markets.
              </p>
              <a
                href="https://www.youtube.com/watch?v=WXyMGdWdSwM"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                Coffee grading device demo →
              </a>
            </div>

            <div className="bt-tool-card">
              <div className="bt-tool-header">
                <div className="bt-tool-icon">🤖</div>
                <div>
                  <h3>Gebeta playing robot</h3>
                  <p className="bt-tool-subtitle">Robotics</p>
                </div>
              </div>
              <p>
                Robotic system that plays the traditional Gebeta game, combining
                perception, actuation, and game strategy.
              </p>
              <a
                href="https://www.youtube.com/watch?v=MYR7Yv0NFnY&t=179s"
                target="_blank"
                rel="noreferrer"
                className="bt-text-link"
              >
                Gebeta robot on YouTube →
              </a>
            </div>
          </div>
        </section>

        {/* AWARDS – MOSAIC WITH YEAR & LOCATION */}
        <section id="awards" className="bt-section">
          <h2>Awards & recognition</h2>
          <p className="bt-section-intro">
            Selected recognition for agritech innovation, entrepreneurship, and
            AI-powered solutions in Africa and beyond.
          </p>

          <div className="bt-awards-grid">
            <div className="bt-award-card">
              <img
                src="/images/awards/mandela-fellow.jpg"
                alt="Mandela Washington Fellowship ceremony"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2022 · West Lafayette, USA</div>
                <h3>Mandela Washington Fellow</h3>
                <p className="bt-award-meta">
                  Young African Leaders Initiative · Purdue University
                </p>
                <p>
                  Leadership in Business track focusing on agritech, AI, and
                  entrepreneurship, connecting African and U.S. innovation
                  ecosystems.
                </p>
              </div>
            </div>

            <div className="bt-award-card">
              <img
                src="/images/awards/coffee-innovation.jpg"
                alt="Coffee Innovation Fund award"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2021 · Addis Ababa, Ethiopia</div>
                <h3>Coffee Innovation Fund · US$50k Winner</h3>
                <p className="bt-award-meta">BMZ / GIZ</p>
                <p>
                  Awarded for AI-based coffee disease detection tools that
                  support smallholder farmers through the Debo Buna platform.
                </p>
              </div>
            </div>

            <div className="bt-award-card">
              <img
                src="/images/awards/sankalp-worldbank.jpg"
                alt="Sankalp World Bank award"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2020 · Nairobi, Kenya</div>
                <h3>Sankalp World Bank Innovation Winner</h3>
                <p className="bt-award-meta">
                  Sankalp Africa · World Bank–supported initiative
                </p>
                <p>
                  Recognized for innovative coffee value-chain solutions using
                  digital tools and AI to improve farmer incomes.
                </p>
              </div>
            </div>

            <div className="bt-award-card">
              <img
                src="/images/awards/national-universities.jpg"
                alt="Ethiopian universities innovation award"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2021 · Addis Ababa, Ethiopia</div>
                <h3>Best Innovation from All Ethiopian Universities</h3>
                <p className="bt-award-meta">National innovation award</p>
                <p>
                  Awarded for impactful agritech solutions combining hardware,
                  AI, and farmer-centered design.
                </p>
              </div>
            </div>

            <div className="bt-award-card">
              <img
                src="/images/awards/koica-mint.jpg"
                alt="KOICA MinT award"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2021 · Addis Ababa, Ethiopia</div>
                <h3>KOICA · MinT Innovation Award</h3>
                <p className="bt-award-meta">
                  Korea International Cooperation Agency & Ministry of Innovation
                  and Technology
                </p>
                <p>
                  Honored for technology that supports sustainable agriculture
                  and digital transformation in Ethiopia.
                </p>
              </div>
            </div>

            <div className="bt-award-card">
              <img
                src="/images/awards/green-innovation.jpg"
                alt="Green innovation and MEST awards"
              />
              <div className="bt-award-body">
                <div className="bt-award-year">2019–2022 · Accra & Addis</div>
                <h3>Green Innovation & MEST Africa Awards</h3>
                <p className="bt-award-meta">
                  Multiple programs recognizing Debo Engineering
                </p>
                <p>
                  Community-voted and jury awards for sustainable, AI-driven
                  agritech and coffee sector innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES SECTION (before teaching) */}
        <section id="certificates" className="bt-section">
          <h2>Certificates</h2>
          <p className="bt-section-intro">
            Formal training that complements my research in AI, accelerated
            computing, and innovation.
          </p>

          <div className="bt-certs-grid">
            <div className="bt-cert-card">
              <img
                src="/images/certs/mandela-usdos.jpg"
                alt="US Department of State Mandela Washington Fellowship certificate"
              />
              <div className="bt-cert-body">
                <h3>Mandela Washington Fellowship</h3>
                <p className="bt-cert-meta">
                  U.S. Department of State · July 2022 · West Lafayette, IN, USA
                </p>
                <p>
                  Certificate of Completion for the Mandela Washington
                  Fellowship for Young African Leaders.
                </p>
              </div>
            </div>

            <div className="bt-cert-card">
              <img
                src="/images/certs/purdue-mwf.jpg"
                alt="Purdue University Mandela Washington certificate"
              />
              <div className="bt-cert-body">
                <h3>Leadership in Business Track</h3>
                <p className="bt-cert-meta">
                  Purdue University · Mandela Washington Fellowship · 2022
                </p>
                <p>
                  Completed the Leadership in Business track focused on
                  entrepreneurship and innovation.
                </p>
              </div>
            </div>

            <div className="bt-cert-card">
              <img
                src="/images/certs/nvidia-cuda.jpg"
                alt="NVIDIA CUDA Python certificate"
              />
              <div className="bt-cert-body">
                <h3>Fundamentals of Accelerated Computing with CUDA Python</h3>
                <p className="bt-cert-meta">
                  NVIDIA · University of Florida · USA
                </p>
                <p>
                  Training on GPU-accelerated computing and CUDA Python for
                  high-performance workflows.
                </p>
              </div>
            </div>

            <div className="bt-cert-card">
              <img
                src="/images/certs/nvidia-deeplearning.jpg"
                alt="NVIDIA Deep Learning certificate"
              />
              <div className="bt-cert-body">
                <h3>Fundamentals of Deep Learning</h3>
                <p className="bt-cert-meta">NVIDIA · University of Florida</p>
                <p>
                  Hands-on training in designing and training deep neural
                  networks for vision and related tasks.
                </p>
              </div>
            </div>

            <div className="bt-cert-card">
              <img
                src="/images/certs/nvidia-diffusion.jpg"
                alt="NVIDIA Generative AI diffusion models certificate"
              />
              <div className="bt-cert-body">
                <h3>Generative AI with Diffusion Models</h3>
                <p className="bt-cert-meta">NVIDIA · University of Florida</p>
                <p>
                  Focus on diffusion models and their practical application in
                  image generation and enhancement.
                </p>
              </div>
            </div>

            <div className="bt-cert-card">
              <img
                src="/images/certs/uf-ip-innovators.jpg"
                alt="UF Intellectual Property for Innovators certificate"
              />
              <div className="bt-cert-body">
                <h3>Intellectual Property for Innovators</h3>
                <p className="bt-cert-meta">University of Florida · Gainesville</p>
                <p>
                  Training on patents, licensing, and IP strategies for
                  technology and startup development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TEACHING & SERVICE – CREATIVE TILES */}
        <section id="teaching" className="bt-section">
          <h2>Teaching & service</h2>
          <p className="bt-section-intro">
            I enjoy teaching, mentoring, and building ecosystems around AI and
            agriculture.
          </p>

          <div className="bt-teach-grid">
            <div className="bt-teach-column">
              <h3>Teaching</h3>
              <div className="bt-teach-item">
                <span className="bt-teach-label">Graduate mentoring</span>
                <p>
                  Supervision and mentoring of projects in AI, remote sensing,
                  and data analysis at the University of Florida.
                </p>
              </div>
              <div className="bt-teach-item">
                <span className="bt-teach-label">Lecturer, Jimma University</span>
                <p>
                  Taught programming and engineering courses, helping students
                  transition from MATLAB to Python and applied AI workflows.
                </p>
              </div>
              <div className="bt-teach-item">
                <span className="bt-teach-label">
                  Community trainings & workshops
                </span>
                <p>
                  Led AI and digital skills trainings with Jimma American Corner,
                  local universities, and community groups.
                </p>
              </div>
            </div>

            <div className="bt-teach-column">
              <h3>Leadership & outreach</h3>
              <div className="bt-teach-item">
                <span className="bt-teach-label">
                  Co-founder & CTO · Debo Engineering
                </span>
                <p>
                  Built and scaled AI-powered coffee and agriculture tools,
                  winning national and international innovation awards.
                </p>
              </div>
              <div className="bt-teach-item">
                <span className="bt-teach-label">Co-founder · Omishtu Joy</span>
                <p>
                  Led technical development of soil testing and crop
                  recommendation tools recognized by global agritech programs.
                </p>
              </div>
              <div className="bt-teach-item">
                <span className="bt-teach-label">AI ecosystem builder</span>
                <p>
                  Co-organized AI events, hackathons, and training programs
                  connecting Ethiopian institutions with global partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CV SECTION – PREVIEW ONLY (POPUP OPENS FULL) */}
        <section id="cv" className="bt-section">
          <h2>Curriculum Vitae</h2>
          <p className="bt-section-intro">
            A snapshot of my journey across research, innovation, and service.
            For a detailed view, open the CV in the interactive viewer.
          </p>

          <div className="bt-cv-preview">
            <div className="bt-cv-header">
              <div>
                <h3>Boaz Berhanu Tulu</h3>
                <p>
                  PhD Candidate · Agricultural & Biological Engineering ·
                  University of Florida
                </p>
              </div>
              <div className="bt-cv-contact">
                <span>boaztulu@gmail.com</span>
                <span>btulu@ufl.edu</span>
                <span>Gainesville, FL</span>
              </div>
            </div>

            <div className="bt-cv-columns">
              <div className="bt-cv-col">
                <h4>Research focus</h4>
                <p>
                  AI & computer vision for agriculture, UAV/satellite remote
                  sensing, generative models, and decision support systems for
                  water and crop management.
                </p>

                <h4>Recent highlights</h4>
                <ul>
                  <li>AgriSenAI SoftwareX paper (UAV thermal & MSI workflows)</li>
                  <li>
                    LAI prediction paper in European Journal of Agronomy (UAV +
                    ML)
                  </li>
                  <li>Multiple national and international innovation awards</li>
                </ul>
              </div>

              <div className="bt-cv-col">
                <h4>Experience</h4>
                <ul>
                  <li>
                    Graduate Research Assistant – University of Florida (AI +
                    remote sensing)
                  </li>
                  <li>
                    Co-founder & CTO – Debo Engineering (coffee disease tools,
                    devices)
                  </li>
                  <li>
                    Co-founder – Omishtu Joy (soil testing and crop suggestion
                    device)
                  </li>
                </ul>

                <h4>Selected awards</h4>
                <ul>
                  <li>Mandela Washington Fellow (Purdue University)</li>
                  <li>Coffee Innovation Fund · BMZ / GIZ</li>
                  <li>World Bank–linked agritech recognitions</li>
                </ul>
              </div>
            </div>

            <div className="bt-cv-actions">
              <button
                className="bt-btn bt-btn-primary"
                onClick={() => setCvOpen(true)}
              >
                Open full CV
              </button>
              <a
                href="/Boaz_Berhanu_Tulu_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="bt-btn bt-btn-ghost"
              >
                Download CV (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* CV MODAL – BOOK STYLE VIEWER */}
        {cvOpen && (
          <div className="bt-modal-backdrop" onClick={() => setCvOpen(false)}>
            <div
              className="bt-modal-book"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bt-modal-header">
                <h3>Boaz Berhanu Tulu · CV</h3>
                <button
                  className="bt-modal-close"
                  onClick={() => setCvOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="bt-modal-body-book">
                <div className="bt-book-frame">
                  <div className="bt-book-spine" />
                  <iframe
                    src="/Boaz_Berhanu_Tulu_CV.pdf"
                    title="Boaz Berhanu Tulu CV"
                    className="bt-modal-iframe"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONNECT MODAL – EASY CONTACT POPUP */}
        {connectOpen && (
          <div
            className="bt-modal-backdrop"
            onClick={() => setConnectOpen(false)}
          >
            <div
              className="bt-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bt-modal-header">
                <h3>Let&apos;s connect</h3>
                <button
                  className="bt-modal-close"
                  onClick={() => setConnectOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="bt-modal-body">
                <div className="bt-connect-tabs">
                  <button
                    className={
                      "bt-connect-tab" +
                      (connectTab === "linkedin" ? " active" : "")
                    }
                    onClick={() => setConnectTab("linkedin")}
                  >
                    LinkedIn
                  </button>
                  <button
                    className={
                      "bt-connect-tab" +
                      (connectTab === "email" ? " active" : "")
                    }
                    onClick={() => setConnectTab("email")}
                  >
                    Email
                  </button>
                </div>

                <div className="bt-connect-body">
                  {connectTab === "linkedin" && (
                    <div>
                      <p>Connect with me on LinkedIn:</p>
                      {/* We can&apos;t embed LinkedIn directly (they block iframes),
                          so we show a clean card + link instead. */}
                      <div className="bt-linkedin-card">
                        <div className="bt-linkedin-avatar">
                          <span>BT</span>
                        </div>
                        <div>
                          <p className="bt-linkedin-name">
                            Boaz Berhanu Tulu
                          </p>
                          <p className="bt-linkedin-role">
                            PhD Candidate @ University of Florida
                          </p>
                          <a
                            href="https://www.linkedin.com/in/boaz-berhanu-tulu-9405771a5"
                            target="_blank"
                            rel="noreferrer"
                            className="bt-connect-link"
                          >
                            View full profile on LinkedIn →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {connectTab === "email" && (
                    <div>
                      <p>Email is usually the fastest way to reach me:</p>
                      <a
                        href="mailto:boaztulu@gmail.com"
                        className="bt-connect-link"
                      >
                        boaztulu@gmail.com
                      </a>
                      <br />
                      <a
                        href="mailto:btulu@ufl.edu"
                        className="bt-connect-link"
                      >
                        btulu@ufl.edu
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT SECTION (bottom) */}
        <section id="contact" className="bt-section bt-section-last">
          <h2>Contact</h2>
          <p className="bt-section-intro">
            If you&apos;re working on AI, remote sensing, or agricultural
            innovation and want to collaborate, I&apos;d love to talk.
          </p>

          <div className="bt-contact-grid">
            <div>
              <p className="bt-contact-label">Email</p>
              <p>
                <a
                  href="mailto:boaztulu@gmail.com"
                  className="bt-text-link"
                >
                  boaztulu@gmail.com
                </a>
                <br />
                <a href="mailto:btulu@ufl.edu" className="bt-text-link">
                  btulu@ufl.edu
                </a>
              </p>
            </div>
            <div>
              <p className="bt-contact-label">Social</p>
              <p>
                <a
                  href="https://www.linkedin.com/in/boaz-berhanu-tulu-9405771a5"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-text-link"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://www.facebook.com/boaz.tulu/"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-text-link"
                >
                  Facebook
                </a>
                <br />
                <a
                  href="https://x.com/boazberhanu"
                  target="_blank"
                  rel="noreferrer"
                  className="bt-text-link"
                >
                  X (Twitter)
                </a>
              </p>
            </div>
            <div>
              <p className="bt-contact-label">Location</p>
              <p>Gainesville, Florida · open to relocation</p>
            </div>
          </div>

          <p className="bt-footer-note">
            &copy; {new Date().getFullYear()} Boaz Berhanu Tulu
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
