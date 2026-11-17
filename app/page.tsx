"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  Heart,
  CheckCircle,
  CalendarPlus,
  Send,
  Sparkles,
} from "lucide-react";

/* =========================================================================
   ✅ SIRF YAHAN SE SAB KUCH CHANGE KARO
   ========================================================================= */
const CARD = {
  groomName: "Ali",
  groomParents: "Son of Mr. & Mrs. Ahmed",
  brideName: "Ayesha",
  brideParents: "Daughter of Mr. & Mrs. Hassan",

  eventTitle: "Walima",
  start: "2026-12-29T19:00:00+05:00",
  venue: "Royal Palm Golf & Country Club",
  address: "Bab-e-Azam Grand Marquee, Canal Bank Road, Lahore",
  mapsLink: "https://maps.google.com",

  whatsapp: "923001234567",
  musicSrc: "/sajna.mp3",

  message: [
    "Jaise ek chhota sa ghar eint eint jod kar banta hai, waise hi hamari kahani bhi pyaare lamhon se banti gayi. Aaj hum us ghar ki pehli roshni jalane ja rahe hain, aur chahte hain ke us roshni mein aap sab ki muskurahat bhi shamil ho.",
    "Aap ke qadam hamari khushi mein chaar chaand laga denge, aur aap ki dua hamari nayi zindagi ki sab se mazboot buniyaad banegi. Aaiye, mil kar ek haseen shaam sajate hain.",
  ],

  program: [
    { time: "06:30 PM", label: "Mehmanon ka istiqbal", icon: "🌸" },
    { time: "07:00 PM", label: "Dulha dulhan ki aamad", icon: "💍" },
    { time: "07:30 PM", label: "Dua aur dawat", icon: "🤲" },
    { time: "09:30 PM", label: "Rukhsati", icon: "🏡" },
  ],

  colors: [
    { name: "Rose Gold", hex: "#E8A598" },
    { name: "Champagne", hex: "#F5E6CA" },
    { name: "Sage Green", hex: "#A3C1AD" },
    { name: "Dusty Blue", hex: "#B8C5D6" },
  ],
};

/* ============================ HELPERS ============================ */
const PK = "Asia/Karachi";
const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PK,
  }).format(new Date(iso));
const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: PK,
  }).format(new Date(iso));
const dateParts = (iso: string) => {
  const f = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PK,
  }).formatToParts(new Date(iso));
  const g = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: g("weekday"),
    day: g("day"),
    month: g("month"),
    year: g("year"),
  };
};

const gcalLink = () => {
  const s = new Date(CARD.start);
  const e = new Date(s.getTime() + 4 * 3600 * 1000);
  const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${CARD.eventTitle} - ${CARD.groomName} & ${CARD.brideName}`,
  )}&dates=${f(s)}/${f(e)}&location=${encodeURIComponent(`${CARD.venue}, ${CARD.address}`)}`;
};

/* ============================ ROYAL ARCH & LANTERN SVG (NEW STARTUP) ============================ */
function RoyalGateway({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className={"gateway-wrap" + (open ? " opened" : "")} onClick={onClick}>
      <svg
        viewBox="0 0 400 450"
        className="gateway-svg"
        role="img"
        aria-label="Royal Gateway"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D976" />
            <stop offset="50%" stopColor="#E9B646" />
            <stop offset="100%" stopColor="#C69227" />
          </linearGradient>
          <linearGradient id="archBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D1E2F" />
            <stop offset="100%" stopColor="#1A111C" />
          </linearGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2B2" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shahi Arch Outer Frame */}
        <path
          d="M60 420 V180 C60 100 120 50 200 50 C280 50 340 100 340 180 V420 Z"
          fill="url(#archBg)"
          stroke="url(#goldGrad)"
          strokeWidth="6"
        />

        {/* Inner Arch Details */}
        <path
          d="M80 420 V185 C80 115 130 70 200 70 C270 70 320 115 320 185 V420 Z"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Hanging Royal Lanterns */}
        <g className="hanging-lantern" transform="translate(140, 70)">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="40"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />
          <circle cx="0" cy="40" r="16" fill="url(#goldGrad)" />
          <circle
            cx="0"
            cy="40"
            r="26"
            fill="url(#lampGlow)"
            className="pulse-glow"
          />
        </g>
        <g
          className="hanging-lantern"
          transform="translate(260, 70)"
          style={{ animationDelay: "1s" }}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="40"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />
          <circle cx="0" cy="40" r="16" fill="url(#goldGrad)" />
          <circle
            cx="0"
            cy="40"
            r="26"
            fill="url(#lampGlow)"
            className="pulse-glow"
          />
        </g>

        {/* Center Monogram / Crest */}
        <g className="gate-crest">
          <circle
            cx="200"
            cy="220"
            r="45"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <text
            x="200"
            y="228"
            textAnchor="middle"
            fill="#F5E6CA"
            fontFamily="'Dancing Script', cursive"
            fontSize="38"
            fontWeight="bold"
          >
            {CARD.groomName[0]} & {CARD.brideName[0]}
          </text>
        </g>

        {/* Opening Gates (Left & Right Doors) */}
        <g className={"door-left" + (open ? " open-l" : "")}>
          <rect
            x="62"
            y="180"
            width="138"
            height="238"
            fill="#241826"
            stroke="url(#goldGrad)"
            strokeWidth="3"
          />
          <path
            d="M100 220 H160 V380 H100 Z"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
        <g className={"door-right" + (open ? " open-r" : "")}>
          <rect
            x="200"
            y="180"
            width="138"
            height="238"
            fill="#241826"
            stroke="url(#goldGrad)"
            strokeWidth="3"
          />
          <path
            d="M240 220 H300 V380 H240 Z"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
}

/* ============================ CONFETTI ============================ */
type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  s: number;
  c: string;
  heart: boolean;
};

function Confetti({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const pieces = useRef<Piece[]>([]);

  const pop = useCallback(() => {
    const cv = ref.current;
    if (!cv) return;
    const colors = [
      "#E8A598",
      "#F5E6CA",
      "#A3C1AD",
      "#B8C5D6",
      "#F9D976",
      "#D48373",
    ];
    for (let i = 0; i < 110; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const sp = 7 + Math.random() * 9;
      pieces.current.push({
        x: cv.width / 2 + (Math.random() - 0.5) * 120,
        y: cv.height * 0.8,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.4,
        s: 6 + Math.random() * 8,
        c: colors[Math.floor(Math.random() * colors.length)],
        heart: Math.random() < 0.25,
      });
    }
  }, []);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pieces.current = pieces.current.filter((p) => p.y < cv.height + 30);
      for (const p of pieces.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.vx *= 0.985;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.heart) {
          ctx.font = `${p.s * 2}px serif`;
          ctx.textAlign = "center";
          ctx.fillText("♥", 0, 0);
        } else {
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (trigger > 0) {
      pop();
      setTimeout(pop, 280);
    }
  }, [trigger, pop]);

  return <canvas ref={ref} className="confetti" />;
}

/* ============================ SMALL PIECES ============================ */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="rv"
      initial={{ opacity: 0, y: 46, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Digit({ v }: { v: string }) {
  return (
    <span className="dg">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "inline-block" }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const NOTE_COLORS = ["#FDF0ED", "#F0F7F4", "#F4F2FA", "#FFFBEB"];

/* ============================ MAIN COMPONENT ============================ */
export default function RoyalCard() {
  const [stage, setStage] = useState<"intro" | "opening" | "content">("intro");
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [guest, setGuest] = useState("");
  const [popKey, setPopKey] = useState(0);
  const [ameen, setAmeen] = useState(0);
  const [flip, setFlip] = useState(false);

  // RSVP
  const [name, setName] = useState("");
  const [count, setCount] = useState("1");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  // Wishes wall
  const [wishes, setWishes] = useState<{ n: string; t: string }[]>([]);
  const [wName, setWName] = useState("");
  const [wText, setWText] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -50]);

  useEffect(() => {
    setMounted(true);
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) {
      setGuest(to);
      setName(to);
      setWName(to);
    }
    try {
      const saved = localStorage.getItem("royal_wishes_v1");
      if (saved) setWishes(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = Date.parse(CARD.start);
  const done = now !== null && now >= target;
  const diff = now === null ? 0 : Math.max(0, target - now);
  const units: [string, number][] = [
    ["Din", Math.floor(diff / 86400000)],
    ["Ghante", Math.floor(diff / 3600000) % 24],
    ["Minute", Math.floor(diff / 60000) % 60],
    ["Second", Math.floor(diff / 1000) % 60],
  ];
  const dp = dateParts(CARD.start);

  const enter = () => {
    if (stage !== "intro") return;
    setStage("opening");
    setTimeout(() => setPopKey((k) => k + 1), 600);
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {});
    setTimeout(() => {
      setStage("content");
      setPopKey((k) => k + 1);
    }, 2400);
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  const addWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wText.trim()) return;
    const next = [
      { n: wName.trim() || "Mehman", t: wText.trim() },
      ...wishes,
    ].slice(0, 30);
    setWishes(next);
    setWText("");
    setPopKey((k) => k + 1);
    try {
      localStorage.setItem("royal_wishes_v1", JSON.stringify(next));
    } catch {}
  };

  const submitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const msg =
      `Assalam o Alaikum! ${name.trim()} ` +
      (attending === "yes"
        ? `inshaAllah ${CARD.eventTitle} mein shamil hoon ga/gi (${count} mehman).`
        : "afsos, shamil nahi ho sakoon ga/gi.") +
      (note.trim() ? ` ${note.trim()}` : "");
    setSent(true);
    setPopKey((k) => k + 1);
    window.open(
      `https://wa.me/${CARD.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div className="root">
      <audio ref={audioRef} src={CARD.musicSrc} loop preload="auto" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Dancing+Script:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Amiri:wght@700&display=swap"
      />
      <style>{CSS}</style>

      {/* Background Glow & Gradient */}
      <div className="royal-bg" />

      {mounted && (
        <div className="layer">
          {/* Sparkles / Stars effect */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="sparkle-dot"
              style={{
                top: `${(i * 31) % 95}%`,
                left: `${(i * 47) % 95}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <Confetti trigger={popKey} />
      {stage === "content" && (
        <motion.div className="bar" style={{ scaleX: scrollYProgress }} />
      )}
      {stage === "content" && (
        <button className="music" onClick={toggleMusic} aria-label="Music">
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}

      {/* ================= INTRO GATEWAY ================= */}
      <AnimatePresence>
        {stage !== "content" && (
          <motion.div
            className="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className="intro-top"
              animate={
                stage === "opening"
                  ? { opacity: 0, y: -20 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              <span className="mini-gold">Royal Invitation</span>
              <span className="script names gold-text">
                {CARD.groomName} & {CARD.brideName}
              </span>
            </motion.div>

            <motion.div
              className="scene"
              animate={
                stage === "opening"
                  ? { scale: 2.2, opacity: 0.9 }
                  : { scale: 1 }
              }
              style={{ transformOrigin: "50% 60%" }}
              transition={{
                duration: 1.8,
                ease: [0.65, 0, 0.35, 1],
                delay: stage === "opening" ? 0.3 : 0,
              }}
            >
              <RoyalGateway open={stage === "opening"} onClick={enter} />
            </motion.div>

            <motion.p
              className="hint-gold"
              animate={
                stage === "opening"
                  ? { opacity: 0 }
                  : { opacity: [0.6, 1, 0.6], y: [0, -4, 0] }
              }
              transition={
                stage === "opening"
                  ? { duration: 0.3 }
                  : { duration: 2, repeat: Infinity }
              }
              onClick={enter}
            >
              ✨ Darwaza kholne ke liye tap karein ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      {stage === "content" && (
        <main className="page">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-scene"
          >
            <RoyalGateway open onClick={() => {}} />
          </motion.div>

          <motion.div
            className="bismillah"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {guest && (
            <motion.p
              className="dear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Pyare {guest} ✨
            </motion.p>
          )}

          <motion.h1
            className="script names big"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {CARD.groomName}
          </motion.h1>
          <motion.p
            className="par"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {CARD.groomParents}
          </motion.p>

          <motion.div
            className="amp"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 160 }}
          >
            <Heart size={26} fill="#D48373" stroke="none" className="beat" />
          </motion.div>

          <motion.h1
            className="script names big"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {CARD.brideName}
          </motion.h1>
          <motion.p
            className="par"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            {CARD.brideParents}
          </motion.p>

          {/* DIL KI BAAT */}
          <Reveal>
            <section className="card msg">
              <h2 className="title script">Dil ki baat 💌</h2>
              {CARD.message.map((m, i) => (
                <p key={i}>{m}</p>
              ))}
            </section>
          </Reveal>

          {/* SAVE THE DATE */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Save the Date</h2>
              <div
                className="flip"
                onClick={() => setFlip((f) => !f)}
                role="button"
                aria-label="Card palatein"
              >
                <div className={"flip-in" + (flip ? " on" : "")}>
                  <div className="face front">
                    <span className="mini">{dp.month}</span>
                    <strong>{dp.day}</strong>
                    <span className="mini">{dp.year}</span>
                    <small>Palatne ke liye tap karein</small>
                  </div>
                  <div className="face back">
                    <span className="script">{dp.weekday}</span>
                    <b>{fmtTime(CARD.start)}</b>
                    <small>{CARD.eventTitle} ki shaam</small>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* COUNTDOWN */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">
                {done
                  ? "Jashan shuru ho chuka 🎉"
                  : `${CARD.eventTitle} mein baqi`}
              </h2>
              {!done && (
                <div className="count">
                  {units.map(([l, v]) => (
                    <div key={l} className="cbox">
                      <strong>
                        {now === null
                          ? "--"
                          : String(v)
                              .padStart(2, "0")
                              .split("")
                              .map((ch, i) => <Digit key={i} v={ch} />)}
                      </strong>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </Reveal>

          {/* VENUE */}
          <Reveal>
            <section className="sec">
              <h2 className="titleisk script">Royal Venue</h2>
              <div className="card venue">
                <div className="row">
                  <Calendar size={19} className="gold-icon" />{" "}
                  <span>{fmtDate(CARD.start)}</span>
                </div>
                <div className="row">
                  <Clock size={19} className="gold-icon" />{" "}
                  <span>{fmtTime(CARD.start)}</span>
                </div>
                <div className="dash" />
                <div className="row top">
                  <MapPin size={19} className="gold-icon" />
                  <span>
                    <b>{CARD.venue}</b>
                    <br />
                    <small>{CARD.address}</small>
                  </span>
                </div>
                <div className="btns">
                  <a
                    className="btn"
                    href={CARD.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation size={15} /> Raasta dekhein
                  </a>
                  <a
                    className="btn ghost"
                    href={gcalLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarPlus size={15} /> Calendar mein add
                  </a>
                </div>
              </div>
            </section>
          </Reveal>

          {/* PROGRAM */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Shaam ki Manzilein</h2>
              <div className="tower">
                {CARD.program.map((p, i) => (
                  <motion.div
                    key={p.time}
                    className="floor royal-floor"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <span className="fl-ic">{p.icon}</span>
                    <div className="fl-info">
                      <b>{p.time}</b>
                      <span>{p.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* COLORS PALETTE */}
          <Reveal>
            <section className="sec">
              <h2 className="title script">Mehfil ke Rang 🎨</h2>
              <p className="par">
                Aap ka libaas in pyare rangon mein ho to mehfil aur bhi
                khubsurat lagegi.
              </p>
              <div className="colors">
                {CARD.colors.map((c) => (
                  <div
                    key={c.name}
                    className="c-item"
                    style={{ background: c.hex }}
                  >
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* DUA WALL */}
          <Reveal>
            <section className="card wishes">
              <h2 className="title script">Duaon ki Deewar 🤲</h2>
              <form onSubmit={addWish} className="form">
                <input
                  type="text"
                  placeholder="Aap ka naam"
                  value={wName}
                  onChange={(e) => setWName(e.target.value)}
                  className="input"
                />
                <textarea
                  placeholder="Dulha dulhan ke liye pyara sa paigham..."
                  value={wText}
                  onChange={(e) => setWText(e.target.value)}
                  className="input textarea"
                  rows={3}
                />
                <button type="submit" className="btn primary">
                  Paigham bhejein <Send size={15} />
                </button>
              </form>

              <div className="notes">
                {wishes.map((w, idx) => (
                  <motion.div
                    key={idx}
                    className="note"
                    style={{
                      background: NOTE_COLORS[idx % NOTE_COLORS.length],
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p>{w.t}</p>
                    <small>— {w.n}</small>
                  </motion.div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* RSVP */}
          <Reveal>
            <section className="card rsvp">
              <h2 className="title script">Aamad ki Ittela (RSVP) 📝</h2>
              {sent ? (
                <div className="sent-box">
                  <CheckCircle size={40} color="#A3C1AD" />
                  <p>
                    Shukriya! Aap ka paigham WhatsApp par bhej diya gaya hai.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitRSVP} className="form">
                  <input
                    type="text"
                    placeholder="Aap ka naam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                  />
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                      />{" "}
                      Zaroor aaunga/aaungi
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                      />{" "}
                      Mazrat khwah hoon
                    </label>
                  </div>
                  {attending === "yes" && (
                    <select
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="input"
                    >
                      <option value="1">1 Mehman</option>
                      <option value="2">2 Mehman</option>
                      <option value="3">3 Mehman</option>
                      <option value="4">4 Mehman</option>
                    </select>
                  )}
                  <input
                    type="text"
                    placeholder="Koi khaas baat ya dua (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input"
                  />
                  <button type="submit" className="btn primary">
                    WhatsApp par RSVP bhejein <Send size={15} />
                  </button>
                </form>
              )}
            </section>
          </Reveal>

          {/* AMEEN BUTTON */}
          <Reveal>
            <section className="sec center">
              <h2 className="title script">Bismillah aur Dua 🤲</h2>
              <button
                className="btn amin-btn"
                onClick={() => {
                  setAmeen((a) => a + 1);
                  setPopKey((k) => k + 1);
                }}
              >
                <Heart size={18} fill="#D48373" stroke="none" /> Ameen kahein (
                {ameen})
              </button>
            </section>
          </Reveal>

          <footer className="footer">
            <p className="script">
              {CARD.groomName} & {CARD.brideName} ki taraf se intezaar rahega ✨
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

/* ============================ STYLES ============================ */
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #1C151F; color: #EFE6EC; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
.root { min-height: 100vh; position: relative; display: flex; flex-direction: column; align-items: center; }

/* Royal Theme Background & Glow */
.royal-bg { position: fixed; inset: 0; background: radial-gradient(circle at 50% 20%, #2E1E30 0%, #171119 70%, #0F0A11 100%); z-index: -2; }
.layer { position: fixed; inset: 0; pointer-events: none; z-index: -1; overflow: hidden; }

/* Sparkles */
.sparkle-dot { position: absolute; width: 4px; height: 4px; background: #F9D976; border-radius: 50%; box-shadow: 0 0 8px #F9D976; animation: sparkleBlink 3s ease-in-out infinite; }
@keyframes sparkleBlink { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.4); } }

/* Confetti */
.confetti { position: fixed; inset: 0; pointer-events: none; z-index: 999; }

/* Bar & Music */
.bar { position: fixed; top: 0; left: 0; right: 0; height: 4px; background: #E9B646; transform-origin: 0%; z-index: 100; }
.music { position: fixed; top: 16px; right: 16px; width: 42px; height: 42px; border-radius: 50%; background: #2D2130; border: 1px solid #E9B646; color: #E9B646; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 90; box-shadow: 0 4px 15px rgba(233,182,70,0.2); transition: transform 0.2s; }
.music:hover { transform: scale(1.08); }

/* Intro / Gateway */
.intro { position: fixed; inset: 0; background: radial-gradient(circle at 50% 30%, #352338 0%, #1A121C 80%); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 200; padding: 20px; text-align: center; }
.intro-top { margin-bottom: 24px; }
.mini-gold { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 3px; color: #E9B646; display: block; margin-bottom: 6px; font-weight: 600; }
.script { font-family: 'Dancing Script', cursive; font-weight: 700; }
.gold-text { color: #F9D976; text-shadow: 0 2px 10px rgba(249,217,118,0.3); }
.names { font-size: 3.2rem; line-height: 1.1; }
.gateway-wrap { width: 100%; max-width: 340px; cursor: pointer; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5)); }
.gateway-svg { width: 100%; height: auto; }
.hint-gold { margin-top: 28px; font-size: 1rem; color: #E9B646; background: rgba(45,33,48,0.85); padding: 10px 24px; border-radius: 30px; border: 1px solid rgba(233,182,70,0.4); box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer; }

/* Gateway animations */
.pulse-glow { animation: pulseGlow 2s ease-in-out infinite alternate; transform-origin: center; }
@keyframes pulseGlow { from { opacity: 0.4; transform: scale(0.9); } to { opacity: 0.9; transform: scale(1.15); } }
.hanging-lantern { animation: swingLantern 3s ease-in-out infinite alternate; transform-origin: top center; }
@keyframes swingLantern { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.gateway-wrap.opened .door-left.open-l { transform: translateX(-120px) rotateY(-20deg); transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); }
.gateway-wrap.opened .door-right.open-r { transform: translateX(120px) rotateY(20deg); transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); }
.door-left, .door-right { transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); transform-origin: center; }

/* Main Page */
.page { width: 100%; max-width: 600px; padding: 40px 20px 80px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.hero-scene { width: 100%; max-width: 280px; margin-bottom: 24px; }
.bismillah { font-family: 'Amiri', serif; font-size: 1.8rem; color: #F9D976; margin-bottom: 12px; }
.dear { font-size: 1.2rem; color: #D8B9C8; margin-bottom: 16px; font-weight: 600; }
.big { font-size: 3.6rem; color: #F9D976; margin: 4px 0; }
.par { font-size: 0.95rem; color: #C5B3BD; margin-bottom: 8px; }
.amp { margin: 16px 0; display: inline-flex; padding: 12px; background: rgba(212,131,115,0.15); border-radius: 50%; border: 1px solid rgba(212,131,115,0.3); }
.beat { animation: beatHeart 1.2s ease-in-out infinite; }
@keyframes beatHeart { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }

/* Cards & Sections */
.sec { width: 100%; margin: 30px 0; }
.card { width: 100%; background: #251B28; border-radius: 24px; padding: 28px 24px; box-shadow: 0 10px 35px rgba(0,0,0,0.3); margin: 20px 0; border: 1px solid rgba(233,182,70,0.2); }
.title { font-size: 2.2rem; color: #F9D976; margin-bottom: 16px; }
.msg p { font-size: 1.05rem; line-height: 1.7; color: #E2D7E0; margin-bottom: 14px; }
.msg p:last-child { margin-bottom: 0; }

/* Flip Card */
.flip { width: 100%; height: 160px; perspective: 1000px; cursor: pointer; }
.flip-in { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s; }
.flip-in.on { transform: rotateY(180deg); }
.face { position: absolute; inset: 0; backface-visibility: hidden; background: #251B28; border-radius: 20px; border: 1px solid rgba(233,182,70,0.25); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(0,0,0,0.2); padding: 16px; }
.face.back { transform: rotateY(180deg); background: #2B1F2F; }
.face strong { font-size: 2.2rem; color: #F9D976; line-height: 1; margin: 4px 0; }
.face small { font-size: 0.8rem; color: #C5B3BD; margin-top: 6px; }

/* Countdown */
.count { display: flex; gap: 12px; justify-content: center; }
.cbox { background: #251B28; padding: 14px 18px; border-radius: 16px; border: 1px solid rgba(233,182,70,0.25); min-width: 70px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.cbox strong { display: block; font-size: 1.8rem; color: #F9D976; }
.cbox span { font-size: 0.75rem; color: #C5B3BD; text-transform: uppercase; letter-spacing: 1px; }
.dg { display: inline-block; overflow: hidden; height: 1.2em; vertical-align: bottom; }

/* Venue */
.venue .row { display: flex; align-items: center; gap: 12px; margin: 12px 0; color: #E2D7E0; text-align: left; font-size: 1rem; }
.venue .row.top { align-items: flex-start; }
.gold-icon { color: #E9B646; }
.venue .dash { height: 1px; background: rgba(233,182,70,0.2); margin: 16px 0; }
.btns { display: flex; gap: 12px; margin-top: 20px; }
.btn { flex: 1; padding: 12px 16px; background: linear-gradient(135deg, #E9B646 0%, #C69227 100%); color: #1A121C; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 15px rgba(233,182,70,0.3); transition: transform 0.2s, opacity 0.2s; border: none; cursor: pointer; }
.btn:hover { transform: translateY(-2px); opacity: 0.95; }
.btn.ghost { background: transparent; color: #F9D976; border: 1px solid #E9B646; box-shadow: none; }
.btn.ghost:hover { background: rgba(233,182,70,0.1); }

/* Program Tower */
.tower { width: 100%; max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.royal-floor { background: #251B28; border: 1px solid rgba(233,182,70,0.25); border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); text-align: left; }
.fl-ic { font-size: 1.6rem; background: rgba(233,182,70,0.1); padding: 10px; border-radius: 12px; }
.fl-info { display: flex; flex-direction: column; gap: 2px; }
.royal-floor b { font-size: 1.05rem; color: #F9D976; }
.royal-floor span { font-size: 0.85rem; color: #C5B3BD; }

/* Colors */
.colors { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
.c-item { width: 75px; height: 75px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid rgba(233,182,70,0.4); }
.c-item span { font-size: 0.65rem; font-weight: 700; color: #1A121C; background: rgba(255,255,255,0.9); padding: 3px 6px; border-radius: 6px; }

/* Wishes & RSVP Form */
.form { display: flex; flex-direction: column; gap: 14px; margin-top: 16px; }
.input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(233,182,70,0.3); background: #1C151F; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; color: #EFE6EC; outline: none; transition: border-color 0.2s; }
.input:focus { border-color: #E9B646; }
.textarea { resize: vertical; }
.radio-group { display: flex; gap: 20px; justify-content: center; font-size: 0.95rem; color: #E2D7E0; font-weight: 600; margin: 4px 0; }
.radio-group label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.sent-box { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; color: #E2D7E0; font-weight: 600; }

.notes { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; margin-top: 20px; text-align: left; }
.note { padding: 16px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; flex-direction: column; justify-content: space-between; gap: 10px; border: 1px solid rgba(0,0,0,0.1); }
.note p { font-size: 0.9rem; color: #2D2130; line-height: 1.5; font-weight: 600; }
.note small { font-size: 0.75rem; color: #554452; font-weight: 700; text-align: right; }

.center { display: flex; flex-direction: column; align-items: center; }
.amin-btn { max-width: 220px; margin: 0 auto; }

.footer { margin-top: 40px; padding: 20px; color: #C5B3BD; font-size: 1.2rem; }
`;
