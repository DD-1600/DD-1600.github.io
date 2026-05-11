/**
 * Northland Studios — single source of truth for all apps on the site.
 *
 * Adding a new app: append an entry here, drop an icon at
 *   public/icons/<slug>.png   (1024×1024 PNG, app's primary marketing icon)
 * and screenshots at
 *   public/screenshots/<slug>/01.png ... 0N.png   (portrait, 1290×2796 for iPhone 15)
 *
 * The Home page pulls from this list automatically. Per-app pages are routed by `slug`.
 *
 * Categories drive the chip color + filtering. Keep them tight.
 */

export type AppCategory =
  | 'Game'
  | 'Family'
  | 'Productivity'
  | 'Faith'
  | 'Utility'
  | 'Weather';

export type Platform =
  | 'iPhone'
  | 'iPad'
  | 'Mac'
  | 'Watch'
  | 'visionOS';

export interface AppStoreInfo {
  /** App Store ID (digits-only, used by iTunes Lookup API for live ratings). Omit until launched. */
  id?: string;
  /** App Store URL (apps.apple.com). Omit until launched. */
  url?: string;
  /** ISO date or 'YYYY-Q#' shorthand. Drives the "Coming soon" placeholder. */
  expectedRelease?: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  /** 1-line italic-serif tagline (no period in display unless intentional). */
  tagline: string;
  /** 1–2 paragraph blurb shown on per-app page intro. */
  blurb: string;
  /** 1 paragraph used in the Home grid card body (shorter than `blurb`). */
  cardBlurb: string;
  /** Trail number in the park map (display-only; doesn't drive ordering). */
  trailNumber: string;
  categories: AppCategory[];
  /** Primary category drives the chip styling on the home card. */
  primaryCategory: AppCategory;
  platforms: Platform[];
  /** Icon path relative to /public; e.g. /icons/cairn.png. */
  icon: string;
  /** Screenshot labels — used to label placeholder screen frames; swap to real screenshots later. */
  screenshots: { label: string; alt: string }[];
  /** Renaming history shown as a quiet caption. */
  previously?: string[];
  appStore: AppStoreInfo;
  /** Pricing model copy for per-app page sidebar. */
  pricing?: string;
  /** Tech-credit line for press kit / per-app page footer. */
  techCredit?: string;
  /** Source repo path on Daniel's machine (internal only, never rendered). */
  internalRepo?: string;
  /** Long-form "what's interesting" notes for per-app page body. */
  story?: string;
}

/* ────────────────────────────────────────────────────────────────────────── */

export const apps: AppEntry[] = [
  {
    slug: 'cairn',
    name: 'Cairn',
    tagline: 'A small stack of stones to mark your way',
    cardBlurb:
      'Mindful HealthKit fitness tracking — workouts, habits, journal, goals — wrapped in a painted-dawn UI that respects the day you actually had.',
    blurb:
      'Cairn is a calm fitness companion. Workouts pull from HealthKit, habits live in stone chains, journal entries hold what the numbers can’t. It’s the only Northland app on a subscription — because health data deserves to stick around, and because someone has to pay for the trail signs.',
    trailNumber: '01',
    categories: ['Family', 'Productivity'],
    primaryCategory: 'Productivity',
    platforms: ['iPhone', 'iPad', 'Watch'],
    icon: '/icons/cairn.png',
    screenshots: [
      { label: 'Today',   alt: 'Cairn — Today view with workout summary and stone chain' },
      { label: 'Workout', alt: 'Cairn — In-workout screen with Live Activity' },
      { label: 'Chains',  alt: 'Cairn — Habit stone chain detail' },
      { label: 'Journal', alt: 'Cairn — Daily journal entry with HealthKit context' },
    ],
    previously: ['FitTrack'],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: 'Free with Cairn Pro — $4.99/mo · $29.99/yr',
    techCredit: 'SwiftUI · HealthKit · SwiftData · Live Activities · WidgetKit · WatchKit',
    internalRepo: '~/Workout/',
    story:
      'Built around the Stone Chains habit system: every check-in adds a stone to the chain, every miss leaves a gap. The point isn’t to never miss — the point is to look back and see the shape of the season honestly.',
  },
  {
    slug: 'the-roost',
    name: 'The Roost',
    tagline: 'For the family that wants their phone to feel like home',
    cardBlurb:
      'Chore board, shared calendar, quick-tap family chat, family calling — in a cream-paper editorial UI. CloudKit-synced; nobody else gets the data.',
    blurb:
      'The Roost is the family’s shared room on the phone. A chore board everyone can see, a calendar that doesn’t pretend to be a business tool, quick-tap chat for the people who live with you, and family calling that doesn’t need anyone’s Apple ID or anyone else’s server.',
    trailNumber: '02',
    categories: ['Family'],
    primaryCategory: 'Family',
    platforms: ['iPhone', 'iPad', 'Watch'],
    icon: '/icons/the-roost.png',
    screenshots: [
      { label: 'Chore board', alt: 'The Roost — Chore board with assigned cards' },
      { label: 'Calendar',    alt: 'The Roost — Shared family calendar with chores layered in' },
      { label: 'Chat',        alt: 'The Roost — Family chat thread with quick-tap reactions' },
      { label: 'Calling',     alt: 'The Roost — Family calling screen with CallKit handoff' },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: 'Free with optional Roost Pro — calendar history + photo memory roll',
    techCredit: 'SwiftUI · CloudKit + CKShare · MultipeerConnectivity · WebRTC · CallKit',
    internalRepo: '~/projects/the-roost-chores/',
    story:
      'Designed around the Hearth: the cream-paper home screen everyone in the household lands on. Quick-tap chat falls back to MultipeerConnectivity when CloudKit is slow; calling rides WebRTC with CallKit so it feels native, not a "video conferencing" app.',
  },
  {
    slug: 'wagcast',
    name: 'Wagcast',
    tagline: 'Weather, with a dog',
    cardBlurb:
      'A premium weather app with an honest forecast and a golden-retriever mascot who never lies about rain. WeatherKit primary, OpenMeteo fallback, NEXRAD radar.',
    blurb:
      'Wagcast is what happens when you let a dog read the weather. The forecast is real — WeatherKit primary, OpenMeteo fallback, NEXRAD radar overlays for actual storms — but the personality is the point. A mascot who reacts to the conditions, who tells you when the walk is good and when it really isn’t.',
    trailNumber: '03',
    categories: ['Weather', 'Utility'],
    primaryCategory: 'Weather',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/wagcast.png',
    screenshots: [
      { label: 'Forecast',   alt: 'Wagcast — Hourly forecast with mascot reaction' },
      { label: 'Radar',      alt: 'Wagcast — Animated NEXRAD radar layer' },
      { label: 'Walk score', alt: 'Wagcast — Walk-with-the-dog score for the next 6 hours' },
      { label: 'Widget',     alt: 'Wagcast — Home Screen widget showing the day’s mood' },
    ],
    previously: ['Nimbus', 'Cumulus'],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$3.99 paid upfront (or free with $9.99/yr Wagcast Pro pivot — tbd post-launch)',
    techCredit: 'SwiftUI · WeatherKit · Open-Meteo · RainViewer NEXRAD · WidgetKit',
    internalRepo: '~/projects/cumulus-weather/',
    story:
      'Built around the mascot persona system: 12 weather states, 4 mood reactions per state, hand-drawn keyframes that loop softly on the today screen. The forecast layer is rigorous; the mascot layer is what makes you check it.',
  },
  {
    slug: 'peak-pomodoro',
    name: 'Peak Pomodoro',
    tagline: 'Focus, in 25-minute summits',
    cardBlurb:
      'A Pomodoro timer with Live Activities and a Watch app. Five sessions stack into a peak; rest is part of the work, not a guilt.',
    blurb:
      'Peak Pomodoro treats focus as a mountain you climb in 25-minute steps. Live Activities keep the current session on the lock screen and Dynamic Island; the Watch app does the same on your wrist. The break timer doesn’t scold; it lets you take 5 minutes without unlocking your phone again.',
    trailNumber: '04',
    categories: ['Productivity'],
    primaryCategory: 'Productivity',
    platforms: ['iPhone', 'iPad', 'Watch'],
    icon: '/icons/peak-pomodoro.png',
    screenshots: [
      { label: 'Timer',          alt: 'Peak Pomodoro — Focus timer with Live Activity' },
      { label: 'Live Activity',  alt: 'Peak Pomodoro — Lock screen Live Activity' },
      { label: 'Watch',          alt: 'Peak Pomodoro — Watch app session controls' },
      { label: 'Summit',         alt: 'Peak Pomodoro — Daily summit view (5 sessions climbed)' },
    ],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$2.99 paid upfront',
    techCredit: 'SwiftUI · ActivityKit · WatchKit · WidgetKit · App Intents',
    internalRepo: '~/projects/peak-pomodoro/',
    story:
      'The "peak" metaphor came from the Watch app: the Digital Crown twists a topographic contour, each ring a session. Stack five rings, you’ve summited the day. Live Activities use the same contour to show progress at a glance.',
  },
  {
    slug: 'kanban-terminal',
    name: 'Kanban Terminal',
    tagline: 'Your work board, your shell, one window',
    cardBlurb:
      'A Mac Kanban with embedded terminals on each card. For developers who treat their TODO list as a workspace, not a checklist.',
    blurb:
      'Kanban Terminal is a Mac-only Kanban board where every card can hold a terminal. Drag a card to "in progress" and your dev environment is right there — logs scrolling, server running, branch checked out. Drop it back to "done" and the terminals tuck away. Built for the one-person studio: this is how Northland keeps the trails walkable.',
    trailNumber: '05',
    categories: ['Productivity'],
    primaryCategory: 'Productivity',
    platforms: ['Mac'],
    icon: '/icons/kanban-terminal.svg',
    screenshots: [
      { label: 'Board',     alt: 'Kanban Terminal — Three-column board with embedded terminals' },
      { label: 'Card open', alt: 'Kanban Terminal — Card detail with two terminals running' },
      { label: 'Splits',    alt: 'Kanban Terminal — Split-pane terminal inside a card' },
      { label: 'Quick swap', alt: 'Kanban Terminal — Cmd-J quick swap between cards' },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: '$14.99 paid upfront (Mac App Store)',
    techCredit: 'SwiftUI · GRDB · SwiftTerm · NSWindow · Combine',
    internalRepo: '~/projects/kanban-terminal/',
    story:
      'The only macOS-only app in the lineup. Born from frustration with juggling iTerm tabs against a Kanban board in a separate window. The cards are the canonical record; the terminals are scratch space attached to the record.',
  },
  {
    slug: 'northland-noise',
    name: 'Northland Noise',
    tagline: 'Loops for sleep, focus, and quiet rooms',
    cardBlurb:
      'Ambient soundscapes — rain, fan, brown noise, distant thunder, forest birds — mixed, looped, timed. No ads. No subscription.',
    blurb:
      'Northland Noise is a small, quiet utility. Twelve ambient channels you can layer (rain over brown noise; forest birds with a fan in the background), a sleep timer that fades out gently, and a Live Activity that keeps the current mix on your lock screen for the bus ride home.',
    trailNumber: '06',
    categories: ['Utility'],
    primaryCategory: 'Utility',
    platforms: ['iPhone', 'iPad', 'Watch'],
    icon: '/icons/northland-noise.png',
    screenshots: [
      { label: 'Mix',           alt: 'Northland Noise — Channel mixer with rain + fan layered' },
      { label: 'Sleep timer',   alt: 'Northland Noise — Fade-out sleep timer' },
      { label: 'Live Activity', alt: 'Northland Noise — Current mix shown on lock screen' },
      { label: 'Channels',      alt: 'Northland Noise — Channel browser' },
    ],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$1.99 paid upfront',
    techCredit: 'SwiftUI · AVFoundation · ActivityKit · procedural audio synthesis',
    internalRepo: '~/projects/northland-noise/',
    story:
      'Six of the twelve channels are file-based loops (rain, fan, brown noise, white noise, pink noise, ocean). The other six are procedurally generated — distant_thunder, thunderstorm, forest_birds, cafe, library, train — which keeps the bundle small and the loops non-repetitive.',
  },
  {
    slug: 'daydream-retriever',
    name: 'Daydream Retriever',
    tagline: 'A dreamy flap through the soft-edged sky',
    cardBlurb:
      'A golden-retriever-shaped Flappy in a watercolor sky. Flap, dodge, collect, unlock cosmetics. Made by hand for one dog.',
    blurb:
      'A simple arcade flyer about a daydreaming retriever. The controls are one tap; the art is hand-painted; the soundtrack is one slowed-down piano loop. It was originally going to be called Flappy Retriever, but Daydream felt closer to what it actually is when you play it.',
    trailNumber: '07',
    categories: ['Game'],
    primaryCategory: 'Game',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/daydream-retriever.png',
    screenshots: [
      { label: 'Flight',     alt: 'Daydream Retriever — Mid-flight scene with painted clouds' },
      { label: 'Cosmetics',  alt: 'Daydream Retriever — Cosmetic unlocks (bandanas, collars)' },
      { label: 'Daily run',  alt: 'Daydream Retriever — Daily-run summary screen' },
      { label: 'Soft fail',  alt: 'Daydream Retriever — Soft-fail / retry screen' },
    ],
    previously: ['Flappy Retriever'],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$1.99 paid upfront',
    techCredit: 'Capacitor · Phaser · custom paint shader',
    internalRepo: '~/projects/flappy-retriever-ios/',
    story:
      'The dog is Mollie. Every cosmetic is something Mollie has actually worn. The "soft fail" screen exists because traditional flappy game-overs felt cruel against the watercolor palette.',
  },
  {
    slug: 'henhouse-defenders',
    name: 'Henhouse Defenders',
    tagline: 'A cozy tower defense, but the towers are chickens',
    cardBlurb:
      'Tower defense in a watercolor barnyard. Five chicken classes, twelve wave types, hand-drawn weather effects.',
    blurb:
      'Henhouse Defenders is a tower-defense game where the towers are chickens and the foxes are smarter than they look. Five chicken classes (Hen, Rooster, Bantam, Brahma, Silkie), each with a path of upgrades; twelve wave types from "single fox" up to "a thunderstorm and a coyote." It’s designed for short sittings, not all-night runs.',
    trailNumber: '08',
    categories: ['Game'],
    primaryCategory: 'Game',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/henhouse-defenders.png',
    screenshots: [
      { label: 'Wave 4',      alt: 'Henhouse Defenders — Wave 4 mid-fight with chickens deployed' },
      { label: 'Upgrade tree', alt: 'Henhouse Defenders — Chicken upgrade tree' },
      { label: 'Map',         alt: 'Henhouse Defenders — Hand-drawn barnyard map' },
      { label: 'Weather',     alt: 'Henhouse Defenders — Thunderstorm wave effect' },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: '$2.99 paid upfront',
    techCredit: 'SwiftUI · GameplayKit · custom 2D engine',
    internalRepo: '~/projects/henhouse-defenders/',
    story:
      'Distinct from Mollie’s Henhouse (which is a slower sim). Defenders is the action twin: same barnyard, same chickens, but with intent. The art reuses paintbrush textures from Daydream Retriever — same visual register, different verb.',
  },
  {
    slug: 'mollies-henhouse',
    name: "Mollie's Henhouse",
    tagline: 'A cozy chicken-tending sim',
    cardBlurb:
      'Tend chickens. Gather eggs. Repaint the coop. There is no winning state. There is no losing state. There is a chicken named Doris.',
    blurb:
      'Mollie’s Henhouse is a quiet sim about keeping chickens. You feed them. They lay eggs. You sell the eggs. You repaint the coop in a color you picked. The seasons change. Doris molts in autumn. That’s about it.',
    trailNumber: '09',
    categories: ['Game'],
    primaryCategory: 'Game',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/mollies-henhouse.png',
    screenshots: [
      { label: 'Coop',     alt: "Mollie's Henhouse — Painted coop in afternoon light" },
      { label: 'Gather',   alt: "Mollie's Henhouse — Gathering eggs from the nesting boxes" },
      { label: 'Seasons',  alt: "Mollie's Henhouse — Autumn season ambient view" },
      { label: 'Doris',    alt: "Mollie's Henhouse — Doris the chicken close-up" },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: '$1.99 paid upfront',
    techCredit: 'SwiftUI · SpriteKit · custom seasonal lighting',
    internalRepo: '~/projects/mollies-henhouse/',
    story:
      'Sibling to Henhouse Defenders. Same chickens, same coop, completely different verb. Defenders is "deploy and protect"; this is "tend and repaint." Played for ten minutes a day; not designed for marathons.',
  },
  {
    slug: 'cascadia',
    name: 'Cascadia',
    tagline: 'Falling blocks, forest light',
    cardBlurb:
      'A puzzle game in the falling-block tradition, rebranded into a Pacific-northwest visual register. No microtransactions. Ever.',
    blurb:
      'Cascadia is a falling-block puzzle, redrawn in the colors of a forest morning. Calm music, soft particle effects when a line clears, and a long-play mode that lets the speed plateau so you can settle in. The classic mechanic; a quieter room to play it in.',
    trailNumber: '10',
    categories: ['Game'],
    primaryCategory: 'Game',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/cascadia.svg',
    screenshots: [
      { label: 'Play',     alt: 'Cascadia — Mid-game falling blocks against forest backdrop' },
      { label: 'Long-play', alt: 'Cascadia — Long-play mode with plateau speed' },
      { label: 'Clear',    alt: 'Cascadia — Four-line clear with particle effect' },
      { label: 'Seasons',  alt: 'Cascadia — Seasonal palette variant' },
    ],
    previously: ['Tetris (working title)'],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$0.99 paid upfront',
    techCredit: 'Capacitor · Phaser · custom shader for foliage backdrop',
    internalRepo: '~/Documents/Documents/Claude/tetris-ios/',
    story:
      'Currently being rebranded from the working "Tetris" name to match a national-park visual register — the icon now reads as a stand of conifers in cross-section. The mechanic is faithful; the room around it is the differentiator.',
  },
  {
    slug: 'bible-quiz',
    name: 'Bible Quiz',
    tagline: 'New Testament, one question at a time',
    cardBlurb:
      'A quiet study companion for the New Testament — daily questions, gentle scoring, lineage view that connects passages across the gospels.',
    blurb:
      'Bible Quiz is a study companion for the New Testament. Daily multiple-choice questions across the four gospels, Acts, the epistles, and Revelation; gentle scoring that emphasizes the reading, not the streak. The lineage view connects parallel passages so you can see the same story told four ways.',
    trailNumber: '11',
    categories: ['Faith'],
    primaryCategory: 'Faith',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/bible-quiz.png',
    screenshots: [
      { label: 'Daily',    alt: 'Bible Quiz — Daily question card' },
      { label: 'Lineage',  alt: 'Bible Quiz — Parallel-passage lineage view' },
      { label: 'Streaks',  alt: 'Bible Quiz — Gentle streak summary' },
      { label: 'Detail',   alt: 'Bible Quiz — Question detail with cited passages' },
    ],
    previously: ['NT Quiz'],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$1.99 paid upfront',
    techCredit: 'SwiftUI · SwiftData · custom typography for scripture rendering',
    internalRepo: '~/projects/nt-quiz/',
    story:
      'Born as "NT Quiz" — a working title that always felt like an internal codename. The Bible Quiz rename leaves room for an Old Testament expansion without re-bundling, and reads better to someone discovering it cold on the Store.',
  },
  {
    slug: 'bible-trail',
    name: 'Bible Trail',
    tagline: 'Walk the scripture from one end to the other',
    cardBlurb:
      'A literal trail through scripture. Stations, distance markers, a journal at every stop, and a map that fills in as you go.',
    blurb:
      'Bible Trail treats scripture as a literal trail. The Old Testament is the long approach; the gospels are the summit; Acts and the epistles are the descent and the river back home. Stations along the way mark every chapter; the map fills in as you read; the trail journal holds your notes.',
    trailNumber: '12',
    categories: ['Faith'],
    primaryCategory: 'Faith',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/bible-trail.png',
    screenshots: [
      { label: 'Trail map', alt: 'Bible Trail — Map view with filled-in route' },
      { label: 'Station',   alt: 'Bible Trail — Station detail at a chapter marker' },
      { label: 'Journal',   alt: 'Bible Trail — Daily journal entry on the trail' },
      { label: 'Pace',      alt: 'Bible Trail — Reading pace and section progress' },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: '$2.99 paid upfront',
    techCredit: 'SwiftUI · MapKit-inspired custom map · SwiftData',
    internalRepo: '~/projects/bible-trail/',
    story:
      'The trail metaphor literally fits the Northland brand by name. The reading-pace logic borrows from Cairn’s daily-bar pattern: don’t scold a slow day; just show the shape of the week.',
  },
  {
    slug: 'pixel-testament',
    name: 'Pixel Testament',
    tagline: 'A NES-style platformer through the biblical canon',
    cardBlurb:
      '8-bit platformer with chiptune scoring, hand-pixeled sprites, and levels mapped to the major narrative arcs of scripture.',
    blurb:
      'Pixel Testament is a side-scroller about scripture, told in the visual idiom of an 8-bit console game. Hand-pixeled sprites, a chiptune score, levels mapped to the major narratives: Genesis, the Exodus, the Davidic kingdom, the prophets, the gospels, Acts. Thoughtful, family-friendly, made for someone who grew up with both.',
    trailNumber: '13',
    categories: ['Game', 'Faith'],
    primaryCategory: 'Faith',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/pixel-testament.png',
    screenshots: [
      { label: 'Genesis',  alt: 'Pixel Testament — Garden level (Genesis arc)' },
      { label: 'Exodus',   alt: 'Pixel Testament — Reed Sea level (Exodus arc)' },
      { label: 'David',    alt: 'Pixel Testament — Sling shot mechanic (David arc)' },
      { label: 'Title',    alt: 'Pixel Testament — 8-bit title screen' },
    ],
    appStore: { expectedRelease: '2026-Q3' },
    pricing: '$1.99 paid upfront',
    techCredit: 'SpriteKit · custom 8-bit shader · chiptune-style AVAudioEngine score',
    internalRepo: '~/projects/pixel-testament/',
    story:
      'Sister-app to Bible Quiz and Genesis Eden — the three together form Northland’s "faith trio." Pixel Testament is the longest-play of the three; Quiz is the daily companion; Genesis Eden is the short-burst runner.',
  },
  {
    slug: 'genesis-eden',
    name: 'Genesis Eden',
    tagline: 'Run east of Eden, one step ahead of the sword',
    cardBlurb:
      'A short-burst infinite runner set in the immediate aftermath of Genesis 3. Hand-painted, contemplative, three minutes a sitting.',
    blurb:
      'Genesis: Escape from Eden is a short-burst runner set in the immediate aftermath of Genesis 3 — you’re leaving the garden, one step ahead of the sword. Painted backdrops, a quiet ambient soundtrack, and a structure built around three-minute sessions rather than thirty-minute binges. Companion to Pixel Testament and Bible Quiz.',
    trailNumber: '14',
    categories: ['Game', 'Faith'],
    primaryCategory: 'Faith',
    platforms: ['iPhone', 'iPad'],
    icon: '/icons/genesis-eden.png',
    screenshots: [
      { label: 'East of Eden', alt: 'Genesis Eden — Opening run east of the garden' },
      { label: 'Sword',        alt: 'Genesis Eden — Cherubim sword in the rearview' },
      { label: 'Daily',        alt: 'Genesis Eden — Daily-seed run summary' },
      { label: 'Field',        alt: 'Genesis Eden — Field of thorns and thistles' },
    ],
    appStore: { expectedRelease: '2026-Q2' },
    pricing: '$1.99 paid upfront',
    techCredit: 'SpriteKit · hand-painted parallax layers · ambient AVAudioEngine score',
    internalRepo: '~/projects/genesis-action/',
    story:
      'The shortest of Northland’s faith-trio. The point of the short session is the structure of the verse: cast out, blocked from return, walking forward anyway. Three minutes is enough to sit with that.',
  },
];

/* ────────────────────────────────────────────────────────────────────────── */

export function findApp(slug: string): AppEntry | undefined {
  return apps.find((a) => a.slug === slug);
}

export const appSlugs = apps.map((a) => a.slug);

/** Optional: stable category order for the Home grid header. */
export const categoryOrder: AppCategory[] = [
  'Family',
  'Productivity',
  'Weather',
  'Utility',
  'Game',
  'Faith',
];
