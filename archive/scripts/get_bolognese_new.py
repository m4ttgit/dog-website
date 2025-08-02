import requests
import os

def get_bolognese_new():
    """Download Bolognese image from new URL"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/2/26/Male_adult_bolognese_dog_%28cropped%29.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Bolognese.jpg"
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(img_url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Bolognese ({file_size} bytes)")
            return True
        else:
            print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    get_bolognese_new()