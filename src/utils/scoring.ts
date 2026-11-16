// ============================================================
// SCORING UTILITY — Find My Tool wizard (R7, Section 5)
// Pure functions: unit-testable, no side effects
// Enhanced with Student Research findings (N=12 student cohort)
// ============================================================

import type { Resource, Concern, Platform } from '../data/resources';

export type DailyUsage = 'lt-2h' | '2-4h' | '4-6h' | '6-8h' | 'gt-10h' | '';
export type InterventionType = 'friction' | 'blocking' | 'scheduling' | 'environment' | '';
export type StudyRequirement = 'study-sessions' | 'all-day' | 'nighttime' | '';

export interface FinderInputs {
  concern: Concern | '';
  platforms: Platform[];
  budgetFreeOnly: boolean;
  preferOpenSource: boolean;
  dailyUsage?: DailyUsage;
  interventionType?: InterventionType;
  studyRequirement?: StudyRequirement;
}

export interface ScoredResource {
  resource: Resource;
  score: number;
  whyThisFits: string;
  problemAddressed: string;
  relevantFeatures: string[];
  pricingNote: string;
  tradeoffNote: string;
  alternativeSuggestion: string;
  excludedReasons: string[];
}

export interface FinderResult {
  matches: ScoredResource[];
  excluded: Array<{ resource: Resource; reasons: string[] }>;
}

// Weights for scoring engine
const WEIGHTS = {
  concern: 50,             // Primary concern match is most important
  dailyUsageFit: 15,       // High usage (>10h) prioritizes high-friction/strict tools
  interventionFit: 15,     // Friction vs Blocking vs Scheduling vs Environment
  studyFit: 10,            // Study sessions vs Nighttime vs All-day
  openSource: 10,          // Soft preference
  privacyFriendly: 5,      // No account required bonus
};

function getConcernMatch(resource: Resource, concern: Concern | ''): number {
  if (!concern) return 0;
  if (resource.concerns.includes(concern)) {
    return resource.concerns[0] === concern ? WEIGHTS.concern : WEIGHTS.concern * 0.7;
  }
  return 0;
}

function getDailyUsageBonus(resource: Resource, usage?: DailyUsage): number {
  if (!usage) return 0;
  // High-intensity users (>10h) need robust friction or strict blocking (Students 3, 7, 9, 12)
  if (usage === 'gt-10h') {
    if (['leechblock-ng', 'ios-screen-time', 'android-digital-wellbeing', 'one-sec'].includes(resource.id)) {
      return WEIGHTS.dailyUsageFit;
    }
  }
  // Moderate-to-heavy (4-8h) need study session structure (Student 8)
  if (usage === '6-8h' || usage === '4-6h') {
    if (['forest', 'android-digital-wellbeing', 'ios-screen-time', 'leechblock-ng'].includes(resource.id)) {
      return WEIGHTS.dailyUsageFit;
    }
  }
  // Light-to-moderate (0-4h) benefit from low-overhead awareness (Students 1, 2, 5, 6)
  if (usage === '2-4h' || usage === 'lt-2h') {
    if (['news-feed-eradicator', 'duckduckgo', 'ublock-origin', 'ios-sleep-focus'].includes(resource.id)) {
      return WEIGHTS.dailyUsageFit;
    }
  }
  return 0;
}

function getInterventionBonus(resource: Resource, intervention?: InterventionType): number {
  if (!intervention) return 0;
  switch (intervention) {
    case 'friction':
      return ['one-sec', 'ios-screen-time', 'android-digital-wellbeing'].includes(resource.id) ? WEIGHTS.interventionFit : 0;
    case 'blocking':
      return ['leechblock-ng', 'news-feed-eradicator', 'ublock-origin'].includes(resource.id) ? WEIGHTS.interventionFit : 0;
    case 'scheduling':
      return ['ios-sleep-focus', 'android-bedtime-mode', 'ios-screen-time', 'leechblock-ng'].includes(resource.id) ? WEIGHTS.interventionFit : 0;
    case 'environment':
      return ['flux', 'android-bedtime-mode', 'ios-sleep-focus'].includes(resource.id) ? WEIGHTS.interventionFit : 0;
    default:
      return 0;
  }
}

function getStudyRequirementBonus(resource: Resource, req?: StudyRequirement): number {
  if (!req) return 0;
  switch (req) {
    case 'study-sessions':
      return ['forest', 'leechblock-ng', 'news-feed-eradicator', 'android-digital-wellbeing'].includes(resource.id) ? WEIGHTS.studyFit : 0;
    case 'nighttime':
      return ['ios-sleep-focus', 'android-bedtime-mode', 'flux'].includes(resource.id) ? WEIGHTS.studyFit : 0;
    case 'all-day':
      return ['ios-screen-time', 'android-digital-wellbeing', 'one-sec', 'ublock-origin', 'signal'].includes(resource.id) ? WEIGHTS.studyFit : 0;
    default:
      return 0;
  }
}

function platformMatches(resource: Resource, platforms: Platform[]): boolean {
  if (platforms.length === 0) return true;
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

  if (inputs.dailyUsage === 'gt-10h' && ['leechblock-ng', 'ios-screen-time', 'android-digital-wellbeing', 'one-sec'].includes(resource.id)) {
    parts.push('Recommended for your heavy screen time (>10 hrs/day) because it provides enforceable friction rather than easily dismissed reminders.');
  } else if (inputs.dailyUsage === '6-8h' && resource.id === 'forest') {
    parts.push('Well-suited for 6–8 hour users seeking dedicated pomodoro study blocks and visual commitment tracking.');
  }

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
      parts.push("It's 100% free with no hidden paywalls.");
    }
  }

  if (inputs.preferOpenSource) {
    const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
    if (models.includes('open_source')) {
      parts.push('The source code is publicly verifiable and auditable.');
    }
  }

  return parts.join(' ') || `${resource.name} is a strong match for your specified platform and preferences.`;
}

function generateProblemAddressed(resource: Resource, inputs: FinderInputs): string {
  if (inputs.concern === 'notifications') {
    return 'Reduces notification-driven attention fragmenting by muting non-emergency pings.';
  }
  if (inputs.concern === 'scrolling') {
    return 'Interrupts automatic dopamine loops and infinite scrolling through strategic cognitive friction.';
  }
  if (inputs.concern === 'sleep') {
    return 'Automates evening sensory wind-down and shields sleep latency from digital stimulation.';
  }
  if (inputs.concern === 'privacy') {
    return 'Blocks persistent surveillance beacons and commercial profiling that track your online habits.';
  }
  return resource.purpose;
}

function generatePricingNote(resource: Resource): string {
  const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model];
  const isFree = models.includes('free') || models.includes('open_source');
  if (isFree && resource.cost.paywalledFeatures.length === 0) {
    return '100% Free: Essential features completely free without subscription.';
  }
  if (models.includes('freemium')) {
    return `Freemium: Core basic features are free; ${resource.cost.paywalledFeatures.join(', ')} require paid tier.`;
  }
  if (models.includes('paid')) {
    return `Paid: One-time or subscription fee (${resource.cost.details}).`;
  }
  return resource.cost.details;
}

function generateTradeoffNote(resource: Resource): string {
  const firstLimitation = resource.limitations[0];
  if (firstLimitation) {
    return `Important trade-off: ${firstLimitation}`;
  }
  return 'Review the full tool details for known limitations.';
}

function generateAlternativeSuggestion(resource: Resource): string {
  const alternatives: Record<string, string> = {
    'forest': 'If you prefer an entirely free, built-in solution without gamification, consider your phone\'s native Screen Time or Digital Wellbeing app timer.',
    'ios-screen-time': 'If you need strict, unbypassable site scheduling on your laptop, consider LeechBlock NG in your browser.',
    'android-digital-wellbeing': 'If you need pre-app breathing delays rather than timed shutoffs, pair with one sec.',
    'one-sec': 'If you need scheduled nighttime blackouts rather than app-open friction, configure native Sleep Focus / Bedtime Mode.',
    'leechblock-ng': 'If you want complete feed eradication across social networks without configuring custom time rules, use News Feed Eradicator.',
    'news-feed-eradicator': 'If you want timed access rather than total feed removal, configure LeechBlock NG.',
    'ios-sleep-focus': 'If you study late on a laptop computer, pair with f.lux to warm your display automatically.',
    'android-bedtime-mode': 'If you need desktop screen warming alongside mobile grayscale, pair with f.lux for Windows/Mac.',
    'flux': 'If you also want phone notifications silenced at bedtime, set up native iOS Sleep Focus or Android Bedtime Mode.',
    'ublock-origin': 'If you also want search queries disconnected from your identity, pair with DuckDuckGo search.',
    'duckduckgo': 'If you want active in-page tracker and banner blocking across all sites, combine with uBlock Origin.',
    'signal': 'For daily web browsing privacy, pair Signal with DuckDuckGo and uBlock Origin.',
  };
  return alternatives[resource.id] || 'Explore the Explore catalogue to compare alternative tools in this category.';
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
    score += getDailyUsageBonus(resource, inputs.dailyUsage);
    score += getInterventionBonus(resource, inputs.interventionType);
    score += getStudyRequirementBonus(resource, inputs.studyRequirement);
    score += getOpenSourceBonus(resource, inputs.preferOpenSource);
    score += getPrivacyBonus(resource);

    matches.push({
      resource,
      score,
      whyThisFits: generateWhyThisFits(resource, inputs),
      problemAddressed: generateProblemAddressed(resource, inputs),
      relevantFeatures: resource.keyFeatures.slice(0, 3),
      pricingNote: generatePricingNote(resource),
      tradeoffNote: generateTradeoffNote(resource),
      alternativeSuggestion: generateAlternativeSuggestion(resource),
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
  if (inputs.dailyUsage) p.set('usage', inputs.dailyUsage);
  if (inputs.interventionType) p.set('intervention', inputs.interventionType);
  if (inputs.studyRequirement) p.set('study', inputs.studyRequirement);
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
    dailyUsage: (params.get('usage') as DailyUsage) || '',
    interventionType: (params.get('intervention') as InterventionType) || '',
    studyRequirement: (params.get('study') as StudyRequirement) || '',
  };
}
