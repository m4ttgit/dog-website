import requests
import os
import time

def download_placeholder_image(breed_name, output_dir):
    """Download a placeholder dog image"""
    try:
        # Use a simple placeholder service
        url = f"https://via.placeholder.com/800x600/cccccc/000000?text={breed_name.replace(' ', '+')}"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            filename = f"{breed_name.replace(' ', '_')}.jpg"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"Created placeholder: {breed_name}")
            return True
    except:
        pass
    
    print(f"Failed: {breed_name}")
    return False

# Create placeholders for the most important missing breeds
priority_breeds = [
    "Bloodhound",
    "Kerry Blue Terrier", 
    "Coton de Tulear",
    "Miniature American Shepherd",
    "Icelandic Sheepdog"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

print("Creating placeholder images...")
for breed in priority_breeds:
    if download_placeholder_image(breed, output_dir):
        success += 1
    time.sleep(1)

print(f"Created {success}/{len(priority_breeds)} placeholder images")
print("You can replace these with actual breed photos later")