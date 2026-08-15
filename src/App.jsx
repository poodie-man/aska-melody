import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [burst, setBurst] = useState(false);
  const [page, setPage] = useState("home");
  const [openChapter, setOpenChapter] = useState(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyFading, setStoryFading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <main className="birthday-page">
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
    </main>
  );
}

export default App;