import requests
import os
import time

PEXELS_API_KEY = "hua5adxJoLNulensKEd737GoF0RcjLq2SImzFvwQuPAdS4pAyS2Qr3mF"

def download_from_pexels(breed_name, output_dir):
    """Download from Pexels API"""
    headers = {"Authorization": PEXELS_API_KEY}
    queries = [f"{breed_name} dog", f"{breed_name} puppy", breed_name]
    
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
                        
                        print(f"SUCCESS: {breed_name}")
                        return True
        except:
            continue
    
    print(f"FAILED: {breed_name}")
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

print("Downloading from Pexels API...")
for breed in missing_breeds:
    if download_from_pexels(breed, output_dir):
        success += 1
    time.sleep(1)

print(f"\nPexels result: {success}/{len(missing_breeds)} downloaded")