import os
import csv
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

# Pixabay API configuration
PIXABAY_API_KEY = os.getenv('PIXABAY_API_KEY')
PIXABAY_API_URL = 'https://pixabay.com/api/'

# Directory setup
BASE_DIR = Path('D:/Projects/dog-website')
IMAGE_DIR = BASE_DIR / 'public/images/breeds'
CSV_FILE = BASE_DIR / 'memory-bank/breed-image-sources.csv'

# Create image directory if it doesn't exist
IMAGE_DIR.mkdir(parents=True, exist_ok=True)

def get_pixabay_image(breed_name):
    """Search and download a suitable image for the breed from Pixabay."""
    params = {
        'key': PIXABAY_API_KEY,
        'q': f'{breed_name} dog breed full body',
        'image_type': 'photo',
        'orientation': 'horizontal',
        'category': 'animals',
        'safesearch': 'true',
        'min_width': 1200,
        'min_height': 800,
        'per_page': 5
    }

    try:
        response = requests.get(PIXABAY_API_URL, params=params)
        response.raise_for_status()
        data = response.json()

        if data['totalHits'] > 0:
            # Get the first image URL
            image_url = data['hits'][0]['largeImageURL']
            
            # Download the image
            image_response = requests.get(image_url)
            image_response.raise_for_status()
            
            # Create filename
            safe_breed_name = breed_name.lower().replace(' ', '_')
            image_path = IMAGE_DIR / f'{safe_breed_name}.jpg'
            
            # Save the image
            with open(image_path, 'wb') as f:
                f.write(image_response.content)
            
            print(f'Successfully downloaded image for {breed_name}')
            return True
    except Exception as e:
        print(f'Error downloading image for {breed_name}: {str(e)}')
    
    return False

def main():
    """Main function to process the breed CSV and download missing images, update documentation, and log progress."""
    if not PIXABAY_API_KEY:
        print('Error: PIXABAY_API_KEY not found in environment variables')
        return

    # Load missing breeds
    missing_breeds_path = BASE_DIR / 'memory-bank/missing-breed-images.md'
    with open(missing_breeds_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    missing_breeds = [line.strip('* \n') for line in lines if line.startswith('*')]

    # Load breed-image mapping
    breed_images_json = BASE_DIR / 'public/breed-images.json'
    if breed_images_json.exists():
        import json
        with open(breed_images_json, 'r', encoding='utf-8') as f:
            breed_image_map = json.load(f)
    else:
        breed_image_map = {}

    # Prepare to update image-sources.md
    image_sources_md = BASE_DIR / 'memory-bank/image-sources.md'
    if image_sources_md.exists():
        with open(image_sources_md, 'r', encoding='utf-8') as f:
            image_sources_lines = f.readlines()
    else:
        image_sources_lines = ['# Image Sources\n\nThis file tracks the sources of royalty-free images used in the project.\n']

    # Prepare to update breed-image-sources.csv
    csv_rows = []
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            csv_rows.append(row)

    updated = False
    log_manual = []
    for breed in missing_breeds:
        safe_breed_name = breed.replace(' ', '_').replace('(', '').replace(')', '')
        image_path = IMAGE_DIR / f"{safe_breed_name}.jpg"
        if image_path.exists():
            breed_image_map[breed] = f"/images/breeds/{safe_breed_name}.jpg"
            continue
        # Try to find a Pixabay source for this breed
        pixabay_url = None
        for row in csv_rows:
            if row['Breed Name'].strip().lower() == breed.lower() and 'pixabay' in row['Potential Image Source URL']:
                pixabay_url = row['Potential Image Source URL']
                break
        # Attempt download
        success = False
        if pixabay_url:
            success = get_pixabay_image(breed)
        if success and image_path.exists():
            breed_image_map[breed] = f"/images/breeds/{safe_breed_name}.jpg"
            # Add to image-sources.md
            image_sources_lines.append(f"\n## {breed}\n\n*   **Filename:** `{safe_breed_name}.jpg`\n*   **Source URL:** {pixabay_url}\n*   **License:** Pixabay License (Royalty-Free)\n")
            updated = True
        else:
            log_manual.append(breed)

    # Write updated breed-images.json
    with open(breed_images_json, 'w', encoding='utf-8') as f:
        import json
        json.dump(breed_image_map, f, indent=2)

    # Write updated image-sources.md
    with open(image_sources_md, 'w', encoding='utf-8') as f:
        f.writelines(image_sources_lines)

    # Update progress.md
    progress_md = BASE_DIR / 'memory-bank/progress.md'
    with open(progress_md, 'r', encoding='utf-8') as f:
        progress_lines = f.readlines()
    # Find and update the missing breeds count
    for i, line in enumerate(progress_lines):
        if 'There are' in line and 'breeds still missing images' in line:
            progress_lines[i] = f"- There are {len(log_manual)} breeds still missing images based on `memory-bank/missing-breed-images.md`.\n"
            break
    with open(progress_md, 'w', encoding='utf-8') as f:
        f.writelines(progress_lines)

    # Log breeds that still need manual review
    if log_manual:
        print(f"Manual review needed for {len(log_manual)} breeds. See progress.md for details.")
    else:
        print("All missing breed images have been processed.")

if __name__ == '__main__':
    main()