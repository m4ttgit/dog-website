'use client';

import { useState, useEffect } from 'react';
import BreedSelector from './components/BreedSelector';
import ComparisonTable from './components/ComparisonTable';

export default function BreedComparePage() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch('/api/breeds');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreeds(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setBreeds([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBreeds();
  }, []);

  const addBreed = (breed) => {
    if (selectedBreeds.length < 4 && !selectedBreeds.find(b => b.breed === breed.breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  const removeBreed = (breedName) => {
    setSelectedBreeds(selectedBreeds.filter(b => b.breed !== breedName));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading breeds...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Compare Dog Breeds</h1>
        <p className="text-gray-600">Select up to 4 breeds to compare their characteristics</p>
      </div>

      <BreedSelector 
        breeds={breeds} 
        selectedBreeds={selectedBreeds}
        onAddBreed={addBreed}
        onRemoveBreed={removeBreed}
        maxSelected={4}
      />

      {selectedBreeds.length > 1 && (
        <ComparisonTable 
          breeds={selectedBreeds}
          onRemoveBreed={removeBreed}
        />
      )}
    </div>
  );
}