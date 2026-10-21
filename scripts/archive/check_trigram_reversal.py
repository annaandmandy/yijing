import json
import os
import re

TRIGRAMS = {
    "111": "乾 (天)", "000": "坤 (地)",
    "010": "坎 (水)", "101": "離 (火)",
    "100": "震 (雷)", "001": "艮 (山)",
    "011": "巽 (風)", "110": "兌 (澤)"
}

def get_trigrams(binary):
    # binary is bottom-to-top [L1, L2, L3, L4, L5, L6]
    lower = binary[0:3]
    upper = binary[3:6]
    return TRIGRAMS.get(lower, "未知"), TRIGRAMS.get(upper, "未知")

def fix_database(folder):
    print(f"🔍 Checking folder: {folder}")
    if not os.path.exists(folder):
        print(f"❌ Folder not found: {folder}")
        return

    files = [f for f in os.listdir(folder) if f.endswith('.json')]
    for filename in files:
        path = os.path.join(folder, filename)
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        binary = data.get("binary")
        if not binary: continue

        lower_correct, upper_correct = get_trigrams(binary)
        
        # Check structure in enhanced files
        if "structure" in data:
            up_attr = data["structure"].get("upper_trigram_attr", "")
            lo_attr = data["structure"].get("lower_trigram_attr", "")
            
            # Simple check if current description contains the WRONG trigram name
            # e.g. if Cui should be Upper Dui but description says Upper Kun
            upper_name = upper_correct.split(" ")[0]
            lower_name = lower_correct.split(" ")[0]

            if upper_name not in up_attr or lower_name not in lo_attr:
                print(f"⚠️  {filename} ({data['name']}) mismatch! Correct: Upper={upper_correct}, Lower={lower_correct}")
                # Mark for re-generation or manual fix
        
        # Check logic_teaching
        logic = data.get("logic_teaching", "")
        if f"上卦為{lower_correct.split(' ')[0]}" in logic or f"下卦為{upper_correct.split(' ')[0]}" in logic:
            print(f"🚨 {filename} logic text reflects REVERSED trigrams!")

if __name__ == "__main__":
    fix_database("public/yi_data_library")
    fix_database("public/yi_data_enhanced")
