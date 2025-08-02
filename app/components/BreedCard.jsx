'use client';
import { useState, useEffect } from 'react';
import ShareButtons from '@/app/components/ShareButtons';

function formatRange(min, max, unit) {
  if (!min && !max) return 'N/A';
  if (min === max) return `${min.toFixed(2)}${unit}`;
  if (!min) return `up to ${max.toFixed(2)}${unit}`;
  if (!max) return `${min.toFixed(2)}${unit}+`;
  return `${min.toFixed(2)}-${max.toFixed(2)}${unit}`;
}

function getEnergyCategory(value) {
  if (value >= 0.7) return 'High';
  if (value >= 0.4) return 'Medium';
  return 'Low';
}

function getTrainabilityCategory(value) {
  if (value >= 0.7) return 'Highly Trainable';
  if (value >= 0.4) return 'Moderately Trainable';
  return 'Independent';
}

function formatBreedForApi(breedName) {
  return breedName.toLowerCase().replace(/\s+/g, '');
}

function CharacteristicsBars({ energyValue, trainabilityValue }) {
  return (
    <div className="space-y-2">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Energy Level</span>
          <span>{getEnergyCategory(energyValue)}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${energyValue * 100}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Trainability</span>
          <span>{getTrainabilityCategory(trainabilityValue)}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${trainabilityValue * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function BreedCard({ breed }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ensure we have a display name
  const displayName = breed.breed || breed.name || 'Unknown Breed';
  
  useEffect(() => {
    const fetchBreedImage = async () => {
      setIsLoading(true);
      
      // Set timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        setImageUrl('/placeholder-dog.jpg');
        setIsLoading(false);
      }, 5000);
      
      try {
        // First try to load from our local mapping
        const breedMapping = await fetch('/breed-images.json').then(res => res.json());
        
        // Try exact match first
        if (breedMapping[displayName]) {
          clearTimeout(timeout);
          setImageUrl(breedMapping[displayName]);
          setIsLoading(false);
          return;
        }
        
        // Try case-insensitive match
        const exactMatch = Object.keys(breedMapping).find(key => 
          key.toLowerCase() === displayName.toLowerCase()
        );
        if (exactMatch) {
          clearTimeout(timeout);
          setImageUrl(breedMapping[exactMatch]);
          setIsLoading(false);
          return;
        }

        // Fall back to dog.ceo API
        const breedForApi = formatBreedForApi(displayName);
        const response = await fetch(`https://dog.ceo/api/breed/${breedForApi}/images/random`);
        const data = await response.json();
        if (data.status === 'success') {
          clearTimeout(timeout);
          setImageUrl(data.message);
        } else {
          clearTimeout(timeout);
          setImageUrl('/placeholder-dog.jpg');
        }
      } catch (error) {
        console.error('Error fetching breed image:', error);
        clearTimeout(timeout);
        setImageUrl('/placeholder-dog.jpg');
      }
      setIsLoading(false);
    };

    fetchBreedImage();
  }, [displayName]);

  // Calculate trait values
  const energyValue = parseFloat(breed.energy_level_value) || 0;
  const trainabilityValue = parseFloat(breed.trainability_value) || 0;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const TemperamentTags = () => (
    breed.temperament && (
      <div className="flex flex-wrap gap-2 mb-4">
        {breed.temperament.split(', ').map((trait, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-secondary/20 text-primary rounded-full text-sm"
          >
            {trait}
          </span>
        ))}
      </div>
    )
  );

  const QuickStats = () => (
    <div className="space-y-2 text-gray-600 text-sm mb-4">
      <p>
        <span className="font-semibold">Height:</span> {formatRange(breed.min_height, breed.max_height, ' cm')}
      </p>
      <p>
        <span className="font-semibold">Weight:</span> {formatRange(breed.min_weight, breed.max_weight, ' kg')}
      </p>
      <p>
        <span className="font-semibold">Life Expectancy:</span> {formatRange(breed.min_expectancy, breed.max_expectancy, ' years')}
      </p>
      {breed.group && (
        <p>
          <span className="font-semibold">Group:</span> {breed.group}
        </p>
      )}
    </div>
  );

  const BreedImage = ({ className = "h-48" }) => (
    <div className={`w-full ${className} relative bg-gray-100 rounded-t-xl overflow-hidden`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={displayName}
          className="w-full h-full object-contain bg-white"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
    </div>
  );

  const shareTitle = `Learn about ${displayName}`;
  const shareText = `Check out this dog breed: ${displayName}`;
  const sharePath = `/breeds/${encodeURIComponent(displayName.toLowerCase().replace(/\s+/g, '-'))}`;

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <BreedImage />
        <div className="p-6">
          {/* Title on its own row so share buttons never block or wrap the name */}
          <h3 className="text-xl font-bold text-primary">{displayName}</h3>
          {/* Share row below title */}
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <ShareButtons path={sharePath} title={shareTitle} text={shareText} variant="compact" />
          </div>

          <div className="mt-3">
            <TemperamentTags />
          </div>
          <QuickStats />
          <CharacteristicsBars energyValue={energyValue} trainabilityValue={trainabilityValue} />
          
          {/* Description Preview */}
          {breed.description && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="line-clamp-3">{breed.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={handleModalClick}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={handleCloseModal}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="divide-y divide-gray-200">
              <BreedImage className="h-64" />
              {/* Header section */}
              <div className="p-6 bg-primary/5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold">{displayName}</h2>
                  {/* Share in modal header; stop propagation so it doesn't close modal */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <ShareButtons path={sharePath} title={shareTitle} text={shareText} variant="compact" />
                  </div>
                </div>
                <div className="mt-4">
                  <TemperamentTags />
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 space-y-6">
                {breed.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-gray-600">{breed.description}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <QuickStats />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Characteristics</h3>
                    <CharacteristicsBars energyValue={energyValue} trainabilityValue={trainabilityValue} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
