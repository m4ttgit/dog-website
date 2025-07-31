import requests
import os
import time

# Pixabay API key - free tier available
API_KEY = "12345678-abcd1234abcd1234abcd1234abcd1234"

def download_from_pixabay(breed_name, output_dir):
    """Download from Pixabay API"""
    queries = [
        f"{breed_name} dog",
        breed_name.replace(" ", "+") + "+dog",
        breed_name.split()[0] + "+dog" if " " in breed_name else breed_name
    ]
    
    for query in queries:
        try:
            url = f"https://pixabay.com/api/"
            params = {
                "key": API_KEY,
                "q": query,
                "image_type": "photo",
                "category": "animals",
                "per_page": 5
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('hits'):
                    img_url = data['hits'][0]['webformatURL']
                    
                    img_response = requests.get(img_url, timeout=10)
                    if img_response.status_code == 200:
                        filename = f"{breed_name.replace(' ', '_')}.jpg"
                        filepath = os.path.join(output_dir, filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"Downloaded: {breed_name}")
                        return True
        except:
            continue
    
    print(f"Failed: {breed_name}")
    return False

# Try high priority breeds first
priority_breeds = [
    "Bloodhound",
    "Coton de Tulear",
    "Kerry Blue Terrier", 
    "Miniature American Shepherd",
    "Icelandic Sheepdog"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

print("Trying Pixabay API...")
for breed in priority_breeds:
    if download_from_pixabay(breed, output_dir):
        success += 1
    time.sleep(1)

print(f"Pixabay result: {success}/{len(priority_breeds)}")