// ============================================================
// CONCEPT DATA — Digital Wellness Hub
// Evidence-labelled course concepts for the Learn section
// ============================================================

export type EvidenceLevel =
  | 'well_supported'
  | 'supported_simplified'
  | 'mixed_limited'
  | 'philosophical_framework';

export interface ConceptSource {
  authors?: string;
  title: string;
  journal?: string;
  year?: number;
  url: string;
  note?: string;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  plainExplanation: string;
  evidenceLabel: EvidenceLevel;
  evidenceSummary: string;
  evidenceLimits: string;
  sources: ConceptSource[];
  tryItWith: string[]; // resource ids
  relatedConcepts: string[]; // concept ids
}

export const concepts: Concept[] = [
  {
    id: 'attention-economy',
    slug: 'attention-economy',
    title: 'The Attention Economy',
    tagline: 'Your attention is the product. Platforms compete for every minute of it.',
    plainExplanation:
      'Many free digital platforms — social media, news sites, video services — are funded by advertising. More time you spend = more ads shown = more revenue. This creates a powerful business incentive to design products that capture and hold your attention as long as possible. The economist Herbert Simon coined the phrase "attention economy" to describe how scarce human attention becomes the resource that companies compete over. The tools and patterns you notice — infinite scroll, autoplay, notification badges — are deliberate design choices in this competition.',
    evidenceLabel: 'well_supported',
    evidenceSummary:
      'The economic model (advertising revenue tied to engagement) is well-documented. The deliberate design of attention-capturing features is confirmed by industry insiders, researchers, and regulatory investigations.',
    evidenceLimits:
      'The precise causal effects on individual wellbeing, concentration, or mental health from the attention economy are complex and debated in the research literature. Correlations exist between heavy social media use and certain wellbeing outcomes, but causation is difficult to establish.',
    sources: [
      {
        authors: 'Simon, H. A.',
        title: 'Designing Organizations for an Information-Rich World',
        year: 1971,
        url: 'https://www.semanticscholar.org/paper/Designing-Organizations-for-an-Information-Rich-Simon/f1a5e6c8d4e9d7a3c2b1a0f3e5d7b9c1e3f5a7b9',
        note: 'Original academic source for attention scarcity concept.',
      },
      {
        authors: 'Harris, T.',
        title: 'How Technology Hijacks People\'s Minds — Center for Humane Technology',
        url: 'https://www.humanetech.com',
        note: 'Accessible overview of attention-capturing design; practical framing.',
      },
    ],
    tryItWith: ['news-feed-eradicator', 'leechblock-ng', 'duckduckgo'],
    relatedConcepts: ['algorithmic-hooking', 'dopamine-loop'],
  },

  {
    id: 'dopamine-loop',
    slug: 'dopamine-loop',
    title: 'Variable Rewards & the Dopamine Loop',
    tagline: 'Why you keep scrolling "just one more time" — it\'s not weakness, it\'s design.',
    plainExplanation:
      'Dopamine is a neurotransmitter involved in motivation and the anticipation of reward — not just pleasure itself. When outcomes are unpredictable (sometimes great content, sometimes boring), the brain\'s dopamine system activates strongly in anticipation. This is the "variable reward" or "slot machine" mechanism. Social media feeds deliver variable rewards: most posts are ordinary, but every so often there\'s something funny, shocking, or emotionally resonant. That unpredictability drives continued scrolling in search of the next reward. This is a simplified model — dopamine\'s role is far more complex than a simple "reward chemical."',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'Variable reward schedules producing strong behavioural responses are well-established in learning psychology (Skinner\'s operant conditioning, extensively replicated). The role of dopamine in anticipation and motivation is well-supported in neuroscience. The specific application to social media use is a reasonable and widely-cited inference, though direct measurement in social media contexts is limited.',
    evidenceLimits:
      'The popular "dopamine = pleasure chemical" framing is an oversimplification. Dopamine is more accurately associated with wanting/motivation than liking/pleasure (Berridge & Robinson, 1998). Social media\'s effects are real but multi-causal — not purely reducible to a dopamine loop. This framing is a useful metaphor, not a complete neurological account.',
    sources: [
      {
        authors: 'Berridge, K. C. & Robinson, T. E.',
        title: 'What is the role of dopamine in reward: hedonic impact, reward learning, or incentive salience?',
        journal: 'Brain Research Reviews',
        year: 1998,
        url: 'https://pubmed.ncbi.nlm.nih.gov/9858756/',
        note: 'Key academic source distinguishing "wanting" (dopamine) from "liking" (opioid).',
      },
      {
        authors: 'Skinner, B. F.',
        title: 'The Behavior of Organisms',
        year: 1938,
        url: 'https://psycnet.apa.org/record/1938-25625-000',
        note: 'Foundation of variable-ratio reinforcement schedules.',
      },
    ],
    tryItWith: ['one-sec', 'news-feed-eradicator', 'leechblock-ng'],
    relatedConcepts: ['attention-economy', 'algorithmic-hooking', 'habit-inversion'],
  },

  {
    id: 'switching-penalty',
    slug: 'switching-penalty',
    title: 'Task Switching & the Attention Residue',
    tagline: 'Every time you check your phone mid-study, part of your brain stays behind.',
    plainExplanation:
      'Human cognition is not built for rapid, penalty-free task-switching. When you switch from studying to checking a notification — even briefly — your attention does not fully return to studying immediately. Researcher Sophie Leroy calls this "attention residue": thoughts about the previous task linger and reduce performance on the new one. Studies suggest it can take 15–25 minutes to fully re-engage with a complex task after an interruption. Notifications are designed to interrupt, and each interruption costs more focus than it appears.',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'Attention residue is experimentally supported (Leroy, 2009; replicated in multiple studies). The "23 minutes to refocus" figure is frequently cited (from a study by Mark et al., 2008) but that specific number should be treated as an approximation, not a precise scientific constant.',
    evidenceLimits:
      'The exact recovery time varies by task complexity, individual, and the type of interruption. The 23-minute figure is from one study in a specific work context. Some interruptions (brief, simple) have smaller penalties than others.',
    sources: [
      {
        authors: 'Leroy, S.',
        title: 'Why is it so hard to do my work? The challenge of attention residue when switching between work tasks',
        journal: 'Organizational Behavior and Human Decision Processes',
        year: 2009,
        url: 'https://doi.org/10.1016/j.obhdp.2009.04.002',
      },
      {
        authors: 'Mark, G., Gudith, D., & Klocke, U.',
        title: 'The cost of interrupted work: more speed and stress',
        journal: 'CHI 2008 Proceedings',
        year: 2008,
        url: 'https://dl.acm.org/doi/10.1145/1357054.1357072',
      },
    ],
    tryItWith: ['forest', 'leechblock-ng', 'ios-screen-time', 'android-digital-wellbeing'],
    relatedConcepts: ['ekagra', 'attention-economy'],
  },

  {
    id: 'ekagra',
    slug: 'ekagra-mind-states',
    title: 'Mind States: From Kshipta to Ekagra',
    tagline: 'A philosophical framework for understanding why concentration feels so hard.',
    plainExplanation:
      'The Yoga Sutras of Patanjali describe five states of the mind (Chitta Bhumi): Mudha (dull/inert), Kshipta (scattered/distracted), Vikshipta (occasionally gathered), Ekagra (one-pointed focus), and Nirudhha (complete restraint). Most students in a notification-rich environment operate in Kshipta — thoughts dart between tasks, the phone, and anxieties. The goal of digital wellness practices is to create conditions that support Vikshipta and, during focused study, Ekagra. This is a philosophical and metaphorical framework — it is not a neuroscientific taxonomy.',
    evidenceLabel: 'philosophical_framework',
    evidenceSummary:
      'Patanjali\'s Yoga Sutras are a foundational text of classical Yoga philosophy (estimated 400 CE). The five Chitta Bhumi are a philosophical framework, not an empirical neuroscientific model. However, the descriptions map usefully onto modern attention research concepts (distracted vs. focused states).',
    evidenceLimits:
      'This is a traditional/philosophical framework, not a neuroscience model. It should not be presented as scientifically validated psychology. It is a helpful metaphor and teaching framework with cultural and philosophical significance.',
    sources: [
      {
        authors: 'Patanjali',
        title: 'Yoga Sutras of Patanjali (various translations)',
        url: 'https://www.yogavidya.com/yoga/yoga-sutras-of-patanjali/',
        note: 'Original philosophical source. Many translations available.',
      },
    ],
    tryItWith: ['forest', 'leechblock-ng', 'ios-screen-time'],
    relatedConcepts: ['switching-penalty', 'attention-economy', 'brain-downtime'],
  },

  {
    id: 'brain-downtime',
    slug: 'brain-downtime',
    title: 'Brain Downtime & Mind-Wandering',
    tagline: 'Your brain\'s "rest mode" is not idle — it\'s doing important processing.',
    plainExplanation:
      'When your brain is not actively focused on a task, it enters what neuroscientists call the Default Mode Network (DMN) — a state of mind-wandering, internal reflection, daydreaming, and integration of memories. Far from being wasted time, this "downtime" is associated with creativity, problem-solving, memory consolidation, and emotional processing. Constant digital stimulation — always having a screen to check — may reduce the time spent in productive mind-wandering. When you fill every quiet moment with your phone, you may be shortchanging your brain\'s internal maintenance processes.',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'The Default Mode Network is well-established in neuroscience (Raichle et al., 2001, and many subsequent studies). Its roles in memory consolidation, creativity, and emotional processing are supported, though complex and not fully understood. The specific claim that phone-checking displaces valuable DMN time is a plausible inference, but direct causal studies in phone-use contexts are limited.',
    evidenceLimits:
      'The precise benefits of mind-wandering vs. focused activity depend heavily on context. Excessive mind-wandering is also associated with anxiety and rumination. The relationship between phone use and DMN activity is an active research area without settled conclusions.',
    sources: [
      {
        authors: 'Raichle, M. E., et al.',
        title: 'A default mode of brain function',
        journal: 'Proceedings of the National Academy of Sciences',
        year: 2001,
        url: 'https://doi.org/10.1073/pnas.98.2.676',
      },
      {
        authors: 'Smallwood, J. & Schooler, J. W.',
        title: 'The restless mind',
        journal: 'Psychological Bulletin',
        year: 2006,
        url: 'https://doi.org/10.1037/0033-2909.132.6.946',
      },
    ],
    tryItWith: ['forest', 'ios-screen-time', 'android-digital-wellbeing'],
    relatedConcepts: ['switching-penalty', 'sleep-hygiene'],
  },

  {
    id: 'sleep-hygiene',
    slug: 'sleep-hygiene',
    title: 'Sleep Hygiene & Evening Light',
    tagline: 'Your bedtime phone habits directly affect how long you sleep — and how well.',
    plainExplanation:
      'Sleep hygiene refers to practices that support regular, restorative sleep. For digital wellness, three factors are most relevant: (1) Light exposure: short-wavelength (blue) light from screens suppresses melatonin secretion to some degree in the hours before sleep — but this effect is real yet modest for typical evening screen use, not the dominant factor often claimed. (2) Mental arousal: engaging, stressful, or emotionally activating content (news, arguments on social media) increases cognitive arousal and delays sleep onset, independent of light. (3) Consistency: a regular sleep-wake schedule is one of the strongest evidence-based sleep hygiene practices. \n\nNote: This hub does not provide medical advice. If you have persistent sleep difficulties, consult a healthcare professional.',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'The link between consistent sleep schedules and sleep quality is well-supported (Walker, 2017; multiple systematic reviews). Blue-light/melatonin suppression from screens is real but its magnitude in typical use is debated (Blume et al., 2019 suggest real but modest effects). Mental arousal from content is plausible and consistent with arousal-based sleep models. No digital wellness tool is a cure for sleep disorders.',
    evidenceLimits:
      'Blue light from screens alone is not a major cause of sleep problems — total light intensity and mental stimulation matter more. Studies on glymphatic brain-clearance during sleep that claim to explain sleep\'s "brain-cleaning" function come largely from animal studies; the magnitude should not be presented as fully established in humans. Do not claim that night-mode tools "cure" sleep problems.',
    sources: [
      {
        authors: 'Blume, C., Garbazza, C., & Spitschan, M.',
        title: 'Effects of light on human circadian rhythms, sleep and mood',
        journal: 'Somnologie',
        year: 2019,
        url: 'https://doi.org/10.1007/s11818-019-00215-x',
        note: 'Review of light effects; nuanced on blue light and screens.',
      },
      {
        authors: 'Walker, M.',
        title: 'Why We Sleep: Unlocking the Power of Sleep and Dreams',
        year: 2017,
        url: 'https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325',
        note: 'Accessible but note: some specific claims in this book have been critiqued by sleep researchers — use alongside peer-reviewed sources.',
      },
      {
        authors: 'Hirshkowitz, M., et al.',
        title: 'National Sleep Foundation\'s sleep time duration recommendations',
        journal: 'Sleep Health',
        year: 2015,
        url: 'https://doi.org/10.1016/j.sleh.2014.12.010',
      },
    ],
    tryItWith: ['ios-sleep-focus', 'android-bedtime-mode', 'flux'],
    relatedConcepts: ['brain-downtime', 'habit-inversion'],
  },

  {
    id: 'habit-inversion',
    slug: 'habit-inversion',
    title: 'Habit Inversion & Cue Control',
    tagline: 'The easiest way to break a bad habit is to make it harder to start.',
    plainExplanation:
      'Habits follow a cue–routine–reward loop. To change an unwanted habit, you can disrupt it at the cue stage: remove or modify the trigger that initiates the behaviour. James Clear\'s popular framework (from "Atomic Habits") describes four levers: make the cue invisible, the action difficult, the outcome unattractive, and the reward unsatisfying. Applied to phone habits: hiding apps in a folder (invisible), setting a time limit that requires a passcode to extend (difficult), switching to grayscale (unattractive), or using one sec\'s breathing pause (unsatisfying → no immediate dopamine hit) are all forms of cue control or friction addition.',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'The habit loop model (cue–routine–reward) has academic support in habit psychology (Wood & Rünger, 2016; Neal et al., 2006). The specific "four laws" framing is from a popular book, not peer-reviewed research, though it draws on the academic habit literature. Adding friction to behaviours to reduce their frequency is well-supported in behavioural economics (Thaler & Sunstein\'s "nudge" theory).',
    evidenceLimits:
      'Habit formation and change are more complex than the simple loop model suggests — motivation, identity, context, and stress all play roles. "Atomic Habits" is an excellent practical book but is not a peer-reviewed source. Apply the framework as a practical heuristic, not a scientific law.',
    sources: [
      {
        authors: 'Wood, W. & Rünger, D.',
        title: 'Psychology of Habit',
        journal: 'Annual Review of Psychology',
        year: 2016,
        url: 'https://doi.org/10.1146/annurev-psych-122414-033417',
      },
      {
        authors: 'Clear, J.',
        title: 'Atomic Habits',
        year: 2018,
        url: 'https://jamesclear.com/atomic-habits',
        note: 'Practical framework; popular book drawing on habit psychology literature.',
      },
    ],
    tryItWith: ['one-sec', 'ios-screen-time', 'android-digital-wellbeing', 'leechblock-ng'],
    relatedConcepts: ['dopamine-loop', 'algorithmic-hooking'],
  },

  {
    id: 'algorithmic-hooking',
    slug: 'algorithmic-hooking',
    title: 'Algorithmic Hooking & Filter Bubbles',
    tagline: 'Recommendation algorithms are optimised to keep you watching — not to inform you.',
    plainExplanation:
      'Modern platforms use recommendation algorithms trained to maximise engagement (clicks, watch time, shares). These algorithms learn which content triggers emotional responses in you specifically — often outrage, fear, or excitement — and serve more of it. This is "algorithmic hooking": the feed becomes increasingly personalised to your most reactive preferences, not your reflective ones. A secondary effect is the filter bubble — you see less content that challenges your existing beliefs, reducing exposure to diverse perspectives. Privacy tools address this partly by reducing the data fed back to these algorithms (fewer tracking signals = less personalised hooking).',
    evidenceLabel: 'supported_simplified',
    evidenceSummary:
      'Recommendation algorithms optimising for engagement are confirmed by platform documentation and academic research (Ribeiro et al., 2020 on YouTube; Edelson et al., 2022 on Facebook). Filter bubble effects are documented but their magnitude and societal impact are contested (Guess et al., 2018 suggest users do encounter counter-attitudinal content more than the filter-bubble theory implies).',
    evidenceLimits:
      'Filter bubbles are real but their magnitude is debated — people actively seek out different sources too. The relationship between algorithm exposure and radicalisation is more complex than often stated. Algorithmic effects vary significantly by platform and user behaviour.',
    sources: [
      {
        authors: 'Ribeiro, M. H., et al.',
        title: 'Auditing radicalization pathways on YouTube',
        year: 2020,
        url: 'https://dl.acm.org/doi/10.1145/3351095.3372879',
      },
      {
        authors: 'Pariser, E.',
        title: 'The Filter Bubble: What the Internet Is Hiding from You',
        year: 2011,
        url: 'https://www.penguinrandomhouse.com/books/309214/the-filter-bubble-by-eli-pariser/',
        note: 'Popularised the filter bubble concept; now nuanced by subsequent research.',
      },
    ],
    tryItWith: ['news-feed-eradicator', 'ublock-origin', 'duckduckgo'],
    relatedConcepts: ['attention-economy', 'dopamine-loop', 'habit-inversion'],
  },
];

export const evidenceLevelLabels: Record<EvidenceLevel, string> = {
  well_supported: 'Well supported',
  supported_simplified: 'Supported, simplified here',
  mixed_limited: 'Mixed or limited evidence',
  philosophical_framework: 'Traditional / philosophical framework (not neuroscience)',
};

export const evidenceLevelColors: Record<EvidenceLevel, string> = {
  well_supported: 'bg-green-100 text-green-800 border-green-200',
  supported_simplified: 'bg-blue-100 text-blue-800 border-blue-200',
  mixed_limited: 'bg-amber-100 text-amber-800 border-amber-200',
  philosophical_framework: 'bg-purple-100 text-purple-800 border-purple-200',
};

export const getConceptById = (id: string): Concept | undefined =>
  concepts.find((c) => c.id === id);

export const getConceptBySlug = (slug: string): Concept | undefined =>
  concepts.find((c) => c.slug === slug);

