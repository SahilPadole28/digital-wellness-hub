import time
import os
from selenium import webdriver
from selenium.webdriver.edge.options import Options

options = Options()
options.add_argument("--headless=new")
options.add_argument("--window-size=1280,850")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Edge(options=options)
try:
    url = "https://digital-wellness-hub.netlify.app/#/"
    driver.get(url)
    time.sleep(3)
    out_dir = r"D:\DW_Project\Digital_Wellness_Resource_Hub_Submission\Website_Screenshots"
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "fig01_home_page.png")
    driver.save_screenshot(out_file)
    print("Success: saved", out_file, "size:", os.path.getsize(out_file))
finally:
    driver.quit()
