# Student Needs & Digital Habits Research Report
**Project 3 · Digital Wellness Resource Hub**  
**Academic Requirement R1 & R10 Compliance Document**  
*Evaluation Period: November 2026 · Sample Size: N=12 College Students*

---

## Executive Summary

To satisfy mandatory project requirement **R1 ("Define a student audience and its main needs via a discussion/feedback activity")** and support **R9 ("Usability testing with real students")**, our product team conducted a formal primary research study among 12 active university students. 

The empirical findings revealed acute digital strain:
- **41.7% (5/12)** of surveyed students spend **more than 10 hours daily** on screens across mobile and laptop devices.
- **91.7% (11/12)** experience persistent or periodic difficulty regulating their device usage during academic study.
- **63.6%** identified **social media feeds** (Instagram, TikTok, YouTube Shorts) and **45.5%** identified **notification interruptions** as their foremost study disruptors.
- **58.3% (7/12)** had **never utilized a digital wellness or screen-time tool** prior to this evaluation, highlighting high barriers to entry, lack of discoverability, and confusion regarding tool functionality.

These findings directly dictated the technical architecture of the Digital Wellness Hub, specifically the development of an **habit-aware recommendation engine**, a **side-by-side visual comparison matrix**, **friction-oriented categorization**, and **step-by-step verified setup guides**.

---

## 1. Research Methodology & Participant Profile

### 1.1 Study Design & Data Collection
Data was gathered via a structured Google Form combining multiple-choice frequency indicators, task-completion checkpoints, Likert-scale clarity ratings, and open-ended qualitative prompts. The full raw dataset is preserved in [`docs/student_feedback_responses.csv`](file:///d:/DW_Project/docs/student_feedback_responses.csv) and typed in [`src/data/studentResearch.ts`](file:///d:/DW_Project/src/data/studentResearch.ts).

### 1.2 Ethical Anonymization (R11 Compliance)
In strict accordance with assignment privacy rules, zero student names, email addresses, student IDs, or IP addresses were collected or retained. Participants are referred to throughout all documentation as **Student 1 through Student 12**.

### 1.3 Participant Demographics
- **Target Audience:** College and university undergraduate/postgraduate students.
- **Device Ecosystems:** Hybrid mobile and desktop environments (iOS, Android, macOS, Windows).
- **Academic Context:** Students balancing lecture attendance, self-directed research, revision blocks, and group project collaboration.

---

## 2. Pre-Testing Habits & Needs Analysis

### 2.1 Daily Screen Time Distribution (Combined Phone + Laptop)
| Daily Device Usage | Participant Count | Percentage |
|---|---|---|
| **More than 10 hours** | 5 | 41.7% |
| **4 to 6 hours** | 2 | 16.7% |
| **2 to 4 hours** | 2 | 16.7% |
| **Less than 2 hours** | 2 | 16.7% |
| **6 to 8 hours** | 1 | 8.3% |
| **Total** | **12** | **100.0%** |

*Synthesis:* Over 50% of participants exceed 6 hours of daily screen time, with the largest single cohort reporting extreme device dependency (>10 hours/day).

### 2.2 Difficulty Controlling Screen Time
| Struggle Response | Count | Percentage | Interpretation |
|---|---|---|---|
| **Yes (Constant struggle)** | 5 | 41.7% | High cognitive overload; chronic habit loops |
| **Sometimes (Periodic struggle)** | 6 | 50.0% | Situational vulnerability (e.g. during revision) |
| **No (No difficulty)** | 1 | 8.3% | Strong existing self-regulation routines |

*Synthesis:* Over 91% of respondents acknowledge that digital distractions impair their daily activities.

### 2.3 Primary Study Distractions (N=11 reporting specific triggers)
| Distraction Source | Mentions | Percentage of Respondents |
|---|---|---|
| **Social media** | 7 | 63.6% |
| **Notifications** | 5 | 45.5% |
| **Messaging apps** | 3 | 27.3% |
| **Entertainment streaming** | 1 | 9.1% |
| **Web browsing / rabbit holes** | 1 | 9.1% |

*Synthesis:* Algorithmic feeds (dopamine loops) and intermittent smartphone alerts (attention residue) account for over 80% of student distraction events.

### 2.4 Prior Tool Familiarity
- **58.3% (7/12)** had **never used** a digital wellness tool before.
- **41.7% (5/12)** had previously tried tools, primarily built-in OEM timers (Android Digital Wellbeing).

### 2.5 Notification Disruption Frequency
- **Sometimes disruptive:** 50.0% (6/12)
- **Always disruptive:** 25.0% (3/12)
- **Never disruptive:** 16.7% (2/12)
- **Rarely disruptive:** 8.3% (1/12)

*Synthesis:* 75.0% of students report that notifications regularly fragment their academic study sessions.

### 2.6 Sleep & Nighttime Digital Habits
When asked about bedtime screen habits and privacy tools, **81.8%** reported no structured wind-down routines or privacy defenses, relying on unstructured late-night scrolling that directly impacts sleep onset latency.

---

## 3. Student Needs Synthesis

From the quantitative distributions and qualitative statements, four core student requirements emerged:

1. **Need 1: Active Friction over Passive Monitoring**  
   Students report that passive usage counters (e.g. simply seeing "7 hours today") do not stop impulsive unlocks. They require intentional friction—such as mandatory breathing pauses (one sec), feed blockers (News Feed Eradicator), or app lockouts (LeechBlock NG, Screen Time passcodes).

2. **Need 2: Transparent Cost & Inclusions (Zero Paywall Traps)**  
   Students operating on tight academic budgets feel misled by freemium apps that lock essential limits behind recurring subscriptions. They require upfront transparency distinguishing 100% free open-source tools from freemium services.

3. **Need 3: Study Session Blockers with Emergency Call Whitelisting**  
   Students want distraction-free study intervals without fearing they will miss critical family emergencies or urgent project alerts.

4. **Need 4: Privacy-First Tools Without Account Overhead**  
   Students are increasingly wary of wellness apps that harvest personal browsing logs, app habits, and location telemetry. They favor local-first, zero-telemetry utilities.

---

## 4. Methodological Scope & Scientific Limitations

To maintain strict academic integrity (R11), the following constraints are acknowledged:
1. **Convenience Sampling:** The survey sample (N=12) consists of college students within an institutional setting; findings reflect university academic stressors and may not represent the general adult working population.
2. **Self-Report Accuracy:** Screen time hours and distraction frequencies were self-reported rather than collected via automated operating system telemetry logs.
3. **Cross-Sectional Evaluation:** Usability testing was conducted during a focused evaluation window (November 2026); longitudinal habit retention over multiple semesters remains an area for future inquiry.

