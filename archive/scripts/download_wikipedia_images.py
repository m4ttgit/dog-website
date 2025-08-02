import requests
import os
from urllib.parse import urlparse
import time

def download_from_wikipedia(breed_name, output_dir):
    """Download breed image from Wikipedia"""
    try:
        # Search Wikipedia for the breed
        search_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{breed_name.replace(' ', '_')}"
        response = requests.get(search_url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'thumbnail' in data and 'source' in data['thumbnail']:
                img_url = data['thumbnail']['source']
                # Get higher resolution image
                img_url = img_url.replace('/thumb/', '/').split('/')[:-1]
                img_url = '/'.join(img_url)
                
                # Download image
                img_response = requests.get(img_url, timeout=10)
                if img_response.status_code == 200:
                    filename = f"{breed_name.replace(' ', '_')}.jpg"
                    filepath = os.path.join(output_dir, filename)
                    
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    print(f"Downloaded: {breed_name}")
                    return True
        
        print(f"Failed: {breed_name}")
        return False
        
    except Exception as e:
        print(f"Error downloading {breed_name}: {str(e)}")
        return False

def main():
    missing_breeds = [
        "American Hairless Terrier",
        "American Leopard Hound", 
        "Bavarian Mountain Scent Hound",
        "Black and Tan Coonhound",
        "Bloodhound",
        "Canaan Dog",
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
        "Segugio Italiano",
        "Shih Tzu",
        "Sloughi",
        "Smooth Fox Terrier",
        "Spinone Italiano",
        "Tornjak",
        "Xoloitzcuintli"
    ]
    
    output_dir = r"D:\Projects\dog-website\public\images\breeds"
    
    print(f"Downloading {len(missing_breeds)} missing breed images from Wikipedia...")
    print("=" * 60)
    
    success_count = 0
    
    for breed in missing_breeds:
        if download_from_wikipedia(breed, output_dir):
            success_count += 1
        time.sleep(1)  # Be respectful to Wikipedia
    
    print("=" * 60)
    print(f"Download complete: {success_count}/{len(missing_breeds)} images downloaded")

if __name__ == "__main__":
    main()