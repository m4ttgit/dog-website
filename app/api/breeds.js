import { supabase } from '@/app/lib/supabase';

const validateBreedData = (breed) => {
  const requiredFields = [
    'breed',
    'description',
    'group',
    'min_height',
    'max_height',
    'min_weight',
    'max_weight',
    'min_expectancy',
    'max_expectancy'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = breed[field];
    return value === null || value === undefined || value === '';
  });

  if (missingFields.length > 0) {
    console.warn(`Breed "${breed.breed}" is missing fields:`, missingFields);
    return false;
  }

  // Check that characteristic values are present (they should have defaults now)
  const characteristicFields = ['grooming_frequency_value', 'energy_level_value', 'trainability_value'];
  const missingCharacteristics = characteristicFields.filter(field => {
    const value = breed[field];
    return value === null || value === undefined || value === 0;
  });

  if (missingCharacteristics.length > 0) {
    console.warn(`Breed "${breed.breed}" has missing characteristics (using defaults):`, missingCharacteristics);
  }

  return true;
};

const processBreedData = (breed) => {
  // Ensure all numeric fields are properly parsed
  const numericFields = {
    min_height: 0,
    max_height: 0,
    min_weight: 0,
    max_weight: 0,
    min_expectancy: 0,
    max_expectancy: 0,
    popularity: 999,
    grooming_frequency_value: 0.5,
    shedding_value: 0.5,
    energy_level_value: 0.5,
    trainability_value: 0.5,
    demeanor_value: 0.5
  };

  const processed = { ...breed };

  // Process each numeric field
  Object.keys(numericFields).forEach(field => {
    let value = breed[field];
    if (typeof value === 'string') {
      // Remove any non-numeric characters except decimal points
      value = value.replace(/[^\d.-]/g, '');
    }
    
    if (field === 'popularity') {
      processed[field] = parseInt(value) || numericFields[field];
    } else {
      const parsedValue = parseFloat(value);
      // For characteristic values, use default if missing, null, undefined, or 0
      if (['grooming_frequency_value', 'shedding_value', 'energy_level_value', 'trainability_value', 'demeanor_value'].includes(field)) {
        processed[field] = (parsedValue && parsedValue > 0) ? parsedValue : numericFields[field];
      } else {
        processed[field] = parsedValue || numericFields[field];
      }
    }
  });

  // Ensure description exists
  if (!processed.description) {
    processed.description = generateDescription(processed);
  }

  return processed;
};

function generateDescription(breed) {
  return `The ${breed.breed} is a wonderful companion known for its ${
    breed.energy_level_value > 0.7 ? 'high energy and' :
    breed.energy_level_value > 0.4 ? 'moderate energy and' : 'calm nature and'
  } ${
    breed.trainability_value > 0.7 ? 'excellent trainability' :
    breed.trainability_value > 0.4 ? 'good trainability' : 'independent nature'
  }. This ${breed.group?.toLowerCase() || ''} breed typically stands ${
    breed.min_height}-${breed.max_height} cm tall and weighs ${
    breed.min_weight}-${breed.max_weight} kg. They have a life expectancy of ${
    breed.min_expectancy}-${breed.max_expectancy} years.`;
}

function createSlug(breedName) {
  return breedName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export async function getBreedBySlug(slug) {
  try {
    const breeds = await getBreeds();
    return breeds.find(breed => createSlug(breed.breed) === slug);
  } catch (error) {
    console.error('Error getting breed by slug:', error);
    return null;
  }
}

export async function getBreeds() {
  try {
    console.log('Fetching breeds from Supabase...');
    
    const { data, error } = await supabase
      .from('dogbreed')
      .select('*');

    if (error) {
      console.error('Supabase Error:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No data received from Supabase');
      return [];
    }

    console.log(`Retrieved ${data.length} breeds from database`);

    // Process and validate the data
    const processedData = data
      .map(processBreedData)
      .filter(breed => {
        if (!breed.breed) {
          console.warn('Found breed without name:', breed);
          return false;
        }
        if (!validateBreedData(breed)) {
          return false;
        }
        return true;
      });

    console.log(`Processed ${processedData.length} valid breeds`);

    // Sort by popularity if available, otherwise by name
    processedData.sort((a, b) => {
      if (a.popularity && b.popularity) {
        return a.popularity - b.popularity;
      }
      return a.breed.localeCompare(b.breed);
    });

    return processedData;

  } catch (error) {
    console.error('Error in getBreeds:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return [];
  }
}