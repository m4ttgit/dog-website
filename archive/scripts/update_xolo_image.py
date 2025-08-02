import requests
import os

def download_xolo_image():
    """Download specific Xoloitzcuintli image from Wikipedia"""
    img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/BIR_Grupp_5-_MEXIKANSK_NAKENHUND%2C_Lokal_Hero%E2%80%99s_King_Og_Hart%E2%80%99s_Istas_%2823607403303%29.jpg/800px-BIR_Grupp_5-_MEXIKANSK_NAKENHUND%2C_Lokal_Hero%E2%80%99s_King_Og_Hart%E2%80%99s_Istas_%2823607403303%29.jpg"
    
    try:
        response = requests.get(img_url, timeout=10)
        if response.status_code == 200:
            filepath = r"D:\Projects\dog-website\public\images\breeds\Xoloitzcuintli.jpg"
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print("SUCCESS: Updated Xoloitzcuintli image from Wikipedia")
            return True
    except Exception as e:
        print(f"FAILED: {str(e)}")
        return False

if __name__ == "__main__":
    download_xolo_image()