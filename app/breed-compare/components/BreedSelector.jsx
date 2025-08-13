'use client';

import { useState } from 'react';

export default function BreedSelector({ breeds, selectedBreeds, onAddBreed, onRemoveBreed, maxSelected }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBreeds = (Array.isArray(breeds) ? breeds : []).filter(breed => 
    breed?.breed?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedBreeds.find(selected => selected.breed === breed.breed)
  );

  return (
    <div className="mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {selectedBreeds.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Breeds ({selectedBreeds.length}/{maxSelected})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBreeds.map(breed => (
              <button
                key={breed.breed}
                onClick={() => onRemoveBreed(breed.breed)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                title="Click to remove"
              >
                {breed.breed} ×
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedBreeds.length < maxSelected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {filteredBreeds.map(breed => (
            <button
              key={breed.breed}
              onClick={() => onAddBreed(breed)}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
            >
              <div className="font-medium">{breed.breed}</div>
              <div className="text-sm text-gray-600">{breed.group}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}