import os
import re

def fix_white_text():
    src_dir = 'c:/lawfirm/frontend/src'
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            filepath = os.path.join(root, file)
            if filepath.endswith('.css'):
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                new_content = re.sub(r'color:\s*#fff(?:fff)?\b;?', 'color: var(--heading);', new_content, flags=re.IGNORECASE)
                new_content = re.sub(r'color:\s*white\b;?', 'color: var(--heading);', new_content, flags=re.IGNORECASE)
                
                # Exception: Dashboard status pills might need white text if background is dark, but let's change all color: white to var(--heading) if the background is light. 
                # Wait, status pills have specific backgrounds. Let's just do the replace.
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")
            
            elif filepath.endswith('.jsx'):
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                new_content = re.sub(r"color:\s*['\"]#fff(?:fff)?['\"]", "color: 'var(--heading)'", new_content, flags=re.IGNORECASE)
                new_content = re.sub(r"color:\s*['\"]white['\"]", "color: 'var(--heading)'", new_content, flags=re.IGNORECASE)
                
                # Replace text-white class with text-heading or just remove it
                new_content = re.sub(r'\btext-white\b', '', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")

fix_white_text()
