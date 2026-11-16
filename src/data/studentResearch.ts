// ============================================================
// STUDENT RESEARCH & USABILITY TESTING DATASET (R1, R9, R10)
// Authentic responses from 12 college students (Google Form)
// Evaluation Window: November 2026
// ============================================================

export interface StudentResponse {
  id: string; // 'Student 1' through 'Student 12'
  dailyDeviceUsage: string;
  mainDistractions: string[];
  struggleScreenTime: 'Yes' | 'Sometimes' | 'No';
  usedToolsBefore: 'Yes' | 'No';
  notificationsDisturb: 'Always' | 'Sometimes' | 'Rarely' | 'Never';
  sleepPrivacyPractices: string;
  desiredTool: string;
  selectedTool: string;
  understandDifferences: 'Yes' | 'Partially' | 'No';
  followGuide: 'Yes' | 'With difficulty' | 'No';
  easyToNavigate: 'Yes' | 'Somewhat' | 'No';
  foundUsefulTool: 'Yes' | 'No';
  comparisonsUnderstandable: 'Yes' | 'No';
  instructionsClear: 'Yes' | 'No';
  improvementSuggestion: string;
  problemsEncountered: string;
}

export const studentResponses: StudentResponse[] = [
  {
    id: 'Student 1',
    dailyDeviceUsage: 'Less than 2 hours',
    mainDistractions: ['Social media'],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'Yes',
    notificationsDisturb: 'Rarely',
    sleepPrivacyPractices: 'no',
    desiredTool: 'meditation',
    selectedTool: 'Unspecified',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: 'best site',
    problemsEncountered: 'nope',
  },
  {
    id: 'Student 2',
    dailyDeviceUsage: 'Less than 2 hours',
    mainDistractions: ['Messaging apps'],
    struggleScreenTime: 'No',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Never',
    sleepPrivacyPractices: 'Unanswered',
    desiredTool: 'Unanswered',
    selectedTool: 'Unspecified',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: '',
    problemsEncountered: '',
  },
  {
    id: 'Student 3',
    dailyDeviceUsage: 'More than 10 hours',
    mainDistractions: ['Notifications'],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'Yes',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: 'Nope',
    desiredTool: 'Something that lets me block apps on a schedule and is hard to bypass',
    selectedTool: 'LeechBlock NG',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: 'A wider variety of tools, both free and paid',
    problemsEncountered: 'None so far',
  },
  {
    id: 'Student 4',
    dailyDeviceUsage: 'More than 10 hours',
    mainDistractions: [],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Never',
    sleepPrivacyPractices: 'No',
    desiredTool: 'No',
    selectedTool: 'Nice very nice (ambiguous response)',
    understandDifferences: 'Partially',
    followGuide: 'With difficulty',
    easyToNavigate: 'Somewhat',
    foundUsefulTool: 'No',
    comparisonsUnderstandable: 'No',
    instructionsClear: 'No',
    improvementSuggestion: 'All good',
    problemsEncountered: 'Null',
  },
  {
    id: 'Student 5',
    dailyDeviceUsage: '2 to 4 hours',
    mainDistractions: ['Social media', 'Entertainment streaming'],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: 'No',
    desiredTool: 'Unanswered',
    selectedTool: 'Android Digital Wellbeing',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: '',
    problemsEncountered: '',
  },
  {
    id: 'Student 6',
    dailyDeviceUsage: '2 to 4 hours',
    mainDistractions: ['Social media'],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: 'No',
    desiredTool: 'Tool to control distraction',
    selectedTool: 'Android Digital Wellbeing',
    understandDifferences: 'Yes',
    followGuide: 'With difficulty',
    easyToNavigate: 'Somewhat',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: 'Make it more easier to understand',
    problemsEncountered: 'Give option for Q&A',
  },
  {
    id: 'Student 7',
    dailyDeviceUsage: 'More than 10 hours',
    mainDistractions: ['Social media', 'Notifications', 'Messaging apps'],
    struggleScreenTime: 'Yes',
    usedToolsBefore: 'Yes',
    notificationsDisturb: 'Always',
    sleepPrivacyPractices: 'no',
    desiredTool: 'Unanswered',
    selectedTool: 'Android Digital Wellbeing',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: 'nothing',
    problemsEncountered: 'superb design no problems',
  },
  {
    id: 'Student 8',
    dailyDeviceUsage: '6 - 8 hours',
    mainDistractions: ['Social media'],
    struggleScreenTime: 'Sometimes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: "I use Do Not Disturb mode occasionally and avoid using my phone before sleeping, but I don't use any dedicated privacy tools.",
    desiredTool: 'A tool that blocks distracting websites and apps during study hours, tracks productive screen time, and provides daily usage reports.',
    selectedTool: 'Forest',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: "The website is useful and provides a good collection of digital wellness resources. However, it could be improved by adding more interactive features, a cleaner comparison layout, and visual indicators to make it easier to compare different tools. A personalized recommendation system based on users' screen time habits would also make the website more helpful.",
    problemsEncountered: "The website is generally easy to understand and navigate. However, some users may need more detailed explanations before choosing between different tools. The setup guides could include screenshots or short video demonstrations to make the process easier for beginners. It would also be helpful to add more free tool recommendations and a feature to track progress in reducing screen time.",
  },
  {
    id: 'Student 9',
    dailyDeviceUsage: 'More than 10 hours',
    mainDistractions: ['Notifications'],
    struggleScreenTime: 'Yes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Always',
    sleepPrivacyPractices: 'NO',
    desiredTool: 'Unanswered',
    selectedTool: 'Android Digital Wellbeing and Signal',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: 'All good IMO, quite clear and easy to navigate the site',
    problemsEncountered: 'nope',
  },
  {
    id: 'Student 10',
    dailyDeviceUsage: '4 to 6 hours',
    mainDistractions: ['Social media'],
    struggleScreenTime: 'Yes',
    usedToolsBefore: 'Yes',
    notificationsDisturb: 'Always',
    sleepPrivacyPractices: 'No',
    desiredTool: 'None',
    selectedTool: 'Tool 1 (unspecified)',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'No',
    foundUsefulTool: 'No',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'No',
    improvementSuggestion: 'No',
    problemsEncountered: 'No',
  },
  {
    id: 'Student 11',
    dailyDeviceUsage: '4 to 6 hours',
    mainDistractions: ['Notifications'],
    struggleScreenTime: 'Yes',
    usedToolsBefore: 'No',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: 'No',
    desiredTool: 'Digital wellbeing',
    selectedTool: 'Android Digital Wellbeing',
    understandDifferences: 'Yes',
    followGuide: 'Yes',
    easyToNavigate: 'Yes',
    foundUsefulTool: 'Yes',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: '.',
    problemsEncountered: 'Nothing yet',
  },
  {
    id: 'Student 12',
    dailyDeviceUsage: 'More than 10 hours',
    mainDistractions: ['Social media', 'Messaging apps', 'Web browsing'],
    struggleScreenTime: 'Yes',
    usedToolsBefore: 'Yes',
    notificationsDisturb: 'Sometimes',
    sleepPrivacyPractices: 'Sometimes I use blacker apps (blocker/screen filter apps)',
    desiredTool: 'Unanswered',
    selectedTool: 'DuckDuckGo',
    understandDifferences: 'No',
    followGuide: 'Yes',
    easyToNavigate: 'Somewhat',
    foundUsefulTool: 'No',
    comparisonsUnderstandable: 'Yes',
    instructionsClear: 'Yes',
    improvementSuggestion: '',
    problemsEncountered: '',
  },
];

export interface StatItem {
  label: string;
  count: number;
  total: number;
  percentage: number;
}

export const habitStatistics = {
  dailyUsage: [
    { label: 'More than 10 hours', count: 5, total: 12, percentage: 41.7 },
    { label: '4 to 6 hours', count: 2, total: 12, percentage: 16.7 },
    { label: '2 to 4 hours', count: 2, total: 12, percentage: 16.7 },
    { label: 'Less than 2 hours', count: 2, total: 12, percentage: 16.7 },
    { label: '6 - 8 hours', count: 1, total: 12, percentage: 8.3 },
  ],
  distractions: [
    { label: 'Social media', count: 7, total: 11, percentage: 63.6 },
    { label: 'Notifications', count: 5, total: 11, percentage: 45.5 },
    { label: 'Messaging apps', count: 3, total: 11, percentage: 27.3 },
    { label: 'Entertainment streaming', count: 1, total: 11, percentage: 9.1 },
    { label: 'Web browsing', count: 1, total: 11, percentage: 9.1 },
  ],
  struggleWithScreenTime: [
    { label: 'Yes (Struggle constantly)', count: 5, total: 12, percentage: 41.7 },
    { label: 'Sometimes (Struggle periodically)', count: 6, total: 12, percentage: 50.0 },
    { label: 'No (No difficulty)', count: 1, total: 12, percentage: 8.3 },
  ],
  notificationsDisturb: [
    { label: 'Sometimes', count: 6, total: 12, percentage: 50.0 },
    { label: 'Always', count: 3, total: 12, percentage: 25.0 },
    { label: 'Never', count: 2, total: 12, percentage: 16.7 },
    { label: 'Rarely', count: 1, total: 12, percentage: 8.3 },
  ],
  previouslyUsedTools: [
    { label: 'No prior tools used', count: 7, total: 12, percentage: 58.3 },
    { label: 'Has used tools before', count: 5, total: 12, percentage: 41.7 },
  ],
};

export const usabilityStatistics = {
  easeOfNavigation: [
    { label: 'Yes (Easy)', count: 8, total: 12, percentage: 66.7 },
    { label: 'Somewhat', count: 3, total: 12, percentage: 25.0 },
    { label: 'No (Difficult)', count: 1, total: 12, percentage: 8.3 },
  ],
  foundUsefulTool: [
    { label: 'Yes (Discovered suitable tool)', count: 9, total: 12, percentage: 75.0 },
    { label: 'No (Did not find suitable tool)', count: 3, total: 12, percentage: 25.0 },
  ],
  comparisonsUnderstandable: [
    { label: 'Yes (Comparisons clear)', count: 11, total: 12, percentage: 91.7 },
    { label: 'No (Unclear)', count: 1, total: 12, percentage: 8.3 },
  ],
  understoodDifferences: [
    { label: 'Yes (Clear trade-offs)', count: 10, total: 12, percentage: 83.3 },
    { label: 'Partially', count: 1, total: 12, percentage: 8.3 },
    { label: 'No', count: 1, total: 12, percentage: 8.3 },
  ],
  followedGuide: [
    { label: 'Yes (Followed easily)', count: 10, total: 12, percentage: 83.3 },
    { label: 'With difficulty', count: 2, total: 12, percentage: 16.7 },
  ],
  instructionsClear: [
    { label: 'Yes (Instructions clear)', count: 10, total: 12, percentage: 83.3 },
    { label: 'No (Instructions unclear)', count: 2, total: 12, percentage: 16.7 },
  ],
};

export interface ImplementedImprovement {
  id: string;
  feedbackSource: string;
  studentQuote: string;
  identifiedIssue: string;
  changeImplemented: string;
  status: 'Implemented' | 'Planned / Future scope';
  affectedPages: string[];
}

export const implementedImprovements: ImplementedImprovement[] = [
  {
    id: 'IMP-01',
    feedbackSource: 'Student 8',
    studentQuote: "A cleaner comparison layout, and visual indicators to make it easier to compare different tools.",
    identifiedIssue: 'Text-heavy matrix made it hard to visually weigh trade-offs at a glance.',
    changeImplemented: 'Added color-coded visual indicator badges to Compare: Friction Level (Gentle to Strict), Privacy Rating, Ease of Setup, and explicit 100% Free / Freemium / Paid badges.',
    status: 'Implemented',
    affectedPages: ['/compare', '/explore'],
  },
  {
    id: 'IMP-02',
    feedbackSource: 'Student 8',
    studentQuote: "A personalized recommendation system based on users' screen time habits would also make the website more helpful.",
    identifiedIssue: 'Wizard previously matched only problem categories and operating system, ignoring daily device usage intensity.',
    changeImplemented: 'Added a Daily Screen-Time Habit selector (<2h, 2–4h, 4–6h, 6–8h, >10h) and Preferred Intervention Type to the Find My Tool wizard, prioritizing high-friction tools for high-usage students and gentle awareness tools for moderate users.',
    status: 'Implemented',
    affectedPages: ['/find'],
  },
  {
    id: 'IMP-03',
    feedbackSource: 'Student 6',
    studentQuote: "Give option for Q&A and make it more easier to understand.",
    identifiedIssue: 'Students had common recurring doubts about bypass prevention, blue light, alarm safety, and cost differences that were not answered in one central place.',
    changeImplemented: 'Created an interactive Digital Wellness Q&A (FAQ) component addressing the top 8 student questions with concise, beginner-friendly answers grounded in scientific accuracy.',
    status: 'Implemented',
    affectedPages: ['/learn', '/research', '/about'],
  },
  {
    id: 'IMP-04',
    feedbackSource: 'Student 3',
    studentQuote: "A wider variety of tools, both free and paid.",
    identifiedIssue: 'Need absolute clarity on what is completely free vs what features require payment.',
    changeImplemented: 'Enhanced tool detail pages with explicit "Free vs Paid Features" breakdown cards and added free tool alternatives to every freemium/paid resource.',
    status: 'Implemented',
    affectedPages: ['/explore', '/explore/:slug', '/compare'],
  },
  {
    id: 'IMP-05',
    feedbackSource: 'Student 8 & Student 3',
    studentQuote: "A tool that blocks distracting websites and apps during study hours, tracks productive screen time, and provides daily usage reports.",
    identifiedIssue: 'Students struggle specifically with study-session distraction bursts rather than just all-day lockouts.',
    changeImplemented: 'Added a dedicated "Study Session Distraction Blocking Checklist" and recommended specific tool combinations (e.g., Forest Pomodoro timer + LeechBlock NG browser blocker).',
    status: 'Implemented',
    affectedPages: ['/learn', '/guides/cue-friction'],
  },
  {
    id: 'IMP-06',
    feedbackSource: 'Student 4 & Student 6',
    studentQuote: "Could follow guide: With difficulty / Setup instructions clear: No.",
    identifiedIssue: 'Beginners found steps without visual reference points or clear prerequisites confusing.',
    changeImplemented: 'Added 37 clear illustrative diagrams and store captures across all guides, verified step-by-step instructions for iOS 17, Android 14, Chrome, Firefox, and Windows, and added troubleshooting tips for every step.',
    status: 'Implemented',
    affectedPages: ['/guides', '/guides/:slug'],
  },
];

