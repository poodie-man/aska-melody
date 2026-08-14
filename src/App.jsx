import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [burst, setBurst] = useState(false);
  const [page, setPage] = useState("home");

  const musicRef = useRef(null);

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
        src="/music/our-song.mp3"
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

  <div className="nav-links">

    <button onClick={() => setPage("home")}>
      Home
    </button>

    <button onClick={() => {
      setPage("story");
      window.scrollTo(0, 0);
    }}>
      Story
    </button>

    <button>Gallery</button>
    <button>20 Reasons</button>
    <button>Letter</button>
    <button>Surprise</button>

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
  <div className="story-page">

    <section className="story-intro">

      <div className="story-label">
        {/* ♡ OUR LITTLE STORY ♡ */}
      </div>

      <h1>
        Our Little
        <br />
        <span>Story</span>
      </h1>

      <p>
        Every beautiful story has a beginning...
      </p>

      <button
        className="story-next"
        onClick={() =>
          document.getElementById("chapter-one").scrollIntoView({
            behavior: "smooth"
          })
        }
      >
        🌸 Where It All Began ↓
      </button>

    </section>


    <section id="chapter-one" className="story-chapter">

      <div className="chapter-number">01</div>

      <h2>🌸 Where It All Began</h2>

      <div className="story-card">
        <p>
          This is where our story begins...asdddddddddddddddddddddddddddddddddddddddddddasdasdasdsad
          asjdklasjdklasjdklasjdklasjdaklsdjkalsdasdalksjdaskldjaskldjasdklasjdlkasdjaskldjaskldajsd
          kasjdklasdjaslkdjasdklasjdalksdjasdklasjdklasdjaskl
        </p>
      </div>

      <button
        className="story-next"
        onClick={() =>
          document.getElementById("chapter-two").scrollIntoView({
            behavior: "smooth"
          })
        }
      >
        💗 The Little Moments ↓
      </button>

    </section>


    <section id="chapter-two" className="story-chapter">

      <div className="chapter-number">02</div>

      <h2>💗 The Little Moments</h2>

      <div className="story-card">
        <p>
          Sometimes the smallest moments
          become the best memories.
        </p>
      </div>

      <button
        className="story-next"
        onClick={() =>
          document.getElementById("chapter-three").scrollIntoView({
            behavior: "smooth"
          })
        }
      >
        🎀 My Favorite Memories ↓
      </button>

    </section>


    <section id="chapter-three" className="story-chapter">

      <div className="chapter-number">03</div>

      <h2>🎀 My Favorite Memories</h2>

      <div className="story-card">
        <p>
          These are the moments I'll always remember. 💗
        </p>
      </div>

      <button
        className="story-home"
        onClick={() => {
          setPage("home");
          window.scrollTo(0, 0);
        }}
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