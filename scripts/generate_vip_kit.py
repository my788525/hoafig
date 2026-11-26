#!/usr/bin/env python3
"""
Generate HOAFig 2026 VIP Statutory Defense Kit deliverables into public/assets/vip/.
Uses python-docx and openpyxl if installed; falls back cleanly to .rtf and .csv.
"""
import os
import csv

OUT_DIR = os.path.join("public", "assets", "vip")
os.makedirs(OUT_DIR, exist_ok=True)


def generate_docx_or_rtf():
    try:
        from docx import Document  # type: ignore

        doc = Document()
        doc.add_heading("HOAFig 2026 Certified Mail Hearing & Records Request Suite", 0)
        doc.add_paragraph(
            "Template 1: Certified Mail Hearing Demand & Official Records Request\n"
            "Jurisdiction: [STATE] ([STATUTE_CITATION])\n"
            "Date: [YYYY-MM-DD]\n\n"
            "VIA CERTIFIED MAIL & EMAIL\n"
            "To: Board of Directors & Community Association Manager\n"
            "Re: Statutory Objection, Hearing Demand & Records Request — [VIOLATION_OR_ASSESSMENT]\n\n"
            "Dear Board of Directors,\n\n"
            "I formally dispute the $[TOTAL_BILLED] ledger assessment ($[FINE_BILLED] principal + "
            "$[LATE_FEES] fees/interest). Under [STATUTE_CITATION], this assessment is non-compliant "
            "and must be suspended pending a statutory hearing before an independent committee.\n\n"
            "Please produce within [RECORDS_DAYS] business days: (1) the recorded fine schedule, "
            "(2) certified mail service proofs, (3) fining committee appointment resolutions, and "
            "(4) enforcement logs for comparable lots."
        )
        doc.add_heading("Template 2: Selective Enforcement & CC&R Defense Exhibit Log", level=1)
        doc.add_paragraph(
            "Exhibit A: Comparable Lot Address [LOT_A] — Identical condition observed on [DATE], no fine issued.\n"
            "Exhibit B: Comparable Lot Address [LOT_B] — Identical condition observed on [DATE], no fine issued.\n"
            "Exhibit C: CC&R Section [SECTION] — Lack of recorded fine schedule or architectural ambiguity."
        )
        out_path = os.path.join(OUT_DIR, "HOAFig_Certified_Mail_Hearing_Suite_2026.docx")
        doc.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        rtf_content = (
            r"{\rtf1\ansi\deff0"
            r"{\b HOAFig 2026 Certified Mail Hearing & Records Request Suite}\par\par"
            r"Template 1: Certified Mail Hearing Demand & Official Records Request\par"
            r"Jurisdiction: [STATE] ([STATUTE_CITATION])\par"
            r"Suspend $[TOTAL_BILLED] non-compliant fine pending independent committee hearing.\par"
            r"}"
        )
        out_path = os.path.join(OUT_DIR, "HOAFig_Certified_Mail_Hearing_Suite_2026.rtf")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(rtf_content)
        print(f"[vip] python-docx not installed; generated fallback {out_path}")


def generate_xlsx_or_csv():
    rows = [
        ["State", "Primary_Statute", "Per_Violation_Cap_USD", "Continuing_Cap_USD", "Notice_Days", "Cure_Days", "Independent_Committee"],
        ["Florida", "Fla. Stat. § 720.305(2)", 100, 1000, 14, 14, "Yes (3-Member Non-Board)"],
        ["California", "Cal. Civ. Code § 5850 / § 5855", 100, 100, 10, 10, "Board Hearing"],
        ["Texas", "Tex. Prop. Code § 209.006", "Reasonable", "Reasonable", 30, 30, "Board Hearing / Cert. Mail"],
        ["Colorado", "C.R.S. § 38-33.3-209.5", 500, 500, 30, 30, "Impartial Decision-Maker"],
        ["Nevada", "NRS § 116.31031", 100, 1000, 14, 14, "Board / Hearing Panel"],
    ]
    try:
        import openpyxl  # type: ignore

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Statutory_Matrix_2026"
        for r in rows:
            ws.append(r)

        ws2 = wb.create_sheet("Ledger_&_Reserve_Audit")
        ws2.append(["Line_Item", "HOA_Billed_USD", "Statutory_Cap_USD", "Unlawful_Overcharge_USD"])
        ws2.append(["Continuing Fine Principal", 2400, 1000, "=MAX(0,B2-C2)"])
        ws2.append(["Stacked Late Fees & Interest", 145, 0, "=MAX(0,B3-C3)"])
        ws2.append(["Total Disputed Exposure", "=SUM(B2:B3)", "=SUM(C2:C3)", "=SUM(D2:D3)"])

        out_path = os.path.join(OUT_DIR, "HOAFig_Ledger_&_Reserve_Audit_2026.xlsx")
        wb.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        out_path = os.path.join(OUT_DIR, "HOAFig_Ledger_&_Reserve_Audit_2026.csv")
        with open(out_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(rows)
        print(f"[vip] openpyxl not installed; generated fallback {out_path}")


if __name__ == "__main__":
    generate_docx_or_rtf()
    generate_xlsx_or_csv()
