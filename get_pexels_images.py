import requests
import os
import time

def get_pexels_image(breed_name, api_key, output_dir):
    """Download image from Pexels API"""
    headers = {"Authorization": api_key}
    
    search_terms = [
        f"{breed_name} dog breed",
        f"{breed_name} puppy",
        breed_name.replace(" Terrier", "").strip() + " dog",
        breed_name.replace(" Hound", "").strip() + " dog"
    ]
    
    for term in search_terms:
        try:
            url = "https://api.pexels.com/v1/search"
            params = {"query": term, "per_page": 3}
            
            response = requests.get(url, headers=headers, params=params)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("photos"):
                    photo_url = data["photos"][0]["src"]["medium"]
                    
                    img_response = requests.get(photo_url)
                    if img_response.status_code == 200:
                        filename = f"{breed_name.replace(' ', '_')}.jpg"
                        filepath = os.path.join(output_dir, filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"SUCCESS: {breed_name}")
                        return True
            elif response.status_code == 429:
                print(f"Rate limited, waiting...")
                time.sleep(5)
        except Exception as e:
            continue
    
    print(f"FAILED: {breed_name}")
    return False

# You need to get a free API key from https://www.pexels.com/api/
API_KEY = "YOUR_PEXELS_API_KEY_HERE"

if API_KEY == "YOUR_PEXELS_API_KEY_HERE":
    print("Please get a free Pexels API key from https://www.pexels.com/api/")
    print("Replace 'YOUR_PEXELS_API_KEY_HERE' with your actual API key")
    exit()

breeds = [
    "Bloodhound",
    "Kerry Blue Terrier", 
    "Miniature American Shepherd",
    "Coton de Tulear",
    "Icelandic Sheepdog"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

for breed in breeds:
    if get_pexels_image(breed, API_KEY, output_dir):
        success += 1
    time.sleep(2)

print(f"\nFinal result: {success}/{len(breeds)} images downloaded")