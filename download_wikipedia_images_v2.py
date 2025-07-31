import requests
import os
import time

def try_wikipedia_variants(breed_name):
    """Try different Wikipedia page name variants"""
    variants = [
        breed_name,
        breed_name + " dog",
        breed_name.replace("Terrier", "").strip(),
        breed_name.replace("Hound", "").strip(),
        breed_name.replace("Shepherd", "").strip()
    ]
    return variants

def download_from_wikipedia(breed_name, output_dir):
    """Download breed image from Wikipedia with multiple attempts"""
    variants = try_wikipedia_variants(breed_name)
    
    for variant in variants:
        try:
            search_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{variant.replace(' ', '_')}"
            response = requests.get(search_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'thumbnail' in data and 'source' in data['thumbnail']:
                    img_url = data['thumbnail']['source']
                    # Get original image URL
                    if '/thumb/' in img_url:
                        parts = img_url.split('/thumb/')
                        if len(parts) > 1:
                            img_url = parts[0] + '/' + parts[1].split('/')[0]
                    
                    # Download image
                    img_response = requests.get(img_url, timeout=10)
                    if img_response.status_code == 200:
                        filename = f"{breed_name.replace(' ', '_')}.jpg"
                        filepath = os.path.join(output_dir, filename)
                        
                        with open(filepath, 'wb') as f:
                            f.write(img_response.content)
                        
                        print(f"Downloaded: {breed_name} (using: {variant})")
                        return True
        except:
            continue
    
    print(f"Failed: {breed_name}")
    return False

def main():
    failed_breeds = [
        "American Hairless Terrier",
        "American Leopard Hound", 
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
    
    print(f"Trying to download {len(failed_breeds)} remaining breeds...")
    print("=" * 60)
    
    success_count = 0
    
    for breed in failed_breeds:
        if download_from_wikipedia(breed, output_dir):
            success_count += 1
        time.sleep(1)
    
    print("=" * 60)
    print(f"Additional downloads: {success_count}/{len(failed_breeds)} images")

if __name__ == "__main__":
    main()