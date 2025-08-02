import requests
import os
import time

def get_wikipedia_variants(breed_name):
    """Generate Wikipedia search variants"""
    variants = [
        breed_name,
        breed_name.replace(" ", "_"),
        breed_name + "_dog",
        breed_name.replace("Terrier", "terrier"),
        breed_name.replace("Hound", "hound"), 
        breed_name.replace("Shepherd", "shepherd"),
        breed_name.replace("American ", ""),
        breed_name.replace("Miniature ", ""),
        breed_name.replace("-", " "),
        breed_name.replace("Scent Hound", "Scenthound")
    ]
    
    # Special cases
    special_cases = {
        "Bloodhound": ["Bloodhound", "Blood_hound"],
        "Cesky Terrier": ["Cesky_Terrier", "Czech_Terrier"],
        "Coton de Tulear": ["Coton_de_Tulear", "Coton_De_Tulear"],
        "Kerry Blue Terrier": ["Kerry_Blue_Terrier", "Kerry_blue_terrier"],
        "Xoloitzcuintli": ["Xoloitzcuintli", "Mexican_Hairless_Dog", "Xolo"],
        "Sloughi": ["Sloughi", "Sloughi_dog"],
        "Hovawart": ["Hovawart", "Hovawart_dog"],
        "Icelandic Sheepdog": ["Icelandic_Sheepdog", "Iceland_Dog"],
        "Karelian Bear Dog": ["Karelian_Bear_Dog", "Karelian_bear_dog"]
    }
    
    if breed_name in special_cases:
        variants.extend(special_cases[breed_name])
    
    return list(set(variants))

def download_image(breed_name, output_dir):
    """Download image with multiple Wikipedia variants"""
    variants = get_wikipedia_variants(breed_name)
    
    for variant in variants:
        try:
            url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{variant}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'thumbnail' in data:
                    img_url = data['thumbnail']['source']
                    
                    # Get higher resolution
                    if '/thumb/' in img_url and img_url.endswith('.jpg'):
                        img_url = img_url.replace('/thumb/', '/').rsplit('/', 1)[0] + '.jpg'
                    
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

print(f"Final attempt: {len(remaining_breeds)} breeds")
print("=" * 50)

for breed in remaining_breeds:
    if download_image(breed, output_dir):
        success += 1
    time.sleep(1)

print("=" * 50)
print(f"Final result: {success}/{len(remaining_breeds)} downloaded")