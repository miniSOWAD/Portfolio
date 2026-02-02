import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaCode,
} from "react-icons/fa";
import AboutTab from "./tabs/AboutTab";
import SkillsTab from "./tabs/SkillsTab";
import ProjectsTab from "./tabs/ProjectsTab";
import CodingTab from "./tabs/CodingTab";
import AchievementsTab from "./tabs/AchievementsTab";
import EducationTab from "./tabs/EducationTab";

type TabKey =
  | "about"
  | "skills"
  | "projects"
  | "coding"
  | "achievements"
  | "education";

type Social = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
};

type PortfolioData = {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  avatarUrl: string;
  logoUrl: string;
  logoLink: string;
  socials: Social[];
  tabs: Record<TabKey, { title: string; content: React.ReactNode }>;
};

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalRoot" role="dialog" aria-modal="true">
      <button className="modalBackdrop" onClick={onClose} aria-label="Close" />
      <div className="modalCard">
        <div className="modalHeader">
          <h2>{title}</h2>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

function WaterDropletsBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (min: number, max: number) =>
      min + Math.random() * (max - min);

    type Drop = { x: number; y: number; r: number; vy: number; vx: number; a: number };
    type Ripple = { x: number; y: number; r: number; vr: number; life: number; max: number };

    const drops: Drop[] = [];
    const ripples: Ripple[] = [];

    const initDrops = () => {
      drops.length = 0;
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        drops.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(1.2, 4.2),
          vy: rand(0.3, 1.2),
          vx: rand(-0.2, 0.2),
          a: rand(0.25, 0.55),
        });
      }
    };

    const spawnRipple = () => {
      ripples.push({
        x: rand(0, w),
        y: rand(h * 0.2, h * 0.9),
        r: rand(4, 10),
        vr: rand(1.2, 2.6),
        life: 0,
        max: rand(40, 70),
      });
    };

    const drawDrop = (d: Drop) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${d.a})`;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${d.a * 0.55})`;
      ctx.arc(d.x - d.r * 0.25, d.y - d.r * 0.25, d.r * 0.45, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#071c2a");
      g.addColorStop(1, "#04121b");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i < 120; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      for (const d of drops) {
        d.y += d.vy;
        d.x += d.vx;
        d.vx += rand(-0.01, 0.01);
        d.vx = Math.max(-0.35, Math.min(0.35, d.vx));

        drawDrop(d);

        if (d.y - d.r > h + 30) {
          d.y = -rand(10, 200);
          d.x = rand(0, w);
          d.r = rand(1.2, 4.2);
          d.vy = rand(0.3, 1.2);
          d.vx = rand(-0.2, 0.2);
          d.a = rand(0.25, 0.55);
        }

        if (d.y > h * 0.7 && Math.random() < 0.0005) spawnRipple();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.life += 1;
        r.r += r.vr;

        const t = 1 - r.life / r.max;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.18 * t})`;
        ctx.lineWidth = 1.4;
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();

        if (r.life >= r.max) ripples.splice(i, 1);
      }

      const v = ctx.createRadialGradient(
        w * 0.3,
        h * 0.2,
        80,
        w * 0.3,
        h * 0.2,
        Math.max(w, h)
      );
      v.addColorStop(0, "rgba(255,255,255,0.06)");
      v.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);

      if (Math.random() < 0.01 && ripples.length < 3) spawnRipple();

      raf = requestAnimationFrame(draw);
    };

    resize();
    initDrops();
    draw();

    const onResize = () => {
      resize();
      initDrops();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="bgCanvas" aria-hidden="true" />;
}

export default function App() {
  const data: PortfolioData = useMemo(
    () => ({
      name: "Md Mahruf Alam",
      title: "Rookie Software Developer",
      subtitle: "Department of CSE, The University of Barishal",
      email: "baisakh2015@gmail.com",
      phone: "+8801977987420",

      avatarUrl: "/My.jpg",
      logoUrl: "/loyo5.png",

      logoLink: "/Surprise-page",

      socials: [
        { label: "Facebook", href: "https://www.facebook.com/mdmahrufalam.sowad", Icon: FaFacebookF },
        { label: "LeetCode", href: "https://leetcode.com/u/minisowad/", Icon: FaCode },
        { label: "Instagram", href: "https://www.instagram.com/baisakh2015/", Icon: FaInstagram },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/md-mahruf-alam-sowad-397aaa309/?trk=opento_sprofile_goalscard", Icon: FaLinkedinIn },
        { label: "GitHub", href: "https://github.com/miniSOWAD", Icon: FaGithub },
      ],

      tabs: {
        about: { title: "About Me", content: <AboutTab /> },
        skills: { title: "Skills", content: <SkillsTab /> },
        projects: { title: "Projects", content: <ProjectsTab /> },
        coding: { title: "Coding", content: <CodingTab /> },
        achievements: { title: "Achievements", content: <AchievementsTab /> },
        education: { title: "Education", content: <EducationTab /> },
      },
    }),
    []
  );

  const tabs: { key: TabKey; label: string }[] = [
    { key: "about", label: "About" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "coding", label: "Coding" },
    { key: "achievements", label: "Achievements" },
    { key: "education", label: "Education" },
  ];

  const [activeTab, setActiveTab] = useState<TabKey | null>(null);

  const [contactPopup, setContactPopup] = useState<null | "phone" | "email" | "logo">(null);

  return (
    <div className="page">
      <WaterDropletsBackground />

      <header className="topBar">
        {}
        <button
          className="logoBtn"
          onClick={() => setContactPopup("logo")}
          aria-label="Open logo link"
          title="Open logo link"
        >
          <img className="Doit" src={data.logoUrl} alt="Logo" />
        </button>

        <a className="cvBtn" href="/cv.pdf" download>
          Download CV
        </a>
      </header>

      <main className="layout">
        <section className="hero">
          <div className="avatarRow">
            <div className="avatarWrap">
              <img className="avatar" src={data.avatarUrl} alt="Profile" />
            </div>
          </div>

          <h1 className="name">{data.name}</h1>
          <div className="role">{data.title}</div>

          <div className="meta">
            <div>
              {}
              Email:{" "}
              <button
                className="linkLike"
                onClick={() => setContactPopup("email")}
                aria-label="Mail me"
              >
                {data.email}
              </button>{" "}
              |{" "}
              {}
              Phone:{" "}
              <button
                className="linkLike"
                onClick={() => setContactPopup("phone")}
                aria-label="Call me"
              >
                {data.phone}
              </button>
            </div>
            <div className="muted">{data.subtitle}</div>
          </div>
        </section>

        <section className="emptySpace" aria-hidden="true" />
      </main>

      {}
      <aside className="socialRail">
        {data.socials.map((s) => (
          <a
            key={s.label}
            className="socialBtn"
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
          >
            <s.Icon size={36} />
          </a>
        ))}
      </aside>

      <nav className="bottomTabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className="tabBtn"
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {}
      <Modal
        open={activeTab !== null}
        title={activeTab ? data.tabs[activeTab].title : ""}
        onClose={() => setActiveTab(null)}
      >
        {activeTab ? data.tabs[activeTab].content : null}
      </Modal>

      {}
      <Modal
        open={contactPopup === "phone"}
        title="Call me?"
        onClose={() => setContactPopup(null)}
      >
        <p>Do you want to call this number?</p>
        <p className="muted">{data.phone}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <a className="actionBtn" href={`tel:${data.phone}`}>
            Call now
          </a>
          <button className="actionBtn secondary" onClick={() => setContactPopup(null)}>
            Cancel
          </button>
        </div>
      </Modal>

      {}
      <Modal
        open={contactPopup === "email"}
        title="Mail me?"
        onClose={() => setContactPopup(null)}
      >
        <p>Do you want to send an email?</p>
        <p className="muted">{data.email}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <a className="actionBtn" href={`mailto:${data.email}`}>
            Email now
          </a>
          <button className="actionBtn secondary" onClick={() => setContactPopup(null)}>
            Cancel
          </button>
        </div>
      </Modal>

      {}
      <Modal
        open={contactPopup === "logo"}
        title="Open page?"
        onClose={() => setContactPopup(null)}
      >
        <p>Do you want to open the page linked to the logo?</p>
        <p className="muted">{data.logoLink}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <a className="actionBtn" href={data.logoLink}>
            Go
          </a>
          <button className="actionBtn secondary" onClick={() => setContactPopup(null)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
