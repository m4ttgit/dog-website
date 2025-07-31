import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const BREEDS_DIR = path.join(__dirname, '../public/images/breeds');

// List of breeds missing images
const missingBreeds = [
  'Croatian Sheepdog', 'Dandie Dinmont Terrier', 'Danish-Swedish Farmdog',
  'Drentsche Patrijshond', 'Drever', 'English Toy Spaniel',
  'German Longhaired Pointer', 'German Pinscher', 'German Wirehaired Pointer',
  'Gordon Setter', 'Grand Basset Griffon Vendéen', 'Hamiltonstovare',
  'Hanoverian Scenthound', 'Harrier', 'Hokkaido', 'Hovawart',
  'Ibizan Hound', 'Icelandic Sheepdog', 'Irish Water Spaniel',
  'Jagdterrier', 'Japanese Chin', 'Jindo', 'Kai Ken',
  'Kerry Blue Terrier', 'Kishu Ken', 'Kromfohrlander',
  'Lakeland Terrier', 'Lancashire Heeler', 'Lapponian Herder',
  'Manchester Terrier (Standard)', 'Manchester Terrier (Toy)',
  'Miniature American Shepherd', 'Mudi', 'Nederlandse Kooikerhondje',
  'Newfoundland', 'Norfolk Terrier', 'Norrbottenspets',
  'Norwegian Buhund', 'Norwegian Elkhound', 'Norwegian Lundehund',
  'Norwich Terrier', 'Nova Scotia Duck Tolling Retriever',
  'Perro de Presa Canario', 'Peruvian Inca Orchid', 'Plott Hound',
  'Polish Lowland Sheepdog', 'Porcelaine', 'Portuguese Podengo',
  'Portuguese Podengo Pequeno', 'Portuguese Sheepdog', 'Pudelpointer',
  'Pumi', 'Pyrenean Shepherd', 'Rafeiro do Alentejo', 'Russian Toy',
  'Russian Tsvetnaya Bolonka', 'Schapendoes', 'Scottish Deerhound',
  'Segugio Italiano', 'Shiba Inu', 'Shikoku', 'Siberian Husky',
  'Skye Terrier', 'Sloughi', 'Small Munsterlander Pointer',
  'Soft Coated Wheaten Terrier', 'Spanish Mastiff', 'Spanish Water Dog',
  'Spinone Italiano', 'Standard Schnauzer', 'Sussex Spaniel',
  'Swedish Lapphund', 'Teddy Roosevelt Terrier', 'Thai Ridgeback',
  'Tornjak', 'Tosa', 'Treeing Tennessee Brindle', 'Treeing Walker Coonhound',
  'Welsh Springer Spaniel', 'Wetterhoun', 'Wirehaired Pointing Griffon',
  'Working Kelpie', 'Xoloitzcuintli'
];

// Function to convert breed name to filename
function breedToFilename(breed) {
  return breed.replace(/\s+/g, '_').replace(/[()]/g, '').replace(/-/g, '_') + '.jpg';
}

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Function to search for an image on Pixabay
async function searchPixabay(query) {
  return new Promise((resolve, reject) => {
    const searchQuery = encodeURIComponent(`${query} dog`);
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&category=animals&min_width=800&safesearch=true`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.hits && result.hits.length > 0) {
            resolve(result.hits[0].largeImageURL);
          } else {
            reject(new Error(`No images found for ${query}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function to download all missing breed images
async function downloadMissingBreedImages() {
  console.log(`Starting download of ${missingBreeds.length} missing breed images...`);
  
  // Create breeds directory if it doesn't exist
  if (!fs.existsSync(BREEDS_DIR)) {
    fs.mkdirSync(BREEDS_DIR, { recursive: true });
  }
  
  // Process each breed
  for (const breed of missingBreeds) {
    const filename = breedToFilename(breed);
    const filepath = path.join(BREEDS_DIR, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Image for ${breed} already exists, skipping...`);
      continue;
    }
    
    try {
      console.log(`Searching for image of ${breed}...`);
      const imageUrl = await searchPixabay(breed);
      
      console.log(`Downloading image for ${breed} from ${imageUrl}...`);
      await downloadImage(imageUrl, filepath);
      
      console.log(`Successfully downloaded image for ${breed}`);
    } catch (error) {
      console.error(`Error downloading image for ${breed}:`, error.message);
    }
    
    // Add a small delay to avoid hitting API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Download process completed!');
}

// Run the main function
downloadMissingBreedImages().catch(console.error);