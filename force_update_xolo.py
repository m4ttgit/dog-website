import requests
import os

def force_update_xolo():
    """Force update Xoloitzcuintli image from Wikipedia"""
    # Direct link to the Wikipedia image
    img_url = "https://upload.wikimedia.org/wikipedia/commons/9/99/BIR_Grupp_5-_MEXIKANSK_NAKENHUND%2C_Lokal_Hero%E2%80%99s_King_Og_Hart%E2%80%99s_Istas_%2823607403303%29.jpg"
    
    filepath = r"D:\Projects\dog-website\public\images\breeds\Xoloitzcuintli.jpg"
    
    # Delete existing file first
    if os.path.exists(filepath):
        os.remove(filepath)
        print("Deleted existing Xoloitzcuintli.jpg")
    
    try:
        response = requests.get(img_url, timeout=15)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            file_size = os.path.getsize(filepath)
            print(f"SUCCESS: Downloaded new Xoloitzcuintli image ({file_size} bytes)")
            return True
        else:
            print(f"FAILED: HTTP {response.status_code}")
    except Exception as e:
        print(f"ERROR: {str(e)}")
    
    return False

if __name__ == "__main__":
    force_update_xolo()