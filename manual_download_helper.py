import webbrowser
import time

def open_search_tabs():
    """Open browser tabs for manual image search"""
    missing_breeds = [
        "American Hairless Terrier",
        "Bavarian Mountain Scent Hound", 
        "Bloodhound",
        "Caucasian Shepherd Dog",
        "Cesky Terrier",
        "Coton de Tulear",
        "Croatian Sheepdog",
        "Danish-Swedish Farmdog",
        "Glen of Imaal Terrier",
        "Hovawart",
        "Icelandic Sheepdog",
        "Jagdterrier",
        "Kai Ken",
        "Karelian Bear Dog",
        "Kerry Blue Terrier",
        "Miniature American Shepherd",
        "Porcelaine",
        "Pyrenean Shepherd",
        "Sealyham Terrier", 
        "Sloughi",
        "Xoloitzcuintli"
    ]
    
    print("Opening search tabs for manual download...")
    print("Look for Creative Commons or royalty-free images")
    print("=" * 50)
    
    # Open first 5 breeds for manual search
    priority_breeds = missing_breeds[:5]
    
    for breed in priority_breeds:
        search_query = f"{breed} dog breed".replace(" ", "+")
        urls = [
            f"https://commons.wikimedia.org/w/index.php?search={search_query}",
            f"https://pixabay.com/images/search/{search_query}/",
            f"https://www.pexels.com/search/{search_query}/"
        ]
        
        print(f"\nSearching for: {breed}")
        for url in urls:
            webbrowser.open(url)
            time.sleep(1)
        
        input(f"Press Enter when you've downloaded {breed} image...")

if __name__ == "__main__":
    open_search_tabs()