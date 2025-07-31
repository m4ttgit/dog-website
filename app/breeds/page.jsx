import { supabase } from '@/app/lib/supabase';
import BreedsPageClient from './BreedsPageClient';

async function getBreeds() {
  try {
    const { data, error } = await supabase
      .from('dogbreed')
      .select('*');

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch breeds');
    }

    if (!data || data.length === 0) {
      throw new Error('No breeds data available');
    }

    // Process the data
    const processedData = data.map(breed => ({
      ...breed,
      name: breed.breed,
      energy_level_value: parseFloat(breed.energy_level_value) || 0,
      trainability_value: parseFloat(breed.trainability_value) || 0,
      grooming_frequency_value: parseFloat(breed.grooming_frequency_value) || 0,
      min_height: parseFloat(breed.min_height) || 0,
      max_height: parseFloat(breed.max_height) || 0,
      min_weight: parseFloat(breed.min_weight) || 0,
      max_weight: parseFloat(breed.max_weight) || 0,
      min_expectancy: parseFloat(breed.min_expectancy) || 0,
      max_expectancy: parseFloat(breed.max_expectancy) || 0,
      popularity: parseInt(breed.popularity) || 999
    }));

    return processedData;
  } catch (error) {
    console.error('Error in getBreeds:', error);
    throw error;
  }
}

export default async function BreedsPage() {
  try {
    const breeds = await getBreeds();
    return <BreedsPageClient initialBreeds={breeds} />;
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h2 className="text-red-800 font-bold mb-2">Error Loading Breeds</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }
}