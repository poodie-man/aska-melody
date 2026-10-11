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
      title: "The Days We Almost Lost Each Other",
      text: `The days after that weren't easy.

I was going through a difficult time, and I wasn't really myself.

My energy was low.

My mind was somewhere else.

And communicating became one of the hardest things for me.

I didn't text much.

I didn't talk much.

Sometimes I would want to reach out to you but wouldn't know what to say. Sometimes I would see your messages and just sit there, not knowing how to explain what was going on inside my head.

It wasn't because I didn't care.

I cared.

Probably more than I knew how to handle.

But instead of explaining that, I became quiet.

And silence can create a distance even when you never intended to leave.

You still checked up on me from time to time.

You still tried to see how I was doing.

And honestly, I don't think I appreciated that enough at the time.

You were there even when I wasn't doing a good job of being there myself.

We slowly started drifting.

There were fewer conversations.

Fewer texts.

Fewer moments together.

And somewhere along the way, I started wondering whether maybe we were actually going to lose what we had.

That thought scared me.

Because by then, I had already realized that you weren't just someone I could simply walk away from.

You had become important to me.

I missed talking to you.

I missed seeing you.

I missed our random conversations.

I missed the way we could spend hours together without realizing how much time had passed.

And yet, I still struggled to communicate.

I was caught between wanting you close and not knowing how to let you close enough to understand what I was going through.

Then my birthday came.

April 1st, 2026.

My birthday.

I thought it was going to be another birthday.

I had no idea it would become one of the biggest turning points in our story.

At midnight, you called me to wish me.

Hearing your voice already made me happy, but then you said something that completely caught me off guard.

You told me it was our last day.

And suddenly, my birthday didn't feel like my birthday anymore.

I was confused.

I was panicking.

I didn't understand what was happening.

How could this be our last day?

After everything we had been through, after all the conversations, the memories, the laughs, the rides, the dinners, the arguments—how could we just stop?

I didn't know what to say.

The next morning, we went out to drink tea.

We sat together and talked about everything.

It was one of those conversations where every word felt heavier because we both knew something was about to change.

And then something happened that I still remember so clearly.

You asked me if you could kiss me.

Or maybe you asked if I could kiss you.

Honestly, I don't even remember exactly how the question came out because my brain basically stopped working.

I didn't know if you were joking.

I didn't know if you were serious.

But I kissed you.

I kissed you on your lips.

And my heart was absolutely pounding.

That moment felt unreal.

After everything I had been feeling, everything I had been keeping inside, suddenly I was there with you, kissing you.

And after that, I finally told you how I felt.

I finally let out the feelings I had been carrying for so long.

I didn't want to keep pretending that I didn't care.

I didn't want to keep pretending that I could simply walk away.

Because the truth was simple.

I didn't want to lose you. 💗`,
    },

    {
      id: 6,
      emoji: "🎀",
      title: "The Goodbye We Couldn't Keep",
      text: `
We went home that night, but even after we said goodbye, it didn't feel like the story was over. If anything, it felt like we had reached a point where we finally had to be honest with ourselves about what we wanted.

I kept thinking about everything that had happened that day. The midnight call, the words you said about it being our last day, the tea we had in the morning, and that unexpected kiss that made my heart beat like crazy. Then there was the birthday surprise you had planned for me, the gifts, the pictures, and the way you made me feel special. It was a lot to take in, especially because I had spent so much time trying to understand my own feelings for you.

And then there was the alley.

I could still picture us standing there beneath the moon, talking and kissing as if neither of us wanted that moment to end. We had said goodbye, but somehow, neither of us could truly let go. Maybe we were both scared of what would happen if we stayed, but even more scared of what would happen if we walked away.

When I got home, we started talking again. One conversation became another, and before we knew it, we were talking about everything we hadn't been able to say properly before. I don't think either of us wanted to pretend that we were ready to lose each other. We had tried to put an ending to our story, but our hearts didn't seem to agree with the decision.

Honestly, I was confused too. I had spent so long keeping my feelings to myself, telling myself that I should distance myself, and acting as if I could simply walk away whenever things became complicated. But that night made me realize how difficult it was to imagine my life without you in it.

I didn't want to lose the person I could talk to for hours. I didn't want to lose the person whose messages could change my mood or whose presence could make an ordinary day feel different. I didn't want to lose all the little things we had built without even realizing how much they meant to us.

And I definitely didn't want our story to end just when we were finally beginning to understand what we meant to each other.

So we decided to stay.

We didn't suddenly have every answer. We didn't magically solve every problem or promise that everything would always be easy. We simply chose not to walk away from something that still mattered to both of us.

Looking back, that decision means a lot to me. Sometimes, the most important moments in a relationship aren't the moments when two people first meet or when they finally confess their feelings. Sometimes, they're the moments when everything becomes complicated, leaving would be easier, and yet two people decide to give each other another chance.

That night was one of those moments for us.

My birthday had started with confusion and the fear of losing you. It had given me a kiss I would never forget, a surprise that made me feel incredibly loved, and a goodbye neither of us could finish. But it ended with something I needed even more than all of those things.

It ended with us choosing to continue.

And I am so glad we did, princess. Because if we had walked away that night, I would have missed so many memories that were still waiting for us.

I would have missed the next chapter of our story.

April 5th was only a few days away, and little did I know that another beautiful memory was already waiting for us.
`,
    },
     {
      id: 7,
      emoji: "🎀",
      title: "The Days We Almost Lost Each Other",
      text: `

April 5th, 2026.

A few days after my birthday, we went to Poshon for an event together. After everything that had happened on April 1st, being with you again felt different. We had almost said goodbye to each other, and now here we were, making new memories as if our story had been given another chance.

I don't know if you remember every little detail of that day the way I do, but one moment has stayed with me clearly.

The balcony.

The moonlight.

And you.

There was something about that night that made everything else feel unimportant. We were together, standing beneath the moonlight, close enough to forget about the noise and everything happening around us. I remember looking at you and thinking about how beautiful you looked. Maybe I was already so attached to you that even the smallest moments felt special, but honestly, I didn't want to be anywhere else.

We kissed on that balcony, and I remember how we couldn't seem to get enough of being close to each other. We were completely caught up in the moment, sharing kisses under the moonlight, holding on to each other as if the rest of the world could wait.

It wasn't just the kiss itself that made the memory special. It was everything that had happened before it. The uncertainty, the almost-goodbye, the conversations, and the decision to stay. Knowing that we had nearly lost each other made those moments together feel even more precious.

I think that's one of the things about our story that I will always remember. We didn't arrive at every beautiful moment through a perfect path. Sometimes, we got there after confusion, misunderstandings, and difficult conversations. Sometimes, we had to face the possibility of losing each other before we understood how much we wanted to stay.

And that night reminded me that I was happy we had chosen to keep going.

After that, we continued spending time together, visiting places, going on rides, talking about random things, and finding reasons to meet whenever we could. We didn't need every outing to be a grand date. Sometimes, just being together was enough. We could talk about serious things one moment and tease each other about something completely ridiculous the next.

We talked, we laughed, we made memories, and little by little, you became a bigger part of my everyday life.

I started looking forward to seeing you. I started remembering tiny details about you without even trying. I wanted to know how your day had gone, what had made you happy, and what had bothered you. Even when we weren't physically together, you would cross my mind in the middle of ordinary moments.

I don't think I fully understood how attached I had become until I started realizing how much I wanted more time with you.

More conversations that lasted longer than we planned. More rides where we could talk without worrying about the time. More random pictures. More little dates. More moments when you would look at me and smile, and I would find myself smiling back without even thinking about it.

Of course, everything wasn't perfect. We were still learning about each other, and we still had things to figure out. But there was something comforting about knowing that we had decided to continue instead of ending our story when things became difficult.
`,
    },
     {
      id: 8,
      emoji: "🎀",
      title: "Pokhara",
      text: `May 23rd, 2026.

Pokhara.

I still remember that date because it became one of the most important parts of our story.

We were there with my friends, and there was a Bikki Gurung concert.

We arrived, settled in, and went out to eat Chinese food together. We talked about random things, laughed, and enjoyed being around each other.

But there was something you didn't know.

I had a surprise planned for you.

You love white roses.

So I bought you a bouquet of white roses.

I remember giving it to you and seeing your reaction.

You were genuinely happy.

And honestly, seeing you happy made me happier than anything else.

Sometimes the best part of giving someone a gift isn't the gift itself.

It's their reaction.

And yours was one I wanted to remember.

We eventually got ready and went to the concert.

The music, the crowd, the atmosphere—it was all fun.

But even surrounded by so many people, I was mostly aware of you.

We came back later, had some drinks, talked, laughed, and eventually went to bed.

That night, we got even closer, sharing a kind of intimacy that made the distance between our hearts disappear.

The next days were just as special.

We went kayaking.

We went to a photobooth.

We roamed around Lakeside.

We ate together.

We walked around.

We took pictures.

We talked about everything and nothing.

It felt like we had created our own little world inside Pokhara.

Three days where the outside world didn't really matter.

It was just us enjoying each other's company.

But the moment that stayed with me the most wasn't actually one of the big romantic moments.

But then I got injured.

We went to an amusement park where there was a punching bag challenge. We were supposed to wear gloves, but apparently, I thought I could just punch the bag with my bare hands and get away with it. LMAO. Well, that was a terrible decision because I ended up spraining my hand, and it hurt badly enough that even doing simple things became difficult.

And that's when I saw a side of you that made me fall for you even more.

You didn't hesitate to take care of me. Not even for a moment.

You fed me because using my injured hand was difficult. You helped me change my clothes and even helped me put them on when I couldn't manage everything myself. You helped me shower, applied medicine to my hand, and wrapped it with bandages. You even took my socks off and changed them for me.

I remember all of that. I really do.

Maybe to someone else, those things might sound like ordinary acts of care. But to me, they meant so much more. I was sitting there, unable to do some of the simplest things for myself, and you were right there helping me with all of them. You didn't make me feel awkward about it. You didn't hesitate or act like taking care of me was some kind of burden. You just did what needed to be done because I was hurt.

And honestly, that touched something deep inside me.

I remember watching you take care of me and wondering how I had gotten so lucky to have someone like you beside me. It wasn't about the medicine or the bandages, or even the fact that you helped me with things I would normally do on my own. It was the way you did everything so naturally. You made me feel safe enough to let someone else take care of me, and that feeling meant more than I knew how to explain at the time.

I had already enjoyed being with you. I already loved our conversations, our rides, our little dates, and the way we could turn ordinary moments into something memorable. But seeing you care for me when I was injured made me realize that there was so much more to you than the fun moments we shared.

You weren't only someone I wanted beside me when we were laughing, exploring new places, or enjoying ourselves. You were someone whose kindness showed up when things weren't convenient, someone who could look after me when I wasn't at my best.

And that made my feelings for you grow even stronger.

I think that's one of the things I will always appreciate about you. You showed me care through your actions, not just your words. You didn't need to make a big speech about how much you cared. You showed it by feeding me, helping me get dressed, changing my socks, and making sure I was okay.

Those little things stayed with me because they made me feel loved in a way I will never forget.

After that, we continued exploring Pokhara, and eventually, we found ourselves back at Lakeside, watching the beautiful scenery together. We sat there, talked for hours, and enjoyed the peaceful moment. The sky was changing colors, the lake looked beautiful, and you were right there beside me.

And then we took that picture of us kissing, with the sunset and the lake behind us.

I love that picture because it holds so much more than a beautiful view. When I look at it, I remember the entire trip: the white roses I surprised you with, the concert, the laughter, the little adventures, and the way you took care of me when I couldn't even manage simple things by myself. I remember how close we had become and how much I wanted to keep experiencing life with you.

For a moment, I wished I could pause time. I wanted another morning with you, another walk around Lakeside, another meal together, and another night where we could lie beside each other and talk about absolutely anything.

But our three days were coming to an end, and I wasn't ready to leave.

I had become so used to having you close that the thought of returning to Kathmandu and being apart again felt lonely. I wanted more than a beautiful trip that would eventually become a memory on my phone. I wanted more days with you in my ordinary life, too.

That sunset became a reminder of everything I was beginning to feel. The beauty of being with you, the comfort you gave me, and the little acts of love that made me realize just how deeply I was falling for you.

And as we prepared to leave Pokhara, I carried all of those memories with me.

I didn't know exactly what our future would look like yet. But I knew one thing: I didn't want to stop at making memories with you.

I wanted to keep choosing you, keep learning about you, and keep finding new reasons to fall in love with you.

Because somewhere between that sunset and the way you cared for me when I was hurt, you became someone I wanted more than just beautiful moments with.

I wanted a life where I could experience them with you, again and again.`,
    },
     {
      id: 9,
      emoji: "🎀",
      title: "When Our Little World Came To an End",
      text: `I wish our time in Pokhara could have lasted a little longer.
Those three days meant more to me than just a trip. We went kayaking, visited the photobooth, explored Lakeside, ate together, took pictures, and talked about almost everything. We laughed, teased each other, and enjoyed simply being together. It felt like we had created our own little world where nothing else mattered for a while.
But eventually, we had to return to Kathmandu.
After spending three days sharing the same space, sleeping beside each other, and waking up together, going back to our usual routines felt different. I missed having you around, even for the smallest things. I kept thinking about our conversations, our laughter, the white roses I gave you, and all the little moments that made the trip so special.
And somewhere between those memories, I realized something.
I didn't just want to travel with you or meet you whenever we had free time. I wanted you in my everyday life, too. I wanted the ordinary days, the random conversations, the little adventures, and even the moments when we had nothing special to do. Being with you had started to feel so natural that I wanted more than just temporary moments together.
Pokhara helped me understand how much you had come to mean to me. I didn't know exactly how to explain everything I was feeling, but I knew I didn't want to keep those feelings to myself forever.
I wanted to take another step with you. I wanted to know if you could imagine something more with me, too.
And that was when I started gathering the courage to ask you a question that would change our story forever.`,
    },
     {
      id: 10,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become special because of what happens on them. Others become special because of the person who makes them unforgettable. For me, May 27 will always be one of those dates because it marks the beginning of us.

I still remember how I finally gathered the courage to ask you to be my girlfriend. I didn't want it to be just an ordinary question. I wanted to make that moment special for you, even in my own little way.

So, I knelt down in front of you, holding a Kinder Joy in my hand because I knew how much you loved that chocolate. It might have seemed like such a small gift, but I wanted to give you something that would make you smile. And there I was, on one knee, with your favorite chocolate, ready to ask you the question I had been carrying in my heart.

“Aska, will you be my girlfriend?”

It was such a simple question, but my heart was filled with so many feelings. I wanted you to know that I wasn't asking just because we'd shared beautiful moments together. I was asking because I wanted more of them with you. I wanted to be someone who could love you openly, care for you, and build something real with you.

And when you said yes, you gave me one of the happiest moments of my life.

From that moment, you weren't just the girl I talked to for hours, went on little adventures with, or made beautiful memories beside. You became my girlfriend—the person I wanted to keep learning about, understanding, and growing with.

Of course, I knew being together wouldn't mean everything would suddenly become perfect. We were two different people with different thoughts, feelings, habits, and ways of seeing things. There would be misunderstandings, difficult days, and things we'd need to learn about each other.

But I wanted to learn them with you.

I wanted to know what made you happy, what hurt you, what made you feel loved, and what you needed from me when things weren't going well. I wanted you to know me, too, including the parts of me that sometimes struggled to explain feelings or handle things perfectly.

And if I could go back to that day, knowing everything I know now, I'd still want to ask you that same question.

Because out of all the people I could have met, I'm grateful that our paths crossed. And I'm even more grateful that you said yes.

May 27, 2026—the day we officially became us.❤️`,
    },
    {
      id: 11,
      emoji: "🎀",
      title: "Our Little Adventures",
      text: `If someone asked me what some of my favorite memories with you are, I wouldn't be able to choose just one. We've had so many little adventures together, and each one has given us another memory to keep.

Every time we went somewhere together, we created memories that were special in their own way. Sometimes, we had plans, and other times, we just went with the flow. We talked, we laughed, teased each other, took pictures, and enjoyed being around one another. I loved how even a simple outing could turn into a day I wanted to remember.

Then came Pokhara, a trip that gave us so many memories I'll always keep close to my heart. From surprising you with white roses to going to the Bikki Gurung concert, exploring Lakeside, kayaking, and visiting the photobooth, every little moment became part of our story. Even the unexpected moments, like when I injured my hand and you took care of me, made me appreciate you even more.

And then there was our Phungphung trip.

We originally planned to visit a waterfall, but things didn't go the way we expected because the road had been destroyed by a landslide. Our original plan was ruined, but we didn't want the day to end without going somewhere together. So, instead, we decided to head toward Phungphung.

But even that journey wasn't easy. The road was really bumpy and rough, and the ride wasn't exactly comfortable. Eventually, we decided to stop near a small waterfall instead of continuing further. And honestly, I'm glad we did.

We spent some time there, enjoyed the sound of the flowing water, and took a picture together. It wasn't the waterfall we originally planned to visit, and the day didn't go the way we had imagined, but we still made a memory out of it.

That's something I love about our little adventures. Sometimes, things don't go according to plan, but we can still find something beautiful in the unexpected moments. We didn't need the perfect destination or a perfectly planned day. We just needed to enjoy the time we had together.

After spending some time there, we took our picture and headed back home. It might have been a simple outing, but it's still one of those memories that makes me smile when I think about us.

I love how a simple plan with you can turn into a whole day of memories. We can go somewhere, eat something, take pictures, talk for hours, and somehow make even the most ordinary things feel special. Sometimes, we don't even need a proper plan. Just spending time together is enough.

Our adventures have also shown me different sides of you. I've seen you excited, tired, happy, playful, and sometimes a little moody. I've learned more about how you think, what you enjoy, and the little things that make you smile. And with every memory, I feel like there's still so much more of you left for me to discover.

When I look back at everything we've done together, I don't just see places on a map. I see moments of us growing closer.

And I hope this is only the beginning.

I want more road trips, more spontaneous plans, more sunsets, more pictures, more food adventures, and more days when we forget about the time because we're too busy enjoying each other's company.

There are still so many places I want to visit with you and so many memories I want us to make.

And wherever we go next, I hope one thing stays the same: you beside me, me beside you, and another little adventure waiting for us.`
 },
  {
      id: 12,
      emoji: "🎀",
      title: "The Little Things I Love About You",
      text: `Aska, if you ever ask me what I love about you, I honestly don't know where I would begin. There's so much I could say that I don't think one chapter would ever be enough.

I love your smile. I love your laugh and the little giggles you make when something genuinely amuses you. I love looking into your eyes and seeing the person who has become so important to me. Sometimes, I catch myself looking at you and wondering how someone can be so beautiful without even trying.

But it's not only your appearance that makes me love you.

I love the way you act like a little child when you're hungry, upset, happy, or excited. I love how your mood changes when something makes you happy and how you can be so playful without even realizing it. Those little moments make you you, and they're the things I want to keep remembering.

I love your humor, your personality, and the way you think. I love hearing your opinions and learning how you see the world. I love your kindness, especially when I see you caring for other people and feeding street dogs and cats. It shows me a side of your heart that I genuinely admire.

I love how patient you can be with me, even when I'm being difficult. I love how you listen to me, encourage me, and motivate me when I need it. I love how you compliment me whenever we meet and how you sometimes notice that something is wrong before I even explain it.

And I love the way you care. The way you check on me, make time for me, and try to understand what I'm feeling means more than I can properly explain.

I know I might not always express my appreciation in the best way, but please don't ever think that I don't notice these things. I notice more than you realize, and I carry so many of those little moments with me.

I love the big things about you, but I also love the tiny things that might seem unimportant to everyone else.

Because all those little things come together to make the person I fell in love with.

And that person is you.`
 },
  {
      id: 13,
      emoji: "🎀",
      title: "The Way You Make Ordinary Days Special",
      text: `One thing I've learned from being with you is that a day doesn't need to be extraordinary to become a beautiful memory.

Sometimes, the best moments are the simplest ones. Going out together, eating our favorite food, taking a ride, sitting somewhere and talking, or spending time together without having anything special planned. Those moments might not seem like much when they're happening, but they become precious when I look back at them.

I love our conversations, especially when one random topic turns into an hour-long discussion about something completely different. We talk, we laugh, we tease each other, and sometimes we say the most ridiculous things. Somehow, even the most random conversations become something I look forward to.

I love the time we spend together when neither of us has to pretend to be anything other than ourselves. We can be silly, quiet, tired, excited, or completely random. We don't always need to do something exciting. Sometimes, simply being around you is enough to make my day better.

And then there are our calls and messages. Even when we're not physically together, hearing from you can make me feel closer to you. A little message, a random update about your day, or a conversation before sleeping can mean so much more than you might think.

Of course, life doesn't always allow us to spend as much time together as we'd like. We have responsibilities, plans, and days when we're both busy or tired. But even then, the little ways we stay connected matter to me.

I don't expect every day with us to feel like a date or a trip. I know real life doesn't work that way. What I want is to keep finding happiness in the ordinary days, too.

Because one day, when we look back at our relationship, I don't think we'll remember only the big occasions. We'll remember the random rides, the silly jokes, the meals we shared, the conversations that went on for hours, and the days when doing nothing together somehow felt like everything.

And if I get to share those ordinary days with you, I think I'll have plenty of reasons to be happy.`
 },
    
  {
      id: 14,
      emoji: "🎀",
      title: " Learning Through the Difficult Days",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 15,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 16,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 17,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 18,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 19,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
 },
    
  {
      id: 20,
      emoji: "🎀",
      title: "The Day You Became My Girlfriend",
      text: `May 27, 2026.

Some dates become specia`
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