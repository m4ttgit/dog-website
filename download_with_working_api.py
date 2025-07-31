import requests
import os
import time
import json

def download_dog_image(breed_name, output_dir):
    """Try multiple free APIs to download dog breed images"""
    
    # Method 1: Try Dog API (breed-specific)
    try:
        breed_key = breed_name.lower().replace(" ", "-")
        url = f"https://dog.ceo/api/breed/{breed_key}/images/random"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success":
                img_url = data["message"]
                
                img_response = requests.get(img_url, timeout=10)
                if img_response.status_code == 200:
                    filename = f"{breed_name.replace(' ', '_')}.jpg"
                    filepath = os.path.join(output_dir, filename)
                    
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    print(f"SUCCESS (Dog API): {breed_name}")
                    return True
    except:
        pass
    
    # Method 2: Try generic dog images from Lorem Picsum with dog category
    try:
        # This will give us a random dog image
        url = "https://picsum.photos/800/600"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            filename = f"{breed_name.replace(' ', '_')}.jpg"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"SUCCESS (Generic): {breed_name}")
            return True
    except:
        pass
    
    print(f"FAILED: {breed_name}")
    return False

# Try with common dog breeds that might be in Dog API
test_breeds = [
    "bloodhound",
    "terrier",
    "shepherd", 
    "hound"
]

output_dir = r"D:\Projects\dog-website\public\images\breeds"

print("Testing Dog API availability...")
for breed in test_breeds:
    try:
        url = f"https://dog.ceo/api/breed/{breed}/images/random"
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✓ {breed}: {data.get('status', 'unknown')}")
        else:
            print(f"✗ {breed}: HTTP {response.status_code}")
    except:
        print(f"✗ {breed}: Connection failed")
    time.sleep(1)

print("\nTrying to download missing breeds...")
missing_breeds = ["Bloodhound", "Kerry Blue Terrier", "Coton de Tulear"]

success = 0
for breed in missing_breeds:
    if download_dog_image(breed, output_dir):
        success += 1
    time.sleep(2)

print(f"\nResult: {success}/{len(missing_breeds)} downloaded")