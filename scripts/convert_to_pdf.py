import os
import sys

def convert_docx_to_pdf(docx_path, pdf_path):
    import win32com.client
    import pythoncom

    pythoncom.CoInitialize()
    word = None
    doc = None
    try:
        print("Opening Word application...")
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = False

        abs_docx = os.path.abspath(docx_path)
        abs_pdf = os.path.abspath(pdf_path)
        print(f"Opening {abs_docx}...")
        doc = word.Documents.Open(abs_docx, ReadOnly=True)

        print(f"Exporting to {abs_pdf} (Format 17 = wdFormatPDF)...")
        # 17 = wdFormatPDF
        doc.SaveAs2(abs_pdf, FileFormat=17)
        print("Export complete!")
        if os.path.exists(abs_pdf):
            print("Verified PDF exists, size:", os.path.getsize(abs_pdf))
            return True
        return False
    except Exception as e:
        print("Error during Word conversion:", e)
        return False
    finally:
        if doc:
            try:
                doc.Close(False)
            except:
                pass
        if word:
            try:
                word.Quit()
            except:
                pass
        pythoncom.CoUninitialize()

if __name__ == "__main__":
    d_path = r"D:\DW_Project\Digital_Wellness_Resource_Hub_Submission\Digital_Wellness_Resource_Hub_Project_Report.docx"
    p_path = r"D:\DW_Project\Digital_Wellness_Resource_Hub_Submission\Digital_Wellness_Resource_Hub_Project_Report.pdf"
    success = convert_docx_to_pdf(d_path, p_path)
    if not success:
        sys.exit(1)
