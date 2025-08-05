'use client';
import { getBreedBySlug } from "@/app/api/breeds";
import Image from "next/image";
import { ShareButtons } from "@/app/components/ShareButtons";
import breedImages from '@/public/breed-images.json';

function BreedPageClient({ breed, slug }) {
  // Get image path from mapping or fallback to placeholder
  const imageUrl = breedImages[breed.breed] || '/placeholder-dog.jpg';

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{breed.breed}</h1>
        
        <ShareButtons 
          title={`Check out this dog breed: ${breed.breed}`}
          url={`https://dog-website-1.onrender.com/breeds/${slug}`}
        />
        
        <div className="mb-6">
          <div className="w-full h-96 relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={breed.breed}
              className="w-full h-full object-contain bg-white"
              onError={(e) => {
                e.target.src = '/placeholder-dog.jpg';
              }}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 mb-4">{breed.description}</p>
            <p><strong>Group:</strong> {breed.group}</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">Characteristics</h2>
            <div className="space-y-2">
              <p><strong>Height:</strong> {breed.min_height}-{breed.max_height} cm</p>
              <p><strong>Weight:</strong> {breed.min_weight}-{breed.max_weight} kg</p>
              <p><strong>Life Expectancy:</strong> {breed.min_expectancy}-{breed.max_expectancy} years</p>
              <p><strong>Energy Level:</strong> {Math.round(breed.energy_level_value * 10)}/10</p>
              <p><strong>Trainability:</strong> {Math.round(breed.trainability_value * 10)}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function BreedPage({ params }) {
  const breed = await getBreedBySlug(params.slug);
  
  if (!breed) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-3xl font-bold text-red-600">Breed Not Found</h1>
        <p className="mt-4">The breed you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return <BreedPageClient breed={breed} slug={params.slug} />;
}

export default BreedPage;
