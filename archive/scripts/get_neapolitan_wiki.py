import requests
import os

def get_neapolitan_from_wiki():
    """Get Neapolitan Mastiff image via Wikipedia API"""
    try:
        api_url = "https://en.wikipedia.org/api/rest_v1/page/summary/Neapolitan_Mastiff"
        response = requests.get(api_url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'thumbnail' in data:
                img_url = data['thumbnail']['source']
                # Get higher resolution
                img_url = img_url.replace('/thumb/', '/').split('/')[:-1]
                img_url = '/'.join(img_url)
                
                img_response = requests.get(img_url, timeout=10)
                if img_response.status_code == 200:
                    filepath = r"D:\Projects\dog-website\public\images\breeds\Neapolitan_Mastiff.jpg"
                    
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    file_size = os.path.getsize(filepath)
                    print(f"SUCCESS: Downloaded Neapolitan Mastiff from Wikipedia API ({file_size} bytes)")
                    return True
        
        print("FAILED: Could not get image from Wikipedia API")
        return False
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    get_neapolitan_from_wiki()