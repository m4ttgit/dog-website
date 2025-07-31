'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function formatRange(min, max, unit) {
  if (!min && !max) return 'N/A';
  if (min === max) return `${min.toFixed(1)}${unit}`;
  if (!min) return `up to ${max.toFixed(1)}${unit}`;
  if (!max) return `${min.toFixed(1)}${unit}+`;
  return `${min.toFixed(1)}-${max.toFixed(1)}${unit}`;
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

function CharacteristicsBars({ energyValue, trainabilityValue }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Energy Level</span>
          <span className="text-primary">{getEnergyCategory(energyValue)}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${energyValue * 100}%` }}
            role="progressbar"
            aria-valuenow={energyValue * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Energy level: ${getEnergyCategory(energyValue)}`}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Trainability</span>
          <span className="text-primary">{getTrainabilityCategory(trainabilityValue)}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${trainabilityValue * 100}%` }}
            role="progressbar"
            aria-valuenow={trainabilityValue * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Trainability: ${getTrainabilityCategory(trainabilityValue)}`}
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
  const [imageError, setImageError] = useState(false);
  
  const displayName = breed.breed || breed.name || 'Unknown Breed';
  
  useEffect(() => {
    const fetchBreedImage = async () => {
      setIsLoading(true);
      setImageError(false);
      
      try {
        // Try local breed images first
        const imagePath = `/images/breeds/${displayName.replace(/\s+/g, '_')}.jpg`;
        const img = new Image();
        img.onload = () => {
          setImageUrl(imagePath);
          setIsLoading(false);
        };
        img.onerror = () => {
          setImageError(true);
          setIsLoading(false);
        };
        img.src = imagePath;
      } catch (error) {
        console.error('Error loading breed image:', error);
        setImageError(true);
        setIsLoading(false);
      }
    };

    fetchBreedImage();
  }, [displayName]);

  const energyValue = parseFloat(breed.energy_level_value) || 0;
  const trainabilityValue = parseFloat(breed.trainability_value) || 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const TemperamentTags = () => (
    breed.temperament && (
      <div className="flex flex-wrap gap-2 mb-4">
        {breed.temperament.split(', ').slice(0, 3).map((trait, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-secondary/20 text-primary rounded-full text-sm font-medium"
          >
            {trait}
          </span>
        ))}
      </div>
    )
  );

  const QuickStats = () => (
    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
      <div>
        <span className="font-semibold text-gray-700">Height:</span>
        <p className="text-gray-600">{formatRange(breed.min_height, breed.max_height, ' cm')}</p>
      </div>
      <div>
        <span className="font-semibold text-gray-700">Weight:</span>
        <p className="text-gray-600">{formatRange(breed.min_weight, breed.max_weight, ' kg')}</p>
      </div>
      <div>
        <span className="font-semibold text-gray-700">Lifespan:</span>
        <p className="text-gray-600">{formatRange(breed.min_expectancy, breed.max_expectancy, ' years')}</p>
      </div>
      {breed.group && (
        <div>
          <span className="font-semibold text-gray-700">Group:</span>
          <p className="text-gray-600">{breed.group}</p>
        </div>
      )}
    </div>
  );

  const BreedImage = ({ className = "h-48", priority = false }) => (
    <div className={`w-full ${className} relative bg-gray-100 rounded-t-xl overflow-hidden`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" 
               aria-label="Loading breed image"></div>
        </div>
      ) : imageError || !imageUrl ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
          <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">No image available</span>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={`${displayName} dog breed`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      )}
    </div>
  );

  return (
    <>
      <article 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${displayName} breed`}
      >
        <BreedImage />
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{displayName}</h3>
          <TemperamentTags />
          <QuickStats />
          <CharacteristicsBars energyValue={energyValue} trainabilityValue={trainabilityValue} />
          
          {breed.description && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="line-clamp-2 sm:line-clamp-3">{breed.description}</p>
            </div>
          )}
        </div>
      </article>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleCloseModal}
              aria-label="Close breed details modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="divide-y divide-gray-200">
              <BreedImage className="h-64 sm:h-80" priority={true} />
              
              <div className="p-4 sm:p-6 bg-primary/5">
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold mb-4">{displayName}</h2>
                <TemperamentTags />
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {breed.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">About This Breed</h3>
                    <p className="text-gray-600 leading-relaxed">{breed.description}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Quick Facts</h3>
                    <QuickStats />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Characteristics</h3>
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