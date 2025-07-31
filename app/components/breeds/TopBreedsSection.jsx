'use client';
import TopBreedCard from './TopBreedCard';

export default function TopBreedsSection({ breeds, isClient }) {
  const topBreeds = breeds
    .filter(breed => typeof breed.popularity === 'number' && breed.popularity <= 10)
    .sort((a, b) => a.popularity - b.popularity)
    .slice(0, 10);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Top 10 Most Popular Breeds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topBreeds.map((breed) => (
          <TopBreedCard key={breed.name} breed={breed} isClient={isClient} />
        ))}
      </div>
    </div>
  );
}