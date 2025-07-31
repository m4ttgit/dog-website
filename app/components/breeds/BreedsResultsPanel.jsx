'use client';
import BreedCard from '../BreedCard';

export default function BreedsResultsPanel({ filteredBreeds }) {
  if (!filteredBreeds || filteredBreeds.length === 0) {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-600 mb-6">
            No breeds found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <p className="text-gray-600 mb-6">
          Found {filteredBreeds.length} breeds matching your criteria
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBreeds.map((breed) => (
            <BreedCard 
              key={breed.breed} 
              breed={{
                ...breed,
                name: breed.breed, // Ensure name is set for BreedCard
                description: breed.description || generateDescription(breed)
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function generateDescription(breed) {
  return `The ${breed.breed} is a wonderful companion known for its ${
    breed.energy_level_value > 0.7 ? 'high energy and' :
    breed.energy_level_value > 0.4 ? 'moderate energy and' : 'calm nature and'
  } ${
    breed.trainability_value > 0.7 ? 'excellent trainability' :
    breed.trainability_value > 0.4 ? 'good trainability' : 'independent nature'
  }.`;
}