import requests
import os
import time

PIXABAY_API_KEY = "50054005-7d7c558b2b8cf59490224768c"
PEXELS_API_KEY = "hua5adxJoLNulensKEd737GoF0RcjLq2SImzFvwQuPAdS4pAyS2Qr3mF"

def download_from_pixabay(breed_name, output_dir):
    """Download from Pixabay API"""
    queries = [f"{breed_name} dog", breed_name.replace(" ", "+") + "+dog"]
    
    for query in queries:
        try:
            url = "https://pixabay.com/api/"
            params = {
                "key": PIXABAY_API_KEY,
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
                        
                        print(f"Pixabay: {breed_name}")
                        return True
        except:
            continue
    return False

def download_from_pexels(breed_name, output_dir):
    """Download from Pexels API"""
    headers = {"Authorization": PEXELS_API_KEY}
    queries = [f"{breed_name} dog", f"{breed_name} puppy"]
    
    for query in queries:
        try:
            url = "https://api.pexels.com/v1/search"
            params = {"query": query, "per_page": 3}
            
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("photos"):
                    img_url = data["photos"][0]["src"]["medium"]
                    
                    img_response = requests.get(img_url, timeout=10)
                    if img_response.status_code == 200:
                        filename = f"{breed_name.replace(' ', '_')}.jpg"
                        filepath = os.path.join(output_dir, filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"Pexels: {breed_name}")
                        return True
        except:
            continue
    return False

missing_breeds = [
    "American Hairless Terrier",
    "Bavarian Mountain Scent Hound",
    "Bloodhound",
    "Caucasian Shepherd Dog", 
    "Cesky Terrier",
    "Coton de Tulear",
    "Croatian Sheepdog",
    "Danish-Swedish Farmdog",
    "Glen of Imaal Terrier",
    "Hovawart",
    "Icelandic Sheepdog",
    "Jagdterrier",
    "Kai Ken",
    "Karelian Bear Dog",
    "Kerry Blue Terrier",
    "Miniature American Shepherd",
    "Porcelaine",
    "Pyrenean Shepherd",
    "Sealyham Terrier",
    "Sloughi",
    "Xoloitzcuintli"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

for breed in missing_breeds:
    if download_from_pixabay(breed, output_dir) or download_from_pexels(breed, output_dir):
        success += 1
    time.sleep(2)

print(f"\nDownloaded: {success}/{len(missing_breeds)} images")