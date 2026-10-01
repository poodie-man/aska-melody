import "./App.css";
import { useEffect, useRef, useState, useMemo } from "react";

// =========================================
// GALLERY DATA
// Edit this array to match your real photos.
// Add or remove entries freely — rows/bulbs
// generate automatically to fit however many
// photos you list here.
// =========================================
const galleryPhotos = [
  { id: 1, src: "/images/gallery/img1.png", caption: "phung phung trip" },
  { id: 2, src: "/images/gallery/img2.png", caption: "" },
  { id: 3, src: "/images/gallery/photo-3.jpg", caption: "" },
  { id: 4, src: "/images/gallery/photo-4.jpg", caption: "" },
  { id: 5, src: "/images/gallery/photo-5.jpg", caption: "" },
  { id: 6, src: "/images/gallery/photo-6.jpg", caption: "" },
  { id: 7, src: "/images/gallery/photo-7.jpg", caption: "" },
  { id: 8, src: "/images/gallery/photo-8.jpg", caption: "" },
  { id: 9, src: "/images/gallery/photo-9.jpg", caption: "" },
  { id: 10, src: "/images/gallery/photo-10.jpg", caption: "" },
  { id: 11, src: "/images/gallery/photo-11.jpg", caption: "" },
  { id: 12, src: "/images/gallery/photo-12.jpg", caption: "" },
  { id: 13, src: "/images/gallery/photo-13.jpg", caption: "" },
  { id: 14, src: "/images/gallery/photo-14.jpg", caption: "" },
  { id: 15, src: "/images/gallery/photo-15.jpg", caption: "" },
  { id: 16, src: "/images/gallery/photo-16.jpg", caption: "" },
  { id: 17, src: "/images/gallery/photo-17.jpg", caption: "" },
  { id: 18, src: "/images/gallery/photo-18.jpg", caption: "" },
  { id: 19, src: "/images/gallery/photo-19.jpg", caption: "" },
  { id: 20, src: "/images/gallery/photo-20.jpg", caption: "" },
  { id: 21, src: "/images/gallery/photo-21.jpg", caption: "" },
  { id: 22, src: "/images/gallery/photo-22.jpg", caption: "" },
  { id: 23, src: "/images/gallery/photo-23.jpg", caption: "" },
  { id: 24, src: "/images/gallery/photo-24.jpg", caption: "" },
  { id: 25, src: "/images/gallery/photo-25.jpg", caption: "" },
  { id: 26, src: "/images/gallery/photo-26.jpg", caption: "" },
  { id: 27, src: "/images/gallery/photo-27.jpg", caption: "" },
  { id: 28, src: "/images/gallery/photo-28.jpg", caption: "" },
  { id: 29, src: "/images/gallery/photo-29.jpg", caption: "" },
  { id: 30, src: "/images/gallery/photo-30.jpg", caption: "" },
  { id: 31, src: "/images/gallery/photo-31.jpg", caption: "" },
  { id: 32, src: "/images/gallery/photo-32.jpg", caption: "" },
  { id: 33, src: "/images/gallery/photo-33.jpg", caption: "" },
  { id: 34, src: "/images/gallery/photo-34.jpg", caption: "" },
  { id: 35, src: "/images/gallery/photo-35.jpg", caption: "" },
  { id: 36, src: "/images/gallery/photo-36.jpg", caption: "" },
  { id: 37, src: "/images/gallery/photo-37.jpg", caption: "" },
  { id: 38, src: "/images/gallery/photo-38.jpg", caption: "" },
  { id: 39, src: "/images/gallery/photo-39.jpg", caption: "" },
  { id: 40, src: "/images/gallery/photo-40.jpg", caption: "" },
  { id: 41, src: "/images/gallery/photo-41.jpg", caption: "" },
  { id: 42, src: "/images/gallery/photo-42.jpg", caption: "" },
  { id: 43, src: "/images/gallery/photo-43.jpg", caption: "" },
  { id: 44, src: "/images/gallery/photo-44.jpg", caption: "" },
  { id: 45, src: "/images/gallery/photo-45.jpg", caption: "" },
  { id: 46, src: "/images/gallery/photo-46.jpg", caption: "" },
  { id: 47, src: "/images/gallery/photo-47.jpg", caption: "" },
  { id: 48, src: "/images/gallery/photo-48.jpg", caption: "" },
  { id: 49, src: "/images/gallery/photo-49.jpg", caption: "" },
  { id: 50, src: "/images/gallery/photo-50.jpg", caption: "" },
];

const BULBS_PER_ROW = 8;
const ROW_WIDTH = 640;

const gradientDefs = [
  { id: "g-amber", glow: "#FAC775", stops: ["#FFF3D6", "#FAC775", "#D89A3E"] },
  { id: "g-rose", glow: "#F09595", stops: ["#FFE7EE", "#F09595", "#D8605F"] },
  { id: "g-pink", glow: "#ED93B1", stops: ["#FFEAF2", "#ED93B1", "#C85C82"] },
  { id: "g-lav", glow: "#AFA9EC", stops: ["#F2F0FF", "#AFA9EC", "#8078C9"] },
  { id: "g-mint", glow: "#5DCAA5", stops: ["#E4FBF3", "#5DCAA5", "#2FA07E"] },
];

function buildRowPath(bulbs) {
  if (!bulbs.length) return "";
  const start = { x: bulbs[0].x - 20, y: bulbs[0].y + 10 };
  let d = `M${start.x},${start.y}`;
  let prev = start;
  bulbs.forEach((b) => {
    const midX = (prev.x + b.x) / 2;
    const midY = Math.max(prev.y, b.y) + 15;
    d += ` Q${midX},${midY} ${b.x},${b.y}`;
    prev = b;
  });
  const last = bulbs[bulbs.length - 1];
  d += ` Q${last.x + 20},${last.y + 15} ${last.x + 40},${last.y + 10}`;
  return d;
}

function buildGalleryRows(totalPhotos) {
  const rows = [];
  let remaining = totalPhotos;
  let globalBulbIndex = 0;

  while (remaining > 0) {
    const count = Math.min(BULBS_PER_ROW, remaining);
    const spacing = ROW_WIDTH / (count + 1);
    const bulbs = [];

    for (let i = 0; i < count; i++) {
      const x = spacing * (i + 1);
      const y = 30 + Math.sin(i * 1.3) * 18;
      const g = gradientDefs[globalBulbIndex % gradientDefs.length];
      bulbs.push({ x, y, grad: g.id, glow: g.glow, stops: g.stops });
      globalBulbIndex++;
    }

    rows.push({ bulbs, pathD: buildRowPath(bulbs) });
    remaining -= count;
  }

  return rows;
}

// =========================================
// 20 REASONS DATA
// Edit each string with a real reason.
// Order = the order they must be tapped in.
// =========================================
const reasons = [
  "Reason #1 — write yours here",
  "Reason #2 — write yours here",
  "Reason #3 — write yours here",
  "Reason #4 — write yours here",
  "Reason #5 — write yours here",
  "Reason #6 — write yours here",
  "Reason #7 — write yours here",
  "Reason #8 — write yours here",
  "Reason #9 — write yours here",
  "Reason #10 — write yours here",
  "Reason #11 — write yours here",
  "Reason #12 — write yours here",
  "Reason #13 — write yours here",
  "Reason #14 — write yours here",
  "Reason #15 — write yours here",
  "Reason #16 — write yours here",
  "Reason #17 — write yours here",
  "Reason #18 — write yours here",
  "Reason #19 — write yours here",
  "Reason #20 — write yours here",
];

// Generates points tracing a heart shape (parametric heart curve),
// one per reason, in order around the outline.
function buildHeartPoints(count, width, height) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    points.push({
      x: width / 2 + x * (width / 46),
      y: height / 2 - y * (height / 44) - height * 0.05,
    });
  }
  return points;
}

// Builds an 8-point sparkle/star SVG path centered at (cx, cy) with outer radius r.
function buildStarPath(cx, cy, r) {
  const pts = [];
  for (let k = 0; k < 8; k++) {
    const ang = (Math.PI / 4) * k - Math.PI / 2;
    const rad = k % 2 === 0 ? r : r * 0.42;
    pts.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
  }
  return `M${pts.join(" L")} Z`;
}

const CONSTELLATION_WIDTH = 320;
const CONSTELLATION_HEIGHT = 300;

function App() {
  const [started, setStarted] = useState(false);
  const [burst, setBurst] = useState(false);
  const [page, setPage] = useState("home");
  const [openChapter, setOpenChapter] = useState(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyFading, setStoryFading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

const [envelopeOpen, setEnvelopeOpen] = useState(false);
const [typedText, setTypedText] = useState("");

const letterMessage = `Dear Aska,

Every day with you feels like a gift I didn't know I needed.
Thank you for being exactly who you are.

I love you more than words on this page could ever say.

— Yours always`;

useEffect(() => {
  if (!envelopeOpen) return;
  let i = 0;
  const interval = setInterval(() => {
    setTypedText(letterMessage.slice(0, i));
    i++;
    if (i > letterMessage.length) clearInterval(interval);
  }, 35);
  return () => clearInterval(interval);
}, [envelopeOpen]);

  // ---------- 20 REASONS / CONSTELLATION STATE ----------
  const heartPoints = useMemo(
    () => buildHeartPoints(reasons.length, CONSTELLATION_WIDTH, CONSTELLATION_HEIGHT),
    []
  );
  const [nextReasonIndex, setNextReasonIndex] = useState(0);
  const [caption, setCaption] = useState("Tap the first star to begin");
  const [captionFading, setCaptionFading] = useState(false);
  const [wishMoment, setWishMoment] = useState(false);
  const [smallShootingStars, setSmallShootingStars] = useState([]);

  useEffect(() => {
    if (page !== "reasons" || wishMoment) return;

    const interval = setInterval(() => {
      const id = Date.now();
      setSmallShootingStars((stars) => [
        ...stars,
        {
          id,
          top: 10 + Math.random() * 35,
          left: 50 + Math.random() * 40,
        },
      ]);
      setTimeout(() => {
        setSmallShootingStars((stars) => stars.filter((s) => s.id !== id));
      }, 1200);
    }, 2800);

    return () => clearInterval(interval);
  }, [page, wishMoment]);

  const setCaptionText = (text) => {
    setCaptionFading(true);
    setTimeout(() => {
      setCaption(text);
      setCaptionFading(false);
    }, 350);
  };
  const ambientStarData = useMemo(
  () =>
    Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 65,
      delay: Math.random() * 3,
    })),
  []
);

const petalData = useMemo(
  () =>
    Array.from({ length: 18 }).map((_, i) => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 8,
      drift: Math.random() * 70 - 35,
      spin: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.5,
      width: 6 + Math.random() * 6,
      color: i % 2 === 0 ? "#f9c9dc" : "#ffe0ec",
    })),
  []
);

  const handleStarClick = (index) => {
    if (index !== nextReasonIndex) return;

    setCaptionText(reasons[index]);
    setNextReasonIndex((n) => n + 1);

    if (nextReasonIndex + 1 === reasons.length) {
      setTimeout(() => {
        setSmallShootingStars([]);
        setWishMoment(true);
        setCaptionText("make a wish ♡");
      }, 1600);
    }
  };

  // ---------- GALLERY STATE ----------
  const [stackOrder, setStackOrder] = useState(
    () => galleryPhotos.map((p) => p.id)
  );
  const [placedPhotos, setPlacedPhotos] = useState({});
  const [topFlipped, setTopFlipped] = useState(false);

  const galleryRows = useMemo(
    () => buildGalleryRows(galleryPhotos.length),
    []
  );

  // Reset the draw pile every time you (re-)enter the gallery page,
  // so previously-hung photos go back into the stack.
  const resetGallery = () => {
    setStackOrder(galleryPhotos.map((p) => p.id));
    setPlacedPhotos({});
    setTopFlipped(false);
  }

  const topPhotoId = stackOrder[0];

  const attachTopPhoto = () => {
    if (!topPhotoId) return;

    for (let r = 0; r < galleryRows.length; r++) {
      const rowBulbCount = galleryRows[r].bulbs.length;
      const usedInRow = Object.values(placedPhotos).filter(
        (p) => p.row === r
      );

      if (usedInRow.length < rowBulbCount) {
        const usedIndices = usedInRow.map((p) => p.bulbIndex);
        const available = galleryRows[r].bulbs
          .map((_, i) => i)
          .filter((i) => !usedIndices.includes(i));

        const pick = available[0];
        const bulb = galleryRows[r].bulbs[pick];
        const rot = Math.random() * 14 - 7;

        setPlacedPhotos((prev) => ({
          ...prev,
          [topPhotoId]: {
            row: r,
            bulbIndex: pick,
            x: bulb.x,
            y: bulb.y,
            rot,
          },
        }));
        setStackOrder((prev) => prev.slice(1));
        setTopFlipped(false);
        break;
      }
    }
  };

  const musicRef = useRef(null);

  const chapters = [
    {
      id: 1,
      emoji: "🌸",
      title: "Where It All Began",
      text: `Happy Girlfriend's Day, my love. ❤️

Today is all about celebrating you, but honestly, I celebrate you every single day. Thank you for being the reason behind so many of my smiles, for making ordinary moments feel special, and for filling my life with so much warmth and happiness.

No matter where life takes us, I hope you always know how deeply you're loved. You're my favorite person, my safe place, and the one I want to make countless memories with. I can't wait for all the little adventures, late-night talks, hugs, and dreams we'll share together.

I hope today reminds you of just how amazing you are. Thank you for being you. I'm so lucky to call you mine.

Happy Girlfriend's Day, beautiful. I love you more than words could ever express. 💛
).`,
    },
    {
      id: 2,
      emoji: "💗",
      title: "The Little Moments",
      text: "Sometimes the smallest moments become the best memories.",
    },
    {
      id: 3,
      emoji: "🎀",
      title: "My Favorite Memories",
      text: "These are the moments I'll always remember. 💗",
    },
    {
      id: 4,
      emoji: "🎀",
      title: "My Favorite Memories",
      text: "These are the moments I'll always remember. 💗",
    },
       {
      id: 5,
      emoji: "🎀",
      title: "My Favorite Memories",
      text: "These are the moments I'll always remember. 💗",
    },
    
  ];

  const toggleChapter = (id) => {
    setOpenChapter((current) => (current === id ? null : id));
  };

const changePage = (newPage) => {

  const messages = {
    home: "Loading the home page ♡",
    story: "Loading our story ♡",
    gallery: "Opening our memories ♡",
    reasons: "Loading 20 reasons ♡",
    letter: "Opening your letter ♡",
    surprise: "Preparing your surprise ♡"
  };

  setLoadingMessage(messages[newPage] || "Loading ♡");

  setStoryLoading(true);
  setStoryFading(false);

  setTimeout(() => {
    setPage(newPage);
    window.scrollTo(0, 0);
    setStoryFading(true);
  }, 2500);

  setTimeout(() => {
    setStoryLoading(false);
    setStoryFading(false);
  }, 3000);
};

  const handleBegin = async () => {

  // Start music immediately after the click
  try {
    await musicRef.current.play();
  } catch (error) {
    console.log("Music could not start:", error);
  }

  // Small pause before the sparkle explosion
  setTimeout(() => {
    setBurst(true);
  }, 350);

  // Give the sparkle animation time to finish
  setTimeout(() => {
    setStarted(true);
  }, 2200);
};
  return (
    <main className={`birthday-page ${page === "reasons" ? "reasons-active" : ""}`}>
            {/* Background music */}
      <audio
        ref={musicRef}
        src="/music/our-songs.mp3"
        loop
      />
            {/* =====================================
          TAP TO BEGIN OVERLAY
      ====================================== */}

      {!started && (
        <div className={`start-overlay ${burst ? "bursting" : ""}`}>

          {/* Sparkle blast */}
          {burst && (
            <div className="sparkle-burst">

              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
              <span>✦</span>
              <span>✧</span>
            </div>
          )}

          <div className="start-content">

            <div className="start-label">
              ♡ A LITTLE MELODY ♡
            </div>

            <p className="start-subtitle">
              WRITTEN WITH LOVE JUST FOR YOU
            </p>

            <div className="start-character">

              <div className="start-halo"></div>

              <img
                src="/images/melody.gif"
                alt="melody"
                className={burst ? "start-melody zooming" : "start-melody"}
              />

            </div>

            <h2>
              A Little Melody
            </h2>

            <p className="tap-text">
              A little surprise made just for you ♡
            </p>

            <button
              className="tap-button"
              onClick={handleBegin}
            >
              ♡ TAP TO BEGIN ♡
            </button>

          </div>

        </div>
      )}

      {/* =====================================
          STORY PAGE LOADING TRANSITION
      ====================================== */}

      {storyLoading && (
        <div className={`page-loading-overlay ${storyFading ? "fade-out" : ""}`}>
          <img
            src="/images/loading.gif"
            alt="loading"
            className="loading-gif"
          />
          <p className="loading-text">
  {loadingMessage}
</p>
        </div>
      )}

      {/* Floating decorations */}
      
    <div className="decorations">

    <img
        src="/images/cherry.png"
        className="flower f1"
        alt=""
    />

    <span className="heart h1">♥</span>
    <span className="sparkle s1">✦</span>

    <img
        src="/images/cherry.png"
        className="flower f2"
        alt=""
    />

    <span className="heart h2">♥</span>
    <span className="sparkle s2">✦</span>

    <img
        src="/images/cherry.png"
        className="flower f3"
        alt=""
    />

    <span className="heart h3">♥</span>
    <span className="sparkle s3">✦</span>

    <img
        src="/images/cherry.png"
        className="flower f4"
        alt=""
    />

    <span className="heart h4">♥</span>
    <span className="sparkle s4">✦</span>

</div>
<nav className="navbar">

  <div className="logo">
    🎀 <span>Aska</span>
  </div>

  <button
    className="menu-toggle"
    onClick={() => setMenuOpen((open) => !open)}
    aria-label="Toggle menu"
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  <div className={`nav-links ${menuOpen ? "open" : ""}`}>

<button onClick={() => { changePage("home"); setMenuOpen(false); }}>
  Home
</button>

<button onClick={() => { changePage("story"); setMenuOpen(false); }}>
  Story
</button>

<button onClick={() => { changePage("gallery"); setMenuOpen(false); }}>
  Gallery
</button>

<button onClick={() => { changePage("reasons"); setMenuOpen(false); }}>
  20 Reasons
</button>

<button onClick={() => { changePage("letter"); setMenuOpen(false); }}>
  Letter
</button>

<button onClick={() => { changePage("surprise"); setMenuOpen(false); }}>
  Surprise
</button>

  </div>

</nav>

      {/* Main content */}
      {page === "home"&&(
      
     <section
     id="home"
    className={`hero ${started ? "home-visible" : "home-hidden"}`}
>

        {/* Banner */}
        <div className="melody-banner">
          <span>♡</span>
          A LITTLE MELODY
          <span>♡</span>
        </div>

        <div className="banner-subtitle">
          WRITTEN WITH LOVE JUST FOR YOU
        </div>

        {/* Character */}
        <div className="character-area">

          <div className="character-glow"></div>

          {/* Rotating music ring */}
          <div className="music-ring">
            <span>♪</span>
            <span>♫</span>
            <span>♪</span>
            <span>♫</span>
            <span>♪</span>
            <span>♫</span>
          </div>

          <div className="character-circle">

            <img
              src="/images/mymelody.png"
              alt="My Melody"
              className="mymelody"
            />

          </div>

          {/* Pause/music button */}
          <button className="music-button">
            ♪
          </button>

        </div>

        {/* Birthday text */}
        <div className="birthday-content">

          <h1>
            Happy 20th
            <br />
            Birthday
            <br />
            <span>Aska</span>
          </h1>

          <div className="sweet-message">
            🌸 &nbsp; the sweetest melody in my life &nbsp; 🌸
          </div>

          <p>
            You make my world a little softer,
            <br />
            a little brighter, and a lot more beautiful. ❤️
          </p>

          <div className="buttons">

            <button className="primary-button">
              🎵 Begin Our Melody
            </button>

            <button className="secondary-button">
              ♡ Our Memories
            </button>

          </div>

        </div>

      </section>
      )}
  {/* STORY PAGE */}
{page === "story" && (
  <div className={`story-page ${openChapter ? "chapter-open" : ""}`}>

    <section className="story-intro">

      <h1>
        Our Little
        <br />
        <span>Story</span>
      </h1>

      <p>
        Every beautiful story has a beginning... tap a chapter to read it ♡
      </p>

    </section>

    <section className="story-accordion">

      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className={`accordion-item ${openChapter === chapter.id ? "open" : ""}`}
        >

          <button
            className="accordion-header"
            onClick={() => toggleChapter(chapter.id)}
            aria-expanded={openChapter === chapter.id}
          >
            <span className="accordion-number">
              {String(chapter.id).padStart(2, "0")}
            </span>

            <span className="accordion-title">
  <span className="accordion-emoji">{chapter.emoji}</span>
  <span className="accordion-title-text">{chapter.title}</span>
</span>

            <span className="accordion-arrow">▾</span>
          </button>

          <div className="accordion-body">
            <div className="accordion-body-inner">
              <p>{chapter.text}</p>
            </div>
          </div>

        </div>
      ))}

    <button
  className="story-home"
  onClick={() => changePage("home")}
>
  ♡ Back To Home
</button>

    </section>

  </div>
)}

  {/* GALLERY PAGE */}
{page === "gallery" && (
  <div className="gallery-page">

    <section className="gallery-intro">
      <h1>
        Our Little
        <br />
        <span>Gallery</span>
      </h1>
      <p>
        Tap the photo to hang it up ♡
      </p>
    </section>

    {/* Shared gradient/glow defs, used by every row's bulbs */}
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {gradientDefs.map((g) => (
          <radialGradient key={g.id} id={g.id} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={g.stops[0]} />
            <stop offset="55%" stopColor={g.stops[1]} />
            <stop offset="100%" stopColor={g.stops[2]} />
          </radialGradient>
        ))}
        <filter id="softGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
    </svg>

    {/* The draw pile — only the top photo is interactive */}
    <div className="photo-stack">
      {stackOrder.slice(0, 4).map((id, index) => {
        const photo = galleryPhotos.find((p) => p.id === id);
        const isTop = index === 0;
        return (
          <div
            key={id}
            className={`pcard stack-card depth-${index} ${
              isTop && topFlipped ? "flipped" : ""
            }`}
            onMouseEnter={() => isTop && setTopFlipped(true)}
            onMouseLeave={() => isTop && setTopFlipped(false)}
            onClick={() => isTop && attachTopPhoto()}
          >
            <div className="flip-inner">
              <div className="face front">
                <div className="photo">
                  <img src={photo.src} alt="" />
                </div>
              </div>
              <div className="face back">{photo.caption}</div>
            </div>
          </div>
        );
      })}

      {stackOrder.length === 0 && (
        <p className="stack-empty">Every photo is hung up ♡</p>
      )}
    </div>

    {/* Garland rows — fill automatically as photos are attached */}
    <div className="garland-wrap">
      {galleryRows.map((row, rowIndex) => (
        <div className="garland-row" key={rowIndex}>
          <svg
            viewBox={`0 0 ${ROW_WIDTH} 70`}
            className="garland-svg"
            preserveAspectRatio="none"
          >
            <path
              d={row.pathD}
              fill="none"
              stroke="#5A4A3F"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>

          {row.bulbs.map((bulb, i) => (
            <div
              key={i}
              className="bulb-dot"
              style={{
                left: `${(bulb.x / ROW_WIDTH) * 100}%`,
                top: `${bulb.y}px`,
                background: `radial-gradient(circle at 35% 30%, ${bulb.stops[0]}, ${bulb.stops[1]} 55%, ${bulb.stops[2]} 100%)`,
                boxShadow: `0 0 10px 3px ${bulb.glow}`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span className="bulb-cap"></span>
              <span className="bulb-shine"></span>
            </div>
          ))}

          {Object.entries(placedPhotos)
            .filter(([, p]) => p.row === rowIndex)
            .map(([id, p]) => {
              const photo = galleryPhotos.find((ph) => ph.id === Number(id));
              return (
                <div
                  key={id}
                  className="pcard hung-card"
                  style={{
                    left: `${(p.x / ROW_WIDTH) * 100}%`,
                    top: `${p.y + 8}px`,
                    "--rot-a": `${p.rot - 4}deg`,
                    "--rot-b": `${p.rot + 4}deg`,
                  }}
                >
                  <div className="flip-inner">
                    <div className="face front">
                      <div className="photo">
                        <img src={photo.src} alt="" />
                      </div>
                    </div>
                    <div className="face back">{photo.caption}</div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>

    <button
      className="story-home"
      onClick={() => changePage("home")}
    >
      ♡ Back To Home
    </button>
    <button
  className="gallery-restack"
  onClick={resetGallery}
>
  ↺ Restack Photos
</button>
  </div>
)}

{/* 20 REASONS PAGE — heart constellation */}
{page === "reasons" && (
  <div className="reasons-page">

    <div className="constellation-sky">

      {/* Ambient background twinkle stars */}
    <div className="ambient-stars">
  {ambientStarData.map((star, i) => (
    <span
      key={i}
      className="ambient-star"
      style={{
        left: `${star.left}%`,
        top: `${star.top}%`,
        animationDelay: `${star.delay}s`,
      }}
    />
  ))}
</div>

      {/* Realistic multi-puff drifting clouds */}
      <div className="cloud cloud-a">
        <span className="puff" style={{ width: 60, height: 34, left: 0, top: 14 }} />
        <span className="puff" style={{ width: 44, height: 44, left: 26, top: 0 }} />
        <span className="puff" style={{ width: 50, height: 32, left: 58, top: 10 }} />
        <span className="puff" style={{ width: 34, height: 24, left: 84, top: 18 }} />
        <span className="puff" style={{ width: 30, height: 20, left: -14, top: 20 }} />
      </div>
      <div className="cloud cloud-b">
        <span className="puff" style={{ width: 40, height: 24, left: 0, top: 10 }} />
        <span className="puff" style={{ width: 30, height: 30, left: 18, top: 0 }} />
        <span className="puff" style={{ width: 34, height: 22, left: 40, top: 8 }} />
      </div>
      <div className="cloud cloud-c">
        <span className="puff" style={{ width: 52, height: 28, left: 0, top: 12 }} />
        <span className="puff" style={{ width: 38, height: 38, left: 22, top: 0 }} />
        <span className="puff" style={{ width: 42, height: 26, left: 50, top: 10 }} />
        <span className="puff" style={{ width: 26, height: 18, left: 76, top: 16 }} />
      </div>

      {/* Moon */}
      <div className="moon-glow"></div>
      <div className="moon"></div>

      {/* Falling cherry blossom petals */}
     <div className="petal-layer">
  {petalData.map((petal, i) => (
    <span
      key={i}
      className="falling-petal"
      style={{
        left: `${petal.left}%`,
        animationDuration: `${petal.duration}s`,
        animationDelay: `${petal.delay}s`,
        "--drift": `${petal.drift}px`,
        "--spin": `${petal.spin}deg`,
        opacity: petal.opacity,
        width: `${petal.width}px`,
      }}
    >
      <svg viewBox="0 0 20 20">
        <path
          d="M10,0 C15,5 15,15 10,20 C5,15 5,5 10,0 Z"
          fill={petal.color}
        />
      </svg>
    </span>
  ))}
</div>

      {/* Big finale shooting star */}
      {wishMoment && <div className="big-shooting-star"></div>}

      {/* Small periodic shooting stars */}
      {smallShootingStars.map((s) => (
        <div
          key={s.id}
          className="small-shooting-star"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        ></div>
      ))}

      {/* Heart constellation — kept at a fixed proportion so it
          never stretches/squishes on wide screens */}
      <div className="constellation-heart-area">

        <svg
          className="constellation-lines"
          viewBox={`0 0 ${CONSTELLATION_WIDTH} ${CONSTELLATION_HEIGHT}`}
        >
          {heartPoints.slice(0, nextReasonIndex).map((p, i) => {
            if (i === 0) return null;
            const prev = heartPoints[i - 1];
            return (
              <line
                key={i}
                x1={prev.x}
                y1={prev.y}
                x2={p.x}
                y2={p.y}
                stroke="#ffb3d1"
                strokeWidth="1.3"
                opacity="0.85"
              />
            );
          })}
           {nextReasonIndex === reasons.length && (
    <line
      x1={heartPoints[heartPoints.length - 1].x}
      y1={heartPoints[heartPoints.length - 1].y}
      x2={heartPoints[0].x}
      y2={heartPoints[0].y}
      stroke="#ffb3d1"
      strokeWidth="1.3"
      opacity="0.85"
    />
  )}
        </svg>

        <div className="constellation-stars">
          {heartPoints.map((p, i) => {
            const isOpened = i < nextReasonIndex;
            const isNext = i === nextReasonIndex;
            return (
              <svg
                key={i}
                className={`reason-star ${isOpened ? "opened" : ""} ${isNext ? "next" : ""}`}
                viewBox="0 0 20 20"
                style={{
                  left: `${(p.x / CONSTELLATION_WIDTH) * 100}%`,
                  top: `${(p.y / CONSTELLATION_HEIGHT) * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
                onClick={() => handleStarClick(i)}
              >
                <path
                  d={buildStarPath(10, 10, 9)}
                  fill={isOpened ? "#ff8fb8" : "#ffd9ec"}
                />
              </svg>
            );
          })}
        </div>

      </div>

    </div>

  <div className="reasons-note-card">
  <p className={`reasons-caption ${captionFading ? "fading" : ""}`}>
    {caption}
  </p>
</div>
    <button
      className="story-home reasons-home"
      onClick={() => changePage("home")}
    >
      ♡ Back To Home
    </button>

  </div>
)}

{page === "letter" && (
  <div className="letter-page">

    <div className="envelope-scene">

<div className={`envelope ${envelopeOpen ? "opened" : ""}`}>

  <svg className="envelope-svg" viewBox="0 0 280 190" style={{ overflow: "visible" }}>
  <rect x="0" y="0" width="280" height="190" rx="10" fill="#f0a8c4" />

  <polygon className="env-back-flap" points="0,0 280,0 140,-50" fill="#d4537e" />

  <polygon className="env-front-flap" points="0,0 280,0 140,95" fill="#ed93b1" />

  <circle className="env-seal" cx="140" cy="20" r="14" fill="#c43d6b" />

  <path
    className="env-heart"
    d="M140,70 C136,64 125,64 125,74 C125,83 140,93 140,93 C140,93 155,83 155,74 C155,64 144,64 140,70 Z"
    fill="#e0527f"
  />
</svg>

  <div
    className={`letter-paper ${envelopeOpen ? "full-open" : ""}`}
    onClick={() => setEnvelopeOpen(true)}
  >
    <p className="letter-text">{typedText}</p>
  </div>

</div>

      {!envelopeOpen && <p className="envelope-hint">Tap to open ♡</p>}

    </div>

    <button className="story-home" onClick={() => changePage("home")}>
      ♡ Back To Home
    </button>

  </div>
)}
    </main>
  );
}

export default App;