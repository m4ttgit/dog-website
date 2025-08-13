'use client';
import breedImages from '@/public/breed-images.json';

export default function ComparisonTable({ breeds, onRemoveBreed }) {
  const getBreedPhotoUrl = (breedName) => {
    return breedImages[breedName] || '/placeholder-dog.jpg';
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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Breed Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Characteristic</th>
                {breeds.map(breed => (
                  <th key={breed.breed} className="text-left py-3 px-4 font-semibold min-w-32">
                    <div className="text-center">
                      <img
                        src={getBreedPhotoUrl(breed.breed)}
                        alt={breed.breed}
                        className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{breed.breed}</span>
                        <button
                          onClick={() => onRemoveBreed(breed.breed)}
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
                {breeds.map(breed => (
                  <td key={breed.breed} className="py-3 px-4">{breed.group || 'N/A'}</td>
                ))}
              </tr>
              
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Height</td>
                {breeds.map(breed => (
                  <td key={breed.breed} className="py-3 px-4">
                    {formatRange(breed.min_height, breed.max_height, 'cm')}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Weight</td>
                {breeds.map(breed => (
                  <td key={breed.breed} className="py-3 px-4">
                    {formatRange(breed.min_weight, breed.max_weight, 'kg')}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Life Expectancy</td>
                {breeds.map(breed => (
                  <td key={breed.breed} className="py-3 px-4">
                    {formatRange(breed.min_expectancy, breed.max_expectancy, 'years')}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Energy Level</td>
                {breeds.map(breed => (
                  <td key={breed.breed} className="py-3 px-4">
                    {getEnergyLevel(breed.energy_level_value)}
                  </td>
                ))}
              </tr>
              
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Trainability</td>
                {breeds.map(breed => (
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
  );
}