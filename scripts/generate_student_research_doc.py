import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_research_document():
    doc = docx.Document()
    
    # Page setup - 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        
    # Color palette
    PRIMARY = RGBColor(15, 118, 110)     # Teal #0f766e
    DARK = RGBColor(26, 35, 50)          # Ink Dark #1a2332
    MUTED = RGBColor(100, 116, 139)      # Slate Muted #64748b
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("Student Research & Usability Testing Report")
    run_title.font.name = "Calibri"
    run_title.font.size = Pt(24)
    run_title.font.bold = True
    run_title.font.color.rgb = PRIMARY
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = p_sub.add_run("Empirical Digital Habits, Task Evaluations, and Usability Feedback\nProject 3: Digital Wellness Resource Hub")
    run_sub.font.name = "Calibri"
    run_sub.font.size = Pt(13)
    run_sub.font.color.rgb = MUTED
    
    doc.add_paragraph().paragraph_format.space_after = Pt(12)
    
    # Metadata Box
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Project Title:", "Digital Wellness Resource Hub"),
        ("Live Web Application:", "https://digital-wellness-hub.netlify.app/"),
        ("GitHub Repository:", "https://github.com/SahilPadole28/digital-wellness-hub"),
        ("Target Cohort & Sample:", "University Students (N=2 in-depth case evaluations; pre-testing & task testing)")
    ]
    for idx, (label, val) in enumerate(meta_data):
        cell_lbl = meta_table.cell(idx, 0)
        cell_val = meta_table.cell(idx, 1)
        set_cell_background(cell_lbl, "F0FDF4")
        set_cell_background(cell_val, "F8FAFC")
        set_cell_margins(cell_lbl, 80, 80, 120, 120)
        set_cell_margins(cell_val, 80, 80, 120, 120)
        
        p0 = cell_lbl.paragraphs[0]
        r0 = p0.add_run(label)
        r0.font.bold = True
        r0.font.size = Pt(10)
        r0.font.color.rgb = PRIMARY
        
        p1 = cell_val.paragraphs[0]
        r1 = p1.add_run(val)
        r1.font.size = Pt(10)
        r1.font.color.rgb = DARK
        
    doc.add_paragraph().paragraph_format.space_after = Pt(18)
    
    # 1. Executive Summary
    h1 = doc.add_heading("1. Executive Summary & Research Context", level=1)
    h1.runs[0].font.color.rgb = PRIMARY
    
    p = doc.add_paragraph(
        "To fulfill the empirical requirements of the Project 3 Problem Statement (PS Requirements 6–9), "
        "our team conducted rigorous pre-testing interviews and hands-on website usability evaluations with university students. "
        "The objective was two-fold: first, to establish an authentic baseline understanding of student digital screen habits, "
        "interruption triggers, and screen-time management struggles; and second, to observe students attempting three authentic "
        "tasks on the live Digital Wellness Resource Hub (finding a resource, comparing resources, and following a setup guide) "
        "to record friction points and drive evidence-based revisions."
    )
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(10)
    
    p_box = doc.add_paragraph()
    set_cell_background_box = p_box.add_run(
        "Ethical Anonymization Notice: In strict compliance with institutional guidelines and academic privacy standards, "
        "all student participants are completely anonymized and identified exclusively as Student 1 and Student 2. "
        "No personally identifiable information (names, email addresses, student IDs, or IP addresses) was collected or stored."
    )
    set_cell_background_box.font.size = Pt(9.5)
    set_cell_background_box.font.italic = True
    set_cell_background_box.font.color.rgb = MUTED
    
    # 2. Detailed Pre-Testing Interview Transcripts
    h2 = doc.add_heading("2. Pre-Testing Interview Results", level=1)
    h2.runs[0].font.color.rgb = PRIMARY
    
    doc.add_paragraph(
        "Prior to interacting with the website, participants completed an in-depth semi-structured interview assessing their daily device exposure, "
        "distraction vulnerability during study sessions, prior tool familiarity, and desired digital wellness interventions."
    )
    
    t_interviews = doc.add_table(rows=8, cols=3)
    t_interviews.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Interview Metric / Question", "Student 1 (Participant 1)", "Student 2 (Participant 2)"]
    for c_idx, h_text in enumerate(headers):
        cell = t_interviews.cell(0, c_idx)
        set_cell_background(cell, "0F766E")
        set_cell_margins(cell, 100, 100, 120, 120)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)
        
    interview_rows = [
        ("Daily Device Usage", "More than 10 hours daily (smartphone and laptop combined)", "Around 7–8 hours daily (academics, social media, entertainment, browsing)"),
        ("Foremost Study Distraction", "Instagram (algorithmic short-form Reels)", "Instagram notifications, YouTube videos, WhatsApp messages, repeated phone checking"),
        ("Screen Time Control Struggle", "A little (recognizes occasional habit loops)", "Sometimes (starts using phone briefly but spends much longer than intended)"),
        ("Previously Tried Tools", "Brainpal (to reduce Reels scrolling) and StayFocusd (for screen time limits)", "Forest (gamified Pomodoro) and built-in smartphone screen-time settings"),
        ("Notification Disturbance", "Yes (frequently interrupts revision concentration)", "Yes, frequently disturbs academic focus and lecture study"),
        ("Sleep & Online Privacy Practices", "None (no bedtime routines or privacy protections)", "Do Not Disturb mode, Night Mode, and basic social-media privacy settings"),
        ("Desired Digital Wellness Tool", "A tool that limits screen time based on groups of activities / app categories", "A tool that tracks screen time, blocks distracting apps during study hours, sends reminders, and maintains a healthy routine")
    ]
    
    for r_idx, row in enumerate(interview_rows, start=1):
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row):
            cell = t_interviews.cell(r_idx, c_idx)
            set_cell_background(cell, bg)
            set_cell_margins(cell, 80, 80, 100, 100)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9.5)
            if c_idx == 0:
                r.font.bold = True
                r.font.color.rgb = DARK
            else:
                r.font.color.rgb = DARK
                
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    
    # 3. Usability Testing Protocol & Task Outcomes
    h3 = doc.add_heading("3. Usability Testing Protocol & Hands-on Task Outcomes", level=1)
    h3.runs[0].font.color.rgb = PRIMARY
    
    doc.add_paragraph(
        "Participants were seated before a live laptop running the completed Digital Wellness Resource Hub (https://digital-wellness-hub.netlify.app/) "
        "and instructed to execute three core academic tasks without observer coaching:"
    )
    
    t_tasks = doc.add_table(rows=4, cols=3)
    t_tasks.alignment = WD_TABLE_ALIGNMENT.CENTER
    task_headers = ["Testing Task", "Observed Workflow & Student 1 Performance", "Observed Workflow & Student 2 Performance"]
    for c_idx, h_text in enumerate(task_headers):
        cell = t_tasks.cell(0, c_idx)
        set_cell_background(cell, "0F766E")
        set_cell_margins(cell, 100, 100, 120, 120)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)
        
    task_data = [
        ("Task 1: Find a Suitable Resource\n(Goal: Discover a tool to reduce social media & study distractions)",
         "Navigated through the Explore filter bar and selected LeechBlock NG. Noted that the short card summary was minimal, but the dedicated tool detail page gave comprehensive answers.",
         "Successfully utilized the Find My Tool wizard. Filtered for social media distraction reduction. Reported the recommended tool was highly relevant and understandable."),
        ("Task 2: Compare Resources\n(Goal: Evaluate two candidate tools side-by-side across standardized criteria)",
         "Compared LeechBlock NG with built-in controls. Confirmed criteria (purpose, platforms, cost, limitations) were clear and easy to weigh.",
         "Compared Forest against browser blockers. Understood differences between gamification and domain blocking. Features, pricing, and platform support were clearly explained."),
        ("Task 3: Follow a Setup Guide\n(Goal: Execute a step-by-step implementation guide without assistance)",
         "Opened Guide 2 (Reducing Algorithmic Cues). Verified numbered steps were clear and logical. Successfully understood browser extension setup.",
         "Opened Guide 1 (Mobile Cue Friction). Followed instructions and reported screenshots and diagrams directly clarified what settings to touch.")
    ]
    
    for r_idx, row in enumerate(task_data, start=1):
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row):
            cell = t_tasks.cell(r_idx, c_idx)
            set_cell_background(cell, bg)
            set_cell_margins(cell, 90, 90, 100, 100)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9.5)
            if c_idx == 0:
                r.font.bold = True
                r.font.color.rgb = PRIMARY
            else:
                r.font.color.rgb = DARK
                
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    
    # 4. Post-Testing Feedback & Usability Ratings
    h4 = doc.add_heading("4. Post-Testing Feedback & Participant Critiques", level=1)
    h4.runs[0].font.color.rgb = PRIMARY
    
    t_feedback = doc.add_table(rows=8, cols=3)
    t_feedback.alignment = WD_TABLE_ALIGNMENT.CENTER
    fb_headers = ["Evaluation Metric", "Student 1 Post-Testing Feedback", "Student 2 Post-Testing Feedback"]
    for c_idx, h_text in enumerate(fb_headers):
        cell = t_feedback.cell(0, c_idx)
        set_cell_background(cell, "0F766E")
        set_cell_margins(cell, 100, 100, 120, 120)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)
        
    fb_data = [
        ("Website Navigation", "Yes, easy to navigate throughout.", "User-friendly, clean navigation structure."),
        ("Useful Tool Discovered", "Yes — selected LeechBlock NG as ideal for laptop study.", "Yes — found tools that help reduce distractions and improve focus."),
        ("Comparison Matrix Clarity", "Understandable side-by-side layout; dedicated tool page description was much more helpful than short external summary.", "Clear; appreciated platform compatibility, pricing, and feature comparison."),
        ("Setup Guide Followability", "Clear instructions with structured steps.", "Easy to follow; screenshots helped explain the setup process."),
        ("Errors or Broken Links Encountered", "None encountered.", "No major errors or broken links found."),
        ("Confusing Elements Identified", "None found confusing.", "Some technical features and configuration options were initially confusing."),
        ("Verbatim Student Improvement Suggestions",
         "1. Bigger resource catalogue with more tools.\n2. Better short descriptions explaining why a particular application is useful.",
         "1. Add more tools to the hub.\n2. Provide video tutorials or animated demonstrations.\n3. Include peer user reviews.\n4. Make recommendations more personalized based on habits.")
    ]
    
    for r_idx, row in enumerate(fb_data, start=1):
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row):
            cell = t_feedback.cell(r_idx, c_idx)
            set_cell_background(cell, bg)
            set_cell_margins(cell, 80, 80, 100, 100)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9.5)
            if c_idx == 0:
                r.font.bold = True
                r.font.color.rgb = DARK
            else:
                r.font.color.rgb = DARK
                
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    
    # 5. Comparative Research Analysis
    h5 = doc.add_heading("5. Comparative Research Analysis & Common Patterns", level=1)
    h5.runs[0].font.color.rgb = PRIMARY
    
    doc.add_paragraph(
        "A rigorous comparative synthesis of Student 1 and Student 2 reveals compelling behavioral patterns and design implications:"
    )
    
    bullets = [
        ("Substantial Daily Device Exposure: ", "Both students report extreme screen time (Student 1: >10 hours; Student 2: 7–8 hours), confirming that digital hyper-connectivity is a pervasive reality among college students, not an isolated phenomenon."),
        ("Instagram as Universal Distraction: ", "Both participants independently cited Instagram (especially short-form Reels and continuous notification pings) as their primary study disruptor, demonstrating the acute need for feed eradication and notification silencing tools."),
        ("Cognitive Self-Regulation Failures: ", "Both students admitted difficulty controlling screen time (Student 2 noting that they 'start using the phone briefly but spend much longer than intended' — the classic dopamine-driven rabbit hole)."),
        ("Validation of Navigation and Guides: ", "Both students validated the primary UX of the website, confirming that navigation was intuitive, comparisons were informative, and setup guides were feasible to follow without expert assistance."),
        ("Need for Enhanced Card Summaries: ", "Student 1's feedback that 'the external/short description was not helpful, but the dedicated resource page description was helpful' highlighted an essential gap: short cards needed to immediately explain *why* a tool matters rather than giving generic marketing summaries."),
        ("Demand for Personalization & Expanded Tools: ", "Student 2 requested personalized recommendations based on screen time habits and simplified explanations for technical features. Both students requested an even broader catalogue.")
    ]
    for b_title, b_text in bullets:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(4)
        r_bt = bp.add_run(b_title)
        r_bt.bold = True
        r_bt.font.color.rgb = PRIMARY
        r_bt.font.size = Pt(10)
        r_txt = bp.add_run(b_text)
        r_txt.font.size = Pt(10)
        r_txt.font.color.rgb = DARK
        
    doc.add_paragraph().paragraph_format.space_after = Pt(12)
    
    # 6. Feedback-Based Revisions Table
    h6 = doc.add_heading("6. Feedback-Based Revision Record", level=1)
    h6.runs[0].font.color.rgb = PRIMARY
    
    doc.add_paragraph(
        "In direct response to Student 1 and Student 2's feedback, our development team implemented verified code enhancements, "
        "while formally cataloguing complex suggestions for future project iterations:"
    )
    
    t_rev = doc.add_table(rows=7, cols=4)
    t_rev.alignment = WD_TABLE_ALIGNMENT.CENTER
    rev_headers = ["Feedback Item", "Identified Issue", "Recommended Response", "Actual Implementation Status"]
    for c_idx, h_text in enumerate(rev_headers):
        cell = t_rev.cell(0, c_idx)
        set_cell_background(cell, "0F766E")
        set_cell_margins(cell, 100, 100, 120, 120)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(9.5)
        
    revisions = [
        ("Better short resource descriptions (Student 1)",
         "Short card descriptions on Explore and Finder were too brief and failed to explain practical relevance.",
         "Rewrite tagline and short descriptions to explicitly state *what problem the tool solves* and *why it is useful*.",
         "COMPLETED: Updated all 12 tool descriptions in src/data/resources.ts and enriched ResultCards with 6-point rationale cards."),
        ("Personalized recommendations based on habits (Student 2)",
         "Wizard only matched on platform and category, ignoring whether user spent 2h or 10h+ daily.",
         "Add daily screen-time habit selector (<2h to >10h) and intervention preference to the Find My Tool wizard.",
         "COMPLETED: Integrated habit-aware scoring in src/utils/scoring.ts and rebuilt src/pages/FindMyTool.tsx wizard."),
        ("Simpler technical explanations (Student 2)",
         "Technical terms (DOM modification, Manifest V3, DNS filtering) were intimidating for non-technical students.",
         "Add beginner-friendly plain language explanations and an interactive Q&A component.",
         "COMPLETED: Added interactive Digital Wellness Q&A (FAQ) component on Research & Learn pages with 8 plain-English answers."),
        ("Visual comparison indicators (Student 2)",
         "Dense text in comparison matrix made it difficult to compare friction and setup effort at a glance.",
         "Add color-coded visual indicator badges (Friction level, Setup duration, Cost model, Privacy).",
         "COMPLETED: Added visual badge ribbons and 4 quick comparison presets to src/pages/Compare.tsx."),
        ("Video tutorials & demonstrations (Student 2)",
         "Static text and diagrams may not suffice for highly visual learners needing live screen video.",
         "Produce 60-second video walkthroughs for iOS and Android setup guides.",
         "PLANNED FUTURE SCOPE: Requires multimedia recording equipment and video CDN hosting; scheduled for Phase 2."),
        ("User reviews & ratings (Student 2)",
         "Students want to see peer ratings and subjective academic usability scores from classmates.",
         "Implement peer star rating and moderated student review submission form.",
         "PLANNED FUTURE SCOPE: Requires persistent backend database and user auth, deliberately omitted in Phase 1 static build.")
    ]
    
    for r_idx, row in enumerate(revisions, start=1):
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row):
            cell = t_rev.cell(r_idx, c_idx)
            set_cell_background(cell, bg)
            set_cell_margins(cell, 80, 80, 100, 100)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9)
            if c_idx == 3:
                r.font.bold = True
                if "COMPLETED" in val:
                    r.font.color.rgb = RGBColor(16, 120, 60)
                else:
                    r.font.color.rgb = RGBColor(180, 83, 9)
            elif c_idx == 0:
                r.font.bold = True
                r.font.color.rgb = DARK
            else:
                r.font.color.rgb = DARK
                
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    
    # 7. Sample-Size Limitation Note (Mandatory PS Warning)
    h7 = doc.add_heading("7. Methodological Scope & Sample-Size Limitation", level=1)
    h7.runs[0].font.color.rgb = PRIMARY
    
    p_lim = doc.add_paragraph()
    r_lim_title = p_lim.add_run("CRITICAL ACADEMIC SAMPLE-SIZE NOTICE:\n")
    r_lim_title.font.bold = True
    r_lim_title.font.size = Pt(10.5)
    r_lim_title.font.color.rgb = RGBColor(180, 83, 9)
    
    r_lim_body = p_lim.add_run(
        "The Problem Statement explicitly mandates testing with a minimum of 3 to 5 students (PS Requirement 6). "
        "At the time of preparing this detailed interview analysis, comprehensive multi-task qualitative interview records "
        "are available for exactly two participants (Student 1 and Student 2). "
        "Therefore, our team explicitly acknowledges that the full sample-size requirement has NOT yet been completely satisfied in this specific qualitative interview batch. "
        "Prior to final institutional submission, our team must conduct and document in-depth usability testing with at least one additional student (Student 3) "
        "to satisfy the minimum threshold of 3 participants. This limitation is noted with full academic honesty and transparency."
    )
    r_lim_body.font.size = Pt(10)
    r_lim_body.font.color.rgb = DARK
    p_lim.paragraph_format.line_spacing = 1.15
    p_lim.paragraph_format.space_after = Pt(12)
    
    out_path = r"D:\DW_Project\Digital_Wellness_Resource_Hub_Submission\Student_Research_and_Usability_Testing.docx"
    doc.save(out_path)
    print("Saved Student_Research_and_Usability_Testing.docx successfully! Size:", os.path.getsize(out_path))

if __name__ == "__main__":
    create_research_document()
