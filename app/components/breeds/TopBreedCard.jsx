'use client';
import { useState } from 'react';
import ImageAttribution from '@/app/components/ImageAttribution';
import breedImages from '@/public/breed-images.json';

const formatNumber = (value) => {
  return value ? value.toFixed(2) : null;
};

export default function TopBreedCard({ breed }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBreedPhotoUrl = (breedName) => {
    return breedImages[breedName] || '/placeholder-dog.jpg';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <div>
          <img
            src={getBreedPhotoUrl(breed.name)}
            alt={breed.name}
            className="w-full h-48 object-contain bg-gray-100"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{breed.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {breed.temperament || `The ${breed.name} is a wonderful companion.`}
          </p>
          <ImageAttribution breedName={breed.name} />
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
              {/* Image section */}
              <div className="h-64 sm:h-80">
                <img
                  src={getBreedPhotoUrl(breed.name)}
                  alt={breed.name}
                  className="w-full h-full object-contain bg-gray-100"
                />
              </div>

              {/* Content section */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{breed.name}</h2>
                  <p className="text-gray-600">
                    {breed.temperament || `The ${breed.name} is a wonderful companion.`}
                  </p>
                </div>

                {breed.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-gray-600">{breed.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {breed.group && (
                    <div>
                      <h3 className="font-semibold mb-1">Group</h3>
                      <p className="text-gray-600">{breed.group}</p>
                    </div>
                  )}

                  {(breed.min_height || breed.max_height) && (
                    <div>
                      <h3 className="font-semibold mb-1">Height</h3>
                      <p className="text-gray-600">
                        {breed.min_height && breed.max_height
                          ? `${formatNumber(breed.min_height)} - ${formatNumber(breed.max_height)} cm`
                          : breed.min_height
                          ? `${formatNumber(breed.min_height)} cm`
                          : `${formatNumber(breed.max_height)} cm`}
                      </p>
                    </div>
                  )}

                  {(breed.min_weight || breed.max_weight) && (
                    <div>
                      <h3 className="font-semibold mb-1">Weight</h3>
                      <p className="text-gray-600">
                        {breed.min_weight && breed.max_weight
                          ? `${formatNumber(breed.min_weight)} - ${formatNumber(breed.max_weight)} kg`
                          : breed.min_weight
                          ? `${formatNumber(breed.min_weight)} kg`
                          : `${formatNumber(breed.max_weight)} kg`}
                      </p>
                    </div>
                  )}

                  {(breed.min_expectancy || breed.max_expectancy) && (
                    <div>
                      <h3 className="font-semibold mb-1">Life Expectancy</h3>
                      <p className="text-gray-600">
                        {breed.min_expectancy && breed.max_expectancy
                          ? `${Math.round(breed.min_expectancy)}-${Math.round(breed.max_expectancy)} years`
                          : breed.min_expectancy
                          ? `${Math.round(breed.min_expectancy)} years`
                          : `${Math.round(breed.max_expectancy)} years`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
