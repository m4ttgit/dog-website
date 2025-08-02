import requests
import os
import time

def download_unsplash_image(breed_name, output_dir):
    """Download from Unsplash Source (no API key needed)"""
    queries = [
        f"{breed_name} dog",
        breed_name.replace(" ", "%20") + "%20dog",
        breed_name.split()[0] + "%20dog" if " " in breed_name else breed_name
    ]
    
    for query in queries:
        try:
            # Unsplash Source API (free, no key needed)
            url = f"https://source.unsplash.com/800x600/?{query}"
            
            response = requests.get(url, timeout=10, allow_redirects=True)
            
            if response.status_code == 200 and len(response.content) > 1000:
                filename = f"{breed_name.replace(' ', '_')}.jpg"
                filepath = os.path.join(output_dir, filename)
                
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                print(f"Downloaded: {breed_name}")
                return True
        except:
            continue
    
    print(f"Failed: {breed_name}")
    return False

# Focus on most common missing breeds
common_breeds = [
    "Bloodhound",
    "Coton de Tulear", 
    "Kerry Blue Terrier",
    "Miniature American Shepherd",
    "Icelandic Sheepdog",
    "Sealyham Terrier",
    "Glen of Imaal Terrier",
    "Hovawart",
    "Cesky Terrier",
    "American Hairless Terrier"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"
success = 0

print("Downloading from Unsplash Source...")
print("=" * 40)

for breed in common_breeds:
    if download_unsplash_image(breed, output_dir):
        success += 1
    time.sleep(2)  # Be respectful

print("=" * 40)
print(f"Result: {success}/{len(common_breeds)} downloaded")