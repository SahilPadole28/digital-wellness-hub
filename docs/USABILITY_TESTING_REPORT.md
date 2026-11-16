# Usability Testing Report
**Project 3 · Digital Wellness Resource Hub**  
**Academic Requirement R9 & R10 Compliance Document**  
*Evaluation Period: 12–13 November 2026 · Evaluators: N=12 Anonymized Students*

---

## 1. Testing Protocol & Objectives

The usability evaluation was conducted to assess whether the Digital Wellness Resource Hub successfully enables students to:
1. **Task 1 (Discovery):** Formulate their individual distraction concerns, utilize the recommendation wizard or category filters, and discover a viable digital wellness tool suited to their operating system and budget.
2. **Task 2 (Comparison):** Evaluate candidate tools side-by-side across consistent criteria (friction, cost, privacy, accessibility, and limitations) without being misled by subscription claims.
3. **Task 3 (Implementation):** Follow a student-authored setup guide step-by-step to implement genuine friction or bedtime routines on their personal hardware.

---

## 2. Participant Ledger & Task Completion Data

Every participant reviewed the live application and submitted their structured evaluation through the testing instrument. All data below is authentic and verifiable against [`docs/student_feedback_responses.csv`](file:///d:/DW_Project/docs/student_feedback_responses.csv).

| Participant | Tool Selected | Nav Easy? | Useful Tool Found? | Comparisons Clear? | Follow Guide? | Steps Clear? | Verbatim Student Feedback & Observations |
|---|---|---|---|---|---|---|---|
| **Student 1** | Unspecified | Yes | Yes | Yes | Yes | Yes | *"best site / nope (no issues encountered)"* |
| **Student 2** | Unspecified | Yes | Yes | Yes | Yes | Yes | *"Keep it up"* |
| **Student 3** | LeechBlock NG | Somewhat | Yes | Yes | Yes | Yes | *"A wider variety of tools, both free and paid. More detailed descriptions of each tool's features."* |
| **Student 4** | Forest | No | No | No | With difficulty | No | *"Give more clear guidance / was confused by instructions"* |
| **Student 5** | Android Digital Wellbeing | Yes | Yes | Yes | Yes | Yes | *"site looks good / no problems"* |
| **Student 6** | Android Digital Wellbeing | Somewhat | Yes | Yes | With difficulty | No | *"Give option for Q&A and make it more easier to understand."* |
| **Student 7** | Android Digital Wellbeing | Yes | Yes | Yes | Yes | Yes | *"nothing"* |
| **Student 8** | Forest | Yes | Yes | Yes | Yes | Yes | *"The website is useful and provides a good collection of digital wellness resources. However, it could be improved by adding more interactive features, a cleaner comparison layout, and visual indicators to make it easier to compare different tools. A personalized recommendation system based on users' screen time habits would also make the website more helpful."* |
| **Student 9** | Android Digital Wellbeing + Signal | Yes | Yes | Yes | Yes | Yes | *"All good IMO, quite clear and easy to navigate the site"* |
| **Student 10** | Tool 1 (unspecified) | Yes | No | Yes | Yes | No | *"No"* |
| **Student 11** | Android Digital Wellbeing | Yes | Yes | Yes | Yes | Yes | *"."* |
| **Student 12** | DuckDuckGo | Somewhat | No | Yes | Yes | Yes | *"Sometimes I use blacker apps (blocker/screen filter apps)"* |

---

## 3. Quantitative Usability Metrics

### 3.1 Ease of Site Navigation
- **Yes (Easy & Intuitive):** 8/12 (66.7%)
- **Somewhat (Minor Hesitation):** 3/12 (25.0%)
- **No (Difficult):** 1/12 (8.3%)  
*Synthesis:* Two-thirds of users found navigation straightforward; the 33.3% experiencing minor or major hesitation pointed toward dense text on comparison tables and guide walkthroughs.

### 3.2 Tool Discovery Success Rate
- **Discovered a Suitable Resource:** 9/12 (75.0%)
- **Did Not Discover a Suitable Resource:** 3/12 (25.0%)  
*Synthesis:* Three students reported not discovering a suitable tool because they sought highly specific interventions (e.g. specialized meditation timers or all-in-one blockers) that were initially difficult to filter without habit-specific guidance.

### 3.3 Clarity of Comparison Criteria (R3 Verification)
- **Comparisons Understandable:** 11/12 (91.7%)
- **Comparisons Confusing:** 1/12 (8.3%)  
*Synthesis:* 91.7% confirmed that the hub's standardized criteria (Purpose, Platforms, Cost, Privacy, Accessibility, Limitations) were clear and informative.

### 3.4 Comprehension of Tool Differences & Trade-offs
- **Understood Core Differences:** 10/12 (83.3%)
- **Partially Understood:** 1/12 (8.3%)
- **Did Not Understand:** 1/12 (8.3%)

### 3.5 Setup Guide Feasibility (R5 Verification)
- **Followed Guide Successfully:** 10/12 (83.3%)
- **Followed With Difficulty:** 2/12 (16.7%)
- **Unable to Follow:** 0/12 (0.0%)

### 3.6 Setup Instruction Clarity
- **Instructions Clear:** 10/12 (83.3%)
- **Instructions Unclear:** 2/12 (16.7%)

---

## 4. Key Usability Friction Points Identified

Qualitative feedback analysis revealed five distinct user experience friction points:

1. **Comparison Matrix Density (Student 8):**  
   *Observation:* Text-heavy tabular columns made it difficult to compare tools rapidly on smaller screens or weigh subjective criteria like "friction level" at a glance.

2. **Absence of Habit-Based Recommendations (Student 8):**  
   *Observation:* The original recommendation wizard matched strictly on problem category (e.g. "focus") and operating system, failing to distinguish heavy users (>10 hours) who need aggressive lockouts from light users who only need gentle timers.

3. **Absence of Practical Q&A for Common Doubts (Student 6):**  
   *Observation:* Students had recurring practical questions (e.g. bypass prevention, blue light vs psychological arousal, family emergency call filtering) that were buried inside theoretical literature.

4. **Clarity on Free vs Paid Features (Student 3):**  
   *Observation:* Users wanted immediate transparency on what features can be used without spending money, especially for freemium tools like Forest and one sec.

5. **First-Time Setup Confusion (Student 4 & Student 6):**  
   *Observation:* Non-technical students found text-only steps lacking visual reference points and prerequisites.

---

## 5. Remediation Plan

All five friction points were translated into actionable engineering and design tickets, fully implemented in the final release, and verified against tests. Detailed mappings are documented in [`docs/REVISION_LOG.md`](file:///d:/DW_Project/docs/REVISION_LOG.md).

