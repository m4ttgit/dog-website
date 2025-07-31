import requests
import os
import sys
import json

# Pixabay API Key (replace with your actual key or get from environment variables)
PIXABAY_API_KEY = sys.argv[1]
SAVE_DIR = r"d:/Projects/dog-website/public/images/breeds"

# Ensure the directory exists
os.makedirs(SAVE_DIR, exist_ok=True)


def get_dog_breed_image_url(breed_name, api_key):
    url = f"https://pixabay.com/api/?key={api_key}&q={breed_name} dog&image_type=photo"
    try:
        # Use requests to fetch data from Pixabay API
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        data = response.json()
        if data["hits"]:
            return data["hits"][0]["webformatURL"]  # Use webformatURL for smaller size
        else:
            # If no hits with the full name, try a simplified name
            simplified_name = breed_name.split(" ")[
                -1
            ]  # Use the last word as a simplified name
            if simplified_name.lower() != breed_name.lower():
                print(
                    f"No image found for {breed_name}, trying simplified name: {simplified_name}",
                    file=sys.stderr,
                )
                url_simplified = f"https://pixabay.com/api/?key={api_key}&q={simplified_name} dog&image_type=photo&category=animals&per_page=1"
                response_simplified = requests.get(url_simplified)
                response_simplified.raise_for_status()
                data_simplified = response_simplified.json()
                if data_simplified["hits"]:
                    return data_simplified["hits"][0]["webformatURL"]
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image URL for {breed_name}: {e}", file=sys.stderr)
        return None


def download_image(image_url, breed_name):
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)

        # Create a valid filename by replacing spaces with underscores
        filename = (
            f"{breed_name.replace(' ', '_').replace('(', '').replace(')', '')}.jpg"
        )
        file_path = os.path.join(SAVE_DIR, filename)

        # Save the image to the specified directory
        with open(file_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        return file_path
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image for {breed_name}: {e}", file=sys.stderr)
        return None


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(
            "Usage: python fetchPixabayImages.py <pixabay_api_key> <breed_name>",
            file=sys.stderr,
        )
        sys.exit(1)

    api_key = sys.argv[1]
    breed_name = sys.argv[2]

    image_url = get_dog_breed_image_url(breed_name, api_key)

    if image_url:
        saved_path = download_image(image_url, breed_name)
        if saved_path:
            print(saved_path)
        else:
            sys.exit(1)
    else:
        print(f"No image URL found for {breed_name}", file=sys.stderr)
        sys.exit(1)
