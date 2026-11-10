// ============================================================
// SCORING UTILITY — Find My Tool wizard
// Pure functions: unit-testable, no side effects
// ============================================================

import type { Resource, Concern, Platform } from '../data/resources';

export interface FinderInputs {
  concern: Concern | '';
  platforms: Platform[];
  budgetFreeOnly: boolean;
  preferOpenSource: boolean;
}

export interface ScoredResource {
  resource: Resource;
  score: number;
  whyThisFits: string;
  tradeoffNote: string;
  excludedReasons: string[];
}

export interface FinderResult {
  matches: ScoredResource[];
  excluded: Array<{ resource: Resource; reasons: string[] }>;
}

// Weights for scoring
const WEIGHTS = {
  concern: 50,         // Primary concern match is most important
  platform: 'hard',   // Platform is a hard filter (must match)
  budget: 'hard',     // Budget is a hard filter when free-only requested
  openSource: 10,     // Soft preference
  privacyFriendly: 5, // No account required bonus
};

function getConcernMatch(resource: Resource, concern: Concern | ''): number {
  if (!concern) return 0;
  if (resource.concerns.includes(concern)) {
    // Primary concern match — higher score if concern is first in the list
    return resource.concerns[0] === concern ? WEIGHTS.concern : WEIGHTS.concern * 0.7;
  }
  return 0;
}

function platformMatches(resource: Resource, platforms: Platform[]): boolean {
  if (platforms.length === 0) return true; // No filter = all pass
  return platforms.some((p) => resource.platforms.includes(p));
}

function budgetMatches(resource: Resource, freeOnly: boolean): boolean {
  if (!freeOnly) return true;
  const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
  return models.includes('free') || models.includes('open_source');
}

function getOpenSourceBonus(resource: Resource, prefer: boolean): number {
  if (!prefer) return 0;
  const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
  return models.includes('open_source') ? WEIGHTS.openSource : 0;
}

function getPrivacyBonus(resource: Resource): number {
  return !resource.privacy.accountRequired ? WEIGHTS.privacyFriendly : 0;
}

function generateWhyThisFits(resource: Resource, inputs: FinderInputs): string {
  const parts: string[] = [];

  if (inputs.concern) {
    const concernMessages: Partial<Record<Concern, Record<string, string>>> = {
      scrolling: {
        'ios-screen-time': 'iOS Screen Time lets you set daily limits on the specific apps you scroll most, and schedules a Downtime window so your phone steps back automatically.',
        'android-digital-wellbeing': 'Android Digital Wellbeing\'s App Timers dim your most-used apps after a daily limit — building in the friction that breaks mindless scroll habits.',
        'one-sec': 'one sec intercepts you the moment you tap a distracting app, prompting a breathing pause before you decide to open it.',
        'news-feed-eradicator': 'News Feed Eradicator removes the infinite scroll feed from your browser entirely, so visiting social sites doesn\'t automatically become a browsing session.',
        'leechblock-ng': 'LeechBlock NG lets you schedule time limits for specific distracting websites — blocking them during study hours and allowing limited access at other times.',
        'forest': 'Forest grows a virtual tree while you stay focused; leaving your phone kills the tree — a visual commitment device that makes mindless scrolling costly.',
      },
      focus: {
        'forest': 'Forest\'s focus-timer and loss-aversion mechanic (don\'t kill the tree!) are designed specifically to support sustained concentration during study sessions.',
        'leechblock-ng': 'LeechBlock NG blocks chosen websites on a schedule, removing the in-browser distraction triggers during your study hours.',
        'news-feed-eradicator': 'By eliminating the feed from your most-visited social sites, News Feed Eradicator removes one of the most common study interruptions.',
        'ios-screen-time': 'App Limits and Downtime remove easy access to distracting apps when you need to focus.',
        'android-digital-wellbeing': 'Focus Mode in Digital Wellbeing lets you pause all your chosen distracting apps with a single tap while you study.',
      },
      notifications: {
        'ios-sleep-focus': 'Sleep Focus silences all notifications except the ones you explicitly allow — perfect for reducing the constant interruption stream.',
        'android-bedtime-mode': 'Bedtime Mode\'s Do Not Disturb silences all but starred contacts, giving you a notification-free evening.',
        'ios-screen-time': 'You can restrict notifications from individual apps in Downtime and set App Limits on notification-heavy apps.',
        'android-digital-wellbeing': 'Focus Mode pauses distracting apps and their notifications simultaneously.',
      },
      sleep: {
        'ios-sleep-focus': 'iOS Sleep Focus automates a nightly routine: it silences notifications at your bedtime and dims the lock screen during your pre-sleep Wind Down period.',
        'android-bedtime-mode': 'Android Bedtime Mode shifts your screen to grayscale and silences notifications at your chosen bedtime — automating the wind-down.',
        'flux': 'f.lux gradually warms your computer screen colour in the evening, reducing blue-light exposure without you having to remember to turn it on.',
      },
      privacy: {
        'ublock-origin': 'uBlock Origin / Lite blocks the trackers that build a profile of your browsing — reducing the data fuelling targeted ads and algorithmic hooking.',
        'duckduckgo': 'DuckDuckGo replaces tracking-heavy search and browser with one that doesn\'t build a profile from your searches or browsing.',
        'signal': 'Signal encrypts all your messages and calls end-to-end — not even Signal can read them. No ads, no tracking, no profiling.',
      },
    };

    const msgMap = inputs.concern ? concernMessages[inputs.concern] : undefined;
    const specificMsg = msgMap?.[resource.id];
    if (specificMsg) {
      parts.push(specificMsg);
    } else {
      parts.push(`${resource.name} directly addresses your concern about ${inputs.concern.replace('-', ' ')}.`);
    }
  }

  if (inputs.budgetFreeOnly) {
    const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
    if (models.includes('free') || models.includes('open_source')) {
      parts.push('It\'s completely free — no cost involved.');
    }
  }

  if (inputs.preferOpenSource) {
    const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
    if (models.includes('open_source')) {
      parts.push('The source code is publicly available — you can verify exactly what it does.');
    }
  }

  return parts.join(' ') || `${resource.name} is a good fit for your needs.`;
}

function generateTradeoffNote(resource: Resource): string {
  const firstLimitation = resource.limitations[0];
  if (firstLimitation) {
    return `Key limitation: ${firstLimitation}`;
  }
  return 'Review the full tool details for limitations.';
}

export function scoreResources(resources: Resource[], inputs: FinderInputs): FinderResult {
  const matches: ScoredResource[] = [];
  const excluded: Array<{ resource: Resource; reasons: string[] }> = [];

  for (const resource of resources) {
    const exclusionReasons: string[] = [];

    // Hard filter: platform
    if (inputs.platforms.length > 0 && !platformMatches(resource, inputs.platforms)) {
      exclusionReasons.push(`Does not support your platform(s): ${inputs.platforms.join(', ')}`);
    }

    // Hard filter: budget
    if (inputs.budgetFreeOnly && !budgetMatches(resource, true)) {
      exclusionReasons.push('Has a cost — not free-only');
    }

    if (exclusionReasons.length > 0) {
      excluded.push({ resource, reasons: exclusionReasons });
      continue;
    }

    // Calculate score
    let score = 0;
    score += inputs.concern ? getConcernMatch(resource, inputs.concern) : 0;
    score += getOpenSourceBonus(resource, inputs.preferOpenSource);
    score += getPrivacyBonus(resource);

    matches.push({
      resource,
      score,
      whyThisFits: generateWhyThisFits(resource, inputs),
      tradeoffNote: generateTradeoffNote(resource),
      excludedReasons: [],
    });
  }

  // Sort by score descending (copy array first to avoid in-place mutation)
  const sortedMatches = [...matches].sort((a, b) => b.score - a.score);

  return { matches: sortedMatches, excluded };
}

// URL-serialisable state for sharing
export function inputsToParams(inputs: FinderInputs): URLSearchParams {
  const p = new URLSearchParams();
  if (inputs.concern) p.set('concern', inputs.concern);
  if (inputs.platforms.length) p.set('platforms', inputs.platforms.join(','));
  if (inputs.budgetFreeOnly) p.set('freeOnly', '1');
  if (inputs.preferOpenSource) p.set('openSource', '1');
  return p;
}

export function paramsToInputs(params: URLSearchParams): FinderInputs {
  return {
    concern: (params.get('concern') as Concern) || '',
    platforms: params.get('platforms')
      ? (params.get('platforms')!.split(',') as Platform[])
      : [],
    budgetFreeOnly: params.get('freeOnly') === '1',
    preferOpenSource: params.get('openSource') === '1',
  };
}

