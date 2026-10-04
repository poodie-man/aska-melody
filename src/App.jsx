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
  { id: 1, src: "/images/gallery/img1.png", caption: "5th december, 2025. Our first concert together." },
  { id: 2, src: "/images/gallery/firstthakali.png", caption: "31st December, 2025. New Year Eve." },
  { id: 3, src: "/images/gallery/firsthaircut.png", caption: "20th January, 2026. Mero kapal katna gako sangai first time." },
  { id: 4, src: "/images/gallery/firstflower.png", caption: "27th March, 2026. Lets say maile first flower deko timlai XD." },
  { id: 5, src: "/images/gallery/me1.png", caption: "1st April, 2026. My birthday (Memorable day of my life)." },
  { id: 6, src: "/images/gallery/me2.png", caption: "We do look like a married couple!" },
  { id: 7, src: "/images/gallery/me3.png", caption: "A cute cheek kiss for my beautiful girlfriend" },
  { id: 8, src: "/images/gallery/me4.png", caption: "Cutie :3" },
  { id: 9, src: "/images/gallery/poshon.png", caption: "5th April, 2026. Our first event together. We look hot😩." },
  { id: 10, src: "/images/gallery/kulekhani1.png", caption: "1st May, 2026. Kulekhani trip." },
  { id: 11, src: "/images/gallery/nail.png", caption: "18th May, 2026. 'R'🤭." },
  { id: 12, src: "/images/gallery/pokhara1.png", caption: "23rd May, 2026. Pokhara trip together💗." },
  { id: 13, src: "/images/gallery/pokhara2.png", caption: "24th May, 2026. A cute lip kiss for my beautiful girlfriend :3" },
  { id: 14, src: "/images/gallery/pokhara3.png", caption: "Aiyuu buda budi vibes😭" },
  { id: 15, src: "/images/gallery/pokhara4.png", caption: "25th May, 2026. Sunsetz by Cigarette after Sex" },
  { id: 16, src: "/images/gallery/pokhara5.png", caption: "25th May, 2026. Bhigi billi bhayo aiyu😭" },
  { id: 17, src: "/images/gallery/pokhara6.png", caption: "“With the sunset behind us and your lips on mine, the whole world felt still. ❤️”" },
  { id: 18, src: "/images/gallery/pokhara7.png", caption: "love paryooo huhu" },
  { id: 19, src: "/images/gallery/catcafe1.png", caption: "7th June, 2026. We went to see our children😘" },
  { id: 20, src: "/images/gallery/catcafe2.png", caption: "Lets eat sandwich together :3" },
  { id: 21, src: "/images/gallery/heaven1.png", caption: "12th July, 2026. Heaven dadha ma heavenly huggiee😘" },
  { id: 22, src: "/images/gallery/heaven2.png", caption: "Heavenly kiss😘" },
  { id: 23, src: "/images/gallery/phungphung1.png", caption: "23rd July, 2026. Phungphung trip." },
  { id: 24, src: "/images/gallery/phungphung2.png", caption: "Hami jhandai ghar napugeko yo din aiyaa😭" },
  { id: 25, src: "/images/gallery/phungphung3.png", caption: "Omgg look at the view🤭" },
  { id: 26, src: "/images/gallery/phungphung4.png", caption: "Tmi kina sad ni ani ma chai feri kasto khusi😭" },
  { id: 27, src: "/images/gallery/phungphung5.png", caption: "I JUST WANT TO KISS YOU EVERYTIME" },
  { id: 28, src: "/images/gallery/phungphung6.png", caption: "It was a fun trip heehehe." },
  { id: 29, src: "/images/gallery/nagarkot1.png", caption: "2nd August, 2026. Nagarkot💗." },
  { id: 30, src: "/images/gallery/nagarkot2.png", caption: "Bokdekore amamama." },
  { id: 31, src: "/images/gallery/nagarkot3.png", caption: "Waterfall wasnt that impressive but we look cute :3." },
  { id: 32, src: "/images/gallery/nagarkot4.png", caption: "Buda budi fr." },
  { id: 33, src: "/images/gallery/1.png", caption: "Malai cute lagne photo haruu💞" },
  { id: 35, src: "/images/gallery/2.png", caption: "Cutu le burger khanu ateko re golveda nikalera" },
  { id: 36, src: "/images/gallery/3.png", caption: "Tutu and his mami together 😘" },
  { id: 37, src: "/images/gallery/4.png", caption: "I love to kuchumuchu your cheeks sou much" },
  { id: 38, src: "/images/gallery/5.png", caption: "Aiyu kati cute hauu." },
  { id: 39, src: "/images/gallery/6.png", caption: "Omg we slayinggg.😩" },
  { id: 40, src: "/images/gallery/7.png", caption: "Lets make our hair :3" },
  { id: 41, src: "/images/gallery/8.png", caption: "Thulo cha feri maya ko maan pani" },
  { id: 42, src: "/images/gallery/9.png", caption: "LET ME SLEEP IN PEACE.😭" },
  { id: 43, src: "/images/gallery/10.png", caption: "Mirror selfie ree ammaa waist ma haat halera aajha" },
  { id: 44, src: "/images/gallery/11.png", caption: "Timro jutta kasto seto ho wth 😭" },
  { id: 45, src: "/images/gallery/12.png", caption: "What am i doing😭" },
  { id: 46, src: "/images/gallery/13.png", caption: "Vroom Vroom!!" },
  { id: 47, src: "/images/gallery/14.png", caption: "Omgg my two cuties especially youu loveee you're so cuteeee🥺." },
  // { id: 48, src: "/images/gallery/15.png", caption: "" },
  // { id: 49, src: "/images/gallery/16.png", caption: "" },
  // { id: 50, src: "/images/gallery/17.png", caption: "" },
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

// Generates points tracing a stylized Scorpio constellation shape
// (the classic "hook" with claws at the head and a curled stinger tail).
const SCORPIO_LAYOUT = [
  { x: 0.683, y: 0.165 },
  { x: 0.705, y: 0.246 },
  { x: 0.706, y: 0.340 },
  { x: 0.708, y: 0.426 },
  { x: 0.650, y: 0.281 },
  { x: 0.594, y: 0.316 },
  { x: 0.554, y: 0.338 },
  { x: 0.518, y: 0.387 },
  { x: 0.484, y: 0.470 },
  { x: 0.450, y: 0.553 },
  { x: 0.443, y: 0.663 },
  { x: 0.436, y: 0.774 },
  { x: 0.398, y: 0.789 },
  { x: 0.360, y: 0.804 },
  { x: 0.308, y: 0.807 },
  { x: 0.256, y: 0.809 },
  { x: 0.201, y: 0.733 },
  { x: 0.185, y: 0.651 },
  { x: 0.228, y: 0.648 },
  { x: 0.271, y: 0.644 },
];

const SCORPIO_EDGES = [
  [0, 1], [1, 2], [2, 3],
  [1, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  [14, 15], [15, 16], [16, 17], [17, 18], [18, 19],
];

function buildScorpioPoints(count, width, height) {
  return SCORPIO_LAYOUT.map((p) => ({
    x: p.x * width,
    y: p.y * height,
  }));
}
// Decorative-only stars (the small claw spur) — not part of the
// tappable sequence, just completes the constellation's real shape.
const extraClawStars = [
  { x: 0.588, y: 0.276 },
  { x: 0.595, y: 0.307 },
];
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

Every day with you feels like a gift I didn't know I needed. Thank you for being exactly who you are. I love you more than words on this page could ever say.asdasdasd asdasdas dasd
asdasd
asdasd asdasd asda sdas das dasdas dasd asdas dasd asd as

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
    () => buildScorpioPoints(reasons.length, CONSTELLATION_WIDTH, CONSTELLATION_HEIGHT),
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
      text: `November 27, 2025,
      
      I didn't know it at the time, but that was the day our story really began.

      We first met at my brother's store, and honestly, our first meeting was probably one of the most random beginnings a love story could have.

I asked you if you had weed.

You did.

And you gave me some.

That's how we met. No romantic movie moment, no dramatic first meeting — just me asking you a completely random question and somehow that becoming the first little connection between us.

But later that night, I noticed something.

You had followed me on Instagram.

I saw your follow and decided to text you.

I had no idea that one little message would become the beginning of everything.

You replied, and somehow that simple conversation turned into hours and hours of talking. One topic became another, then another, and before we knew it, we were talking about our lives, our pasts, random things, serious things, and everything in between.

Somehow, talking to you just felt easy.

There was never really a moment where we had nothing to say. We could keep talking for hours without realizing how much time had passed.

And then, only two days later, came our first little adventure.

The Gwarmari Hunt.

We decided to go out in the morning, and what was supposed to be a simple search for gwarmari somehow turned into us walking around for hours looking for it.

We walked and searched and kept looking for a place that had gwarmari. At that point, I think we were probably more determined to find gwarmari than we should have been.

But eventually...

we found it.

After all those walks and all that searching, we finally found a place that had gwarmari. And honestly, I think finally finding it made it taste even better.

We got our gwarmari, and then went to a café in Patan.

We sat down, had some tea, ate our gwarmari, and continued talking.

We talked about our pasts, our lives, the things we'd experienced, and slowly started learning more about each other. It wasn't some extravagant first date. It wasn't perfectly planned.

It was just us.

Walking around for hours.

Looking for gwarmari.

Finally finding it.

Sitting in a café with tea.

Talking about everything and nothing.

And somehow, that simple morning became one of the first memories that really belonged to us.

Eventually, we went home.

At that point, we had only known each other for a few days. We didn't know where everything was going to lead, and we definitely couldn't have imagined all the memories that would come after that morning.

But looking back now, I think there's something really beautiful about how simple it all was.

Our story didn't begin with some perfect romantic moment.

It began with a random meeting, a stupid question, an Instagram follow, one little text, hours of conversations, and a very long search for gwarmari.

And somehow, all those little things brought me closer to you.

November 27, 2025 was just an ordinary day when it started.

But now, it's a date I'll always remember.

Because that was the day I sent you that first text.

And that first text became the beginning of us. ♡

And little did I know, I had just met the girl who would become my princess. 🎀`,
    },
    {
      id: 2,
      emoji: "💗",
      title: "The Little Moments",
      text: `After that, something between us slowly started changing.

We started talking more. Then we started hanging out more. And somehow, without either of us really realizing when it happened, we became close—really close. It wasn't something that happened overnight. It was all those little moments that kept adding up. A random conversation would turn into hours of talking. One plan would turn into another. Brunch became lunch, lunch became a ride, and a ride somehow became another long conversation before going home.

We talked, we laughed, we teased each other, and slowly we started pouring out more and more of ourselves. Things we normally wouldn't tell everyone started becoming things we could tell each other. I started getting comfortable around you in a way that felt different. I could be myself. I didn't always have to think about what to say or how to act. Being around you just felt easy.

And then came December 5th, 2025.

You came to the store where I was working, and I still remember how you looked that day. You had your contact lenses on and you were wearing that black outfit. I remember looking at you and thinking you looked ridiculously adorable. I even have a picture of you from that moment, and honestly, every time I look at it, I remember exactly how I felt seeing you that day.

There was a concert, and we watched it together.

I don't even remember every little detail of the concert anymore, but I remember having fun with you. That's the thing about my memories with you. Sometimes I forget what happened around us, but I never forget how I felt when I was with you.

We were just there together, enjoying the music, talking, laughing, and being ourselves. It felt natural. It felt like something I wanted to keep doing.

But not every part of our story was perfect.

There were times when we slowly started drifting away from each other. Life wasn't exactly kind to either of us during that period. I was going through a difficult time, and you had your own things going on too. I wasn't myself. I had very little energy, and communicating became difficult for me. I wasn't texting much. I wasn't talking much. Sometimes I would disappear into my own thoughts without even realizing how much distance I was creating.

You still checked up on me from time to time.

And honestly, I appreciated it more than I probably showed you.

The truth was, I was lost. I didn't know how to explain what was happening inside my head, so instead of talking about it, I became quiet. And sometimes silence can create a distance even when you don't actually want to be far away from someone.

Days passed like that.

We weren't as close as we had been, and a part of me knew it was happening. But I didn't really know how to stop it. I was dealing with my own problems, and I didn't have the energy to explain them.

Still, somehow, you remained somewhere in the back of my mind.

Even when we weren't talking as much, I never completely stopped thinking about you.

Maybe that was the first sign that you were becoming more important to me than I realized.

I just didn't know it yet.
`,
    },
    {
      id: 3,
      emoji: "🎀",
      title: "A New Year With You",
      text: `After December 5th, we just kept going.

We talked more, hung out more, and somehow became even more comfortable around each other. It was funny because nothing between us had an official name yet, but the connection was definitely there.

We would go out for brunch, grab lunch, go on random rides, sit somewhere and talk for hours, or just find some excuse to see each other. Sometimes we had plans, and sometimes we didn't. But honestly, I didn't really care what we were doing as long as I was with you.

We talked.

We laughed.

We teased each other.

We shared stories.

And slowly, we started pouring out more of ourselves.

There was something about talking to you that made it easy to open up. I could tell you random things about my day, talk about things that were bothering me, or just sit there and talk absolute nonsense with you.

And somehow, hours would pass.

Then came December 31st, 2025.

New Year's Eve.

We went out for dinner together, and honestly, it was such a good night.

We ate together, talked about random things, teased each other, laughed, and took pictures. Nothing extremely dramatic happened that night. It was simply one of those nights where everything felt comfortable.

But sometimes, the simplest memories end up meaning the most.

I remember looking at you that night and just enjoying your company.

There was no pressure.

No need to figure everything out.

No need to give whatever we had a name.

It was just you and me, spending the last night of the year together.

And I think that night quietly became important because it made me realize how much I genuinely enjoyed having you in my life.

Every time we hung out, I felt myself getting closer to you.

Every conversation made me want another conversation.

Every ride made me want another ride.

Every goodbye somehow made me look forward to the next time I would see you.

It was becoming a pattern.

And I didn't mind it.

If anything, I loved it.

Looking back now, I think New Year's Eve was one of those moments where I should have realized just how much you already meant to me.

But I was still figuring myself out.

I didn't know where our story was going.

I didn't know what you thought about me.

I didn't know what we would become.

I just knew that whenever I was with you, I was happy.

And maybe that was enough for me at the time.

The year ended.

2025 became 2026.

And with a new year came more memories, more conversations, and eventually, another unexpected chapter in our story.

Because after New Year's Eve, came your Mustang trip.

And that trip would bring out a feeling in me that I didn't even know I had.

Jealousy.

A feeling I definitely wasn't prepared for.

`,
    },
    {
      id: 4,
      emoji: "🎀",
      title: "The Feeling I Didn't Understand",
      text: `Not long after New Year's, you had your trip to Mustang.

You were going away for five days, and I remember dropping you off at your college that morning.

You were leaving for your trip, and I was there to wave goodbye.

I remember watching you leave and thinking that five days wasn't really that long.

But somehow, it felt long.

I missed you during those five days.

I didn't really tell you, though.

Well... okay, I did tell you once.

I texted you, "I miss you."

LMAO.

That was probably one of the few times I actually admitted it.

The rest of the time, I just kept it to myself.

I wondered what you were doing, where you were going, what you were seeing, and whether you were having fun. I didn't constantly text you or ask for updates, but you were still somewhere in the back of my mind.

Then the five days passed.

You were coming back.

And I went to pick you up from your college.

When I saw you, you were sad because your friend hadn't said goodbye to you before returning home. You told me about it, and I listened.

We got on the scooter and started heading toward your home.

You started telling me about the trip.

You told me about all the fun you had, the places you went, the things you did, and the people you met.

And then you mentioned a guy.

Apparently, you had gotten pretty close to him during the trip.

I don't know what happened inside me at that exact moment.

I just felt something.

It wasn't anger.

It wasn't exactly sadness.

It was this strange feeling in my chest.

Jealousy.

And honestly, I didn't even understand why I was jealous.

Because who was I to feel that way?

We weren't together.

I hadn't told you how I felt.

I hadn't even fully admitted those feelings to myself.

But hearing that someone else had gotten close to you bothered me more than I expected.

I still listened.

I didn't make a scene.

I didn't want to ruin your happiness or make you feel bad about your trip.

I listened to you until we reached your home.

But after I left, I couldn't stop thinking about it.

Why did it bother me?

Why did I care so much?

Why did hearing about another guy make something inside me feel uncomfortable?

I didn't have the answers.

And instead of trying to understand those feelings, I did what I had a habit of doing.

I pulled away.

I thought maybe creating some distance would make things easier.

Maybe if I talked less, I wouldn't feel so much.

Maybe if I wasn't around you as much, I wouldn't get attached.

But the truth was, I never actually wanted to distance myself from you.

That was the confusing part.

I was trying to move away from you while a part of me was constantly looking for a reason to come back.

And after that, things slowly became difficult.

I started going through another rough period.

My energy was low.

My mind was all over the place.

And communicating became harder.

I wasn't texting as much.

I wasn't talking as much.

Sometimes I would see your messages and not know what to say.

Sometimes I wanted to talk to you but didn't have the energy.

And without meaning to, I started creating an even bigger distance between us.

You still checked up on me from time to time.

You still tried to be there.

And I appreciated it more than I probably showed you.

But I was lost.

And I didn't know how to explain what was happening inside me.

That was when we slowly started drifting apart.

Not because we stopped caring.

But because sometimes life gets difficult, and you don't know how to hold onto the people you care about while you're trying to hold yourself together.

`,
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
        <p className="stack-empty"></p>
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
          {SCORPIO_EDGES.map(([a, b], i) => {
  if (a >= nextReasonIndex || b >= nextReasonIndex) return null;
  const p1 = heartPoints[a];
  const p2 = heartPoints[b];
  return (
    <line
      key={i}
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke="#ffb3d1"
      strokeWidth="1.3"
      opacity="0.85"
    />
  );
})}
           {/* {nextReasonIndex === reasons.length && (
    <line
      x1={heartPoints[heartPoints.length - 1].x}
      y1={heartPoints[heartPoints.length - 1].y}
      x2={heartPoints[0].x}
      y2={heartPoints[0].y}
      stroke="#ffb3d1"
      strokeWidth="1.3"
      opacity="0.85"
    />
  )} */}
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

<svg className="envelope-svg-back" viewBox="0 0 280 190" style={{ overflow: "visible" }}>
  <rect x="0" y="0" width="280" height="190" rx="10" fill="#f0a8c4" />
  <polygon className="env-back-flap" points="0,0 280,0 140,-55" fill="#d4537e" />
</svg>

<svg className="envelope-svg-front" viewBox="0 0 280 190" style={{ overflow: "visible" }}>
  <polygon points="0,190 280,190 140,95" fill="#e585a9" />
  <polygon points="0,0 140,95 0,190" fill="#eb9fbf" />
  <polygon points="280,0 140,95 280,190" fill="#eb9fbf" />

  <polygon className="env-front-flap" points="0,0 280,0 140,90" fill="#ed93b1" />

  <circle className="env-seal" cx="140" cy="80" r="14" fill="#c43d6b" />

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