// Load CSV data and create a lookup map
let attributionMap = {};

// Parse CSV data (client-side version)
function parseCSVData(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  
  const map = {};
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length >= 6) {
      const breedName = values[0];
      map[breedName] = {
        imageFilename: values[1],
        source: values[2],
        attribution: values[3],
        license: values[4],
        url: values[5]
      };
    }
  }
  
  return map;
}

// Load CSV data from a public URL
export async function loadAttributionData() {
  if (Object.keys(attributionMap).length > 0) {
    console.log('Using cached attribution data, entries:', Object.keys(attributionMap).length);
    return attributionMap;
  }
  
  try {
    console.log('Fetching attribution data from /breed-image-attributions.csv');
    
    // Try using fetch first
    let response;
    try {
      response = await fetch('/breed-image-attributions.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch {
      console.log('Fetch failed, trying alternative method');
      // If fetch fails, try to load from a different approach
      // For Next.js public files, we can try to access it directly
      response = await fetch('/breed-image-attributions.csv?t=' + Date.now());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    const csvText = await response.text();
    console.log('CSV text length:', csvText.length);
    console.log('CSV text preview:', csvText.substring(0, 200));
    attributionMap = parseCSVData(csvText);
    console.log('Parsed attribution data, entries:', Object.keys(attributionMap).length);
    return attributionMap;
  } catch (error) {
    console.error('Error loading attribution data:', error);
    return {};
  }
}

// Normalize breed names for better matching
function normalizeBreedName(name) {
  if (!name) return '';
  return name.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
}

// Get attribution data for a specific breed
export async function getImageAttribution(breedName) {
  if (Object.keys(attributionMap).length === 0) {
    await loadAttributionData();
  }
  
  console.log('Looking for breed:', breedName);
  
  // Try exact match first
  let result = attributionMap[breedName];
  if (result) {
    console.log('Found exact match:', result);
    return result;
  }
  
  // Try normalized matching
  const normalizedInput = normalizeBreedName(breedName);
  console.log('Normalized input:', normalizedInput);
  
  for (const [csvBreedName, attribution] of Object.entries(attributionMap)) {
    const normalizedCsv = normalizeBreedName(csvBreedName);
    if (normalizedCsv === normalizedInput) {
      console.log('Found normalized match:', csvBreedName, '->', attribution);
      return attribution;
    }
  }
  
  // Try partial matching for common variations
  for (const [csvBreedName, attribution] of Object.entries(attributionMap)) {
    const normalizedCsv = normalizeBreedName(csvBreedName);
    if (normalizedCsv.includes(normalizedInput) || normalizedInput.includes(normalizedCsv)) {
      console.log('Found partial match:', csvBreedName, '->', attribution);
      return attribution;
    }
  }
  
  console.log('No attribution found for:', breedName);
  console.log('Available breeds:', Object.keys(attributionMap).slice(0, 10));
  return null;
}

// Get all attribution data
export async function getAllAttributions() {
  if (Object.keys(attributionMap).length === 0) {
    await loadAttributionData();
  }
  return attributionMap;
}
