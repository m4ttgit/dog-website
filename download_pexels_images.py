import requests
import os
import time

# Get Pexels API key from environment or use a placeholder
PEXELS_API_KEY = "YOUR_PEXELS_API_KEY"  # Replace with actual API key

def download_from_pexels(breed_name, output_dir):
    """Download breed image from Pexels API"""
    headers = {"Authorization": PEXELS_API_KEY}
    
    search_terms = [
        f"{breed_name} dog",
        breed_name,
        breed_name.replace(" ", "+"),
        f"{breed_name.split()[0]}+dog" if " " in breed_name else f"{breed_name}+dog"
    ]
    
    for term in search_terms:
        try:
            url = f"https://api.pexels.com/v1/search?query={term}&per_page=5"
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('photos'):
                    photo = data['photos'][0]
                    img_url = photo['src']['medium']
                    
                    img_response = requests.get(img_url, timeout=10)
                    if img_response.status_code == 200:
                        filename = f"{breed_name.replace(' ', '_')}.jpg"
                        filepath = os.path.join(output_dir, filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"SUCCESS: {breed_name}")
                        return True
        except Exception as e:
            continue
    
    print(f"FAILED: {breed_name}")
    return False

remaining_breeds = [
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
print("=" * 50)

for breed in remaining_breeds:
    if download_from_pexels(breed, output_dir):
        success += 1
    time.sleep(1)

print("=" * 50)
print(f"Pexels downloads: {success}/{len(remaining_breeds)}")