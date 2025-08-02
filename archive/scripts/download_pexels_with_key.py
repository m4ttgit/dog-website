import requests
import os
import time

# Pexels API key - you need to get this from https://www.pexels.com/api/
API_KEY = "563492ad6f91700001000001c4b8b8b8c4f04b5b8a8e4b8b8b8b8b8b"

def download_from_pexels(breed_name, output_dir):
    """Download breed image from Pexels"""
    headers = {"Authorization": API_KEY}
    
    queries = [
        f"{breed_name} dog breed",
        f"{breed_name} dog", 
        breed_name.replace(" Terrier", " terrier dog"),
        breed_name.replace(" Hound", " hound dog"),
        breed_name.split()[0] + " dog" if " " in breed_name else breed_name
    ]
    
    for query in queries:
        try:
            url = f"https://api.pexels.com/v1/search"
            params = {"query": query, "per_page": 3}
            
            response = requests.get(url, headers=headers, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('photos'):
                    img_url = data['photos'][0]['src']['medium']
                    
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

breeds = [
    "Bloodhound",
    "Coton de Tulear", 
    "Kerry Blue Terrier",
    "Miniature American Shepherd",
    "Icelandic Sheepdog",
    "Sealyham Terrier",
    "Glen of Imaal Terrier",
    "Hovawart",
    "Sloughi",
    "Cesky Terrier"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

for breed in breeds:
    if download_from_pexels(breed, output_dir):
        success += 1
    time.sleep(2)

print(f"\nPexels result: {success}/{len(breeds)} downloaded")