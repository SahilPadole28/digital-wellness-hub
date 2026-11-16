import time
import os
from selenium import webdriver
from selenium.webdriver.edge.options import Options

def main():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,820")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    out_dir = r"D:\DW_Project\Digital_Wellness_Resource_Hub_Submission\Website_Screenshots"
    os.makedirs(out_dir, exist_ok=True)

    targets = [
        ("fig01_home_page.png", "https://digital-wellness-hub.netlify.app/#/"),
        ("fig02_resource_catalogue.png", "https://digital-wellness-hub.netlify.app/#/explore"),
        ("fig03_resource_categories.png", "https://digital-wellness-hub.netlify.app/#/explore?categories=screen-time"),
        ("fig04_resource_detail.png", "https://digital-wellness-hub.netlify.app/#/explore/leechblock-ng"),
        ("fig05_resource_detail_forest.png", "https://digital-wellness-hub.netlify.app/#/explore/forest"),
        ("fig06_comparison_matrix.png", "https://digital-wellness-hub.netlify.app/#/compare?ids=ios-screen-time,android-digital-wellbeing"),
        ("fig07_find_my_tool_wizard.png", "https://digital-wellness-hub.netlify.app/#/find?concern=social-media&dailyUsage=gt10&intervention=friction&platforms=android"),
        ("fig08_setup_guides_overview.png", "https://digital-wellness-hub.netlify.app/#/guides"),
        ("fig09_setup_guide_detail.png", "https://digital-wellness-hub.netlify.app/#/guides/cue-friction"),
        ("fig10_educational_concepts.png", "https://digital-wellness-hub.netlify.app/#/learn"),
        ("fig11_concept_detail.png", "https://digital-wellness-hub.netlify.app/#/learn/attention-residue"),
        ("fig12_student_research_page.png", "https://digital-wellness-hub.netlify.app/#/research"),
        ("fig13_about_and_privacy.png", "https://digital-wellness-hub.netlify.app/#/about"),
        ("fig14_project_evidence.png", "https://digital-wellness-hub.netlify.app/#/project-evidence")
    ]

    driver = webdriver.Edge(options=options)
    try:
        for fname, url in targets:
            out_path = os.path.join(out_dir, fname)
            print(f"Capturing {fname} from {url}...")
            driver.get(url)
            time.sleep(2.5)
            driver.save_screenshot(out_path)
            size = os.path.getsize(out_path)
            print(f"Saved {fname} ({size} bytes)")
    finally:
        driver.quit()
    print("All screenshots captured successfully!")

if __name__ == "__main__":
    main()
