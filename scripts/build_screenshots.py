import os
import subprocess
import urllib.request
from PIL import Image, ImageDraw

ROOT_DIR = r"D:\DW_Project"
PUBLIC_DIR = os.path.join(ROOT_DIR, "public", "screenshots")

def create_illustrative_diagram(path, guide_name, platform_info, step_num, total_steps, step_title, path_text, action_text, expected_text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    width, height = 960, 540
    img = Image.new('RGB', (width, height), color='#f8fafc')
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rounded_rectangle([(10, 10), (width - 10, height - 10)], radius=12, outline='#cbd5e1', width=2)

    # Top Banner: Illustrative Diagram
    draw.rounded_rectangle([(12, 12), (width - 12, 54)], radius=8, fill='#1e293b')
    draw.text((width // 2, 33), "ILLUSTRATIVE DIAGRAM — NOT A PRODUCT SCREENSHOT", fill='#f8fafc', anchor='mm')

    # Header section
    draw.text((44, 78), f"{guide_name}  ·  {platform_info}", fill='#0f766e', font_size=15)
    draw.text((44, 104), f"Step {step_num} of {total_steps}: {step_title}", fill='#0f172a', font_size=20)

    # 3 Flow Cards
    cards = [
        ("1. NAVIGATION PATH", path_text, "#0369a1", "#f0f9ff", "#bae6fd"),
        ("2. CONFIGURATION / ACTION", action_text, "#0f766e", "#f0fdf4", "#bbf7d0"),
        ("3. EXPECTED OUTCOME", expected_text, "#6d28d9", "#faf5ff", "#e9d5ff")
    ]

    card_y = 142
    card_h = 100
    for i, (title, content, header_color, bg_color, border_color) in enumerate(cards):
        y = card_y + i * (card_h + 12)
        # Card background & border
        draw.rounded_rectangle([(44, y), (width - 44, y + card_h)], radius=8, fill=bg_color, outline=border_color, width=1)
        # Left accent stripe
        draw.rounded_rectangle([(44, y), (50, y + card_h)], radius=3, fill=header_color)
        # Card header
        draw.text((64, y + 20), title, fill=header_color, font_size=12)
        # Card content (split into 2 lines if long)
        if len(content) > 80 and (' → ' in content or ' · ' in content or ';' in content):
            delimiter = ' → ' if ' → ' in content else (' · ' if ' · ' in content else '; ')
            parts = content.split(delimiter)
            mid = len(parts) // 2
            line1 = delimiter.join(parts[:mid]) + delimiter
            line2 = delimiter.join(parts[mid:])
            draw.text((64, y + 46), line1, fill='#1e293b', font_size=14)
            draw.text((64, y + 68), line2, fill='#1e293b', font_size=14)
        else:
            draw.text((64, y + 50), content, fill='#1e293b', font_size=14)

    # Footer Banner: Student Action Required
    footer_y = height - 58
    draw.rounded_rectangle([(12, footer_y), (width - 12, height - 12)], radius=8, fill='#fef3c7', outline='#fde68a', width=1)
    draw.text((width // 2, footer_y + 23), "STUDENT SUBMISSION ACTION: Replace with privacy-safe screenshot from your own device", fill='#92400e', font_size=13, anchor='mm')

    img.save(path, format='PNG', optimize=True)
    print(f"Generated diagram: {os.path.basename(path)}")

def download_image(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=15) as res:
        data = res.read()
        with open(path, 'wb') as f:
            f.write(data)
    print(f"Downloaded: {os.path.basename(path)} ({len(data)} bytes)")

def capture_url(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    cmd = [
        "powershell", "-Command",
        f"Start-Process -FilePath '{edge_path}' -ArgumentList '--headless', '--disable-gpu', '--screenshot={path}', '{url}' -Wait"
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(path) and os.path.getsize(path) > 0:
        print(f"Captured: {os.path.basename(path)} ({os.path.getsize(path)} bytes)")
    else:
        print(f"FAILED to capture {path}")

def build_all():
    print("=== 1. Browser Captures (Edge Headless) ===")
    captures = [
        ("https://chromewebstore.google.com/detail/news-feed-eradicator/fjcldmjmjhkklehbacihaiopjklihlgg",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-01-chrome.png")),
        ("https://addons.mozilla.org/en-US/firefox/addon/news-feed-eradicator/",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-01-firefox.png")),
        ("https://justgetflux.com/",
         os.path.join(PUBLIC_DIR, "wind-down", "step-01-windows.png")),
    ]
    for url, path in captures:
        capture_url(url, path)

    print("\n=== 2. Official Author Store Screenshots (Mozilla Add-ons CDN) ===")
    downloads = [
        ("https://addons.mozilla.org/user-media/previews/full/349/349811.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-02-chrome.png")),
        ("https://addons.mozilla.org/user-media/previews/full/349/349809.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-03-chrome.png")),
        ("https://addons.mozilla.org/user-media/previews/full/349/349808.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-04-chrome.png")),
        ("https://addons.mozilla.org/user-media/previews/full/287/287763.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-05-chrome.png")),
        ("https://addons.mozilla.org/user-media/previews/full/349/349810.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-02-firefox.png")),
        ("https://addons.mozilla.org/user-media/previews/full/287/287763.png",
         os.path.join(PUBLIC_DIR, "algorithmic-cues", "step-03-firefox.png")),
    ]
    for url, path in downloads:
        download_image(url, path)

    print("\n=== 3. Illustrative Diagrams for Mobile & In-App Workflows ===")
    # Guide 1: cue-friction / iOS
    ios_diagrams = [
        ("step-01.png", 1, 7, "Open Screen Time settings",
         "Settings → Screen Time",
         "Tap 'Turn On Screen Time' → choose 'This is My iPhone'",
         "Screen Time dashboard activates with daily activity tracking"),
        ("step-02.png", 2, 7, "Review your current usage",
         "Settings → Screen Time → See All App & Website Activity",
         "Inspect daily average screen time and top 5 most-used app categories",
         "Identified primary time-consuming apps to target for limits"),
        ("step-03.png", 3, 7, "Set an App Limit on Social Media",
         "Settings → Screen Time → App Limits → Add Limit",
         "Select 'Social' category (or specific apps) → set daily limit (e.g. 60m) → Add",
         "App limit active; app icons dim and reminder dialog triggers at limit"),
        ("step-04.png", 4, 7, "Set a Screen Time Passcode (recommended)",
         "Settings → Screen Time → Lock Screen Time Settings",
         "Enter a 4-digit passcode different from your phone unlock code",
         "Bypassing limits now requires entering the 4-digit passcode"),
        ("step-05.png", 5, 7, "Schedule Downtime",
         "Settings → Screen Time → Downtime → Scheduled (toggle ON)",
         "Set schedule: Every Day, Start 10:00 PM, End 07:00 AM → Block at Downtime ON",
         "Unapproved apps are blocked automatically during night hours"),
        ("step-06.png", 6, 7, "Allow essential apps during Downtime",
         "Settings → Screen Time → Always Allowed",
         "Verify essential apps (Phone, Messages, Maps, Clock) are allowed; remove social apps",
         "Essential emergency communication remains accessible during Downtime"),
        ("step-07.png", 7, 7, "Test your limits",
         "Open Instagram or TikTok after daily limit reached",
         "Observe limit screen: 'Time Limit — You've reached your limit on Instagram'",
         "Intentional pause created; 'Ask For More Time' requires passcode"),
    ]
    for filename, s_num, tot, title, p_txt, a_txt, e_txt in ios_diagrams:
        p = os.path.join(PUBLIC_DIR, "cue-friction", filename)
        create_illustrative_diagram(p, "Guide 1: Building Cue Friction on Mobile", "iOS 16+ (tested on iOS 17)", s_num, tot, title, p_txt, a_txt, e_txt)

    # Guide 1: cue-friction / Android
    android_diagrams = [
        ("step-01-android.png", 1, 7, "Open Digital Wellbeing settings",
         "Settings → Digital Wellbeing & parental controls",
         "Tap Digital Wellbeing to open the daily activity overview",
         "Circular dashboard showing daily screen time and unlock count loads"),
        ("step-02-android.png", 2, 7, "Review your usage dashboard",
         "Digital Wellbeing → Dashboard",
         "View daily usage breakdown per app and notification frequencies",
         "Top time-consuming apps identified for targeted timers"),
        ("step-03-android.png", 3, 7, "Set an App Timer",
         "Digital Wellbeing → Dashboard → Tap hourglass next to Instagram",
         "Set daily app timer (e.g. 45 minutes) → Tap OK",
         "App icon grays out on Home screen once 45-minute limit is reached"),
        ("step-04-android.png", 4, 7, "Set an App Limits PIN (Android 12+)",
         "Digital Wellbeing → Lock app timers / Parental controls",
         "Configure a 4-digit PIN for extending app timers",
         "Prevents casual bypass when the timer runs out"),
        ("step-05-android.png", 5, 7, "Enable Bedtime Mode",
         "Digital Wellbeing → Bedtime mode → Based on a schedule",
         "Set 10:30 PM to 07:00 AM; toggle Grayscale and Do Not Disturb ON",
         "Display turns monochrome and notifications mute automatically at 10:30 PM"),
        ("step-06-android.png", 6, 7, "Configure DND Exceptions",
         "Settings → Sound & Vibration → Do Not Disturb → People",
         "Allow calls from 'Starred contacts only'; enable 'Repeat callers'",
         "Emergency family and critical calls ring through; notifications remain silenced"),
        ("step-07-android.png", 7, 7, "Test your setup",
         "Launch an app after its timer expires",
         "App pauses immediately with 'App paused: Timer ran out' modal",
         "Automatic cue friction established; intentional choice required to extend"),
    ]
    for filename, s_num, tot, title, p_txt, a_txt, e_txt in android_diagrams:
        p = os.path.join(PUBLIC_DIR, "cue-friction", filename)
        create_illustrative_diagram(p, "Guide 1: Building Cue Friction on Mobile", "Android 12+ (Digital Wellbeing)", s_num, tot, title, p_txt, a_txt, e_txt)

    # Guide 3: wind-down / iOS
    wind_down_ios = [
        ("step-01-ios.png", 1, 6, "Open Health app & set Sleep Schedule",
         "Health App → Browse → Sleep → Full Schedule & Options",
         "Set bedtime (10:30 PM), wake up (07:00 AM), sleep goal (8h)",
         "Sleep Schedule active; anchors daily wind-down sequence"),
        ("step-02-ios.png", 2, 6, "Enable Sleep Focus",
         "Settings → Focus → Sleep",
         "Link to Health Sleep Schedule; customize Allowed Notifications",
         "Sleep Focus turns on automatically at scheduled bedtime"),
        ("step-03-ios.png", 3, 6, "Configure Wind Down buffer",
         "Health App → Sleep → Full Schedule → Wind Down",
         "Set Wind Down to 30 or 45 minutes before bedtime",
         "Lock screen dims and simplifies 30m prior to sleep; triggers pre-bed habits"),
        ("step-04-ios.png", 4, 6, "Enable Night Shift",
         "Settings → Display & Brightness → Night Shift",
         "Toggle 'Scheduled' ON → 09:30 PM to 07:00 AM; set Color Temperature to 'More Warm'",
         "Screen temperature warms gradually each evening to reduce harsh glare"),
        ("step-05-ios.png", 5, 6, "Set up emergency bypass for calls",
         "Settings → Focus → Sleep → People → Allow Calls From",
         "Select 'Favorites' and turn on 'Allow Repeated Calls'",
         "Critical family calls bypass focus; random notifications remain silenced"),
        ("step-06-ios.png", 6, 6, "Test your routine",
         "Verify device at scheduled Wind Down time",
         "Observe dimmed lock screen with Sleep Focus banner active",
         "Automated environment cue reinforces putting phone away for sleep"),
    ]
    for filename, s_num, tot, title, p_txt, a_txt, e_txt in wind_down_ios:
        p = os.path.join(PUBLIC_DIR, "wind-down", filename)
        create_illustrative_diagram(p, "Guide 3: A Nightly Digital Wind-Down Routine", "iOS 16+ (Health & Sleep Focus)", s_num, tot, title, p_txt, a_txt, e_txt)

    # Guide 3: wind-down / Android
    wind_down_android = [
        ("step-01-android.png", 1, 5, "Open Bedtime Mode in Digital Wellbeing",
         "Settings → Digital Wellbeing & parental controls → Bedtime mode",
         "Select 'Based on a schedule' to automate daily activation",
         "Bedtime configuration menu opens"),
        ("step-02-android.png", 2, 5, "Set your bedtime schedule",
         "Digital Wellbeing → Bedtime mode → Schedule",
         "Set Start 10:30 PM, End 07:00 AM; select days Monday–Sunday",
         "Automated daily timing configured"),
        ("step-03-android.png", 3, 5, "Enable Grayscale and Do Not Disturb",
         "Bedtime mode → Customize → Bedtime mode options",
         "Toggle 'Grayscale' ON and toggle 'Do Not Disturb' ON",
         "Monochrome display removes visual dopamine cues; notifications silenced"),
        ("step-04-android.png", 4, 5, "Configure DND exceptions",
         "Settings → Sound & vibration → Do Not Disturb → People",
         "Allow calls from Starred contacts only; toggle 'Repeat callers' ON",
         "Emergency calls ring through; routine notifications stay quiet"),
        ("step-05-android.png", 5, 5, "Enable Night Light",
         "Settings → Display → Night Light → Schedule",
         "Set 'Turns on at custom time' (09:30 PM to 07:00 AM); adjust intensity slider",
         "Display warms to amber tint in late evening to ease eye strain"),
    ]
    for filename, s_num, tot, title, p_txt, a_txt, e_txt in wind_down_android:
        p = os.path.join(PUBLIC_DIR, "wind-down", filename)
        create_illustrative_diagram(p, "Guide 3: A Nightly Digital Wind-Down Routine", "Android 10+ (Digital Wellbeing)", s_num, tot, title, p_txt, a_txt, e_txt)

    # Guide 3: wind-down / Windows f.lux dialogs
    wind_down_windows = [
        ("step-02-windows.png", 2, 4, "Set your location in f.lux",
         "f.lux taskbar icon → Menu → Change Location",
         "Enter local city or postal code (e.g. London, New York) → Locate",
         "f.lux calculates precise local sunrise and sunset times automatically"),
        ("step-03-windows.png", 3, 4, "Adjust colour temperature settings",
         "f.lux taskbar icon → Main settings slider",
         "Set Daytime: 6500K, Sunset: 3400K (Halogen), Bedtime: 2700K (Warm Incandescent)",
         "Gradual warm shift scheduled smoothly across the evening hours"),
        ("step-04-windows.png", 4, 4, "Review the transition preview",
         "f.lux Menu → Options → 24 hour preview",
         "Observe 24-hour cycle animation to confirm comfort level across times of day",
         "Color transition verified without disrupting normal workflow"),
    ]
    for filename, s_num, tot, title, p_txt, a_txt, e_txt in wind_down_windows:
        p = os.path.join(PUBLIC_DIR, "wind-down", filename)
        create_illustrative_diagram(p, "Guide 3: A Nightly Digital Wind-Down Routine", "Windows 10/11 (f.lux)", s_num, tot, title, p_txt, a_txt, e_txt)

    print("\nAll 37 screenshots and diagrams processed!")

if __name__ == "__main__":
    build_all()
