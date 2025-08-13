'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { fallbackBreeds } from '@/app/lib/fallback-breeds';
import breedImages from '@/public/breed-images.json';

export default function BreedComparePage() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try direct Supabase connection first
      const { data, error: supabaseError } = await supabase
        .from('dogbreed')
        .select('*')
        .limit(100);

      if (supabaseError) {
        console.warn('Supabase error, using fallback data:', supabaseError);
        setBreeds(fallbackBreeds);
        return;
      }

      if (data && data.length > 0) {
        const processedBreeds = data.map(breed => ({
          ...breed,
          min_height: parseFloat(breed.min_height) || 0,
          max_height: parseFloat(breed.max_height) || 0,
          min_weight: parseFloat(breed.min_weight) || 0,
          max_weight: parseFloat(breed.max_weight) || 0,
          min_expectancy: parseFloat(breed.min_expectancy) || 0,
          max_expectancy: parseFloat(breed.max_expectancy) || 0,
          energy_level_value: parseFloat(breed.energy_level_value) || 0.5,
          trainability_value: parseFloat(breed.trainability_value) || 0.5
        }));
        
        setBreeds(processedBreeds);
      } else {
        console.warn('No data from Supabase, using fallback data');
        setBreeds(fallbackBreeds);
      }
    } catch (error) {
      console.error('Error fetching breeds:', error);
      console.log('Using fallback breed data');
      setBreeds(fallbackBreeds);
      setError(null); // Don't show error if we have fallback data
    } finally {
      setLoading(false);
    }
  };

  const filteredBreeds = breeds.filter(breed => 
    breed?.breed?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedBreeds.find(selected => selected.breed === breed.breed)
  );

  const addBreed = (breed) => {
    if (selectedBreeds.length < 4 && !selectedBreeds.find(b => b.breed === breed.breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  const removeBreed = (breedName) => {
    setSelectedBreeds(selectedBreeds.filter(b => b.breed !== breedName));
  };

  const formatRange = (min, max, unit) => {
    if (!min && !max) return 'N/A';
    if (min === max) return `${min} ${unit}`;
    return `${min}-${max} ${unit}`;
  };

  const getEnergyLevel = (value) => {
    if (value >= 0.8) return 'Very High';
    if (value >= 0.6) return 'High';
    if (value >= 0.4) return 'Medium';
    if (value >= 0.2) return 'Low';
    return 'Very Low';
  };

  const getTrainability = (value) => {
    if (value >= 0.8) return 'Highly Trainable';
    if (value >= 0.6) return 'Moderately Trainable';
    if (value >= 0.4) return 'Average';
    if (value >= 0.2) return 'Challenging';
    return 'Independent';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading breeds...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button 
            onClick={fetchBreeds}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Compare Dog Breeds</h1>
        <p className="text-gray-600">Select up to 4 breeds to compare their characteristics</p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Selected Breeds */}
      {selectedBreeds.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Selected Breeds ({selectedBreeds.length}/4)</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBreeds.map(breed => (
              <button
                key={breed.breed}
                onClick={() => removeBreed(breed.breed)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                title="Click to remove"
              >
                {breed.breed} ×
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breed Selection Grid */}
      {selectedBreeds.length < 4 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Available Breeds ({breeds.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {filteredBreeds.slice(0, 20).map(breed => (
              <button
                key={breed.breed}
                onClick={() => addBreed(breed)}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                <div className="font-medium">{breed.breed}</div>
                <div className="text-sm text-gray-600">{breed.group || 'Unknown Group'}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedBreeds.length > 1 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Breed Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Characteristic</th>
                    {selectedBreeds.map(breed => (
                      <th key={breed.breed} className="text-left py-3 px-4 font-semibold min-w-32">
                        <div className="text-center">
                          <img
                            src={breedImages[breed.breed] || '/placeholder-dog.jpg'}
                            alt={breed.breed}
                            className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                            onError={(e) => { e.target.src = '/placeholder-dog.jpg'; }}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{breed.breed}</span>
                            <button
                              onClick={() => removeBreed(breed.breed)}
                              className="text-red-500 hover:text-red-700 ml-2"
                              title="Remove breed"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Group</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">{breed.group || 'N/A'}</td>
                    ))}
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Height</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">
                        {formatRange(breed.min_height, breed.max_height, 'cm')}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Weight</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">
                        {formatRange(breed.min_weight, breed.max_weight, 'kg')}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Life Expectancy</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">
                        {formatRange(breed.min_expectancy, breed.max_expectancy, 'years')}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Energy Level</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">
                        {getEnergyLevel(breed.energy_level_value)}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Trainability</td>
                    {selectedBreeds.map(breed => (
                      <td key={breed.breed} className="py-3 px-4">
                        {getTrainability(breed.trainability_value)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}