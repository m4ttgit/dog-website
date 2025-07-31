import requests
import os
import time

def get_breed_from_wiki(breed_name, filename):
    """Get breed image via Wikipedia API"""
    try:
        api_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{breed_name}"
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
                    filepath = f"D:\\Projects\\dog-website\\public\\images\\breeds\\{filename}.jpg"
                    
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    file_size = os.path.getsize(filepath)
                    print(f"SUCCESS: {filename} ({file_size} bytes)")
                    return True
        
        print(f"FAILED: {filename}")
        return False
        
    except Exception as e:
        print(f"ERROR {filename}: {str(e)}")
        return False

breeds = [
    ("Pudelpointer", "Pudelpointer"),
    ("Pyrenean_Mastiff", "Pyrenean_Mastiff"),
    ("Neapolitan_Mastiff", "Neapolitan_Mastiff")
]

for wiki_name, file_name in breeds:
    get_breed_from_wiki(wiki_name, file_name)
    time.sleep(1)