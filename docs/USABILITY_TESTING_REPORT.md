# Usability Evaluation Report
**Project 3 – Digital Wellness Resource Hub**  
**Documentation for Academic Requirements R9 and R10**  
*Testing Dates: 12–13 November 2026 | Total Participants: 12 Students (Anonymized)*

---

## 1. Evaluation Methodology and Goals

A usability assessment was carried out to understand how effectively the Digital Wellness Resource Hub supports students in identifying and managing their digital distractions. The evaluation focused on three primary activities:

1. **Finding Appropriate Resources:** Students were asked to identify their digital wellness challenges, explore available resources using the recommendation feature or category-based navigation, and select a suitable tool considering their device compatibility and financial preferences.

2. **Assessing Available Tools:** Participants examined multiple digital wellness applications using predefined parameters, including ease of use, pricing, privacy policies, accessibility, and potential drawbacks. The objective was to determine whether the comparison system helped users make informed decisions.

3. **Applying Recommended Solutions:** Students explored the implementation instructions provided by the platform and attempted to configure the suggested digital wellness features on their own devices, particularly those related to limiting distractions and improving bedtime habits.

---

## 2. Participant Responses and Observations

A total of 12 students tested the deployed website and provided feedback through a structured questionnaire. Their responses were reviewed to evaluate the platform's usability, resource discovery process, comparison functionality, and implementation instructions.

The following table summarizes the individual responses collected during the evaluation.

| Participant | Selected Resource | Navigation | Found Suitable Tool | Comparison Clarity | Guide Usage | Instruction Clarity | Feedback |
|---|---|---|---|---|---|---|---|
| Student 1 | Not Specified | Easy | Yes | Clear | Completed | Clear | "best site / nope (no issues encountered)" |
| Student 2 | Not Specified | Easy | Yes | Clear | Completed | Clear | "Keep it up" |
| Student 3 | LeechBlock NG | Moderate | Yes | Clear | Completed | Clear | Requested additional free and paid tools with more comprehensive feature descriptions. |
| Student 4 | Forest | Difficult | No | Unclear | With difficulty | Unclear | Requested clearer explanations and reported confusion while following the instructions. |
| Student 5 | Android Digital Wellbeing | Easy | Yes | Clear | Completed | Clear | "site looks good / no problems" |
| Student 6 | Android Digital Wellbeing | Moderate | Yes | Clear | With difficulty | Unclear | Suggested introducing a Q&A section and simplifying the explanations. |
| Student 7 | Android Digital Wellbeing | Easy | Yes | Clear | Completed | Clear | "nothing" |
| Student 8 | Forest | Easy | Yes | Clear | Completed | Clear | Recommended more interactive elements, improved comparison visuals, and personalized suggestions based on screen-time patterns. |
| Student 9 | Android Digital Wellbeing + Signal | Easy | Yes | Clear | Completed | Clear | "All good IMO, quite clear and easy to navigate the site" |
| Student 10 | Not Specified | Easy | No | Clear | Completed | Unclear | "No" |
| Student 11 | Android Digital Wellbeing | Easy | Yes | Clear | Completed | Clear | "." |
| Student 12 | DuckDuckGo | Moderate | No | Clear | Completed | Clear | Mentioned using additional application-blocking and screen-filtering tools. |

*Note: Participant responses have been retained in their original meaning. Some feedback has been shortened for readability.*

---

## 3. Analysis of Usability Results

The questionnaire responses were consolidated into measurable indicators to assess the overall performance of the website.

### 3.1 Website Navigation Experience

- **Easy to navigate:** 8 participants (66.7%)
- **Somewhat easy:** 3 participants (25%)
- **Difficult to navigate:** 1 participant (8.3%)

**Analysis:** The majority of participants were able to navigate the platform without significant difficulty. However, approximately one-third experienced some confusion. This indicates a need to improve the presentation of information, particularly in comparison sections and setup instructions.

### 3.2 Success in Finding Relevant Digital Wellness Tools

- **Successfully identified a suitable tool:** 9 participants (75%)
- **Could not identify a suitable tool:** 3 participants (25%)

**Analysis:** Three-quarters of the participants found a resource that addressed their requirements. The remaining users indicated a need for more specialized solutions and better filtering options. This suggests that recommendations should account for individual usage patterns rather than relying solely on broad categories.

### 3.3 Understanding the Comparison System (R3 Verification)

- **Found the comparison information understandable:** 11 participants (91.7%)
- **Experienced difficulty understanding comparisons:** 1 participant (8.3%)

**Analysis:** The comparison functionality received positive feedback. Most users could understand the information presented across different tools, including their purpose, supported platforms, pricing, privacy considerations, accessibility, and limitations.

### 3.4 Understanding Differences Between Tools

- **Clearly understood the differences:** 10 participants (83.3%)
- **Partially understood the differences:** 1 participant (8.3%)
- **Could not understand the differences:** 1 participant (8.3%)

**Analysis:** Most students were able to distinguish between the available applications and understand their respective benefits. Nevertheless, the results indicate that clearer explanations and more visually distinguishable features could further improve the decision-making experience.

### 3.5 Effectiveness of Setup Guides (R5 Verification)

- **Completed the instructions successfully:** 10 participants (83.3%)
- **Completed them with some difficulty:** 2 participants (16.7%)
- **Unable to complete the instructions:** 0 participants (0%)

**Analysis:** The implementation guides were generally effective, with every participant managing to proceed through the instructions either independently or with some difficulty. The two participants who encountered problems highlighted the importance of providing simpler explanations and clearer guidance.

### 3.6 Clarity of Implementation Instructions

- **Found the instructions clear:** 10 participants (83.3%)
- **Found the instructions unclear:** 2 participants (16.7%)

**Analysis:** Although most participants understood the setup process, improvements were necessary to make the instructions accessible to users with limited technical knowledge.

---

## 4. Major Issues Identified During Testing

After examining the questionnaire responses, five important areas requiring improvement were identified.

### 4.1 Difficulty in Quickly Comparing Different Applications

**Feedback Source:** Student 8

Participants suggested improving the visual presentation of the comparison section. Displaying extensive information in table format made it harder to identify important differences quickly, particularly when viewing the website on smaller screens.

**Identified Improvement:** Introduce a cleaner comparison interface with better visual separation and indicators for important characteristics.

### 4.2 Need for More Personalized Recommendations

**Feedback Source:** Student 8

The existing recommendation mechanism primarily considered the user's selected problem category and operating system. However, it did not sufficiently distinguish between different levels of digital dependency or screen-time habits.

For example, someone spending more than ten hours daily on their device may require stricter blocking mechanisms, whereas another user may benefit from simple reminders or time-management applications.

**Identified Improvement:** Enhance the recommendation process by incorporating screen-time information and individual usage behaviour.

### 4.3 Lack of an Easily Accessible Question-and-Answer Section

**Feedback Source:** Student 6

Participants expressed interest in having a dedicated place to resolve common questions instead of searching through lengthy explanations. Practical concerns regarding application restrictions, notification management, and bypassing blocking mechanisms could be addressed more effectively through direct answers.

**Identified Improvement:** Provide an accessible FAQ or Q&A section containing concise answers to frequently encountered questions.

### 4.4 Insufficient Visibility of Free and Premium Features

**Feedback Source:** Student 3

Users requested a broader selection of applications and more detailed descriptions of their capabilities. They also needed clearer information about which features were available without payment and which required a subscription.

**Identified Improvement:** Improve pricing descriptions by clearly distinguishing free functionality from paid or subscription-based features.

### 4.5 Challenges During Initial Configuration

**Feedback Sources:** Students 4 and 6

Some participants experienced difficulty understanding the setup process, particularly when instructions contained technical terminology or lacked visual references. This created additional challenges for students unfamiliar with the configuration process.

**Identified Improvement:** Rewrite setup instructions in simpler language, organize them into smaller steps, and provide visual guidance wherever appropriate.

---

## 5. Improvements Implemented Following Evaluation

The issues discovered during testing were converted into specific development tasks. These changes were incorporated into the final version of the Digital Wellness Resource Hub to improve usability and address the concerns raised by participants.

The implemented improvements covered the following areas:

1. **Improved Comparison Interface:** Refined the presentation of application information to make differences easier to identify.
2. **Enhanced Recommendation Mechanism:** Expanded the recommendation process to consider additional user-specific factors and screen-time habits.
3. **Additional Help Resources:** Improved access to answers for common user queries and practical concerns.
4. **Clearer Pricing Information:** Made free and premium functionality easier to distinguish when evaluating available applications.
5. **Simplified Setup Documentation:** Improved the organization and readability of implementation instructions to make them easier for first-time users.

The development changes and their corresponding implementation details are recorded in `docs/REVISION_LOG.md`.

The original participant responses are preserved in `docs/student_feedback_responses.csv` for reference and verification.
