import requests
import os

def update_pudelpointer():
    """Download Pudelpointer image from Wikipedia Commons"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Pudelpointer_on_point.jpg/800px-Pudelpointer_on_point.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Pudelpointer.jpg"
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(img_url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Downloaded Pudelpointer image ({file_size} bytes)")
            return True
        else:
            print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    update_pudelpointer()