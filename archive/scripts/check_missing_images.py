import csv
import os
import re

def normalize_breed_name(name):
    """Normalize breed name for comparison"""
    # Remove special characters and convert to lowercase
    normalized = re.sub(r'[^\w\s]', '', name.lower())
    # Replace spaces with underscores
    normalized = normalized.replace(' ', '_')
    return normalized

def get_csv_breeds():
    """Extract breed names from CSV file"""
    breeds = []
    csv_path = r'D:\Projects\dog-website\akc-data-latest.csv'
    
    with open(csv_path, 'r', encoding='utf-8') as file:
        # Skip the header line that doesn't contain breed names
        next(file)
        reader = csv.reader(file)
        for row in reader:
            if row and len(row) > 0:
                breed_name = row[0].strip()
                if breed_name:
                    breeds.append(breed_name)
    
    return sorted(breeds)

def get_image_files():
    """Get list of image files in breeds directory"""
    images_dir = r'D:\Projects\dog-website\public\images\breeds'
    image_files = []
    
    for file in os.listdir(images_dir):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.jfif')):
            # Remove file extension and normalize
            name_without_ext = os.path.splitext(file)[0]
            image_files.append(name_without_ext)
    
    return sorted(image_files)

def find_missing_images():
    """Compare CSV breeds with available images"""
    csv_breeds = get_csv_breeds()
    image_files = get_image_files()
    
    print(f"Total breeds in CSV: {len(csv_breeds)}")
    print(f"Total image files: {len(image_files)}")
    print()
    
    # Normalize breed names for comparison
    normalized_csv_breeds = {normalize_breed_name(breed): breed for breed in csv_breeds}
    normalized_image_files = {normalize_breed_name(img): img for img in image_files}
    
    missing_images = []
    found_images = []
    
    for normalized_breed, original_breed in normalized_csv_breeds.items():
        # Try exact match first
        if normalized_breed in normalized_image_files:
            found_images.append(original_breed)
            continue
            
        # Try partial matches
        found_match = False
        for normalized_img in normalized_image_files:
            if normalized_breed in normalized_img or normalized_img in normalized_breed:
                found_images.append(original_breed)
                found_match = True
                break
        
        if not found_match:
            missing_images.append(original_breed)
    
    return missing_images, found_images

if __name__ == "__main__":
    missing, found = find_missing_images()
    
    print(f"Breeds with images: {len(found)}")
    print(f"Missing breed images: {len(missing)}")
    print()
    
    if missing:
        print("MISSING BREED IMAGES:")
        print("=" * 50)
        for i, breed in enumerate(missing, 1):
            print(f"{i:3d}. {breed}")
    else:
        print("🎉 All breeds have images!")
    
    print(f"\nCoverage: {len(found)}/{len(found) + len(missing)} ({len(found)/(len(found) + len(missing))*100:.1f}%)")