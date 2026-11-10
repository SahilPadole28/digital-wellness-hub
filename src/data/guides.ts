// ============================================================
// GUIDE DATA — Digital Wellness Hub
// Three student setup guides (R5)
// ============================================================

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  screenshotFile: string; // e.g. "step-01.png" — stored in /public/screenshots/<guideId>/
  screenshotAlt: string;
  note?: string;
}

export interface GuidePlatformSection {
  platform: 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Chrome' | 'Firefox' | 'Edge';
  osVersion: string;
  prerequisites: string[];
  steps: GuideStep[];
  troubleshooting: string[];
  lastTestedOn: string; // "DRAFT — to be filled by student"
  lastTestedDevice: string; // "DRAFT — to be filled by student"
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  whatItAccomplishes: string;
  whyItMatters: string;
  courseConceptIds: string[]; // concept ids
  evidenceLabel: string;
  estimatedTime: string;
  platforms: GuidePlatformSection[];
  expectedOutcome: string;
  limitations: string[];
  writtenBy: string; // "DRAFT — to be replaced by student name"
  relatedResourceIds: string[];
  status: 'draft' | 'final';
  draftNote: string;
}

export const guides: Guide[] = [
  {
    id: 'cue-friction',
    slug: 'cue-friction',
    title: 'Building Cue Friction on Mobile',
    tagline: 'Set up iOS Screen Time and Android Digital Wellbeing to slow down mindless app-opening',
    whatItAccomplishes:
      'This guide walks you through configuring your phone\'s built-in screen-time controls to add meaningful friction to your most distracting apps. After completing it, your phone will pause or dim distracting apps after a daily time limit, and you will have a scheduled downtime window that encourages you to put the phone down.',
    whyItMatters:
      'Automatic, habitual phone-checking bypasses conscious decision-making. By adding friction — a brief pause, a dimmed icon, an extra tap to extend time — you shift from an automatic "cue → scroll" loop to a deliberate choice. This is the "make it difficult" principle from habit-inversion theory, grounded in well-established habit psychology.',
    courseConceptIds: ['habit-inversion', 'dopamine-loop'],
    evidenceLabel: 'Supported, simplified here',
    estimatedTime: '15–25 minutes',
    platforms: [
      {
        platform: 'iOS',
        osVersion: 'iOS 16 or later (screenshots taken on iOS 17)',
        prerequisites: [
          'iPhone or iPad running iOS 16 or later',
          'Know your Apple ID password (needed to set a Screen Time passcode if you want to prevent bypass)',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Open Screen Time settings',
            description: 'Go to Settings (the grey gear icon on your Home Screen). Scroll down and tap "Screen Time." If Screen Time has never been turned on, tap "Turn On Screen Time" and follow the prompt. You do not need to set up Family Sharing.',
            screenshotFile: 'step-01.png',
            screenshotAlt: 'iPhone Settings app with Screen Time option highlighted',
            note: 'DRAFT — this screenshot must be captured by a student on a real device with no personal information visible. See /docs/SCREENSHOT_GUIDE.md.',
          },
          {
            stepNumber: 2,
            title: 'Review your current usage',
            description: 'The Screen Time dashboard shows your daily average and which apps you use most. Take a note of which apps take up the most time — these are good candidates for limits.',
            screenshotFile: 'step-02.png',
            screenshotAlt: 'Screen Time dashboard showing daily usage chart with app categories',
            note: 'DRAFT — ensure no personal data (name, notifications, messages) is visible in the screenshot.',
          },
          {
            stepNumber: 3,
            title: 'Set an App Limit on Social Media',
            description: 'Tap "App Limits" → "Add Limit." Select "Social Networking" (or tap individual apps). Set a daily limit — start with something honest, like 60 or 90 minutes. Tap "Add." The app icons will dim when the limit is reached.',
            screenshotFile: 'step-03.png',
            screenshotAlt: 'App Limits screen showing Social Networking category selected with a time picker',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Set a Screen Time Passcode (optional but recommended)',
            description: 'Tap "Use Screen Time Passcode" and set a 4-digit code. This means extending a time limit requires the passcode — adding genuine friction. Use a passcode you won\'t easily remember, or ask a trusted friend to set it.',
            screenshotFile: 'step-04.png',
            screenshotAlt: 'Screen Time Passcode setup screen with digit entry',
            note: 'DRAFT.',
          },
          {
            stepNumber: 5,
            title: 'Schedule Downtime',
            description: 'Tap "Downtime" → turn it on → set your start and end times (e.g., 10 PM to 7 AM). During Downtime, only allowed apps and phone calls work. All other app icons dim. Tip: select "Every Day" for a consistent routine.',
            screenshotFile: 'step-05.png',
            screenshotAlt: 'Downtime schedule screen with start time 10:00 PM and end time 7:00 AM selected',
            note: 'DRAFT.',
          },
          {
            stepNumber: 6,
            title: 'Allow essential apps during Downtime',
            description: 'Tap "Always Allowed" → check the apps you need during Downtime (e.g., Phone, Messages, Maps, Alarm Clock). Remove any social media apps from this list.',
            screenshotFile: 'step-06.png',
            screenshotAlt: 'Always Allowed screen with Phone and Messages checked, social apps unchecked',
            note: 'DRAFT.',
          },
          {
            stepNumber: 7,
            title: 'Test your limits',
            description: 'Open a social media app and use it normally. When you reach the daily limit, the screen will grey out with an "Ignore Limit" option. If you set a passcode, extending the limit requires it. Notice how you feel when the limit appears — this pause is the moment of choice.',
            screenshotFile: 'step-07.png',
            screenshotAlt: 'App limit reached screen showing greyed-out Instagram with Ignore Limit option',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'App Limits not appearing? Make sure you tapped "Add" after setting the time. Try restarting your iPhone.',
          'Downtime not activating? Check that the Downtime toggle is on (green) and the schedule is set correctly.',
          'Forgot your Screen Time passcode? Go to Settings → Screen Time → Change Screen Time Passcode → Forgot Passcode, and use your Apple ID to reset.',
          'Screen Time settings look different? iOS updates frequently change menu layouts. If a step doesn\'t match, search "Screen Time" in the Settings search bar.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student (e.g., 10 November 2026)',
        lastTestedDevice: 'DRAFT — to be filled by student (e.g., iPhone 15 Pro, iOS 18.1)',
      },
      {
        platform: 'Android',
        osVersion: 'Android 12 or later (steps may vary by manufacturer)',
        prerequisites: [
          'Android phone running Android 9 (Pie) or later',
          'Digital Wellbeing app installed (pre-installed on most Android 9+ phones)',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Open Digital Wellbeing settings',
            description: 'Open Settings → scroll to "Digital Wellbeing & parental controls" (may be labelled differently on Samsung: "Digital Wellbeing" under Settings). Tap it.',
            screenshotFile: 'step-01-android.png',
            screenshotAlt: 'Android Settings app with Digital Wellbeing option highlighted',
            note: 'DRAFT — capture on a real Android device with no personal info visible.',
          },
          {
            stepNumber: 2,
            title: 'Review your usage dashboard',
            description: 'The dashboard chart shows your screen time by app. Tap on the chart or any app to see your usage. Identify your top time-consuming apps.',
            screenshotFile: 'step-02-android.png',
            screenshotAlt: 'Digital Wellbeing dashboard with pie chart of app usage',
            note: 'DRAFT.',
          },
          {
            stepNumber: 3,
            title: 'Set an App Timer',
            description: 'Tap an app from the dashboard (or tap "Dashboard" to see all apps). Next to the app name, tap the hourglass icon to set a timer. Enter a daily time limit (e.g., 45 minutes for Instagram). Tap "OK." The app icon will dim when the timer runs out.',
            screenshotFile: 'step-03-android.png',
            screenshotAlt: 'App timer setup screen showing 45 minute limit for Instagram',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Set an App Limits PIN (Android 12+)',
            description: 'In Digital Wellbeing, tap "App Limits PIN" or "Lock app timers" (varies by Android version). Set a 4-digit PIN you won\'t easily bypass. This prevents you from tapping "Ignore for today" too casually.',
            screenshotFile: 'step-04-android.png',
            screenshotAlt: 'App Limits PIN setup screen with digit entry',
            note: 'DRAFT.',
          },
          {
            stepNumber: 5,
            title: 'Enable Bedtime Mode',
            description: 'In Digital Wellbeing, tap "Bedtime mode." Turn it on and tap "Customise" (or "Schedule"). Set your bedtime start and end times. Enable "Grayscale" and "Do Not Disturb" within the bedtime settings.',
            screenshotFile: 'step-05-android.png',
            screenshotAlt: 'Bedtime Mode settings showing schedule, grayscale, and DND toggles',
            note: 'DRAFT.',
          },
          {
            stepNumber: 6,
            title: 'Configure DND Exceptions',
            description: 'Tap "Do Not Disturb" within Bedtime Mode → "Allow exceptions" → enable "Calls from starred contacts" so emergency calls get through.',
            screenshotFile: 'step-06-android.png',
            screenshotAlt: 'Do Not Disturb exceptions screen with starred contacts toggle enabled',
            note: 'DRAFT.',
          },
          {
            stepNumber: 7,
            title: 'Test your setup',
            description: 'Open the app you set a timer for and use it until the timer runs out. The icon should dim. Notice the "Ignore for today" option — if you set a PIN, extending requires the PIN. At your scheduled bedtime, verify the screen turns grey and notifications are silenced.',
            screenshotFile: 'step-07-android.png',
            screenshotAlt: 'Dimmed app icon with app timer reached message',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'Digital Wellbeing missing from Settings? Some manufacturers (especially older Samsung and Xiaomi) have their own screen-time tools. Search your Settings for "Screen time" or "Usage."',
          'App timer resets itself? App timers reset at midnight each day — this is by design.',
          'Bedtime Mode not turning on? Ensure the toggle in Bedtime Mode is on (not just the schedule set). Try toggling it off and on.',
          'Steps look different? Android 13 and 14 may have moved some settings. Search for "Bedtime" or "Digital Wellbeing" in your Settings search bar.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student (e.g., Pixel 8, Android 15)',
      },
    ],
    expectedOutcome:
      'After completing this guide, your phone will automatically pause or dim your most-used distracting apps after your chosen daily limit, and your screen will dim and silence notifications at your scheduled bedtime. You will notice an increased awareness of how much time you spend on individual apps.',
    limitations: [
      'Limits can be bypassed: iOS shows "Ignore Limit" (requires passcode if set); Android shows "Ignore for today." True blocking requires parental controls or a third-party app.',
      'App limits reset at midnight each day.',
      'These tools work by raising awareness and adding friction — they require your cooperation, not forced compliance.',
      'Settings menus change with each major iOS/Android update. Steps in this guide were accurate as of the stated test date.',
    ],
    writtenBy: 'DRAFT — to be replaced by student name and edited to reflect personal testing',
    relatedResourceIds: ['ios-screen-time', 'android-digital-wellbeing', 'one-sec'],
    status: 'draft',
    draftNote: 'This guide text is a DRAFT prepared from official Apple and Google documentation. Students must: (1) test every step on a real device, (2) take their own privacy-safe screenshots, (3) update "Last tested on" and "Written by," and (4) revise any steps that differ from the actual current interface.',
  },

  {
    id: 'algorithmic-cues',
    slug: 'algorithmic-cues',
    title: 'Reducing Algorithmic Cues on the Web',
    tagline: 'Install and configure browser extensions that remove distraction-triggering feeds',
    whatItAccomplishes:
      'This guide shows you how to install News Feed Eradicator to remove infinite social media feeds from your browser, and optionally configure LeechBlock NG to schedule time-limited access to distracting websites. After completing it, visiting social sites in your browser will no longer show the algorithmically curated feed.',
    whyItMatters:
      'Algorithmic feeds are designed to maximise time-on-platform by showing you emotionally engaging, unpredictable content (variable rewards). Removing the feed eliminates the primary delivery mechanism for this compulsion loop, allowing you to use social sites intentionally (to post, message, or search) rather than passively.',
    courseConceptIds: ['algorithmic-hooking', 'dopamine-loop', 'habit-inversion'],
    evidenceLabel: 'Supported, simplified here',
    estimatedTime: '10–20 minutes',
    platforms: [
      {
        platform: 'Chrome',
        osVersion: 'Chrome 115+ (Windows, macOS, or Linux)',
        prerequisites: [
          'Google Chrome, Microsoft Edge, or any Chromium-based browser (Brave, Opera, Vivaldi)',
          'Access to the Chrome Web Store',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Install News Feed Eradicator from the Chrome Web Store',
            description: 'Open Chrome and visit the Chrome Web Store (chromewebstore.google.com). Search for "News Feed Eradicator." Click on the result by Jordan Cooper. Click "Add to Chrome" → "Add extension." You should see a brief confirmation that the extension was added.',
            screenshotFile: 'step-01-chrome.png',
            screenshotAlt: 'Chrome Web Store showing News Feed Eradicator extension page with Add to Chrome button',
            note: 'DRAFT — capture with no personal browsing history, accounts or names visible.',
          },
          {
            stepNumber: 2,
            title: 'Visit Facebook (or any supported social site) to verify',
            description: 'Open Facebook, Instagram, YouTube, Reddit, or X (Twitter) in Chrome. Instead of your feed, you should see a simple page with an inspirational quote. The nav bar, search, messages, and profile still work normally.',
            screenshotFile: 'step-02-chrome.png',
            screenshotAlt: 'Facebook homepage with feed replaced by a calming quote from News Feed Eradicator',
            note: 'DRAFT — ensure no personal account name, photo or messages are visible.',
          },
          {
            stepNumber: 3,
            title: 'Configure which sites are blocked (optional)',
            description: 'Click the News Feed Eradicator icon (puzzle-piece icon in Chrome toolbar → find the extension). The popup lets you toggle each supported site on or off. Turn off any site you do not want to block.',
            screenshotFile: 'step-03-chrome.png',
            screenshotAlt: 'News Feed Eradicator popup with toggle switches for each social platform',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Add a custom inspirational quote (optional)',
            description: 'In the extension popup or options page, find "Custom Quotes." Add a quote that motivates you academically. This personalises the replacement page and reinforces your intention.',
            screenshotFile: 'step-04-chrome.png',
            screenshotAlt: 'News Feed Eradicator options showing custom quotes field',
            note: 'DRAFT.',
          },
          {
            stepNumber: 5,
            title: '(Optional) Install LeechBlock NG for time scheduling',
            description: 'Visit the Chrome Web Store and search "LeechBlock NG." Install the extension. Click the LeechBlock NG icon to open Options. In "Block Set 1," add sites you want to limit (e.g., reddit.com, twitter.com). Set a schedule (e.g., block 9 AM–12 PM, then allow 10 min per 2 hours). Click "Save Options."',
            screenshotFile: 'step-05-chrome.png',
            screenshotAlt: 'LeechBlock NG options page showing Block Set 1 with sites and time schedule configured',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'Extension not visible in toolbar? Click the puzzle-piece icon in Chrome\'s top-right corner. Find "News Feed Eradicator" and click the pin icon to keep it visible.',
          'Feed still showing? Try a hard refresh (Ctrl+Shift+R). The extension may need to be re-enabled if Chrome restarted.',
          'LeechBlock NG blocking you when you don\'t want it to? Click the LeechBlock icon → "Lockdown Off" to temporarily disable, or adjust your block set schedule.',
          'Extension stopped working after a site redesign? Social media sites update frequently. Check the extension\'s reviews or GitHub page for a known issue and wait for an update.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student',
      },
      {
        platform: 'Firefox',
        osVersion: 'Firefox 115 or later',
        prerequisites: ['Mozilla Firefox installed'],
        steps: [
          {
            stepNumber: 1,
            title: 'Install News Feed Eradicator from Firefox Add-ons',
            description: 'Open Firefox and go to addons.mozilla.org. Search for "News Feed Eradicator." Click "Add to Firefox" → "Add." Confirm any permission prompts.',
            screenshotFile: 'step-01-firefox.png',
            screenshotAlt: 'Firefox Add-ons site showing News Feed Eradicator with Add to Firefox button',
            note: 'DRAFT.',
          },
          {
            stepNumber: 2,
            title: 'Verify on a social site',
            description: 'Visit Facebook, Reddit, YouTube or X. The feed should be replaced by an inspirational quote. Navigation and core features remain intact.',
            screenshotFile: 'step-02-firefox.png',
            screenshotAlt: 'Reddit homepage with feed replaced by inspirational quote',
            note: 'DRAFT — no personal account details visible.',
          },
          {
            stepNumber: 3,
            title: '(Optional) Install LeechBlock NG on Firefox',
            description: 'Search "LeechBlock NG" on addons.mozilla.org. Click "Add to Firefox." After installing, click the LeechBlock icon → Options. Configure block sets as described in the Chrome instructions above. Firefox is recommended for LeechBlock NG as it supports the full MV2 feature set.',
            screenshotFile: 'step-03-firefox.png',
            screenshotAlt: 'LeechBlock NG options in Firefox showing block set schedule',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'Extension disabled? Go to about:addons → Extensions → find the extension and ensure it is enabled.',
          'LeechBlock not blocking a site? Check that the site URL is entered correctly (e.g., use "reddit.com" not "https://www.reddit.com"). Wildcards: "*reddit.com*" catches all Reddit pages.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student',
      },
    ],
    expectedOutcome:
      'Visiting social media sites in your browser will show an inspirational quote instead of an infinite feed. Optionally, LeechBlock NG will enforce scheduled access limits. You can still use all other site features (search, messages, posting) intentionally.',
    limitations: [
      'Desktop browsers only — mobile apps (Instagram on iPhone, TikTok on Android) are not affected. Set app limits on mobile separately (see Guide 1).',
      'Extensions can be disabled in one click — requires your own commitment to keep them active.',
      'Social media sites redesign frequently; extensions may temporarily break until updated.',
      'LeechBlock NG setup can be complex — start with one block set covering your most visited sites.',
    ],
    writtenBy: 'DRAFT — to be replaced by student name',
    relatedResourceIds: ['news-feed-eradicator', 'leechblock-ng', 'ublock-origin'],
    status: 'draft',
    draftNote: 'DRAFT prepared from official extension documentation. Students must test on real devices, take privacy-safe screenshots, and update test date and authorship before submission.',
  },

  {
    id: 'wind-down',
    slug: 'wind-down',
    title: 'A Nightly Digital Wind-Down Routine',
    tagline: 'Set up an automated bedtime mode: silence notifications, warm your screen, and step back from the phone',
    whatItAccomplishes:
      'This guide helps you configure your phone\'s built-in bedtime tools and optionally install f.lux on your computer to create a consistent, low-stimulation nightly routine. After completing it, your phone will automatically silence notifications and optionally shift to grayscale at your chosen bedtime, and your laptop screen will warm in colour as evening approaches.',
    whyItMatters:
      'Sleep hygiene research consistently identifies three factors relevant to digital habits: (1) evening light exposure (blue light modestly suppresses melatonin — a real but often overstated effect); (2) mental arousal from engaging or stressful content (delaying sleep onset regardless of light); (3) notification interruptions during sleep onset. Automating a consistent wind-down routine removes the daily decision effort and reinforces healthy sleep cues. Note: these tools support sleep hygiene — they are not treatments for sleep disorders.',
    courseConceptIds: ['sleep-hygiene', 'habit-inversion'],
    evidenceLabel: 'Supported, simplified here',
    estimatedTime: '20–30 minutes',
    platforms: [
      {
        platform: 'iOS',
        osVersion: 'iOS 16 or later',
        prerequisites: [
          'iPhone running iOS 16 or later (iOS 15+ for Sleep Focus)',
          'Health app set up with your name or age (for sleep schedule tracking — optional)',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Open the Health app and set up a Sleep Schedule',
            description: 'Open the Health app (white with a red heart). Tap "Browse" → "Sleep." Tap "Get Started" or "Edit Sleep Schedule" if you already have one. Set your target bedtime (e.g., 10:30 PM) and wake-up time (e.g., 7:00 AM). Enable "Sleep Goal" at 7–9 hours.',
            screenshotFile: 'step-01-ios.png',
            screenshotAlt: 'Health app Sleep Schedule setup showing bedtime and wake-up time selection',
            note: 'DRAFT — ensure no personal health data or name is visible in the screenshot.',
          },
          {
            stepNumber: 2,
            title: 'Enable Sleep Focus',
            description: 'In the Health app sleep schedule (or via Settings → Focus → Sleep), enable "Sleep Focus." Choose which apps and contacts are allowed during Sleep Focus. By default, Sleep Focus silences all notifications except alarms.',
            screenshotFile: 'step-02-ios.png',
            screenshotAlt: 'Sleep Focus settings showing allowed apps and contacts configuration',
            note: 'DRAFT.',
          },
          {
            stepNumber: 3,
            title: 'Configure Wind Down (pre-sleep buffer)',
            description: 'In the Sleep schedule settings, tap "Wind Down." Set a Wind Down duration (e.g., 30 minutes before bedtime). During Wind Down, the lock screen dims and shows shortcuts you choose (e.g., Calm app, bedtime reading). This signals to your brain that sleep time is approaching.',
            screenshotFile: 'step-03-ios.png',
            screenshotAlt: 'Wind Down settings showing 30 minute buffer and lock screen shortcut selection',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Enable Night Shift',
            description: 'Go to Settings → Display & Brightness → Night Shift. Turn on "Scheduled" and set it to match or slightly precede your Wind Down time (e.g., 9:30 PM to 7:00 AM). Set the colour temperature to "Warm" using the slider. This warms your display colour as evening arrives.',
            screenshotFile: 'step-04-ios.png',
            screenshotAlt: 'Night Shift settings showing scheduled times and warm colour temperature slider',
            note: 'DRAFT.',
          },
          {
            stepNumber: 5,
            title: 'Set up an emergency bypass for important calls',
            description: 'In Settings → Focus → Sleep → Allowed Notifications → People, add specific contacts you want to allow to call through during Sleep Focus. This ensures genuine emergencies can reach you while routine notifications are silenced.',
            screenshotFile: 'step-05-ios.png',
            screenshotAlt: 'Sleep Focus allowed contacts list showing one or two selected contacts',
            note: 'DRAFT.',
          },
          {
            stepNumber: 6,
            title: 'Test your routine',
            description: 'The evening before a normal study day, let the Wind Down and Sleep Focus activate automatically. Notice which notifications get through (only allowed ones). Check that Night Shift is warming your screen. Place your phone face-down or in another room if possible.',
            screenshotFile: 'step-06-ios.png',
            screenshotAlt: 'iOS lock screen in Wind Down mode showing dimmed display and sleep shortcuts',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'Sleep Focus not activating automatically? In Settings → Focus → Sleep, check that the schedule is turned on and the correct days are selected.',
          'Alarm not going off during Sleep Focus? The Clock app\'s alarms always bypass Focus modes by design — your alarm will still work.',
          'Night Shift not changing anything? Check it is set to "Scheduled" (not Manual) and the schedule matches your evening time zone.',
          'Wind Down shortcuts not showing on lock screen? Tap "Edit" in Wind Down settings and add shortcuts manually.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student',
      },
      {
        platform: 'Android',
        osVersion: 'Android 10 or later',
        prerequisites: ['Android phone running Android 9 or later with Digital Wellbeing'],
        steps: [
          {
            stepNumber: 1,
            title: 'Open Bedtime Mode in Digital Wellbeing',
            description: 'Settings → Digital Wellbeing & parental controls → Bedtime mode. If you don\'t see this, search "Bedtime" in Settings. Tap "Based on a schedule" to activate on a timer.',
            screenshotFile: 'step-01-android.png',
            screenshotAlt: 'Android Digital Wellbeing showing Bedtime Mode option',
            note: 'DRAFT.',
          },
          {
            stepNumber: 2,
            title: 'Set your bedtime schedule',
            description: 'Set the bedtime start time (e.g., 10:30 PM) and wake-up time (e.g., 7:00 AM). Select "Repeat" to apply it every night or select specific days.',
            screenshotFile: 'step-02-android.png',
            screenshotAlt: 'Bedtime schedule settings showing 10:30 PM to 7:00 AM schedule',
            note: 'DRAFT.',
          },
          {
            stepNumber: 3,
            title: 'Enable Grayscale and Do Not Disturb',
            description: 'Under Bedtime Mode customisation, enable the "Grayscale" toggle and the "Do Not Disturb" toggle. Grayscale makes the screen visually less stimulating; DND silences notifications.',
            screenshotFile: 'step-03-android.png',
            screenshotAlt: 'Bedtime Mode customise screen with Grayscale and Do Not Disturb toggles enabled',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Configure DND exceptions',
            description: 'Tap "Do Not Disturb" → "People" → enable "Starred contacts" or add specific contacts. Under "Calls," choose "Starred contacts" to allow emergency calls only.',
            screenshotFile: 'step-04-android.png',
            screenshotAlt: 'Do Not Disturb People settings showing starred contacts toggle',
            note: 'DRAFT.',
          },
          {
            stepNumber: 5,
            title: 'Enable Night Light',
            description: 'Settings → Display → Night Light (or "Night Mode" / "Blue light filter" on Samsung). Enable "Turn on as scheduled" and set it to match your bedtime window. Adjust the intensity slider to "Warmer" for maximum effect.',
            screenshotFile: 'step-05-android.png',
            screenshotAlt: 'Night Light settings showing schedule and warm colour temperature slider',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'Bedtime Mode not on the right path? Samsung Galaxy may show "Digital Wellbeing" with slightly different menu names. Search "Wind down" or "Bedtime" in Settings.',
          'Calls still ringing during DND? Check DND exceptions under Settings → Sound → Do Not Disturb. Emergency bypasses may need to be configured there, not just in Digital Wellbeing.',
          'Grayscale turns on but doesn\'t turn off? Ensure the "wake-up time" in Bedtime Mode is set correctly to your morning time.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student',
      },
      {
        platform: 'Windows',
        osVersion: 'Windows 10 or 11',
        prerequisites: ['Windows 10 version 14393.0 or later; or Windows 11'],
        steps: [
          {
            stepNumber: 1,
            title: 'Download and install f.lux',
            description: 'Visit justgetflux.com in your browser. Click "Download f.lux." Run the installer. f.lux will appear in your system tray (bottom-right taskbar area) with a small sun/moon icon.',
            screenshotFile: 'step-01-windows.png',
            screenshotAlt: 'f.lux website showing Download button and system requirements',
            note: 'DRAFT.',
          },
          {
            stepNumber: 2,
            title: 'Set your location',
            description: 'Click the f.lux icon in the system tray. When prompted, enter your city name or allow location access. f.lux uses your location to calculate local sunrise and sunset times automatically.',
            screenshotFile: 'step-02-windows.png',
            screenshotAlt: 'f.lux location setup dialog showing city name entry field',
            note: 'DRAFT.',
          },
          {
            stepNumber: 3,
            title: 'Adjust colour temperature settings',
            description: 'In the f.lux window, you will see sliders for daytime, sunset, and bedtime colour temperatures. Set "Bedtime" to a warm amber (e.g., 2700K–3400K). Leave "Daytime" at a natural or slightly warm setting (5500K–6500K). The transition will happen gradually.',
            screenshotFile: 'step-03-windows.png',
            screenshotAlt: 'f.lux settings showing colour temperature sliders for daytime, sunset, and bedtime',
            note: 'DRAFT.',
          },
          {
            stepNumber: 4,
            title: 'Review the transition preview',
            description: 'Click "Movies" or use the preview option to temporarily see your current room at different times of day. This helps you pick colour temperatures that feel comfortable without being too warm for work.',
            screenshotFile: 'step-04-windows.png',
            screenshotAlt: 'f.lux preview showing warm amber screen tone in evening mode',
            note: 'DRAFT.',
          },
        ],
        troubleshooting: [
          'f.lux icon not showing in taskbar? Click the hidden icons arrow (∧) in the taskbar. Right-click f.lux icon → "Show icon and notifications."',
          'Screen not warming at the right time? Verify your location is set correctly. f.lux uses local sunset data.',
          'Colour looks too orange for work? Temporarily disable f.lux with the "Disable for one hour" option, or use "Movie Mode" for colour-sensitive tasks.',
          'Using Windows Night Light instead? Settings → Display → Night Light. This is a built-in alternative that works similarly.',
        ],
        lastTestedOn: 'DRAFT — to be filled by student',
        lastTestedDevice: 'DRAFT — to be filled by student',
      },
    ],
    expectedOutcome:
      'Your phone will automatically enter a low-stimulation mode at your chosen bedtime, silencing notifications and shifting the display colour. Your computer screen will gradually warm in colour as evening approaches. You will have a consistent, automated bedtime cue rather than relying on willpower alone.',
    limitations: [
      'Blue-light filtering is a helpful bedtime aid, but its effect on sleep is real yet modest — do not expect it to solve significant sleep difficulties on its own.',
      'Mental arousal from engaging content (news, social media) delays sleep regardless of screen colour — the most important step is stopping stimulating content well before bed.',
      'Sleep Focus and DND can be bypassed (pull down control centre on iPhone; notification settings on Android).',
      'f.lux is not available on Android or iOS without specific device modifications — use Night Shift (iOS) or Night Light (Android) instead.',
      'If you experience persistent sleep difficulties, consult a healthcare professional — this guide offers screen hygiene tips, not medical advice.',
    ],
    writtenBy: 'DRAFT — to be replaced by student name',
    relatedResourceIds: ['ios-sleep-focus', 'android-bedtime-mode', 'flux'],
    status: 'draft',
    draftNote: 'DRAFT prepared from official Apple, Google, and f.lux documentation. Students must test on real devices, take privacy-safe screenshots, and update test date and authorship.',
  },
];

export const getGuideById = (id: string): Guide | undefined =>
  guides.find((g) => g.id === id);

export const getGuideBySlug = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);

