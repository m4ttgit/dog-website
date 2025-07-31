'use strict';

import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse';
import axios from 'axios';

const IMAGES_DIR = path.join('public', 'images', 'breeds');
const CSV_PATH = path.join('app', 'database', 'akc-data-latest.csv');

// Create images directory if it doesn't exist
async function ensureDirectory() {
  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

// Convert breed name to format expected by dog.ceo API
function formatBreedName(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z]/g, '');
}

// Get Unsplash fallback URL
function getUnsplashUrl(breedName) {
  return `https://unsplash.com/s/photos/${breedName.toLowerCase().replace(/\s+/g, '-')}?license=free`;
}

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  });
  await fs.writeFile(filepath, response.data);
}

async function processBreeds() {
  const breedMapping = {};
  
  try {
    const csvContent = await fs.readFile(CSV_PATH, 'utf-8');
    const records = await new Promise((resolve, reject) => {
      parse(csvContent, {
        columns: true,
        skip_empty_lines: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    for (const record of records) {
      const breedName = record.breed;
      const formattedName = formatBreedName(breedName);
      const imagePath = path.join(IMAGES_DIR, `${formattedName}.jpg`);

      try {
        // Try dog.ceo API first
        const apiUrl = `https://dog.ceo/api/breed/${formattedName}/images/random`;
        const response = await axios.get(apiUrl);
        
        if (response.data.status === 'success') {
          await downloadImage(response.data.message, imagePath);
          breedMapping[breedName] = `/images/breeds/${formattedName}.jpg`;
          console.log(`✅ Downloaded image for ${breedName}`);
        } else {
          console.log(`⚠️ No dog.ceo image for ${breedName}, try Unsplash: ${getUnsplashUrl(breedName)}`);
        }
      } catch (err) {
        console.log(`⚠️ Error fetching image for ${breedName}: ${err.message}`);
        console.log(`Try Unsplash: ${getUnsplashUrl(breedName)}`);
      }
    }

    await fs.writeFile(
      path.join('public', 'breed-images.json'), 
      JSON.stringify(breedMapping, null, 2)
    );

    console.log('✅ Generated breed-images.json mapping file');

  } catch (err) {
    console.error('Error processing breeds:', err);
  }
}

async function main() {
  await ensureDirectory();
  await processBreeds();
}

main().catch(console.error);