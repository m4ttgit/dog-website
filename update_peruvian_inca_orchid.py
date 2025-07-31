import requests
import os

def update_peruvian_inca_orchid():
    """Download Peruvian Inca Orchid image from Wikipedia Commons"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Peruvian_Hairless_Dog_1.jpg/800px-Peruvian_Hairless_Dog_1.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Peruvian_Inca_Orchid.jpg"
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(img_url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Downloaded Peruvian Inca Orchid image ({file_size} bytes)")
            return True
        else:
            # Try direct URL without thumb
            direct_url = "https://upload.wikimedia.org/wikipedia/commons/f/f4/Peruvian_Hairless_Dog_1.jpg"
            response = requests.get(direct_url, headers=headers, timeout=15)
            
            if response.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                file_size = os.path.getsize(filepath)
                print(f"SUCCESS: Downloaded Peruvian Inca Orchid direct ({file_size} bytes)")
                return True
            else:
                print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    update_peruvian_inca_orchid()