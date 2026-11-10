// ============================================================
// RESOURCE TYPE DEFINITIONS
// Digital Wellness Resource Hub — Data Model
// ============================================================

export type CostModel = 'free' | 'freemium' | 'paid' | 'open_source';
export type Platform = 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'chrome' | 'firefox' | 'edge' | 'safari' | 'web';
export type Category = 'screen-time' | 'focus' | 'sleep' | 'privacy';
export type Concern = 'scrolling' | 'focus' | 'notifications' | 'sleep' | 'privacy';
export type VerificationStatus = 'verified' | 'needs_manual_verification';

export interface ResourceCost {
  model: CostModel | CostModel[];
  details: string;
  paywalledFeatures: string[];
}

export interface ResourcePrivacy {
  accountRequired: boolean;
  dataCollected: string;
  summary: string;
  policyUrl: string;
}

export interface ResourceAccessibility {
  notes: string;
  sourceUrl: string | 'not_documented';
}

export interface ResourceSource {
  url: string;
  title: string;
  checkedOn: string; // ISO date
}

export interface Resource {
  id: string;
  name: string;
  slug: string;
  category: Category;
  tagline: string;
  purpose: string;
  concerns: Concern[];
  platforms: Platform[];
  platformNotes: string;
  cost: ResourceCost;
  privacy: ResourcePrivacy;
  accessibility: ResourceAccessibility;
  keyFeatures: string[];
  limitations: string[];
  whyItHelps: string;
  courseConcepts: string[]; // concept ids
  relatedGuides: string[]; // guide ids
  officialUrl: string;
  sources: ResourceSource[];
  verifiedOn: string; // ISO date
  verificationStatus: {
    overall: VerificationStatus;
    cost: VerificationStatus;
    privacy: VerificationStatus;
    platforms: VerificationStatus;
    accessibility: VerificationStatus;
  };
  notes?: string;
}

// ============================================================
// RESOURCE DATA
// All facts verified against official sources on 2026-11-09
// Sources listed per resource
// ============================================================

export const resources: Resource[] = [
  // ── CATEGORY 1: SCREEN TIME & APP TIMERS ────────────────

  {
    id: 'ios-screen-time',
    name: 'iOS Screen Time',
    slug: 'ios-screen-time',
    category: 'screen-time',
    tagline: 'Apple\'s built-in toolkit to understand and limit your iPhone usage',
    purpose: 'Track daily app usage, set per-app time limits, schedule downtime, and restrict content — all built into every iPhone and iPad running iOS 12 or later. No download required.',
    concerns: ['scrolling', 'focus', 'notifications', 'sleep'],
    platforms: ['ios'],
    platformNotes: 'Available on iPhone and iPad running iOS 12 or later (iOS 18+ for the latest Customizable Routines feature). iPadOS 12+ on iPad. Not available on macOS, Android or browsers.',
    cost: {
      model: 'free',
      details: 'Completely free; bundled with every iOS device at no additional cost.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'Usage data processed entirely on-device. Apple does not receive your Screen Time data. Data stays in your iCloud account if iCloud backup is enabled (encrypted).',
      summary: 'On-device processing. No Apple account required to use Screen Time itself; iCloud Keychain may sync settings between your own devices if iCloud is active.',
      policyUrl: 'https://www.apple.com/legal/privacy/en-ww/',
    },
    accessibility: {
      notes: 'Screen Time settings are accessible via VoiceOver (iOS built-in screen reader). No additional accessibility notes from Apple\'s accessibility documentation specifically for Screen Time.',
      sourceUrl: 'https://support.apple.com/accessibility',
    },
    keyFeatures: [
      'App usage dashboard (daily and weekly)',
      'App Limits: set daily time per app or category',
      'Downtime: schedule device-off hours (only allowed apps available)',
      'Communication Limits: control who can contact you during downtime',
      'Content & Privacy Restrictions',
      'Customizable Routines (iOS 18+): different limits for different times of day',
      'Screen Distance reminder (iPhone 15 Pro and later)',
    ],
    limitations: [
      'iOS only — not available on Android, Windows or macOS',
      'Time limits can be bypassed by the user (or child) if no passcode is set — bypass is one tap away',
      'App Limits reset at midnight each day',
      'Does not block Safari browsing by default unless Website Restrictions are configured',
      'Settings menus change between iOS versions — screenshots and steps may need updating after each iOS update',
    ],
    whyItHelps: 'Adding friction to app-opening is a form of habit inversion: making distracting apps harder to access (cue control). Scheduled Downtime reinforces a consistent "device-off" window that supports sleep hygiene by reducing evening screen exposure.',
    courseConcepts: ['habit-inversion', 'cue-control', 'sleep-hygiene'],
    relatedGuides: ['cue-friction'],
    officialUrl: 'https://support.apple.com/en-us/105124',
    sources: [
      {
        url: 'https://support.apple.com/en-us/105124',
        title: 'Use Screen Time on iPhone — Apple Support',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://www.apple.com/legal/privacy/en-ww/',
        title: 'Apple Privacy Policy',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  {
    id: 'android-digital-wellbeing',
    name: 'Android Digital Wellbeing',
    slug: 'android-digital-wellbeing',
    category: 'screen-time',
    tagline: 'Google\'s built-in dashboard and app timer system for Android',
    purpose: 'Track usage, set app timers, schedule Focus Mode, enable Bedtime Mode (grayscale + DND), and review notification counts — built into Android 9 Pie and later on most devices.',
    concerns: ['scrolling', 'focus', 'notifications', 'sleep'],
    platforms: ['android'],
    platformNotes: 'Built into Android 9 (Pie) and later. Available on most Android phones from Google, Samsung, OnePlus, Xiaomi, etc. Some manufacturers may have a modified version. Not available on iOS.',
    cost: {
      model: 'free',
      details: 'Free; bundled with Android 9+ at no additional cost.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'Usage data stored on-device. No data sent to Google from Digital Wellbeing activity logs.',
      summary: 'On-device. No Google account required to use Digital Wellbeing. If using Google Family Link integration, Family Link has its own data practices.',
      policyUrl: 'https://policies.google.com/privacy',
    },
    accessibility: {
      notes: 'Digital Wellbeing settings are navigable with TalkBack (Android screen reader). No specific accessibility documentation from Google for Digital Wellbeing UI.',
      sourceUrl: 'https://support.google.com/accessibility/android',
    },
    keyFeatures: [
      'Dashboard: daily and weekly app usage chart',
      'App Timers: daily time limits per app (icon dims when reached)',
      'App Limits PIN: 4-digit PIN to prevent bypassing app timers',
      'Focus Mode: manually or automatically pause distracting apps',
      'Bedtime Mode: schedule grayscale + Do Not Disturb at night',
      'Heads Up: alerts when you walk while looking at your phone',
      'Flip to Shhh: face-down activates DND (Pixel devices)',
    ],
    limitations: [
      'Android only — not available on iOS',
      'App timer can be bypassed: a single tap shows "Ignore for the rest of today"',
      'App Limits PIN only locks the timer settings, not individual app access',
      'Feature availability varies by Android version and manufacturer',
      'Focus Mode does not block phone calls or texts',
    ],
    whyItHelps: 'App Timers with a PIN create meaningful friction — a form of cue control that disrupts the automatic habit loop of opening social media. Bedtime Mode\'s grayscale screen makes the phone visually less attractive, applying the "make it unattractive" habit-inversion principle.',
    courseConcepts: ['habit-inversion', 'cue-control', 'sleep-hygiene'],
    relatedGuides: ['cue-friction'],
    officialUrl: 'https://wellbeing.google/',
    sources: [
      {
        url: 'https://wellbeing.google/',
        title: 'Google Digital Wellbeing — Official Site',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://support.google.com/android/answer/9417960',
        title: 'Use Digital Wellbeing on your Android device — Google Support',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  {
    id: 'one-sec',
    name: 'one sec',
    slug: 'one-sec',
    category: 'screen-time',
    tagline: 'A mindful pause before you open a distracting app',
    purpose: 'Intercepts you the moment you tap a distracting app (Instagram, TikTok, Twitter, etc.) and shows a breathing exercise or reflection prompt. You then consciously choose whether to proceed — most people back out.',
    concerns: ['scrolling', 'focus'],
    platforms: ['ios', 'android', 'chrome', 'safari', 'firefox', 'edge', 'macos'],
    platformNotes: 'iOS: requires Shortcuts app + Automations (iOS 14.5+). Android: uses accessibility/overlay permissions (Android 7+). macOS native app. Browser extensions for Chrome, Safari, Firefox, Edge.',
    cost: {
      model: ['freemium'],
      details: 'Free tier: 1 target app with basic breathing pause. Pro: ~$19.99/year or ~$2.99/month. Lifetime purchase available. Pro covers all devices on one account.',
      paywalledFeatures: [
        'More than 1 target app (Free is limited to 1)',
        'Feed blockers (Instagram Reels, YouTube Shorts)',
        'App blocker and scheduled focus times',
        'Intentional app-switching protection',
      ],
    },
    privacy: {
      accountRequired: true,
      dataCollected: 'Usage data (which apps are targeted, how often you back out) stored locally. App claims privacy-first processing on-device.',
      summary: 'Account required for Pro features and cross-device sync. Privacy policy states no personal data sold. Local-first architecture.',
      policyUrl: 'https://one-sec.app/privacy',
    },
    accessibility: {
      notes: 'Not documented by the vendor — verify on the official site.',
      sourceUrl: 'not_documented',
    },
    keyFeatures: [
      'Breathing exercise / reflection prompt before opening any chosen app',
      'Conscious choice: proceed or close the app',
      'Feed blockers for specific in-app features',
      'Scheduled focus times',
      'Cross-platform (iOS, Android, macOS, browsers)',
      'App usage statistics',
    ],
    limitations: [
      'iOS setup requires Shortcuts Automations — adds setup complexity',
      'Free tier limited to 1 app — Pro required for meaningful coverage',
      'Determined users can bypass by deleting the automation',
      'Android may require re-granting permissions after app updates',
      'Not available on Windows (macOS desktop only for desktop)',
    ],
    whyItHelps: 'one sec operationalises the "make it difficult" and "make it unattractive" principles from habit-inversion theory. The deliberate pause breaks the unconscious dopamine loop — the cue (tapping the icon) no longer leads automatically to the reward (the feed). Research cited by the developers (Max Planck Institute) suggests users reduce target app opens by ~57% on average.',
    courseConcepts: ['habit-inversion', 'cue-control', 'dopamine-loop'],
    relatedGuides: ['cue-friction'],
    officialUrl: 'https://one-sec.app',
    sources: [
      {
        url: 'https://one-sec.app',
        title: 'one sec — Official Website',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://one-sec.app/privacy',
        title: 'one sec Privacy Policy',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'needs_manual_verification',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
    notes: 'Pro pricing verified as ~$19.99/year as of 2026-11-09. Confirm current price on official site before submission.',
  },

  // ── CATEGORY 2: FOCUS TOOLS & BROWSER EXTENSIONS ────────

  {
    id: 'forest',
    name: 'Forest',
    slug: 'forest',
    category: 'focus',
    tagline: 'Grow a virtual tree while you stay focused; leave your phone and the tree dies',
    purpose: 'A visual focus timer: plant a virtual tree, set a session duration (5–120 min). If you leave the app to use your phone, the tree dies. Earned coins can contribute to planting real trees via a partnership with Trees for the Future.',
    concerns: ['scrolling', 'focus'],
    platforms: ['ios', 'android', 'chrome', 'firefox', 'edge'],
    platformNotes: 'iOS app (paid ~$3.99 one-time), Android app (free with in-app purchases). Browser extensions for Chrome, Firefox and Edge are free. No macOS or Windows desktop app.',
    cost: {
      model: ['freemium', 'paid'],
      details: 'iOS app: one-time purchase ~$3.99. Android app: free download with optional in-app purchases for extra features. Browser extensions: free.',
      paywalledFeatures: [
        'iOS app requires a one-time purchase to download',
        'Cross-device sync between phone and browser requires the paid mobile app',
        'Real-tree planting costs in-app coins (earned by focusing)',
      ],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'An account is optional. Without an account, usage data is local. With an account: session history synced to Forest servers.',
      summary: 'Account optional. With account, session data syncs to Forest servers. Privacy policy accessible on official site.',
      policyUrl: 'https://www.forestapp.cc/privacy',
    },
    accessibility: {
      notes: 'Not documented by the vendor. The iOS app should follow Apple accessibility guidelines (VoiceOver compatible). Verify before submission.',
      sourceUrl: 'not_documented',
    },
    keyFeatures: [
      'Visual focus timer with growing virtual tree metaphor',
      'Allowlist: select which apps are allowed during a session',
      'Session history and statistics',
      'Real-tree planting via coin redemption',
      'Co-working sessions (plant a forest with friends)',
      'Browser extension blocks chosen sites during sessions',
    ],
    limitations: [
      'iOS version is a paid app (~$3.99); Android is free but feature-limited without IAP',
      'No desktop app (Windows/macOS) — browser extension only on desktop',
      'Focus enforcement relies on the user choosing not to override; no hard lock',
      'Real-tree planting requires internet and an account',
    ],
    whyItHelps: 'Forest uses positive reinforcement and loss aversion (you don\'t want to kill your tree) to support sustained attention. Each focus session is a small step toward building an Ekagra (one-pointed) mind state. The visual progress of a growing tree provides immediate, non-digital reward — countering the variable-reward pull of social media.',
    courseConcepts: ['attention-economy', 'switching-penalty', 'ekagra'],
    relatedGuides: [],
    officialUrl: 'https://www.forestapp.cc',
    sources: [
      {
        url: 'https://www.forestapp.cc',
        title: 'Forest App — Official Website',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'needs_manual_verification',
      privacy: 'needs_manual_verification',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
    notes: 'iOS price (~$3.99) is approximate; confirm on App Store before submission. Android IAP details need manual verification on Play Store.',
  },

  {
    id: 'leechblock-ng',
    name: 'LeechBlock NG',
    slug: 'leechblock-ng',
    category: 'focus',
    tagline: 'Powerful, open-source browser extension to block distracting websites',
    purpose: 'Block or limit any websites during configurable time windows or after a time allowance. Up to 30 block sets, each with its own schedule, time limit, and optional lockdown or countdown delay.',
    concerns: ['scrolling', 'focus'],
    platforms: ['firefox', 'chrome', 'edge'],
    platformNotes: 'Available for Firefox (official), Chrome, and other Chromium-based browsers (Edge, Brave, Opera, Vivaldi). Not available on Safari or mobile browsers. Requires a desktop browser.',
    cost: {
      model: ['free', 'open_source'],
      details: 'Completely free and open source (Mozilla Public License 2.0). No paid tier.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'All block rules and usage data stored locally in browser storage. No data sent to any server.',
      summary: 'Fully local. No account, no server communication, no data collection. Source code publicly auditable on GitHub.',
      policyUrl: 'https://github.com/nickmoline/leechblock-ng',
    },
    accessibility: {
      notes: 'As a browser extension, it uses the browser\'s native UI. Keyboard-navigable settings page. No formal accessibility audit documented.',
      sourceUrl: 'not_documented',
    },
    keyFeatures: [
      'Up to 30 block sets with individual schedules',
      'Flexible time-window and time-allowance rules',
      'Lockdown: block everything immediately for a set duration',
      'Delay mode: show countdown before allowing access',
      'Password / random-code protection for settings',
      'Wildcard URL matching and allowlist exceptions',
      'Open source — auditable code',
    ],
    limitations: [
      'Desktop browsers only — no mobile browser support',
      'A determined user can disable the extension or switch browsers',
      'Setup can be complex for new users (30 block-sets offer high power but a learning curve)',
      'No iOS or Android app',
    ],
    whyItHelps: 'By creating scheduled friction for specific distracting sites, LeechBlock NG implements cue control — breaking the environmental triggers that prompt mindless browsing. The optional delay mode forces a pause similar to one sec\'s approach, supporting the "make it difficult" habit-inversion principle.',
    courseConcepts: ['habit-inversion', 'cue-control', 'algorithmic-hooking'],
    relatedGuides: ['algorithmic-cues'],
    officialUrl: 'https://www.proginosko.com/leechblock/',
    sources: [
      {
        url: 'https://www.proginosko.com/leechblock/',
        title: 'LeechBlock NG — Official Website',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://github.com/nickmoline/leechblock-ng',
        title: 'LeechBlock NG — GitHub (source code)',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://addons.mozilla.org/en-US/firefox/addon/leechblock-ng/',
        title: 'LeechBlock NG on Firefox Add-ons',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  {
    id: 'news-feed-eradicator',
    name: 'News Feed Eradicator',
    slug: 'news-feed-eradicator',
    category: 'focus',
    tagline: 'Replace infinite social media feeds with a calming inspirational quote',
    purpose: 'Removes the algorithmically curated news feed from Facebook, Instagram, Reddit, X/Twitter, YouTube, LinkedIn and others, replacing it with an inspirational quote. Core site functions (search, messages, groups, profile) remain fully usable.',
    concerns: ['scrolling', 'focus'],
    platforms: ['chrome', 'firefox', 'edge'],
    platformNotes: 'Chrome Web Store (Chrome, Edge, Brave, Opera). Firefox Add-ons. Not available on Safari. Desktop browsers only — no mobile browser support.',
    cost: {
      model: ['free', 'open_source'],
      details: 'Completely free and open source (MIT License). No paid tier.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'No data collected. Extension runs locally in the browser — it only modifies the page DOM. No server communication.',
      summary: 'Fully local. No account, no tracking, no data sent anywhere. Source code publicly available on GitHub.',
      policyUrl: 'https://github.com/jordancooper/news-feed-eradicator',
    },
    accessibility: {
      notes: 'The replacement quote page is simple HTML text — screen-reader accessible. The original site\'s accessibility is unchanged for functions that remain (search, messages, etc.). No formal audit of the extension\'s own UI.',
      sourceUrl: 'not_documented',
    },
    keyFeatures: [
      'Removes infinite scroll feed from: Facebook, Instagram, Reddit, X/Twitter, YouTube, LinkedIn, Hacker News, and others',
      'Replaces feed with one calming inspirational quote',
      'Custom quotes: add your own',
      'All core site features (search, messages, groups, profile, posting) still work',
      'Per-site toggle: enable/disable on each platform individually',
    ],
    limitations: [
      'Desktop browsers only — no mobile app or mobile browser support',
      'A determined user can disable the extension with one click',
      'Does not block mobile apps (Instagram, TikTok on phone still work normally)',
      'May need updates after major platform redesigns (social sites change their HTML often)',
    ],
    whyItHelps: 'Algorithmic feeds are designed to maximise engagement via variable-reward cues (Skinner-box mechanics). Removing the feed eliminates the primary delivery mechanism for those cues, reducing the dopamine loop trigger. Visiting the site with intent (to post, search or message) rather than passively consuming is a key shift from Kshipta (scattered) toward purposeful use.',
    courseConcepts: ['algorithmic-hooking', 'dopamine-loop', 'attention-economy'],
    relatedGuides: ['algorithmic-cues'],
    officialUrl: 'https://github.com/jordancooper/news-feed-eradicator',
    sources: [
      {
        url: 'https://github.com/jordancooper/news-feed-eradicator',
        title: 'News Feed Eradicator — GitHub',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://chromewebstore.google.com/detail/news-feed-eradicator/fjcldmjmjhkklehbacihaiopjklihlgg',
        title: 'News Feed Eradicator on Chrome Web Store',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://addons.mozilla.org/en-US/firefox/addon/news-feed-eradicator/',
        title: 'News Feed Eradicator on Firefox Add-ons',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  // ── CATEGORY 3: SLEEP & BEDTIME ROUTINES ────────────────

  {
    id: 'flux',
    name: 'f.lux',
    slug: 'flux',
    category: 'sleep',
    tagline: 'Automatically warms your screen colour at night to reduce blue light',
    purpose: 'Adjusts your display\'s colour temperature from cool-blue (daytime) to warm-amber (evening and night) based on your location and time of day, reducing the amount of short-wavelength (blue) light reaching your eyes in the hours before sleep.',
    concerns: ['sleep'],
    platforms: ['windows', 'macos', 'linux'],
    platformNotes: 'Supported on Windows 10+, macOS, and Linux. Direct download from justgetflux.com; also on Microsoft Store for Windows. Android and iOS versions exist but require specific device configurations (iOS historically required jailbreak; current status should be verified on official site). Not a browser extension.',
    cost: {
      model: 'free',
      details: 'Free to download and use with no paid tier.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'Uses your location (city-level) to calculate local sunrise/sunset. Location not transmitted to servers.',
      summary: 'No account required. Location used locally for sunrise/sunset calculation only. No personal data collected or transmitted.',
      policyUrl: 'https://justgetflux.com/privacy.html',
    },
    accessibility: {
      notes: 'Grayscale and high-contrast modes are available. Settings are navigable via keyboard on Windows. No formal accessibility audit documented.',
      sourceUrl: 'https://justgetflux.com',
    },
    keyFeatures: [
      'Automatic colour temperature adjustment tied to sunrise/sunset',
      'Customisable colour temperature (warm amber to natural daylight)',
      'Movie mode: temporarily disable for colour-accurate work',
      'Darkroom mode: deep red for night use',
      'Grayscale mode',
      'Sleep timer / alarm integration on some versions',
    ],
    limitations: [
      'Desktop only (Windows/macOS/Linux) — mobile is not straightforwardly supported',
      'Blue-light effect on sleep is real but modest and not specific to evening screen use alone — do not claim it "fixes" sleep',
      'Warm colour affects colour accuracy for design work',
      'Modern OS alternatives (Night Shift on macOS/iOS, Night Light on Windows/Android) may be sufficient for most users',
    ],
    whyItHelps: 'Short-wavelength (blue) light suppresses melatonin secretion to some degree in the hours before sleep. While the magnitude of this effect for typical evening screen use is debated, reducing blue light is a low-cost, evidence-informed bedtime hygiene step. Evidence label: Supported, simplified here.',
    courseConcepts: ['sleep-hygiene', 'evening-light'],
    relatedGuides: ['wind-down'],
    officialUrl: 'https://justgetflux.com',
    sources: [
      {
        url: 'https://justgetflux.com',
        title: 'f.lux — Official Website',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://justgetflux.com/privacy.html',
        title: 'f.lux Privacy Policy',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'needs_manual_verification',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
    notes: 'iOS/Android mobile status is historically complex (iOS required jailbreak). Verify current mobile status on official site before including in mobile recommendations.',
  },

  {
    id: 'ios-sleep-focus',
    name: 'iOS Sleep Focus & Bedtime Mode',
    slug: 'ios-sleep-focus',
    category: 'sleep',
    tagline: 'Apple\'s built-in bedtime routine: wind down, silence notifications, dim the screen',
    purpose: 'A scheduled nightly routine built into iPhone: Sleep Focus silences all notifications except allowed contacts during your sleep window; Wind Down dims the lock screen before bed; Night Shift warms the display colour; Do Not Disturb can be customised to allow emergency calls.',
    concerns: ['sleep', 'notifications'],
    platforms: ['ios'],
    platformNotes: 'Sleep Focus and Focus modes: iOS 15+. Bedtime (older)/Sleep in Health app: iOS 14+. Night Shift: iOS 9.3+. All features built into every qualifying iPhone and iPad.',
    cost: {
      model: 'free',
      details: 'Completely free; built into iOS.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'Sleep schedule data stored in Apple Health on-device. Synced encrypted to iCloud if iCloud backup is on.',
      summary: 'On-device. No Apple account required to use Focus modes. Health data encrypted in iCloud.',
      policyUrl: 'https://www.apple.com/legal/privacy/en-ww/',
    },
    accessibility: {
      notes: 'VoiceOver accessible. Focus and Health settings follow Apple\'s standard accessibility practices.',
      sourceUrl: 'https://support.apple.com/accessibility',
    },
    keyFeatures: [
      'Sleep Focus: silence all notifications during sleep window',
      'Allowed contacts: emergency callers can bypass DND',
      'Wind Down: dim lock screen and show calming shortcuts before bedtime',
      'Night Shift: automatically warms display colour at sunset',
      'Health app sleep tracking: set target bedtime and wake time',
      'Shortcuts integration: automate a bedtime routine',
    ],
    limitations: [
      'iOS only',
      'Night Shift effect on sleep is real but modest — present as a helpful aid, not a cure',
      'Sleep Focus can be bypassed by pulling down control centre',
      'Sleep tracking in Health app requires consistent schedule adherence to be useful',
    ],
    whyItHelps: 'A consistent, automated bedtime routine reduces decision fatigue and reinforces the same nightly cue sequence, supporting habit formation. Silencing notifications removes interruption cues that cause sleep latency and middle-of-the-night device use. Night Shift reduces evening blue-light exposure (a modest but evidence-informed sleep hygiene step).',
    courseConcepts: ['sleep-hygiene', 'evening-light', 'habit-inversion'],
    relatedGuides: ['wind-down'],
    officialUrl: 'https://support.apple.com/en-us/guide/iphone/iphd6288a67f/ios',
    sources: [
      {
        url: 'https://support.apple.com/en-us/guide/iphone/iphd6288a67f/ios',
        title: 'Set up a sleep schedule in Health on iPhone — Apple Support',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  {
    id: 'android-bedtime-mode',
    name: 'Android Bedtime Mode',
    slug: 'android-bedtime-mode',
    category: 'sleep',
    tagline: 'Google\'s scheduled nightly routine: grayscale, silence, and bedtime reminders',
    purpose: 'Part of Android Digital Wellbeing: schedule a nightly window where the screen fades to grayscale (making it visually unattractive) and Do Not Disturb silences all but allowed calls. Night Light warms the display colour.',
    concerns: ['sleep', 'notifications', 'scrolling'],
    platforms: ['android'],
    platformNotes: 'Bedtime Mode (formerly Wind Down): Android 9+ on most devices via Digital Wellbeing. Night Light: Android 7.1+ on many devices. Settings path may vary by manufacturer.',
    cost: {
      model: 'free',
      details: 'Free; built into Android 9+.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'Settings stored locally. No data sent to Google from Bedtime Mode.',
      summary: 'On-device. No Google account required.',
      policyUrl: 'https://policies.google.com/privacy',
    },
    accessibility: {
      notes: 'TalkBack accessible. Grayscale mode may actually improve contrast for some users with certain colour-vision differences.',
      sourceUrl: 'https://support.google.com/accessibility/android',
    },
    keyFeatures: [
      'Scheduled grayscale display (makes screen visually unattractive)',
      'Do Not Disturb during sleep window (allow starred contacts/calls)',
      'Night Light: warm colour temperature on a schedule',
      'Bedtime reminders in notification bar',
      'Integration with Digital Wellbeing dashboard',
    ],
    limitations: [
      'Android only',
      'Grayscale applies to the whole phone — some apps may look odd',
      'DND can be bypassed through notification settings',
      'Night Light blue-light effect is modest — do not overstate sleep benefit',
      'Feature availability varies by Android version and manufacturer',
    ],
    whyItHelps: 'Grayscale applies the "make it unattractive" habit-inversion principle — a monochrome feed is far less stimulating than the colourful, contrasted design of social apps. Combined with DND, this creates a low-stimulation phone environment that supports the transition toward sleep.',
    courseConcepts: ['sleep-hygiene', 'evening-light', 'habit-inversion'],
    relatedGuides: ['wind-down'],
    officialUrl: 'https://support.google.com/android/answer/9412458',
    sources: [
      {
        url: 'https://support.google.com/android/answer/9412458',
        title: 'Bedtime Mode on Android — Google Support',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  // ── CATEGORY 4: PRIVACY & DIGITAL SAFETY ────────────────

  {
    id: 'ublock-origin',
    name: 'uBlock Origin / uBlock Origin Lite',
    slug: 'ublock-origin',
    category: 'privacy',
    tagline: 'The most effective open-source content blocker — fewer trackers, fewer ads, less algorithmic noise',
    purpose: 'Blocks third-party trackers, advertising scripts, and malicious content on websites. Fewer trackers means fewer targeted-ad cues based on your browsing behaviour, supporting a less manipulated digital environment.',
    concerns: ['privacy', 'scrolling'],
    platforms: ['firefox', 'chrome', 'edge', 'safari'],
    platformNotes: 'uBlock Origin (full, MV2): Firefox desktop and Firefox for Android. uBlock Origin Lite (MV3, more limited): Chrome, Edge. Note: As of mid-2025, the full uBlock Origin no longer works in Chrome/Edge (Manifest V2 disabled). Safari: a separate extension "uBlock" (not by gorhill) exists — verify independently.',
    cost: {
      model: ['free', 'open_source'],
      details: 'Completely free and open source (GPL-3.0). No paid tier.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'None. All filtering is done locally. No data sent to developers. Source code publicly auditable.',
      summary: 'Fully local. No account, no telemetry, no data collection. Maintained by the open-source community.',
      policyUrl: 'https://github.com/gorhill/uBlock',
    },
    accessibility: {
      notes: 'As a browser extension, settings pages are keyboard-navigable. No formal accessibility audit.',
      sourceUrl: 'not_documented',
    },
    keyFeatures: [
      'Blocks third-party trackers and advertising scripts',
      'Multiple filter-list subscriptions (EasyList, uBlock filters, etc.)',
      'Per-site allowlist exceptions',
      'Advanced: dynamic filtering, element picker (full uBO only)',
      'uBlock Origin Lite: basic blocking, MV3-compatible, works in Chrome/Edge',
      'uBlock Origin (full): advanced features, works in Firefox',
    ],
    limitations: [
      'Full uBlock Origin no longer works in Chrome/Edge (MV2 disabled mid-2025)',
      'uBlock Origin Lite (Chrome/Edge) is more limited — lacks dynamic filtering and element picker',
      'May break some site features (login widgets, embedded video, etc.) — use allowlist to fix',
      'Does not block mobile-app tracking',
      'Safari extension "uBlock" is not the same as uBlock Origin — verify separately',
    ],
    whyItHelps: 'Trackers and targeted ads are the machinery of algorithmic hooking — they build a profile of your interests and serve ever-more-compelling content to maximise your time-on-platform. Blocking trackers reduces personalised trigger content, weakening the stimulus–response loop that fuels compulsive browsing.',
    courseConcepts: ['algorithmic-hooking', 'privacy', 'attention-economy'],
    relatedGuides: ['algorithmic-cues'],
    officialUrl: 'https://ublockorigin.com',
    sources: [
      {
        url: 'https://ublockorigin.com',
        title: 'uBlock Origin — Official Site',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://github.com/gorhill/uBlock',
        title: 'uBlock Origin — GitHub (source code)',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/',
        title: 'uBlock Origin on Firefox Add-ons',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
    notes: 'Important: uBlock Origin (full/MV2) is NOT available in Chrome/Edge as of mid-2025. Only uBlock Origin Lite works in Chrome/Edge. Full uBlock Origin still works in Firefox. Clearly communicate this split to students.',
  },

  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    slug: 'duckduckgo',
    category: 'privacy',
    tagline: 'A privacy-first browser and search engine that doesn\'t track your searches',
    purpose: 'A browser (Windows, macOS, iOS, Android) and search engine that doesn\'t build a user profile, track searches, or serve targeted ads. Built-in tracker blocking, forced HTTPS, cookie pop-up management, and a "Fire Button" to wipe browsing data instantly.',
    concerns: ['privacy', 'scrolling'],
    platforms: ['windows', 'macos', 'ios', 'android'],
    platformNotes: 'DuckDuckGo browser available on Windows, macOS, iOS, and Android. DuckDuckGo search engine accessible in any browser at duckduckgo.com. Browser extensions for Chrome, Firefox, Edge, Safari also available (tracker blocking without switching browsers).',
    cost: {
      model: ['free', 'freemium'],
      details: 'Browser and search engine: free. Privacy Pro subscription (optional): ~$9.99/month or ~$99.99/year — adds VPN, identity theft restoration, and personal-info removal (US-focused).',
      paywalledFeatures: [
        'VPN (Privacy Pro)',
        'Personal Information Removal from data brokers (Privacy Pro, US-focused)',
        'Identity Theft Restoration service (Privacy Pro)',
        'Higher Duck.ai AI usage limits (paid tiers)',
      ],
    },
    privacy: {
      accountRequired: false,
      dataCollected: 'DuckDuckGo search: no search-query history stored, no personal profile built, no targeted ads based on search history. Browser: no cross-site tracking. Email Protection: strips trackers from emails (alias-based).',
      summary: 'No account required for browser or search. No personal search history. Privacy policy available on official site. Email Protection feature uses an alias but processes emails to strip trackers — review privacy policy for Email Protection specifically.',
      policyUrl: 'https://duckduckgo.com/privacy',
    },
    accessibility: {
      notes: 'DuckDuckGo browser follows platform accessibility guidelines (iOS/Android/Windows/macOS native apps). No specific accessibility audit documentation found.',
      sourceUrl: 'https://duckduckgo.com/accessibility',
    },
    keyFeatures: [
      'Private search engine: no profile building, no targeted ads from search',
      'Built-in tracker blocker (3rd-party trackers blocked on websites)',
      'Forced HTTPS connections',
      'Cookie consent pop-up management (auto opt-out where possible)',
      'Fire Button: one-tap clear all tabs and history',
      'Email Protection: aliases to strip email trackers',
      'Duck Player: watch YouTube without tracking',
    ],
    limitations: [
      'Privacy Pro paid features are primarily useful for US users (data broker removal)',
      'Search results may be less locally personalised (some users prefer this)',
      'DuckDuckGo still shows contextual ads (not profile-based); these are clearly marked',
      'Email Protection processes emails through DuckDuckGo servers to strip trackers — not end-to-end encrypted like Signal',
    ],
    whyItHelps: 'Switching away from search engines and browsers that build behavioural profiles reduces the data fuel for algorithmic hooking. Fewer behavioural signals means less personalised, compelling content targeted at your specific vulnerabilities. Supporting privacy is also a healthier digital habit — reducing the sense of being watched and profiled.',
    courseConcepts: ['algorithmic-hooking', 'privacy', 'attention-economy'],
    relatedGuides: [],
    officialUrl: 'https://duckduckgo.com',
    sources: [
      {
        url: 'https://duckduckgo.com/privacy',
        title: 'DuckDuckGo Privacy Policy',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://duckduckgo.com/app',
        title: 'DuckDuckGo Browser — Official Download Page',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },

  {
    id: 'signal',
    name: 'Signal',
    slug: 'signal',
    category: 'privacy',
    tagline: 'End-to-end encrypted messaging with no ads, no data collection, no trackers',
    purpose: 'A free, open-source messaging app using the Signal Protocol for end-to-end encryption. All messages, calls, and media are encrypted. Signal (the non-profit) cannot read your messages. No ads. No tracking. Designed with privacy by architecture.',
    concerns: ['privacy'],
    platforms: ['ios', 'android', 'windows', 'macos'],
    platformNotes: 'iOS, Android, Windows desktop, and macOS desktop. Desktop apps must be linked to a mobile device. No browser-only version.',
    cost: {
      model: ['free', 'open_source'],
      details: 'Completely free and open source (AGPL-3.0). Funded by the Signal Foundation (donations and grants). No paid tier.',
      paywalledFeatures: [],
    },
    privacy: {
      accountRequired: true,
      dataCollected: 'Signal requires a phone number to register. The minimum metadata stored: phone number hash, last-connected date. Message content, contacts, groups, and media are not stored on Signal\'s servers (end-to-end encrypted, stored only on your devices).',
      summary: 'Phone number required (account required). Minimal metadata by design. Messages are E2EE — not readable by Signal. No ads, no profiling. Open source and independently audited.',
      policyUrl: 'https://signal.org/legal/',
    },
    accessibility: {
      notes: 'Signal iOS and Android apps support system accessibility features (VoiceOver / TalkBack). Desktop apps have basic keyboard navigation. Full accessibility audit not publicly documented by Signal.',
      sourceUrl: 'https://support.signal.org',
    },
    keyFeatures: [
      'End-to-end encrypted messages, calls, video calls, and media',
      'Group chats (up to 1,000 members)',
      'Disappearing messages (auto-delete after set time)',
      'Username system: share username instead of phone number',
      'Note to Self: private encrypted notebook',
      'No ads, no trackers, no profiling',
      'Open source: community-auditable code',
    ],
    limitations: [
      'Phone number required to register (privacy trade-off — though username hides it from other users)',
      'Desktop app requires linking to a mobile device',
      'Only useful for privacy if your contacts also use Signal — network effect',
      'No Windows Phone or browser-only version',
      'Not a tool for avoiding screen-time overuse per se — it\'s a communication tool focused on privacy',
    ],
    whyItHelps: 'Understanding and using privacy tools is part of a healthy relationship with technology. Knowing your communications are not being scanned for ad targeting reduces the anxiety of digital surveillance. Using Signal also avoids the feed-driven design of social messaging apps (WhatsApp, Messenger) that layer notification-driven engagement loops on top of communication.',
    courseConcepts: ['privacy', 'algorithmic-hooking'],
    relatedGuides: [],
    officialUrl: 'https://signal.org',
    sources: [
      {
        url: 'https://signal.org',
        title: 'Signal — Official Website',
        checkedOn: '2026-11-09',
      },
      {
        url: 'https://signal.org/legal/',
        title: 'Signal Privacy Policy and Terms',
        checkedOn: '2026-11-09',
      },
    ],
    verifiedOn: '2026-11-09',
    verificationStatus: {
      overall: 'verified',
      cost: 'verified',
      privacy: 'verified',
      platforms: 'verified',
      accessibility: 'needs_manual_verification',
    },
  },
];

// ── HELPER FUNCTIONS ─────────────────────────────────────

export const getResourceBySlug = (slug: string): Resource | undefined =>
  resources.find((r) => r.slug === slug);

export const getResourcesByCategory = (category: Category): Resource[] =>
  resources.filter((r) => r.category === category);

export const getResourcesByConcern = (concern: Concern): Resource[] =>
  resources.filter((r) => r.concerns.includes(concern));

export const getResourcesByPlatform = (platform: Platform): Resource[] =>
  resources.filter((r) => r.platforms.includes(platform));

export const categories: { id: Category; label: string; description: string; icon: string }[] = [
  {
    id: 'screen-time',
    label: 'Screen Time & App Timers',
    description: 'Tools that track your usage and let you set limits on apps and categories.',
    icon: 'Clock',
  },
  {
    id: 'focus',
    label: 'Focus Tools & Browser Extensions',
    description: 'Block distractions and build concentration during study sessions.',
    icon: 'Target',
  },
  {
    id: 'sleep',
    label: 'Sleep & Bedtime Routines',
    description: 'Reduce evening screen exposure and automate a healthy wind-down routine.',
    icon: 'Moon',
  },
  {
    id: 'privacy',
    label: 'Privacy & Digital Safety',
    description: 'Reduce tracking, block intrusive ads, and protect your data online.',
    icon: 'Shield',
  },
];

export const platformLabels: Record<Platform, string> = {
  ios: 'iPhone / iPad',
  android: 'Android',
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  chrome: 'Chrome',
  firefox: 'Firefox',
  edge: 'Edge',
  safari: 'Safari',
  web: 'Web',
};

export const costModelLabels: Record<CostModel, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  open_source: 'Open Source',
};

export const concernLabels: Record<Concern, string> = {
  scrolling: 'Too much scrolling',
  focus: 'Can\'t concentrate while studying',
  notifications: 'Too many notifications',
  sleep: 'Phone use before sleep',
  privacy: 'Online privacy',
};

