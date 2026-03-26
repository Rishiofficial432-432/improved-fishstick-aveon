import { useEffect, useRef, useState, useCallback } from "react";
import anime from "animejs";
import aveonLogo from "./assets/aveon-logo.png";
import { Analytics } from '@vercel/analytics/react';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Home", "About", "Features", "How It Works", "Pricing", "Roadmap", "Contact"];

const FEATURES = [
  { icon: "⚡", title: "AGI Development", desc: "Pioneering research toward artificial general intelligence that thinks, plans, and adapts autonomously." },
  { icon: "🤖", title: "AI Agents", desc: "Intelligent autonomous agents that reason and execute complex multi-step tasks with precision." },
  { icon: "🔗", title: "Workflow Automation", desc: "End-to-end automation of enterprise workflows via smart API integrations and AI orchestration." },
  { icon: "💬", title: "AI Chatbots", desc: "Context-aware conversational AI with long-term memory and multi-language support." },
  { icon: "📊", title: "Real-Time Analytics", desc: "Live dashboards powered by predictive AI models for actionable business intelligence." },
  { icon: "🛡️", title: "Top-Notch Security", desc: "Bank-grade encryption and compliance frameworks built into every AI solution we ship." },
];

const STEPS = [
  { num: "01", title: "Connect", desc: "Integrate Aveon AI with your existing stack in minutes via our universal API or no-code connectors." },
  { num: "02", title: "Configure", desc: "Define your workflows, train custom models on your data, and set intelligent automation rules." },
  { num: "03", title: "Deploy", desc: "Go live with enterprise-grade AI that scales automatically and improves with every interaction." },
];

const PRICING = [
  {
    tier: "Starter",
    price: "$0",
    period: "/mo",
    desc: "For individuals exploring AI",
    features: ["AI Chatbot access", "5 automated workflows", "Basic analytics", "Community support"],
    highlight: false,
    cta: "Get Started Free",
    modalType: "signup",
  },
  {
    tier: "Pro",
    price: "$49",
    period: "/mo",
    desc: "For growing teams",
    features: ["Everything in Starter", "Unlimited workflows", "Custom AI agents", "Priority support", "Advanced analytics"],
    highlight: true,
    cta: "Start Pro Trial",
    modalType: "signup",
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations",
    features: ["Everything in Pro", "Dedicated AGI model", "White-label options", "SLA guarantee", "24/7 dedicated team"],
    highlight: false,
    cta: "Contact Sales",
    modalType: "contact",
  },
];

const ROADMAP_ITEMS = [
  { date: "May 2023", title: "Voice Recognition", status: "done", desc: "Hands-free AI interaction via advanced voice understanding." },
  { date: "Nov 2024", title: "Generative AI", status: "progress", desc: "Text, image, and idea generation at scale." },
  { date: "Dec 2024", title: "AI Agents", status: "done", desc: "Autonomous agents that plan and execute tasks." },
  { date: "May 2025", title: "AGI & Automation", status: "progress", desc: "Enterprise-grade artificial general intelligence." },
  { date: "Q4 2025", title: "Multimodal AI", status: "upcoming", desc: "Unified voice, vision, and text AI platform." },
];

const STATS = [
  { value: 120, suffix: "+", label: "AI Models Deployed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "M+", label: "Automations Run" },
  { value: 24, suffix: "/7", label: "Support Coverage" },
];

const SOCIALS = [
  { icon: "𝕏", label: "Twitter / X", url: "https://twitter.com" },
  { icon: "in", label: "LinkedIn", url: "https://linkedin.com" },
  { icon: "◎", label: "Instagram", url: "https://instagram.com" },
  { icon: "✈", label: "Telegram", url: "https://telegram.org" },
];

// ─── Modal Component ──────────────────────────────────────────────────────────

function Modal({ type, onClose }) {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const isContact = type === "contact";
  const isSignin = type === "signin";

  // Animate in
  useEffect(() => {
    anime({ targets: overlayRef.current, opacity: [0, 1], duration: 250, easing: "easeOutQuad" });
    anime({ targets: boxRef.current, opacity: [0, 1], translateY: [30, 0], scale: [0.96, 1], duration: 350, easing: "easeOutExpo" });
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    anime({ targets: overlayRef.current, opacity: 0, duration: 200, easing: "easeInQuad" });
    anime({
      targets: boxRef.current, opacity: 0, translateY: 20, scale: 0.97, duration: 220,
      easing: "easeInQuad", complete: onClose,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div ref={boxRef} className="modal-box" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h3 className="modal-title">You're on the list!</h3>
            <p className="modal-sub">We'll be in touch very soon. Thanks for your interest in Aveon AI.</p>
            <button className="btn-primary" style={{ marginTop: "1.5rem", width: "100%" }} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-icon">
                {isSignin ? "👤" : isContact ? "💼" : "🚀"}
              </div>
              <h3 className="modal-title">
                {isSignin ? "Sign In" : isContact ? "Contact Sales" : "Get Started with Aveon AI"}
              </h3>
              <p className="modal-sub">
                {isSignin
                  ? "Welcome back. Sign in to your Aveon AI account."
                  : isContact
                  ? "Tell us about your project and our team will reach out within 24 hours."
                  : "Join thousands of innovators building with Aveon AI."}
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {isSignin ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="you@company.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-input" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    Sign In
                  </button>
                  <p className="form-footer">
                    Don't have an account?{" "}
                    <span className="form-link" style={{ cursor: "pointer", color: "#a78bfa" }}>
                      Sign up free
                    </span>
                  </p>
                </>
              ) : isContact ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-input" placeholder="Smit" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-input" placeholder="Bhavsar" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work Email</label>
                    <input type="email" className="form-input" placeholder="you@company.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input type="text" className="form-input" placeholder="Your company name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tell us about your needs</label>
                    <textarea className="form-input form-textarea" placeholder="Describe your project or use case..." required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    Send Message
                  </button>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-input" placeholder="Smit" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-input" placeholder="Bhavsar" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="you@company.com" required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                    Create Free Account
                  </button>
                  <p className="form-footer">By signing up you agree to our Terms & Privacy Policy.</p>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(target, suffix, isActive) {
  const [count, setCount] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    const obj = { val: 0 };
    anime({
      targets: obj,
      val: target,
      duration: 2000,
      easing: "easeOutExpo",
      update: () => setCount(Math.floor(obj.val)),
    });
  }, [isActive, target]);
  return `${count}${suffix}`;
}

// ─── Particle Canvas ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ─── Page Components ──────────────────────────────────────────────────────────

function HeroPage({ isActive, goTo, openModal }) {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime.timeline({ easing: "easeOutExpo" })
      .add({ targets: titleRef.current, opacity: [0, 1], translateY: [60, 0], duration: 900 })
      .add({ targets: subRef.current, opacity: [0, 1], translateY: [40, 0], duration: 700 }, "-=500")
      .add({ targets: btnRef.current, opacity: [0, 1], translateY: [30, 0], duration: 600 }, "-=400");
  }, [isActive]);

  return (
    <div className="page-content hero-page">
      <ParticleCanvas />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div className="hero-inner" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-badge">🚀 Next-Gen AI Platform</div>
        <h1 ref={titleRef} className="hero-title" style={{ opacity: 0 }}>
          Intelligence That<br />
          <span className="gradient-text">Changes Everything</span>
        </h1>
        <p ref={subRef} className="hero-sub" style={{ opacity: 0 }}>
          Aveon AI is a revolution in intelligence — built by visionaries, engineered for the future.
          From AGI development to autonomous agents, we craft AI that thinks, adapts, and transforms.
        </p>
        <div ref={btnRef} className="hero-btns" style={{ opacity: 0 }}>
          <button
            className="btn-primary"
            id="hero-cta-primary"
            onClick={() => openModal("signup")}
          >
            Get Started Free
          </button>
          <button
            className="btn-ghost"
            id="hero-cta-secondary"
            onClick={() => goTo(3)}
          >
            Watch Demo
          </button>
        </div>
        <div className="hero-logos">
          {["OpenAI", "Firebase", "React", "Node.js", "Vercel"].map((l) => (
            <span key={l} className="integration-tag">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, suffix, label, isActive }) {
  const count = useCountUp(value, suffix, isActive);
  return (
    <div className="stat-card">
      <div className="stat-value gradient-text">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function AboutPage({ isActive }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({ targets: leftRef.current, opacity: [0, 1], translateX: [-60, 0], duration: 900, easing: "easeOutExpo" });
    anime({ targets: rightRef.current, opacity: [0, 1], translateX: [60, 0], duration: 900, easing: "easeOutExpo", delay: 200 });
  }, [isActive]);

  return (
    <div className="page-content about-page">
      <div className="about-grid">
        <div ref={leftRef} className="about-left" style={{ opacity: 0 }}>
          <div className="section-badge">About Aveon</div>
          <h2 className="section-title">Built for the<br /><span className="gradient-text">Future of AI</span></h2>
          <p className="about-text">
            Founded by <strong style={{ color: "#a78bfa" }}>Smit Bhavsar</strong>, Aveon AI is driven by a relentless
            vision to push beyond automation into the realm of AGI, AI agents, and next-gen solutions.
          </p>
          <p className="about-text">
            We don't just build tools — we craft intelligent systems that think, adapt, and transform
            industries. Every solution we create is a step toward the future where intelligence isn't
            artificial, it's inevitable.
          </p>
          <div className="about-integrations">
            <span className="text-dim">Integrates with</span>
            <div className="integration-row">
              {["Figma", "Slack", "Notion", "Discord", "Framer"].map((app) => (
                <span key={app} className="app-chip">{app}</span>
              ))}
            </div>
          </div>
        </div>
        <div ref={rightRef} className="about-right" style={{ opacity: 0 }}>
          <div className="stats-grid">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} isActive={isActive} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesPage({ isActive }) {
  const cardsRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({
      targets: cardsRef.current?.querySelectorAll(".feature-card"),
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 700,
      delay: anime.stagger(100),
      easing: "easeOutExpo",
    });
  }, [isActive]);

  return (
    <div className="page-content features-page">
      <div className="section-header">
        <div className="section-badge">Features</div>
        <h2 className="section-title">Everything You Need to<br /><span className="gradient-text">Build With AI</span></h2>
      </div>
      <div ref={cardsRef} className="features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card" style={{ opacity: 0 }}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksPage({ isActive }) {
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({ targets: lineRef.current, width: ["0%", "100%"], duration: 1200, easing: "easeInOutQuart", delay: 400 });
    anime({
      targets: stepsRef.current?.querySelectorAll(".step-card"),
      opacity: [0, 1],
      translateY: [60, 0],
      duration: 700,
      delay: anime.stagger(200, { start: 200 }),
      easing: "easeOutExpo",
    });
  }, [isActive]);

  return (
    <div className="page-content hiw-page">
      <div className="section-header">
        <div className="section-badge">How It Works</div>
        <h2 className="section-title">Three Steps to<br /><span className="gradient-text">AI-Powered Growth</span></h2>
      </div>
      <div className="hiw-container">
        <div className="hiw-connector">
          <div ref={lineRef} className="connector-line" />
        </div>
        <div ref={stepsRef} className="steps-row">
          {STEPS.map((step) => (
            <div key={step.num} className="step-card" style={{ opacity: 0 }}>
              <div className="step-num gradient-text">{step.num}</div>
              <div className="step-dot" />
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPage({ isActive, openModal }) {
  const cardsRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({
      targets: cardsRef.current?.querySelectorAll(".pricing-card"),
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.95, 1],
      duration: 700,
      delay: anime.stagger(150),
      easing: "easeOutExpo",
    });
  }, [isActive]);

  return (
    <div className="page-content pricing-page">
      <div className="section-header">
        <div className="section-badge">Pricing</div>
        <h2 className="section-title">Simple, Transparent<br /><span className="gradient-text">Pricing</span></h2>
        <p className="section-sub">Start free. Scale as you grow. No hidden fees.</p>
      </div>
      <div ref={cardsRef} className="pricing-grid">
        {PRICING.map((plan) => (
          <div key={plan.tier} className={`pricing-card ${plan.highlight ? "pricing-card--pro" : ""}`} style={{ opacity: 0 }}>
            {plan.highlight && <div className="pro-badge">Most Popular</div>}
            <div className="pricing-tier">{plan.tier}</div>
            <div className="pricing-price">
              <span className="price-val">{plan.price}</span>
              <span className="price-period">{plan.period}</span>
            </div>
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}><span className="check">✓</span>{f}</li>
              ))}
            </ul>
            <button
              className={`pricing-btn ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
              onClick={() => openModal(plan.modalType)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapPage({ isActive }) {
  const timelineRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({
      targets: timelineRef.current?.querySelectorAll(".rm-item"),
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 600,
      delay: anime.stagger(120),
      easing: "easeOutExpo",
    });
  }, [isActive]);

  const statusMap = {
    done: { label: "Complete", color: "#22c55e" },
    progress: { label: "In Progress", color: "#a78bfa" },
    upcoming: { label: "Upcoming", color: "#555" },
  };

  return (
    <div className="page-content roadmap-page">
      <div className="section-header">
        <div className="section-badge">Roadmap</div>
        <h2 className="section-title">The Road to<br /><span className="gradient-text">AI Supremacy</span></h2>
      </div>
      <div ref={timelineRef} className="timeline-track">
        <div className="timeline-line" />
        {ROADMAP_ITEMS.map((item, i) => (
          <div key={item.title} className={`rm-item rm-item--${i % 2 === 0 ? "top" : "bottom"}`} style={{ opacity: 0 }}>
            <div className="rm-content">
              <div className="rm-date">{item.date}</div>
              <div className="rm-dot" style={{ borderColor: statusMap[item.status].color }} />
              <div className="rm-title">{item.title}</div>
              <div className="rm-desc">{item.desc}</div>
              <div className="rm-status" style={{ color: statusMap[item.status].color, borderColor: statusMap[item.status].color + "44" }}>
                {statusMap[item.status].label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterPage({ isActive, goTo, openModal }) {
  const innerRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isActive || ran.current) return;
    ran.current = true;
    anime({ targets: innerRef.current, opacity: [0, 1], translateY: [40, 0], duration: 900, easing: "easeOutExpo" });
  }, [isActive]);

  return (
    <div className="page-content footer-page">
      <div className="glow-orb glow-orb-footer" />
      <div ref={innerRef} className="footer-inner" style={{ opacity: 0 }}>
        <div className="footer-cta-block">
          <div className="section-badge">Join Aveon AI</div>
          <h2 className="footer-headline">
            Start Building the<br /><span className="gradient-text">Future Today</span>
          </h2>
          <p className="footer-sub">
            Join thousands of innovators already using Aveon AI to automate, scale, and outpace the competition.
          </p>
          <div className="footer-btns">
            <button
              className="btn-primary"
              id="footer-cta"
              onClick={() => openModal("signup")}
            >
              Get Early Access
            </button>
            <button
              className="btn-ghost"
              id="footer-contact"
              onClick={() => openModal("contact")}
            >
              Talk to Sales
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <img src={aveonLogo} alt="Aveon AI" className="footer-logo-img" />
            <span className="footer-tagline">Intelligence, Inevitable.</span>
          </div>
          <nav className="footer-nav">
            {NAV_ITEMS.slice(0, 6).map((n, i) => (
              <button
                key={n}
                className="footer-link"
                onClick={() => goTo(i)}
              >
                {n}
              </button>
            ))}
          </nav>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="footer-copy">© 2025 Aveon AI. All rights reserved. Founded by Smit Bhavsar.</p>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const PAGES = [HeroPage, AboutPage, FeaturesPage, HowItWorksPage, PricingPage, RoadmapPage, FooterPage];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [modal, setModal] = useState(null); // null | "signup" | "contact" | "signin"
  const containerRef = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  const openModal = useCallback((type) => setModal(type), []);
  const closeModal = useCallback(() => setModal(null), []);

  const goTo = useCallback(
    (index) => {
      if (isAnimating || index === current || index < 0 || index >= PAGES.length) return;
      const direction = index > current ? 1 : -1;
      const container = containerRef.current;
      if (!container) return;

      setIsAnimating(true);

      const slides = container.querySelectorAll(".page-slide");
      const currentSlide = slides[current];
      const nextSlide = slides[index];

      anime.set(nextSlide, { translateY: `${direction * 100}%`, opacity: 1 });

      anime
        .timeline({ easing: "easeInOutQuart" })
        .add({ targets: currentSlide, translateY: `${-direction * 30}%`, opacity: 0, duration: 550 })
        .add({ targets: nextSlide, translateY: ["${direction * 100}%", "0%"], opacity: 1, duration: 650 }, "-=400")
        .finished.then(() => {
          setCurrent(index);
          setIsAnimating(false);
          slides.forEach((s, i) => {
            if (i !== index) {
              anime.set(s, { translateY: i < index ? "-30%" : "100%", opacity: 0 });
            } else {
              anime.set(s, { translateY: "0%", opacity: 1 });
            }
          });
        });
    },
    [current, isAnimating]
  );

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e) => {
      if (modal) return; // don't scroll pages when modal is open
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < 800) return;
      lastWheelTime.current = now;
      goTo(e.deltaY > 0 ? current + 1 : current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo, current, modal]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (modal) return; // don't navigate when modal is open
      if (e.key === "ArrowDown" || e.key === "PageDown") goTo(current + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, current, modal]);

  // Touch navigation
  useEffect(() => {
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (modal || touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) goTo(deltaY > 0 ? current + 1 : current - 1);
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, current, modal]);

  // Init slides
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll(".page-slide");
    slides.forEach((s, i) => {
      anime.set(s, { translateY: i === 0 ? "0%" : "100%", opacity: i === 0 ? 1 : 0 });
    });
  }, []);

  // Page-level props injected per-page
  const pageProps = { goTo, openModal };

  return (
    <>
      {/* Top Navigation */}
      <header className="top-nav" id="top-nav">
        <div
          className="nav-brand"
          id="nav-brand"
          style={{ cursor: "pointer" }}
          onClick={() => goTo(0)}
        >
          <img src={aveonLogo} alt="Aveon AI" className="nav-logo" />
        </div>
        <nav className={`nav-links ${navOpen ? "nav-links--open" : ""}`} id="desktop-nav">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              id={`nav-item-${i}`}
              className={`nav-link ${current === i ? "nav-link--active" : ""}`}
              onClick={() => { goTo(i); setNavOpen(false); }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="btn-ghost btn-sm"
            id="nav-signin"
            onClick={() => openModal("signin")}
          >
            Sign In
          </button>
          <button
            className="btn-primary btn-sm"
            id="nav-getstarted"
            onClick={() => goTo(4)}
          >
            Get Started
          </button>
          <button className="hamburger" id="hamburger" onClick={() => setNavOpen(!navOpen)}>
            <span className={navOpen ? "open" : ""} />
            <span className={navOpen ? "open" : ""} />
            <span className={navOpen ? "open" : ""} />
          </button>
        </div>
      </header>

      {/* Page Slides */}
      <div ref={containerRef} className="slides-container" id="slides-container">
        {PAGES.map((PageComp, i) => (
          <div key={i} className="page-slide" id={`page-slide-${i}`}>
            <PageComp isActive={current === i} {...pageProps} />
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="dot-nav" id="dot-nav" role="navigation" aria-label="Page navigation">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            id={`dot-${i}`}
            className={`dot ${current === i ? "dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${item}`}
            title={item}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {current < PAGES.length - 1 && (
        <button className="scroll-hint" id="scroll-hint" onClick={() => goTo(current + 1)} aria-label="Next section">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Modal */}
      {modal && <Modal type={modal} onClose={closeModal} />}
      
      {/* Vercel Analytics */}
      <Analytics />
    </>
  );
}
