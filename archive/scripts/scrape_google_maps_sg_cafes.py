import csv
import asyncio
from playwright.async_api import async_playwright

# Search query and location
SEARCH_QUERY = 'dog friendly cafe Singapore'

# Output CSV file
CSV_FILE = 'cafes_singapore.csv'

async def scrape_google_maps():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        )
        page = await context.new_page()

        # Navigate to Google Maps
        await page.goto('https://www.google.com/maps')
        await page.wait_for_load_state('networkidle')

        # Search for dog friendly cafes
        await page.fill('#searchboxinput', SEARCH_QUERY)
        await page.keyboard.press('Enter')
        await page.wait_for_load_state('networkidle')

        # Wait for results container
        await page.wait_for_selector('div[role="feed"]')

        cafes = []
        seen_names = set()
        scroll_count = 0
        max_scrolls = 10

        while scroll_count < max_scrolls:
            # Scroll the results panel
            await page.evaluate('''
                document.querySelector('div[role="feed"]')
                    .parentElement.scrollTo(0, document.querySelector('div[role="feed"]')
                    .parentElement.scrollHeight)
            ''')
            await asyncio.sleep(2)

            # Get all result items
            items = await page.query_selector_all('div[role="article"]')
            print(f"Found {len(items)} items on scroll {scroll_count + 1}")

            for item in items:
                try:
                    # Click the item to show details
                    await item.click()
                    await page.wait_for_load_state('networkidle')
                    await asyncio.sleep(1)

                    # Extract cafe information
                    name = await page.evaluate('''
                        () => {
                            const elem = document.querySelector('h1.fontHeadlineLarge');
                            return elem ? elem.textContent.trim() : '';
                        }
                    ''')

                    if not name or name in seen_names:
                        continue

                    seen_names.add(name)
                    cafe_data = {'name': name}

                    # Extract address
                    address_elem = await page.query_selector('button[data-item-id="address"]')
                    if address_elem:
                        cafe_data['address'] = (await address_elem.get_attribute('aria-label')).replace('Address: ', '')

                    # Extract phone number
                    phone_elem = await page.query_selector('button[data-item-id="phone:tel:"]')
                    if phone_elem:
                        cafe_data['contact'] = (await phone_elem.get_attribute('aria-label')).replace('Phone: ', '')

                    # Extract description/reviews
                    description_elems = await page.query_selector_all('div.fontBodyMedium span')
                    descriptions = []
                    for desc_elem in description_elems:
                        text = await desc_elem.text_content()
                        if text.strip():
                            descriptions.append(text.strip())
                    cafe_data['description'] = ' '.join(descriptions)

                    cafes.append(cafe_data)
                    print(f"Successfully extracted data for: {name}")

                    # Go back to results
                    await page.click('button[aria-label="Back"]')
                    await page.wait_for_load_state('networkidle')
                    await asyncio.sleep(1)

                except Exception as e:
                    print(f"Error processing cafe: {str(e)}")
                    continue

            scroll_count += 1

        # Write results to CSV
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['name', 'address', 'contact', 'description']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for cafe in cafes:
                writer.writerow(cafe)

        await browser.close()
        print(f'Scraped {len(cafes)} cafes. Data saved to {CSV_FILE}')

if __name__ == '__main__':
    asyncio.run(scrape_google_maps())