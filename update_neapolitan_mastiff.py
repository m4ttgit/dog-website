import requests
import os

def update_neapolitan_mastiff():
    """Download Neapolitan Mastiff image from Wikipedia Commons"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mastino_sylwetka.jpg/800px-Mastino_sylwetka.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Neapolitan_Mastiff.jpg"
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(img_url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Downloaded Neapolitan Mastiff ({file_size} bytes)")
            return True
        else:
            # Try direct URL
            direct_url = "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mastino_sylwetka.jpg"
            response = requests.get(direct_url, headers=headers, timeout=15)
            
            if response.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                file_size = os.path.getsize(filepath)
                print(f"SUCCESS: Downloaded Neapolitan Mastiff direct ({file_size} bytes)")
                return True
            else:
                print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    update_neapolitan_mastiff()