import requests
import os

def update_pyrenean_mastiff():
    """Download Pyrenean Mastiff image from Wikipedia"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/MasPiri-Lula-ESP.jpg/800px-MasPiri-Lula-ESP.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Pyrenean_Mastiff.jpg"
    
    try:
        response = requests.get(img_url, timeout=15)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Downloaded Pyrenean Mastiff image ({file_size} bytes)")
            return True
        else:
            print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    update_pyrenean_mastiff()