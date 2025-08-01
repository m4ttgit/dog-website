'use client';
import { getBreedBySlug } from "@/app/api/breeds";
import Image from "next/image";
import { ShareButtons } from "@/app/components/ShareButtons";
import { useState, useEffect } from 'react';

function formatBreedForApi(breedName) {
  return breedName.toLowerCase().replace(/\s+/g, '');
}

function BreedPageClient({ breed, slug }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBreedImage = async () => {
      setIsLoading(true);
      try {
        // First try to load from our local mapping
        const breedMapping = await fetch('/breed-images.json').then(res => res.json());
        
        // Try exact match first
        if (breedMapping[breed.breed]) {
          setImageUrl(breedMapping[breed.breed]);
          setIsLoading(false);
          return;
        }
        
        // Try case-insensitive match
        const exactMatch = Object.keys(breedMapping).find(key => 
          key.toLowerCase() === breed.breed.toLowerCase()
        );
        if (exactMatch) {
          setImageUrl(breedMapping[exactMatch]);
          setIsLoading(false);
          return;
        }

        // Fall back to dog.ceo API
        const breedForApi = formatBreedForApi(breed.breed);
        const response = await fetch(`https://dog.ceo/api/breed/${breedForApi}/images/random`);
        const data = await response.json();
        if (data.status === 'success') {
          setImageUrl(data.message);
        }
      } catch (error) {
        console.error('Error fetching breed image:', error);
      }
      setIsLoading(false);
    };

    fetchBreedImage();
  }, [breed.breed]);

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
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={breed.breed}
                className="w-full h-full object-contain bg-white"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
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
